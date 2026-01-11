'use client';
import { useState } from 'react';

export default function LocationsPage() {
  const locations = [
    {
      name: "Green Saloon - Brodipet",
      address: "Shop 12, Brodipet Main Road, Guntur, Andhra Pradesh 522002",
      phone: "+91 9876543210",
      hours: "Mon-Sat: 9:00 AM - 9:00 PM, Sun: 10:00 AM - 8:00 PM",
      mapUrl: "https://maps.google.com",
      features: ["WiFi", "AC", "Parking", "Card Payment"]
    },
    {
      name: "Green Saloon - Lakshmipuram",
      address: "Plot 45, Lakshmipuram Circle, Guntur, Andhra Pradesh 522007",
      phone: "+91 9876543211",
      hours: "Mon-Sat: 9:00 AM - 9:00 PM, Sun: 10:00 AM - 8:00 PM",
      mapUrl: "https://maps.google.com",
      features: ["WiFi", "AC", "Valet Parking", "Card Payment"]
    },
    {
      name: "Green Saloon - Arundelpet",
      address: "Near Bus Stand, Arundelpet, Guntur, Andhra Pradesh 522004",
      phone: "+91 9876543212",
      hours: "Mon-Sat: 9:00 AM - 9:00 PM, Sun: Closed",
      mapUrl: "https://maps.google.com",
      features: ["WiFi", "AC", "Card Payment"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Our Locations
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto">
            Find a Green Saloon near you in Guntur
          </p>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8 sm:mb-12">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by area, pincode, or landmark..."
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-base sm:text-lg"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-emerald-700 transition text-sm sm:text-base font-semibold">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Mobile: Stack Cards, Desktop: List View */}
          <div className="space-y-6">
            {locations.map((location, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <div className="p-5 sm:p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6">
                    {/* Location Info */}
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                        {location.name}
                      </h2>
                      
                      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                        <div className="flex items-start text-gray-600">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm sm:text-base">{location.address}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href={`tel:${location.phone}`} className="text-sm sm:text-base hover:text-emerald-600">
                            {location.phone}
                          </a>
                        </div>
                        
                        <div className="flex items-start text-gray-600">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm sm:text-base">{location.hours}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {location.features.map((feature, i) => (
                          <span 
                            key={i}
                            className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
                      <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition font-semibold text-sm sm:text-base shadow-md w-full">
                        Book Now
                      </button>
                      <a 
                        href={location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition font-semibold text-sm sm:text-base text-center w-full"
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
            Can't find a location near you?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            We're expanding! Request a new Green Saloon in your area
          </p>
          <button className="bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-emerald-700 transition font-semibold text-base sm:text-lg shadow-lg">
            Request New Location
          </button>
        </div>
      </section>
    </div>
  );
}
