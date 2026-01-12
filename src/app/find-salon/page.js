'use client';
import { useState, useMemo } from 'react';
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
  const [mapCenter, setMapCenter] = useState([13.0827, 80.2707]);
  const [mapZoom, setMapZoom] = useState(12);
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const [checkInSalon, setCheckInSalon] = useState(null);

  // Filter salons based on search query
  const filteredSalons = useMemo(() => {
    let filtered = allSalons;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(salon => 
        salon.name.toLowerCase().includes(query) ||
        salon.address.toLowerCase().includes(query) ||
        (salon.phone && salon.phone.includes(query))
      );
    }

    // Open now filter
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
  };

  const handleCheckIn = (salon) => {
    setCheckInSalon(salon);
    setCheckInModalOpen(true);
  };

  const scrollToMap = () => {
    const mapSection = document.querySelector('#mobile-map');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already filtered in useMemo
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Sidebar - Salon List */}
        <div className="w-full lg:w-2/5 xl:w-1/3 bg-white overflow-y-auto border-r border-gray-200">
          {/* Search Bar */}
          <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <form onSubmit={handleSearch}>
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
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Search Results Count */}
            {searchQuery && (
              <div className="mt-2 text-sm text-gray-600">
                Found {filteredSalons.length} salon{filteredSalons.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {/* Sort and Filters */}
          <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-4 mb-4">
              <button className="flex items-center gap-2 text-gray-700 font-medium">
                Sort
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Filter Checkboxes */}
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
                  checked={selectedFilters.recentlyVisited}
                  onChange={() => toggleFilter('recentlyVisited')}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Recently visited</span>
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

          {/* Salon List */}
          <div className="divide-y divide-gray-200">
            {filteredSalons.length === 0 ? (
              <div className="p-8 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No salons found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredSalons.map((salon) => (
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
                    <span className="text-gray-600">• {salon.time}</span>
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
              ))
            )}
          </div>
        </div>

        {/* Desktop Map (right side, full height) */}
        <div className="hidden lg:block flex-1 relative h-screen">
          <MapComponent
            salons={filteredSalons}
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            selectedSalon={selectedSalon}
            setSelectedSalon={setSelectedSalon}
            onCheckIn={handleCheckIn}
          />
        </div>

        {/* Mobile Map (below list, fixed height) */}
        <div id="mobile-map" className="lg:hidden w-full h-[50vh] sm:h-[60vh] relative border-t border-gray-200">
          <div className="absolute inset-0 w-full h-full">
            <MapComponent
              salons={filteredSalons}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              selectedSalon={selectedSalon}
              setSelectedSalon={setSelectedSalon}
              onCheckIn={handleCheckIn}
            />
          </div>
        </div>
      </div>

      {/* Floating Map Button (Mobile Only) */}
      <button 
        onClick={scrollToMap}
        className="lg:hidden fixed bottom-6 right-6 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-2xl hover:bg-emerald-700 transition font-semibold flex items-center gap-2 z-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        Map
      </button>

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
