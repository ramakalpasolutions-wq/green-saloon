'use client';
import { useState } from 'react';

export default function ServicesCarousel() {
  const services = [
    {
      id: 1,
      title: 'Classic Cuts',
      description: 'Timeless styles that never go out of fashion',
      image: '🔄'
    },
    {
      id: 2,
      title: 'Modern Fades',
      description: 'Sharp, clean fades for a contemporary look',
      image: '✂️'
    },
    {
      id: 3,
      title: 'Beard Styling',
      description: 'Professional grooming for the perfect beard',
      image: '💈'
    },
    {
      id: 4,
      title: 'Kids Cuts',
      description: 'Fun and friendly haircuts for children',
      image: '👶'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title - Responsive */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-gray-900 px-2">
          GREEN<span className="text-emerald-600">®</span> haircuts for everyone
        </h2>

        {/* Mobile Carousel (< 640px) */}
        <div className="sm:hidden">
          <div className="bg-gray-50 rounded-xl p-6 text-center shadow-md">
            <div className="text-5xl mb-4">{services[currentIndex].image}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">{services[currentIndex].title}</h3>
            <p className="text-gray-600 text-sm">{services[currentIndex].description}</p>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button 
              onClick={prevSlide}
              className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 active:bg-emerald-800 transition shadow-md"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition ${
                    index === currentIndex ? 'bg-emerald-600 w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextSlide}
              className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 active:bg-emerald-800 transition shadow-md"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tablet: 2 Column Grid (640px - 1024px) */}
        <div className="hidden sm:grid md:hidden grid-cols-2 gap-4 sm:gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-gray-50 rounded-xl p-5 sm:p-6 hover:shadow-lg transition cursor-pointer transform hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{service.image}</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Desktop: 4 Column Grid (> 1024px) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-gray-50 rounded-xl p-6 hover:shadow-xl transition cursor-pointer transform hover:-translate-y-2 duration-300"
            >
              <div className="text-6xl mb-4">{service.image}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
