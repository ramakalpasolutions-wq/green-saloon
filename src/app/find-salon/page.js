'use client';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import CheckInModal from '@/components/CheckInModal';

// Dynamically import the map component with no SSR
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
  const [searchQuery, setSearchQuery] = useState('Chennai');
  const [selectedFilters, setSelectedFilters] = useState({
    favorite: false,
    recentlyVisited: false,
    openNow: false
  });
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [mapCenter, setMapCenter] = useState([13.0827, 80.2707]); // Chennai
  const [mapZoom, setMapZoom] = useState(12);
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const [checkInSalon, setCheckInSalon] = useState(null);

  const salons = useMemo(() => [
    {
      id: 1,
      name: 'B B Traders',
      owner: 'Bhag Chand Jain',
      phone: '+91 9460637437',
      address: 'Kishangarh Harmada Road Madanganj, Ajmer, Rajasthan 305801',
      status: 'Open now',
      time: 'Opens 9 AM',
      distance: '1.2 mi',
      waitTime: '15',
      coordinates: [26.1445, 75.6132],
      category: ['Beauty & Hair Products', 'Face Products']
    },
    {
      id: 2,
      name: 'Green Saloon T Nagar',
      owner: 'Ramesh Kumar',
      phone: '+91 9876543210',
      address: '123 Usman Road, T Nagar, Chennai, Tamil Nadu 600017',
      status: 'Open now',
      time: 'Opens 9 AM',
      distance: '0.8 mi',
      waitTime: '10',
      coordinates: [13.0418, 80.2341],
      category: ['Premium Haircuts', 'Beard Styling', 'Hair Color']
    },
    {
      id: 3,
      name: 'Chennai Style Studio',
      owner: 'Vijay Prakash',
      phone: '+91 9876543211',
      address: '45 Anna Salai, Mount Road, Chennai, Tamil Nadu 600002',
      status: 'Open now',
      time: 'Opens 8:30 AM',
      distance: '1.5 mi',
      waitTime: '20',
      coordinates: [13.0569, 80.2506],
      category: ['Classic Cuts', 'Spa Services', 'Facial']
    },
    {
      id: 4,
      name: 'Adyar Premium Grooming',
      owner: 'Suresh Babu',
      phone: '+91 9876543212',
      address: '78 TTK Road, Alwarpet, Chennai, Tamil Nadu 600018',
      status: 'Open now',
      time: 'Opens 9 AM',
      distance: '2.1 mi',
      waitTime: '25',
      coordinates: [13.0339, 80.2547],
      category: ['Premium Cuts', 'Beard Design', 'Hair Spa']
    },
    {
      id: 5,
      name: 'Velachery Green Cuts',
      owner: 'Karthik Raj',
      phone: '+91 9876543213',
      address: '234 Velachery Main Road, Chennai, Tamil Nadu 600042',
      status: 'Open now',
      time: 'Opens 9 AM',
      distance: '3.5 mi',
      waitTime: '15',
      coordinates: [12.975, 80.2167],
      category: ['Haircuts', 'Shaving', 'Kids Cuts']
    },
    {
      id: 6,
      name: 'Besant Nagar Beach Salon',
      owner: 'Arun Kumar',
      phone: '+91 9876543214',
      address: '67 Besant Avenue Road, Besant Nagar, Chennai, Tamil Nadu 600090',
      status: 'Open now',
      time: 'Opens 10 AM',
      distance: '2.8 mi',
      waitTime: '30',
      coordinates: [12.9986, 80.2671],
      category: ['Beach Cuts', 'Styling', 'Hair Treatment']
    },
    {
      id: 7,
      name: 'Porur Express Salon',
      owner: 'Murali Krishna',
      phone: '+91 9876543215',
      address: '456 Mount Poonamallee Road, Porur, Chennai, Tamil Nadu 600116',
      status: 'Open now',
      time: 'Opens 9 AM',
      distance: '4.2 mi',
      waitTime: '35',
      coordinates: [13.0358, 80.1578],
      category: ['Quick Cuts', 'Beard Trim', 'Hair Color']
    },
    {
      id: 8,
      name: 'OMR Tech Park Grooming',
      owner: 'Senthil Kumar',
      phone: '+91 9876543216',
      address: '89 Old Mahabalipuram Road, Sholinganallur, Chennai, Tamil Nadu 600119',
      status: 'Open now',
      time: 'Opens 8 AM',
      distance: '5.0 mi',
      waitTime: '18',
      coordinates: [12.9008, 80.2208],
      category: ['Professional Cuts', 'Corporate Styling', 'Quick Service']
    },
    {
      id: 9,
      name: 'Mylapore Traditional Salon',
      owner: 'Rajendran',
      phone: '+91 9876543217',
      address: '23 Luz Church Road, Mylapore, Chennai, Tamil Nadu 600004',
      status: 'Open now',
      time: 'Opens 9 AM',
      distance: '1.9 mi',
      waitTime: '22',
      coordinates: [13.0339, 80.2619],
      category: ['Traditional Cuts', 'Head Massage', 'Shaving']
    },
    {
      id: 10,
      name: 'Nungambakkam Elite Salon',
      owner: 'Prakash Reddy',
      phone: '+91 9876543218',
      address: '12 Khader Nawaz Khan Road, Nungambakkam, Chennai, Tamil Nadu 600006',
      status: 'Opens soon',
      time: 'Opens 10 AM',
      distance: '1.3 mi',
      waitTime: '28',
      coordinates: [13.0569, 80.2425],
      category: ['Elite Styling', 'Premium Services', 'VIP Lounge']
    },
    {
      id: 11,
      name: 'Banjara Hills Salon',
      address: 'Road No. 12, Banjara Hills, Hyderabad, Telangana 500034',
      status: 'Open now',
      time: 'Opens 9 AM',
      distance: '2.5 mi',
      waitTime: '35',
      coordinates: [17.4239, 78.4438]
    },
    {
      id: 12,
      name: 'Jubilee Hills Premium',
      address: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
      status: 'Opens soon',
      time: 'Opens 10 AM',
      distance: '3.2 mi',
      waitTime: '25',
      coordinates: [17.4326, 78.4071]
    },
    {
      id: 13,
      name: 'Madhapur Green Saloon',
      address: 'HITEC City, Madhapur, Hyderabad, Telangana 500081',
      status: 'Open now',
      time: 'Opens 8 AM',
      distance: '4.1 mi',
      waitTime: '15',
      coordinates: [17.4485, 78.3908]
    },
    {
      id: 14,
      name: 'Gachibowli Branch',
      address: 'DLF Cyber City, Gachibowli, Hyderabad, Telangana 500032',
      status: 'Open now',
      time: 'Opens 9 AM',
      distance: '5.0 mi',
      waitTime: '45',
      coordinates: [17.4403, 78.3489]
    },
    {
      id: 15,
      name: 'Kukatpally Salon',
      address: 'KPHB Colony, Kukatpally, Hyderabad, Telangana 500072',
      status: 'Open now',
      time: 'Opens 9 AM',
      distance: '1.8 mi',
      waitTime: '5',
      coordinates: [17.495, 78.3975]
    }
  ], []);

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

  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Sidebar - Salon List */}
        <div className="w-full lg:w-2/5 xl:w-1/3 bg-white overflow-y-auto border-r border-gray-200">
          {/* Search Bar */}
          <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search location..."
                className="w-full px-4 py-3 pr-12 border-2 border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
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
            {salons.map((salon) => (
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
            ))}
          </div>
        </div>

        {/* Desktop Map (right side, full height) */}
        <div className="hidden lg:block flex-1 relative h-screen">
          <MapComponent
            salons={salons}
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            selectedSalon={selectedSalon}
            setSelectedSalon={setSelectedSalon}
            onCheckIn={handleCheckIn}
          />
        </div>

        {/* Mobile Map (below list, fixed height) */}
        <div className="lg:hidden w-full h-64 border-t border-gray-200">
          <MapComponent
            salons={salons}
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            selectedSalon={selectedSalon}
            setSelectedSalon={setSelectedSalon}
            onCheckIn={handleCheckIn}
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
