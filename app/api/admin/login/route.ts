import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { createAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = typeof body.username === "string" ? body.username.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required." }, { status: 400 });
    }

    const db = getDb();
    const [rows] = await db.execute(
      "SELECT id, username, password_hash FROM admins WHERE username = ? LIMIT 1",
      [username],
    );

    const admin = (rows as { id: number; username: string; password_hash: string }[])[0];
    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      return NextResponse.json({ message: "Invalid username or password." }, { status: 401 });
    }

    await createAdminSession({ id: admin.id, username: admin.username });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json({ message: "Unable to sign in right now." }, { status: 500 });
  }
}
