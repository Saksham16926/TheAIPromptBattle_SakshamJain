/*
  # Update QuickBite to use INR currency and Indian store locations

  1. Changes
    - Delete existing menu items with USD prices
    - Delete existing stores with US locations
    - Insert new menu items with INR prices
    - Insert new Indian store locations
*/

DELETE FROM menu_items;
DELETE FROM offers;
DELETE FROM stores;

INSERT INTO menu_items (name, description, price, image_url, category, is_top_pick) VALUES
  ('Margherita Pizza', 'Classic pizza with fresh mozzarella, tomatoes, and basil', 299, 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=800', 'Pizza', true),
  ('Chicken Butter Masala', 'Tender chicken in creamy tomato-based sauce with aromatic spices', 349, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800', 'Curry', true),
  ('Tandoori Chicken', 'Grilled chicken marinated in yogurt and traditional Indian spices', 329, 'https://images.pexels.com/photos/1580822/pexels-photo-1580822.jpeg?auto=compress&cs=tinysrgb&w=800', 'Grilled', true),
  ('Paneer Tikka', 'Cottage cheese cubes grilled with peppers and onions', 249, 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=800', 'Appetizer', false),
  ('Biryani Special', 'Fragrant basmati rice cooked with meat, herbs, and spices', 399, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800', 'Rice', true),
  ('Samosa', 'Crispy pastry filled with spiced potatoes and peas', 89, 'https://images.pexels.com/photos/3621621/pexels-photo-3621621.jpeg?auto=compress&cs=tinysrgb&w=800', 'Appetizer', false),
  ('Garlic Naan', 'Soft flatbread brushed with garlic and butter', 79, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800', 'Bread', false),
  ('Gulab Jamun', 'Sweet milk solid dumplings in cardamom-flavored sugar syrup', 129, 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800', 'Dessert', true),
  ('Masala Dosa', 'Crispy rice and lentil crepe filled with spiced potatoes', 199, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800', 'South Indian', false),
  ('Chocolate Cake', 'Rich chocolate cake with ganache frosting', 189, 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800', 'Dessert', false);

INSERT INTO offers (title, description, discount_percentage, valid_until, is_active) VALUES
  ('Festival Special', 'Get 25% off on all orders above 500', 25, '2026-12-31', true),
  ('First Order Discount', 'New customers get 30% off on their first order', 30, '2026-12-31', true),
  ('Family Feast', 'Order for 4 or more and save 20%', 20, '2026-12-31', true),
  ('Lunch Deal', 'Special lunch combo with 15% discount', 15, '2026-12-31', true);

INSERT INTO stores (name, address, city, phone, email) VALUES
  ('QuickBite Mumbai Central', '123 Marine Drive, Colaba', 'Mumbai', '+91 (22) 4062-1234', 'mumbai.central@quickbite.com'),
  ('QuickBite Delhi Connaught', '456 Connaught Place, Central Delhi', 'New Delhi', '+91 (11) 4151-5678', 'delhi.connaught@quickbite.com'),
  ('QuickBite Bangalore Indiranagar', '789 100 Feet Road, Indiranagar', 'Bangalore', '+91 (80) 2551-6789', 'bangalore.indiranagar@quickbite.com'),
  ('QuickBite Hyderabad Banjara Hills', '321 Road No. 1, Banjara Hills', 'Hyderabad', '+91 (40) 6666-0123', 'hyderabad.banjara@quickbite.com'),
  ('QuickBite Kolkata Park Street', '654 Park Street, Central Kolkata', 'Kolkata', '+91 (33) 4009-4567', 'kolkata.park@quickbite.com'),
  ('QuickBite Chennai MG Road', '987 Mount Road, Guindy', 'Chennai', '+91 (44) 4200-8910', 'chennai.mg@quickbite.com');