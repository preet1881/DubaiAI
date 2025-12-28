-- Migration: Create Normalized Database Schema
-- This replaces the single JSONB blob with normalized tables

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Journeys Table
CREATE TABLE IF NOT EXISTS journeys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(category_id, name)
);

-- 3. Stages Table
CREATE TABLE IF NOT EXISTS stages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  journey_id UUID REFERENCES journeys(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not-started',
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  eta DATE,
  actual DATE,
  notes TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(journey_id, name)
);

-- 4. Dependencies Table
CREATE TABLE IF NOT EXISTS dependencies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  journey_id UUID REFERENCES journeys(id) ON DELETE CASCADE,
  item TEXT NOT NULL,
  depends_on TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_journeys_category_id ON journeys(category_id);
CREATE INDEX IF NOT EXISTS idx_stages_journey_id ON stages(journey_id);
CREATE INDEX IF NOT EXISTS idx_dependencies_journey_id ON dependencies(journey_id);
CREATE INDEX IF NOT EXISTS idx_stages_display_order ON stages(display_order);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE dependencies ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Public read/write for now - adjust based on auth needs)
CREATE POLICY "Enable read access for all users" ON categories FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON categories FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON categories FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON journeys FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON journeys FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON journeys FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON journeys FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON stages FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON stages FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON stages FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON stages FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON dependencies FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON dependencies FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON dependencies FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON dependencies FOR DELETE USING (true);

-- Insert default categories
INSERT INTO categories (name, display_order) VALUES
  ('City Service', 1),
  ('Search', 2),
  ('Events', 3),
  ('Booking', 4)
ON CONFLICT (name) DO NOTHING;

