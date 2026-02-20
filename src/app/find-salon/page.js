'use client';
import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import CheckInModal from '@/components/CheckInModal';
import { allSalons } from '@/utils/salonsData';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  )
});

export default function FindSalonPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    favorite: false,
    recentlyVisited: false,
    openNow: false
  });
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [mapCenter, setMapCenter] = useState([13.0827, 80.2707]); // Default Chennai
  const [mapZoom, setMapZoom] = useState(12);
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const [checkInSalon, setCheckInSalon] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(true);

  // Auto-fetch location on component mount
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation not supported');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = [latitude, longitude];
        setUserLocation(newLocation);
        setMapCenter(newLocation);
        setMapZoom(14);
        setIsLocating(false);
      },
      (error) => {
        console.log('Location error:', error.message);
        // Silently fail and use default location
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  // Filter salons based on search query
  const filteredSalons = useMemo(() => {
    let filtered = allSalons;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(salon => 
        salon.name.toLowerCase().includes(query) ||
        salon.address.toLowerCase().includes(query) ||
        (salon.phone && salon.phone.includes(query))
      );
    }

    if (selectedFilters.openNow) {
      filtered = filtered.filter(salon => salon.status === 'Open now');
    }

    return filtered;
  }, [searchQuery, selectedFilters]);

  const toggleFilter = (filter) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const handleSalonClick = (salon) => {
    setMapCenter(salon.coordinates);
    setMapZoom(15);
    setSelectedSalon(salon);
    const mapSection = document.querySelector('#mobile-map-top');
    if (mapSection && window.innerWidth < 1024) {
      mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCheckIn = (salon) => {
    setCheckInSalon(salon);
    setCheckInModalOpen(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-gray-50">
        {/* Search Bar - Fixed */}
        <div className="sticky top-0 z-20 bg-white text-black border-b border-gray-200 shadow-sm">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search salons or services"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div id="mobile-map-top" className="w-full h-[45vh] relative">
          {isLocating && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg z-10 flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-sm text-gray-700">Finding your location...</span>
            </div>
          )}
          
          <MapComponent
            salons={filteredSalons}
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            selectedSalon={selectedSalon}
            setSelectedSalon={setSelectedSalon}
            onCheckIn={handleCheckIn}
            userLocation={userLocation}
          />
        </div>

        {/* Nearby Salons Section */}
        <div className="px-4 py-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Salons</h2>

          {/* Salon Cards */}
          <div className="space-y-3">
            {filteredSalons.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-600">No salons found</p>
              </div>
            ) : (
              filteredSalons.map((salon) => (
                <div
                  key={salon.id}
                  onClick={() => handleSalonClick(salon)}
                  className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer overflow-hidden ${
                    selectedSalon?.id === salon.id ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-gray-200'
                  }`}
                >
                  <div className="p-4">
                    {/* Header with Name and Favorite */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 text-base pr-2">
                        {salon.name}
                      </h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="flex-shrink-0 text-gray-400 hover:text-red-500 transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    {/* Address */}
                    <p className="text-sm text-gray-600 mb-3">{salon.address}</p>

                    {/* Categories */}
                    {salon.category && salon.category.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                        <span>{salon.category[0]}</span>
                        {salon.category[1] && (
                          <>
                            <span>•</span>
                            <span>{salon.category[1]}</span>
                          </>
                        )}
                      </div>
                    )}
                    
                    {/* Info Row - Status, Wait Time, Distance */}
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className={`text-xs font-semibold ${
                        salon.status === 'Open now' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {salon.status}
                      </span>
                      
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        parseInt(salon.waitTime) <= 15 
                          ? 'bg-green-100 text-green-700' 
                          : parseInt(salon.waitTime) <= 30
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {salon.waitTime} Min Wait
                      </span>

                      <span className="text-gray-500 text-xs">{salon.distance}</span>
                    </div>

                    {/* Check In Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckIn(salon);
                      }}
                      className="w-full bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 transition font-semibold text-sm"
                    >
                      Check In
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-20"></div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Sidebar */}
        <div className="w-2/5 xl:w-1/3 bg-white text-black overflow-y-auto border-r border-gray-200">
          {/* Search Bar */}
          <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, location, or phone..."
                className="w-full px-4 py-3 pr-24 border-2 border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Location Status */}
            {isLocating && (
              <div className="mt-3 text-sm text-emerald-600 flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Finding your location...
              </div>
            )}

            {searchQuery && (
              <div className="mt-2 text-sm text-gray-600">
                Found {filteredSalons.length} salon{filteredSalons.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.favorite}
                  onChange={() => toggleFilter('favorite')}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Favorite</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.openNow}
                  onChange={() => toggleFilter('openNow')}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Open now</span>
              </label>
            </div>
          </div>

          {/* Desktop Salon List */}
          <div className="divide-y divide-gray-200">
            {filteredSalons.map((salon) => (
              <div
                key={salon.id}
                className={`p-4 sm:p-6 hover:bg-gray-50 transition cursor-pointer ${
                  selectedSalon?.id === salon.id ? 'bg-emerald-50 border-l-4 border-emerald-600' : ''
                }`}
                onClick={() => handleSalonClick(salon)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{salon.name}</h3>
                  <button className="text-gray-400 hover:text-emerald-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-3">{salon.address}</p>

                <div className="flex items-center gap-4 text-sm mb-4">
                  <span className={`font-semibold ${salon.status === 'Open now' ? 'text-green-600' : 'text-orange-600'}`}>
                    {salon.status}
                  </span>
                  <span className="text-gray-600">• {salon.waitTime} min wait</span>
                  <span className="text-gray-600">• {salon.distance}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckIn(salon);
                  }}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-semibold"
                >
                  Check In
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Map */}
        <div className="flex-1 relative h-screen">
          <MapComponent
            salons={filteredSalons}
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            selectedSalon={selectedSalon}
            setSelectedSalon={setSelectedSalon}
            onCheckIn={handleCheckIn}
            userLocation={userLocation}
          />
        </div>
      </div>

      {/* Check-In Modal */}
      <CheckInModal
        salon={checkInSalon}
        isOpen={checkInModalOpen}
        onClose={() => {
          setCheckInModalOpen(false);
          setCheckInSalon(null);
        }}
      />
    </>
  );
}
