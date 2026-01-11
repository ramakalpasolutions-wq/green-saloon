'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
if (typeof window !== 'undefined') {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

// Custom marker icons based on wait time
const createCustomIcon = (waitTime) => {
  const time = parseInt(waitTime);
  let color = '#10B981'; // green
  if (time > 30) color = '#EF4444'; // red
  else if (time > 15) color = '#F59E0B'; // orange

  const svgIcon = `
    <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0C12.28 0 6 6.28 6 14c0 10.5 14 26 14 26s14-15.5 14-26c0-7.72-6.28-14-14-14z" 
            fill="${color}" stroke="#fff" stroke-width="2"/>
      <circle cx="20" cy="14" r="6" fill="#fff"/>
      <text x="20" y="18" text-anchor="middle" font-size="10" font-weight="bold" fill="${color}">
        ${waitTime}
      </text>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: 'custom-marker',
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50]
  });
};

// Component to handle map updates
function MapController({ center, zoom }) {
  const map = useMap();
  
  if (center) {
    map.setView(center, zoom || 13);
  }
  
  return null;
}

export default function MapComponent({ salons, mapCenter, mapZoom, selectedSalon, setSelectedSalon }) {
  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapController center={mapCenter} zoom={mapZoom} />

      {/* Markers for each salon */}
      {salons.map((salon) => (
        <Marker
          key={salon.id}
          position={salon.coordinates}
          icon={createCustomIcon(salon.waitTime)}
          eventHandlers={{
            click: () => setSelectedSalon(salon)
          }}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-gray-900 mb-1 text-sm">{salon.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{salon.address}</p>
              <div className="flex items-center gap-2 mb-3 text-xs">
                <span className={`font-semibold ${
                  salon.status === 'Open now' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {salon.status}
                </span>
                <span className="text-gray-500">• Wait: {salon.waitTime} min</span>
              </div>
              <button 
                className="w-full bg-emerald-600 text-white py-2 px-3 rounded text-xs font-semibold hover:bg-emerald-700"
                onClick={() => console.log('Check in to:', salon.name)}
              >
                Check In
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
