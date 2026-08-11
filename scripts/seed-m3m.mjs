import mysql from "mysql2/promise";

const properties = [
  ["M3M Altitude", "Residential", "M3M India", "Sector 65, Gurugram", "4.5 BHK + S · 3712 Sq. Ft. from", "₹6.25 Cr onwards", "https://m3mproperty.com/uploads/projects/thumb/m3m-altitude-thumbnail-1774094837.webp"],
  ["M3M Mansion", "Residential", "M3M India", "Sector 113, Gurgaon", "3.5 & 4.5 BHK Apartments · 2100 Sq. Ft. from", "₹3.74 Cr onwards", "https://www.propedge.co.in/assets/img/m3m-mansion/5.png"],
  ["M3M Crown", "Residential", "M3M India", "Sector 111, Gurgaon", "3 BHK & 4 BHK Apartments · 1605 Sq. Ft. from", "₹2.88 Cr onwards", "https://eminenceinfrastructures.com/wp-content/uploads/2023/03/m3m-crown-sector-111-banner-43096.jpg"],
  ["M3M Golf Hills", "Residential", "M3M India", "Sector 79, Gurgaon", "2.5, 3.5, 3.5 BHK + SR & 4.5 BHK + SR · 1420 Sq. Ft. from", "₹2.6 Cr onwards", "https://www.luxuryresidencesindia.in/m3m-golf-hills-sector-79-gurgaon/images/highlight.webp"],
  ["M3M St. Andrews Sector 113", "Residential", "M3M India", "Sector 113, Gurugram", "4.5 BHK Luxury Boutique Floors · 2750 Sq. Ft. from", "₹6 Cr onwards", "https://m3mpropertyindia.com/wp-content/uploads/2025/10/m3m-saint-andrews-sector-113-investment.webp"],
  ["M3M Soulitude", "Residential", "M3M India", "Sector 89, Gurugram", "2.5 & 3.5 BHK Luxury Floors · 1103 Sq. Ft. from", "₹1.38 Cr onwards", "https://www.eliteproinfra.com/uploads/property/1685624194.jpg"],
  ["M3M Broadway", "Commercial", "M3M India", "Sector 71, Gurugram", "Retail, F&B, Office, Gaming Zone & Service Apartments · 500 Sq. Ft. from", "₹50 Lakhs onwards", "https://staging.megarealty.co.in/assets/upload/2020/11/2aabso-kzjfot-ozgr34.jpg"],
  ["M3M St. Andrews 65", "Residential", "M3M India", "Sector 65, Gurugram", "4 BHK & 5 BHK Luxury Apartments · 6171–6450 Sq. Ft.", "₹18 Cr onwards", "https://m3mpropertiesindia.in/images/m3m-st-andrews-tab-banner.webp"],
  ["M3M Innovation Park", "Commercial", "M3M India", "Sectors 9, 10 & 11, Manesar", "Industrial Plots & Commercial Space · 182.24 Sq. Mt. from", "₹2 Cr onwards", "https://m3mpremium.in/assets/uploads/blogs/m3m-innovation-park-manesar-banner-image_73192.webp"],
  ["M3M Opus", "Residential", "M3M India", "Sector 67, Gurgaon", "3 BHK + Utility · 2400 Sq. Ft. from", "₹5.5 Cr onwards", "https://www.homesearchs.com/blog/wp-content/uploads/2024/09/M3M-Opus.jpg"],
  ["M3M Forestia West", "Residential", "M3M India", "Sectors M9, M10 & M11, Manesar", "3 BHK Apartments · 1905 Sq. Ft. from", "₹2.35 Cr onwards", "https://m3mpremium.in/assets/uploads/blogs/forestia_45962.webp"],
  ["M3M Gurgaon International City", "Residential", "M3M India", "Sectors M9, M10 & M11, Manesar", "3 BHK Apartments · 1905 Sq. Ft. from", "₹2.35 Cr onwards", "https://feeds.abplive.com/onecms/images/uploaded-images/2025/12/29/f9df3dd7c4c25f8747b85c577f435a441767024772800401_original.png?impolicy=abp_cdn&imwidth=1200"],
  ["M3M Golf Estate Sector 65", "Residential", "M3M India", "Sector 65, Gurgaon", "2, 3, 4 & 5 BHK · Area on request", "Price on request", "https://www.expresswayproperties.com/residential/m3m-golf-estate-sector-65-gurgaon/content/image-gallery/m3m-golf-estate-aerial-view-luxury-high-rise.webp"],
  ["M3M Antalya Hills Low Rise Floors", "Residential", "M3M India", "Sector 79, Gurgaon", "2.5 & 3.5 BHK · 1150 Sq. Ft. from", "Price on request", "https://m3mpropertiesindia.in/images/m3m-antalya-mobile-banner.webp"],
  ["M3M Jacob & Co Gurgaon", "Residential", "M3M India", "Sector 111, Gurgaon", "4 BHK Residences · Area on request", "Price on request", "https://www.m3mestate.com/project_pics/m3m-111%20%281%29-22322.jpg"],
  ["M3M Brabus Residences", "Residential", "M3M India", "Sector 58, Gurgaon", "4 & 5 BHK · 5500 Sq. Ft. from", "₹22 Cr approx.", "https://www.m3mestate.com/project_pics/M3M-brabus-banner-96231.jpg"],
  ["M3M CFC Sector 113", "Commercial", "M3M India", "Sector 113, Gurgaon", "Office & Retail Space · Area on request", "Price on request", "https://www.m3mproperties.com/project_pics/capital-financial-center-banner-1783158298-75848.jpg"],
  ["M3M The Cullinan", "Residential", "M3M India", "Sector 94, Noida", "3, 4 & 5 BHK · 3200 Sq. Ft. from", "₹6.5–12.4 Cr onwards", "https://www.whitehat.realty/_next/image?q=75&url=https%3A%2F%2Fwhitehatrealty.in%2Fuploads%2Fprojects%2Fm3m-the-cullinan%2Fwhite-hat-realty-qnjppovvz7-16.jpg&w=3840"],
  ["M3M The Cullinan Avenue", "Commercial", "M3M India", "Sector 94, Noida", "Retail Shops & Commercial Space · 207 Sq. Ft. from", "₹92 Lakhs onwards", "https://m3m-properties.in/images/m3m-the-cullinan-avenue-slider5.webp"],
  ["M3M Jewel", "Commercial", "M3M India", "Sector 25, Gurgaon", "Retail Shops & Office Spaces · 400 Sq. Ft. from", "₹2 Cr onwards", "https://www.rsbmglobal.com/storage/m3m-jewel-compressed-autox610.jpg"],
  ["M3M Elie Saab Sector 111", "Residential", "M3M India", "Sector 111, Gurgaon", "4 BHK Apartments · 4200 Sq. Ft. from", "₹14 Cr approx.", "https://www.m3mprojects.net.in/m3m-elie-saab-at-scda/assets/images/main.webp"],
];

const required = ["DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"];
for (const key of required) {
  if (process.env[key] === undefined) throw new Error(`Missing ${key} in .env.local`);
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
  for (let index = 0; index < properties.length; index += 1) {
    const [name, type, builder, location, configuration, price, image] = properties[index];
    const [existingRows] = await db.execute("SELECT id FROM properties WHERE property_name = ? LIMIT 1", [name]);
    const existing = existingRows[0];

    if (existing) {
      await db.execute(
        `UPDATE properties
         SET property_type = ?, builder = ?, location = ?, configuration = ?, price = ?, image_path = ?, status = 'Active', display_order = ?
         WHERE id = ?`,
        [type, builder, location, configuration, price, image, index + 1, existing.id],
      );
    } else {
      await db.execute(
        `INSERT INTO properties
          (property_name, property_type, builder, location, configuration, price, image_path, status, display_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'Active', ?)`,
        [name, type, builder, location, configuration, price, image, index + 1],
      );
    }
  }

  console.log(`Seeded/updated ${properties.length} M3M catalogue properties.`);
  console.log("Thumbnail URLs are project-specific reference images; replace/host them with images you are authorized to use before production.");
} finally {
  await db.end();
}
