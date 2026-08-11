import { NextResponse } from "next/server";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { getAdminSession } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

const allowedTypes = new Set(["Residential", "Commercial"]);
const allowedStatuses = new Set(["Active", "Inactive"]);
const allowedMimeTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

function getId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

async function removeLocalImage(imagePath: string | null) {
  if (!imagePath || !imagePath.startsWith("/uploads/properties/")) return;
  const filename = path.basename(imagePath);
  if (!filename || filename !== imagePath.slice("/uploads/properties/".length)) return;
  try {
    await unlink(path.join(process.cwd(), "public", "uploads", "properties", filename));
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? error.code : "";
    if (code !== "ENOENT") console.warn("Unable to remove property image:", error);
  }
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const id = getId((await params).id);
  if (!id) return NextResponse.json({ message: "Invalid property ID." }, { status: 400 });

  try {
    const db = getDb();
    const [rows] = await db.execute(
      `SELECT id, property_name, property_type, builder, location, configuration, price, image_path, status, display_order
       FROM properties WHERE id = ? LIMIT 1`,
      [id],
    );
    const property = (rows as unknown[])[0];
    if (!property) return NextResponse.json({ message: "Property not found." }, { status: 404 });
    return NextResponse.json({ property });
  } catch (error) {
    console.error("Property GET failed:", error);
    return NextResponse.json({ message: "Unable to load property." }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const id = getId((await params).id);
  if (!id) return NextResponse.json({ message: "Invalid property ID." }, { status: 400 });

  try {
    const formData = await request.formData();
    const propertyName = String(formData.get("propertyName") ?? "").trim();
    const propertyType = String(formData.get("propertyType") ?? "").trim();
    const builder = String(formData.get("builder") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const configuration = String(formData.get("configuration") ?? "").trim();
    const price = String(formData.get("price") ?? "").trim();
    const status = String(formData.get("status") ?? "Active").trim();
    const displayOrder = Number(formData.get("displayOrder") ?? 0);
    const image = formData.get("image");

    if (!propertyName || !location || !price || !allowedTypes.has(propertyType)) {
      return NextResponse.json({ message: "Property name, type, location and price are required." }, { status: 400 });
    }
    if (!allowedStatuses.has(status)) return NextResponse.json({ message: "Invalid property status." }, { status: 400 });
    if (!Number.isInteger(displayOrder) || displayOrder < 0) return NextResponse.json({ message: "Display order must be a non-negative whole number." }, { status: 400 });

    const db = getDb();
    const [existingRows] = await db.execute("SELECT image_path FROM properties WHERE id = ? LIMIT 1", [id]);
    const existing = (existingRows as Array<{ image_path: string | null }>)[0];
    if (!existing) return NextResponse.json({ message: "Property not found." }, { status: 404 });

    let imagePath = existing.image_path;
    if (image instanceof File && image.size > 0) {
      if (image.size > 5 * 1024 * 1024) return NextResponse.json({ message: "Image must be 5 MB or smaller." }, { status: 400 });
      const extension = allowedMimeTypes.get(image.type);
      if (!extension) return NextResponse.json({ message: "Only JPG, PNG and WebP images are allowed." }, { status: 400 });
      const safeName = `${Date.now()}-${crypto.randomUUID()}${extension}`;
      const uploadDirectory = path.join(process.cwd(), "public", "uploads", "properties");
      await mkdir(uploadDirectory, { recursive: true });
      await writeFile(path.join(uploadDirectory, safeName), Buffer.from(await image.arrayBuffer()));
      imagePath = `/uploads/properties/${safeName}`;
    }

    await db.execute(
      `UPDATE properties
       SET property_name = ?, property_type = ?, builder = ?, location = ?, configuration = ?, price = ?, image_path = ?, status = ?, display_order = ?
       WHERE id = ?`,
      [propertyName, propertyType, builder || null, location, configuration || null, price, imagePath, status, displayOrder, id],
    );

    if (imagePath !== existing.image_path) await removeLocalImage(existing.image_path);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Property update failed:", error);
    return NextResponse.json({ message: "Unable to update property." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const id = getId((await params).id);
  if (!id) return NextResponse.json({ message: "Invalid property ID." }, { status: 400 });

  try {
    const db = getDb();
    const [rows] = await db.execute("SELECT image_path FROM properties WHERE id = ? LIMIT 1", [id]);
    const property = (rows as Array<{ image_path: string | null }>)[0];
    if (!property) return NextResponse.json({ message: "Property not found." }, { status: 404 });

    await db.execute("DELETE FROM properties WHERE id = ?", [id]);
    await removeLocalImage(property.image_path);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Property delete failed:", error);
    return NextResponse.json({ message: "Unable to delete property." }, { status: 500 });
  }
}
