import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ message: "Invalid property ID." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const isExclusiveOffer = body.isExclusiveOffer === true || body.isExclusiveOffer === 1 || body.isExclusiveOffer === "1";
    const db = getDb();
    const [result] = await db.execute(
      "UPDATE properties SET is_exclusive_offer = ? WHERE id = ?",
      [isExclusiveOffer ? 1 : 0, id],
    );

    if ((result as { affectedRows: number }).affectedRows === 0) {
      return NextResponse.json({ message: "Property not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, isExclusiveOffer });
  } catch (error) {
    console.error("Exclusive offer update failed:", error);
    return NextResponse.json({ message: "Unable to update exclusive offer." }, { status: 500 });
  }
}
