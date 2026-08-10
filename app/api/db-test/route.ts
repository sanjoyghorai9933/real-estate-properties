import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();
    const [tables] = await db.query("SHOW TABLES");

    return NextResponse.json({
      ok: true,
      message: "MySQL connection successful",
      tables,
    });
  } catch (error) {
    console.error("Database test failed:", error);

    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Database connection failed",
      },
      { status: 500 },
    );
  }
}
