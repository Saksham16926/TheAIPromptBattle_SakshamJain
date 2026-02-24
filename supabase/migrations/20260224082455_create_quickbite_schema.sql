/*
  # QuickBite Food Delivery Schema

  1. New Tables
    - `menu_items`
      - `id` (uuid, primary key)
      - `name` (text) - Name of the food item
      - `description` (text) - Description of the dish
      - `price` (numeric) - Price of the item
      - `image_url` (text) - URL to food image
      - `category` (text) - Category (e.g., Pizza, Burger, Dessert)
      - `is_top_pick` (boolean) - Whether item is featured as top pick
      - `created_at` (timestamp)
    
    - `offers`
      - `id` (uuid, primary key)
      - `title` (text) - Offer title
      - `description` (text) - Offer description
      - `discount_percentage` (integer) - Discount amount
      - `valid_until` (date) - Expiry date
      - `is_active` (boolean) - Whether offer is currently active
      - `created_at` (timestamp)
    
    - `stores`
      - `id` (uuid, primary key)
      - `name` (text) - Store name
      - `address` (text) - Full address
      - `city` (text) - City name
      - `phone` (text) - Contact phone
      - `email` (text) - Contact email
      - `opening_hours` (text) - Operating hours
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add public read policies (data is publicly viewable for browsing)
*/

-- Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10, 2) NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  is_top_pick boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view menu items"
  ON menu_items FOR SELECT
  TO anon, authenticated
  USING (true);

-- Offers Table
CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  discount_percentage integer NOT NULL,
  valid_until date NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active offers"
  ON offers FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Stores Table
CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  opening_hours text DEFAULT '9:00 AM - 10:00 PM',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view stores"
  ON stores FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert sample data
INSERT INTO menu_items (name, description, price, image_url, category, is_top_pick) VALUES
  ('Margherita Pizza', 'Classic pizza with fresh mozzarella, tomatoes, and basil', 12.99, 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=800', 'Pizza', true),
  ('Chicken Burger', 'Grilled chicken with lettuce, tomato, and special sauce', 9.99, 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800', 'Burger', true),
  ('Caesar Salad', 'Fresh romaine lettuce with parmesan and croutons', 8.99, 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=800', 'Salad', false),
  ('Pepperoni Pizza', 'Loaded with pepperoni and melted cheese', 14.99, 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=800', 'Pizza', true),
  ('Chocolate Cake', 'Rich chocolate cake with ganache frosting', 6.99, 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800', 'Dessert', true),
  ('Veggie Wrap', 'Fresh vegetables wrapped in a soft tortilla', 7.99, 'https://images.pexels.com/photos/1209029/pexels-photo-1209029.jpeg?auto=compress&cs=tinysrgb&w=800', 'Wrap', false);

INSERT INTO offers (title, description, discount_percentage, valid_until, is_active) VALUES
  ('Weekend Special', 'Get 25% off on all orders above $30', 25, '2026-12-31', true),
  ('First Order Discount', 'New customers get 30% off on their first order', 30, '2026-12-31', true),
  ('Family Feast', 'Order for 4 or more and save 20%', 20, '2026-12-31', true),
  ('Lunch Deal', 'Special lunch combo with 15% discount', 15, '2026-12-31', true);

INSERT INTO stores (name, address, city, phone, email) VALUES
  ('QuickBite Downtown', '123 Main Street, Suite 100', 'New York', '+1 (555) 123-4567', 'downtown@quickbite.com'),
  ('QuickBite Westside', '456 West Avenue, Building B', 'Los Angeles', '+1 (555) 234-5678', 'westside@quickbite.com'),
  ('QuickBite Central', '789 Central Plaza, Floor 2', 'Chicago', '+1 (555) 345-6789', 'central@quickbite.com');