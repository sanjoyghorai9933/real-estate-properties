import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getAdminSession } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

const allowedTypes = new Set(["Residential", "Commercial"]);
const allowedStatuses = new Set(["Active", "Inactive"]);
const allowedMimeTypes = new Map([["image/jpeg", ".jpg"], ["image/png", ".png"], ["image/webp", ".webp"]]);

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const db = getDb();
    const [rows] = await db.query(
      `SELECT id, property_name, property_type, builder, location, configuration, price,
              image_path, status, is_exclusive_offer, display_order, created_at, updated_at
       FROM properties ORDER BY display_order ASC, created_at DESC`,
    );
    return NextResponse.json({ properties: rows });
  } catch (error) { console.error("Properties GET failed:", error); return NextResponse.json({ message: "Unable to load properties." }, { status: 500 }); }
}

export async function POST(request: Request) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const formData = await request.formData();
    const propertyName = String(formData.get("propertyName") ?? "").trim();
    const propertyType = String(formData.get("propertyType") ?? "").trim();
    const builder = String(formData.get("builder") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const configuration = String(formData.get("configuration") ?? "").trim();
    const price = String(formData.get("price") ?? "").trim();
    const status = String(formData.get("status") ?? "Active").trim();
    const isExclusiveOffer = formData.get("isExclusiveOffer") === "on" ? 1 : 0;
    const displayOrder = Number(formData.get("displayOrder") ?? 0);
    const image = formData.get("image");

    if (!propertyName || !location || !price || !allowedTypes.has(propertyType)) return NextResponse.json({ message: "Property name, type, location and price are required." }, { status: 400 });
    if (!allowedStatuses.has(status)) return NextResponse.json({ message: "Invalid property status." }, { status: 400 });
    if (!Number.isInteger(displayOrder) || displayOrder < 0) return NextResponse.json({ message: "Display order must be a non-negative whole number." }, { status: 400 });

    let imagePath: string | null = null;
    if (image instanceof File && image.size > 0) {
      if (image.size > 5 * 1024 * 1024) return NextResponse.json({ message: "Image must be 5 MB or smaller." }, { status: 400 });
      const extension = allowedMimeTypes.get(image.type); if (!extension) return NextResponse.json({ message: "Only JPG, PNG and WebP images are allowed." }, { status: 400 });
      const safeName = `${Date.now()}-${crypto.randomUUID()}${extension}`;
      const uploadDirectory = path.join(process.cwd(), "public", "uploads", "properties");
      await mkdir(uploadDirectory, { recursive: true });
      await writeFile(path.join(uploadDirectory, safeName), Buffer.from(await image.arrayBuffer()));
      imagePath = `/uploads/properties/${safeName}`;
    }

    const db = getDb();
    const [result] = await db.execute(
      `INSERT INTO properties
        (property_name, property_type, builder, location, configuration, price, image_path, status, is_exclusive_offer, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [propertyName, propertyType, builder || null, location, configuration || null, price, imagePath, status, isExclusiveOffer, displayOrder],
    );
    return NextResponse.json({ ok: true, id: (result as { insertId: number }).insertId }, { status: 201 });
  } catch (error) { console.error("Property create failed:", error); return NextResponse.json({ message: "Unable to create property." }, { status: 500 }); }
}
