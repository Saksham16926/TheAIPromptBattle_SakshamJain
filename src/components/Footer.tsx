import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Utensils } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Store } from '../types';

export default function Footer() {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .order('city', { ascending: true });

      if (error) throw error;
      setStores(data || []);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Utensils className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold">QuickBite</span>
            </div>
            <p className="text-gray-400 mb-6">
              Delivering happiness, one meal at a time. Fast, fresh, and delicious food right to your door.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#offers" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Offers
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 000-0000</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">info@quickbite.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">24/7 Available</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers and updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-r-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {stores.length > 0 && (
          <div className="border-t border-gray-800 pt-12 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Store Locations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors"
                >
                  <h4 className="text-lg font-bold mb-3 text-orange-500">
                    {store.name}
                  </h4>
                  <div className="space-y-2 text-gray-400">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                      <div>
                        <p>{store.address}</p>
                        <p>{store.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span>{store.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span>{store.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span>{store.opening_hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 QuickBite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
