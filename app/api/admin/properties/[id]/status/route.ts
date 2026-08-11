import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getDb } from "@/lib/db";

const allowedStatuses = new Set(["Active", "Inactive"]);

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
    const status = String(body.status ?? "").trim();
    if (!allowedStatuses.has(status)) {
      return NextResponse.json({ message: "Invalid property status." }, { status: 400 });
    }

    const db = getDb();
    const [result] = await db.execute(
      "UPDATE properties SET status = ? WHERE id = ?",
      [status, id],
    );

    if ((result as { affectedRows: number }).affectedRows === 0) {
      return NextResponse.json({ message: "Property not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, status });
  } catch (error) {
    console.error("Property status update failed:", error);
    return NextResponse.json({ message: "Unable to update property status." }, { status: 500 });
  }
}
