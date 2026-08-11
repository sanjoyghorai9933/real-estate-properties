import mysql from "mysql2/promise";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const images = [
  ["M3M Altitude", "https://m3mproperty.com/uploads/projects/thumb/m3m-altitude-thumbnail-1774094837.webp"],
  ["M3M Mansion", "https://www.propedge.co.in/assets/img/m3m-mansion/5.png"],
  ["M3M Crown", "https://eminenceinfrastructures.com/wp-content/uploads/2023/03/m3m-crown-sector-111-banner-43096.jpg"],
  ["M3M Golf Hills", "https://www.luxuryresidencesindia.in/m3m-golf-hills-sector-79-gurgaon/images/highlight.webp"],
  ["M3M St. Andrews Sector 113", "https://m3mpropertyindia.com/wp-content/uploads/2025/10/m3m-saint-andrews-sector-113-investment.webp"],
  ["M3M Soulitude", "https://www.eliteproinfra.com/uploads/property/1685624194.jpg"],
  ["M3M Broadway", "https://staging.megarealty.co.in/assets/upload/2020/11/2aabso-kzjfot-ozgr34.jpg"],
  ["M3M St. Andrews 65", "https://m3mpropertiesindia.in/images/m3m-st-andrews-tab-banner.webp"],
  ["M3M Innovation Park", "https://m3mpremium.in/assets/uploads/blogs/m3m-innovation-park-manesar-banner-image_73192.webp"],
  ["M3M Opus", "https://www.homesearchs.com/blog/wp-content/uploads/2024/09/M3M-Opus.jpg"],
  ["M3M Forestia West", "https://m3mpremium.in/assets/uploads/blogs/forestia_45962.webp"],
  ["M3M Gurgaon International City", "https://feeds.abplive.com/onecms/images/uploaded-images/2025/12/29/f9df3dd7c4c25f8747b85c577f435a441767024772800401_original.png?impolicy=abp_cdn&imwidth=1200"],
  ["M3M Golf Estate Sector 65", "https://www.expresswayproperties.com/residential/m3m-golf-estate-sector-65-gurgaon/content/image-gallery/m3m-golf-estate-aerial-view-luxury-high-rise.webp"],
  ["M3M Antalya Hills Low Rise Floors", "https://m3mpropertiesindia.in/images/m3m-antalya-mobile-banner.webp"],
  ["M3M Jacob & Co Gurgaon", "https://www.m3mestate.com/project_pics/m3m-111%20%281%29-22322.jpg"],
  ["M3M Brabus Residences", "https://www.m3mestate.com/project_pics/M3M-brabus-banner-96231.jpg"],
  ["M3M CFC Sector 113", "https://www.m3mproperties.com/project_pics/capital-financial-center-banner-1783158298-75848.jpg"],
  ["M3M The Cullinan", "https://www.whitehat.realty/_next/image?q=75&url=https%3A%2F%2Fwhitehatrealty.in%2Fuploads%2Fprojects%2Fm3m-the-cullinan%2Fwhite-hat-realty-qnjppovvz7-16.jpg&w=3840"],
  ["M3M The Cullinan Avenue", "https://m3m-properties.in/images/m3m-the-cullinan-avenue-slider5.webp"],
  ["M3M Jewel", "https://www.rsbmglobal.com/storage/m3m-jewel-compressed-autox610.jpg"],
  ["M3M Elie Saab Sector 111", "https://www.m3mprojects.net.in/m3m-elie-saab-at-scda/assets/images/main.webp"],
];

const required = ["DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"];
for (const key of required) {
  if (process.env[key] === undefined) throw new Error(`Missing ${key} in .env.local`);
}

const uploadDirectory = path.join(process.cwd(), "public", "uploads", "properties");
await mkdir(uploadDirectory, { recursive: true });

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function extensionFor(contentType, url) {
  const type = contentType.split(";")[0].toLowerCase();
  if (type === "image/jpeg") return ".jpg";
  if (type === "image/png") return ".png";
  if (type === "image/webp") return ".webp";
  if (type === "image/avif") return ".avif";
  const match = new URL(url).pathname.match(/\.(jpg|jpeg|png|webp|avif)$/i);
  return match ? `.${match[1].toLowerCase().replace("jpeg", "jpg")}` : ".jpg";
}

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectTimeout: 15000,
  charset: "utf8mb4",
});

try {
  for (const [propertyName, sourceUrl] of images) {
    try {
      const response = await fetch(sourceUrl, {
        headers: { "User-Agent": "Mozilla/5.0 real-estate-properties image importer" },
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.toLowerCase().startsWith("image/")) throw new Error(`Not an image (${contentType || "unknown content type"})`);

      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length === 0 || buffer.length > 8 * 1024 * 1024) throw new Error("Image is empty or larger than 8 MB");

      const filename = `m3m-${slugify(propertyName)}${extensionFor(contentType, sourceUrl)}`;
      await writeFile(path.join(uploadDirectory, filename), buffer);
      const imagePath = `/uploads/properties/${filename}`;

      await db.execute("UPDATE properties SET image_path = ? WHERE property_name = ?", [imagePath, propertyName]);
      console.log(`OK  ${propertyName} -> ${imagePath}`);
    } catch (error) {
      console.warn(`SKIP ${propertyName}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
} finally {
  await db.end();
}

console.log("\nImage import finished. Only image_path values were changed; property details and statuses were left untouched.");
console.log("Before production, replace third-party images with images you are authorized to host.");
