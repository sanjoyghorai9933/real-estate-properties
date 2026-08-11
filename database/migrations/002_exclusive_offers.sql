ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS is_exclusive_offer TINYINT(1) NOT NULL DEFAULT 0 AFTER status;

CREATE INDEX IF NOT EXISTS idx_properties_exclusive_status
  ON properties (is_exclusive_offer, status, display_order);
