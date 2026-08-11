import mysql from "mysql2/promise";

const properties = [
  ["M3M Altitude", "Residential", "M3M India", "Sector 65, Gurugram", "4.5 BHK + S · 3712 Sq. Ft. from", "₹6.25 Cr onwards", "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Mansion", "Residential", "M3M India", "Sector 113, Gurgaon", "3.5 & 4.5 BHK Apartments · 2100 Sq. Ft. from", "₹3.74 Cr onwards", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Crown", "Residential", "M3M India", "Sector 111, Gurgaon", "3 BHK & 4 BHK Apartments · 1605 Sq. Ft. from", "₹2.88 Cr onwards", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Golf Hills", "Residential", "M3M India", "Sector 79, Gurgaon", "2.5, 3.5, 3.5 BHK + SR & 4.5 BHK + SR · 1420 Sq. Ft. from", "₹2.6 Cr onwards", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=88"],
  ["M3M St. Andrews Sector 113", "Residential", "M3M India", "Sector 113, Gurugram", "4.5 BHK Luxury Boutique Floors · 2750 Sq. Ft. from", "₹6 Cr onwards", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Soulitude", "Residential", "M3M India", "Sector 89, Gurugram", "2.5 & 3.5 BHK Luxury Floors · 1103 Sq. Ft. from", "₹1.38 Cr onwards", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Broadway", "Commercial", "M3M India", "Sector 71, Gurugram", "Retail, F&B, Office, Gaming Zone & Service Apartments · 500 Sq. Ft. from", "₹50 Lakhs onwards", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=88"],
  ["M3M St. Andrews 65", "Residential", "M3M India", "Sector 65, Gurugram", "4 BHK & 5 BHK Luxury Apartments · 6171–6450 Sq. Ft.", "₹18 Cr onwards", "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Innovation Park", "Commercial", "M3M India", "Sectors 9, 10 & 11, Manesar", "Industrial Plots & Commercial Space · 182.24 Sq. Mt. from", "₹2 Cr onwards", "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Opus", "Residential", "M3M India", "Sector 67, Gurgaon", "3 BHK + Utility · 2400 Sq. Ft. from", "₹5.5 Cr onwards", "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Forestia West", "Residential", "M3M India", "Sectors M9, M10 & M11, Manesar", "3 BHK Apartments · 1905 Sq. Ft. from", "₹2.35 Cr onwards", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Gurgaon International City", "Residential", "M3M India", "Sectors M9, M10 & M11, Manesar", "3 BHK Apartments · 1905 Sq. Ft. from", "₹2.35 Cr onwards", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Golf Estate Sector 65", "Residential", "M3M India", "Sector 65, Gurgaon", "2, 3, 4 & 5 BHK · Area on request", "Price on request", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Antalya Hills Low Rise Floors", "Residential", "M3M India", "Sector 79, Gurgaon", "2.5 & 3.5 BHK · 1150 Sq. Ft. from", "Price on request", "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Jacob & Co Gurgaon", "Residential", "M3M India", "Sector 111, Gurgaon", "4 BHK Residences · Area on request", "Price on request", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Brabus Residences", "Residential", "M3M India", "Sector 58, Gurgaon", "4 & 5 BHK · 5500 Sq. Ft. from", "₹22 Cr approx.", "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=88"],
  ["M3M CFC Sector 113", "Commercial", "M3M India", "Sector 113, Gurgaon", "Office & Retail Space · Area on request", "Price on request", "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=88"],
  ["M3M The Cullinan", "Residential", "M3M India", "Sector 94, Noida", "3, 4 & 5 BHK · 3200 Sq. Ft. from", "₹6.5–12.4 Cr onwards", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=88"],
  ["M3M The Cullinan Avenue", "Commercial", "M3M India", "Sector 94, Noida", "Retail Shops & Commercial Space · 207 Sq. Ft. from", "₹92 Lakhs onwards", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Jewel", "Commercial", "M3M India", "Sector 25, Gurgaon", "Retail Shops & Office Spaces · 400 Sq. Ft. from", "₹2 Cr onwards", "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88"],
  ["M3M Elie Saab Sector 111", "Residential", "M3M India", "Sector 111, Gurgaon", "4 BHK Apartments · 4200 Sq. Ft. from", "₹14 Cr approx.", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=88"],
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
    await db.execute(
      `INSERT INTO properties
        (property_name, property_type, builder, location, configuration, price, image_path, status, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'Active', ?)
       ON DUPLICATE KEY UPDATE
         property_type = VALUES(property_type),
         builder = VALUES(builder),
         location = VALUES(location),
         configuration = VALUES(configuration),
         price = VALUES(price),
         image_path = VALUES(image_path),
         status = 'Active',
         display_order = VALUES(display_order)`,
      [name, type, builder, location, configuration, price, image, index + 1],
    );
  }

  console.log(`Seeded ${properties.length} M3M catalogue properties.`);
  console.log("Note: thumbnail URLs are generic licensed-style placeholders; replace them with images you are authorized to use.");
} finally {
  await db.end();
}
