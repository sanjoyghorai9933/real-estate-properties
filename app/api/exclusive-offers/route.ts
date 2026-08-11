import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();
    const [rows] = await db.query(
      `SELECT id, property_name, property_type, builder, location, configuration, price, image_path
       FROM properties
       WHERE status = 'Active' AND is_exclusive_offer = 1
       ORDER BY display_order ASC, created_at DESC`,
    );

    return NextResponse.json(rows, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("Exclusive offers API error:", error);
    return NextResponse.json({ error: "Unable to load exclusive offers" }, { status: 500 });
  }
}
