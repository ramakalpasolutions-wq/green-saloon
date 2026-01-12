'use client';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

if (typeof window !== 'undefined') {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

const createCustomIcon = (waitTime) => {
  const time = parseInt(waitTime);
  let color = '#10B981';
  if (time > 30) color = '#EF4444';
  else if (time > 15) color = '#F59E0B';

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

// User location icon - Simple blue dot like Google Maps
const createUserLocationIcon = () => {
  return L.divIcon({
    html: `
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <!-- Blue dot -->
        <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="white" stroke-width="3" />
      </svg>
    `,
    className: 'user-location-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

function MapController({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [map]);
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 13);
    }
  }, [center, zoom, map]);
  
  return null;
}

export default function MapComponent({ salons, mapCenter, mapZoom, selectedSalon, setSelectedSalon, onCheckIn, userLocation }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading until mounted
  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

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

      {/* User Location - Circle + Blue Dot */}
      {userLocation && (
        <>
          {/* Accuracy Circle */}
          <Circle
            center={userLocation}
            radius={100}
            pathOptions={{
              color: '#4285F4',
              fillColor: '#4285F4',
              fillOpacity: 0.1,
              weight: 1,
              opacity: 0.3
            }}
          />
          
          {/* Blue Dot Marker */}
          <Marker
            position={userLocation}
            icon={createUserLocationIcon()}
            zIndexOffset={1000}
          >
            <Popup>
              <div className="p-2">
                <p className="font-semibold text-blue-600 flex items-center gap-1">
                  <span>📍</span>
                  <span>You are here</span>
                </p>
              </div>
            </Popup>
          </Marker>
        </>
      )}

      {/* Salon Markers */}
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
                onClick={(e) => {
                  e.stopPropagation();
                  if (onCheckIn) {
                    onCheckIn(salon);
                  }
                }}
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
