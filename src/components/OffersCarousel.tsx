import { useEffect, useState } from 'react';
import { Tag, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Offer } from '../types';

export default function OffersCarousel() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    if (offers.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % offers.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [offers.length]);

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  if (loading || offers.length === 0) {
    return null;
  }

  return (
    <section id="offers" className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Special Offers
          </h2>
          <p className="text-xl text-gray-600">
            Don't miss out on our amazing deals
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {offers.map((offer) => (
                <div key={offer.id} className="w-full flex-shrink-0">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-32 -mb-32"></div>

                    <div className="relative z-10 max-w-3xl">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="bg-white bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
                          <Tag className="w-8 h-8" />
                        </div>
                        <div className="bg-white text-orange-500 px-4 py-2 rounded-full font-bold text-2xl">
                          {offer.discount_percentage}% OFF
                        </div>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold mb-4">
                        {offer.title}
                      </h3>
                      <p className="text-xl text-white text-opacity-90 mb-6">
                        {offer.description}
                      </p>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <button className="bg-white text-orange-500 hover:bg-opacity-90 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                          Claim Offer
                        </button>
                        <div className="flex items-center space-x-2 text-white text-opacity-90">
                          <Clock className="w-5 h-5" />
                          <span>Valid until {new Date(offer.valid_until).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {offers.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all transform hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all transform hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              <div className="flex justify-center mt-6 space-x-2">
                {offers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-orange-500'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
