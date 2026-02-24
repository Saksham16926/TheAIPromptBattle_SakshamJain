export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_top_pick: boolean;
  created_at: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount_percentage: number;
  valid_until: string;
  is_active: boolean;
  created_at: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  opening_hours: string;
  created_at: string;
}
