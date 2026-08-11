-- One-time seed for the three requested M3M projects.
-- Run this in the realestate database after the is_exclusive_offer column exists.
-- The records are intentionally NOT marked as Exclusive Offers. Select them from Admin > Properties.

INSERT INTO properties
  (property_name, property_type, builder, location, configuration, price, image_path, status, is_exclusive_offer, display_order)
SELECT
  'M3M Capital',
  'Residential',
  'M3M India',
  'Sector 113, Gurugram',
  '2.5, 3, 3.5, 4 & 4.5 BHK Apartments',
  '₹2.08 Cr onwards',
  NULL,
  'Active',
  0,
  90
WHERE NOT EXISTS (
  SELECT 1 FROM properties WHERE property_name = 'M3M Capital'
);

INSERT INTO properties
  (property_name, property_type, builder, location, configuration, price, image_path, status, is_exclusive_offer, display_order)
SELECT
  'M3M IFC',
  'Commercial',
  'M3M India',
  'Sector 66, Gurugram',
  'Retail & Office Spaces',
  'Price on request',
  NULL,
  'Active',
  0,
  91
WHERE NOT EXISTS (
  SELECT 1 FROM properties WHERE property_name = 'M3M IFC'
);

INSERT INTO properties
  (property_name, property_type, builder, location, configuration, price, image_path, status, is_exclusive_offer, display_order)
SELECT
  'M3M Paragon 57',
  'Commercial',
  'M3M India',
  'Sector 57, Gurugram',
  'Retail, Food Court, Office & Commercial Spaces',
  '₹1.25 Cr onwards',
  NULL,
  'Active',
  0,
  92
WHERE NOT EXISTS (
  SELECT 1 FROM properties WHERE property_name = 'M3M Paragon 57'
);
