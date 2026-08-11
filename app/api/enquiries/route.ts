import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const propertyIdValue = clean(form.get("property_id"));
    const name = clean(form.get("name"));
    const phone = clean(form.get("phone"));
    const email = clean(form.get("email"));
    const message = clean(form.get("message"));

    const propertyId = propertyIdValue ? Number(propertyIdValue) : null;

    if (!name || name.length > 150) {
      return NextResponse.json({ ok: false, message: "Please enter a valid name." }, { status: 400 });
    }
    if (!phone || phone.length > 30) {
      return NextResponse.json({ ok: false, message: "Please enter a valid phone number." }, { status: 400 });
    }
    if (email && (email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return NextResponse.json({ ok: false, message: "Please enter a valid email address." }, { status: 400 });
    }
    if (message.length > 10000) {
      return NextResponse.json({ ok: false, message: "Message is too long." }, { status: 400 });
    }
    if (propertyId !== null && (!Number.isInteger(propertyId) || propertyId < 1)) {
      return NextResponse.json({ ok: false, message: "Invalid property." }, { status: 400 });
    }

    const db = getDb();

    if (propertyId !== null) {
      const [propertyRows] = await db.query(
        "SELECT id FROM properties WHERE id = ? LIMIT 1",
        [propertyId],
      );
      if ((propertyRows as unknown[]).length === 0) {
        return NextResponse.json({ ok: false, message: "Property not found." }, { status: 404 });
      }
    }

    await db.execute(
      `INSERT INTO enquiries (property_id, name, phone, email, message, status)
       VALUES (?, ?, ?, ?, ?, 'New')`,
      [propertyId, name, phone, email || null, message || null],
    );

    // The current public form uses a normal HTML POST. Redirecting keeps the
    // visitor on the public site after a successful submission.
    return NextResponse.redirect(new URL("/?enquiry=success", request.url), 303);
  } catch (error) {
    console.error("Create enquiry error:", error);
    return NextResponse.json({ ok: false, message: "Unable to submit enquiry right now." }, { status: 500 });
  }
}
