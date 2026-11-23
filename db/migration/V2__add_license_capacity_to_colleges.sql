-- V2: Add license capacity to colleges

ALTER TABLE colleges
ADD COLUMN license_capacity INTEGER NOT NULL DEFAULT 0;

-- Prevent negative license capacity
ALTER TABLE colleges
ADD CONSTRAINT chk_college_license_capacity CHECK (license_capacity >= 0);