import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";
const statuses = new Set(["New", "Contacted", "Closed"]);

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const db = getDb();
    const [rows] = await db.query(
      `SELECT e.id, e.property_id, p.property_name, e.name, e.phone, e.email, e.message, e.status, e.created_at, e.updated_at
       FROM enquiries e LEFT JOIN properties p ON p.id = e.property_id
       ORDER BY e.created_at DESC`,
    );
    return NextResponse.json({ enquiries: rows });
  } catch (error) {
    console.error("Enquiries GET failed:", error);
    return NextResponse.json({ message: "Unable to load enquiries." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const id = Number(body.id);
    const status = String(body.status ?? "");
    if (!Number.isInteger(id) || id < 1 || !statuses.has(status)) {
      return NextResponse.json({ message: "Invalid enquiry or status." }, { status: 400 });
    }

    const db = getDb();
    await db.execute("UPDATE enquiries SET status = ? WHERE id = ?", [status, id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Enquiry status update failed:", error);
    return NextResponse.json({ message: "Unable to update enquiry." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const id = Number(body.id);
    if (!Number.isInteger(id) || id < 1) {
      return NextResponse.json({ message: "Invalid enquiry." }, { status: 400 });
    }

    const db = getDb();
    await db.execute("DELETE FROM enquiries WHERE id = ?", [id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Enquiry delete failed:", error);
    return NextResponse.json({ message: "Unable to delete enquiry." }, { status: 500 });
  }
}
