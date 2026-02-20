'use client';
import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function BookingStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentWaitTime, setCurrentWaitTime] = useState(0);
  const [currentQueuePosition, setCurrentQueuePosition] = useState(0);
  const [bookingData, setBookingData] = useState(null);
  const [checkedInTime, setCheckedInTime] = useState(''); // Add this state
  
  // Use ref to store initial values that shouldn't change
  const initialDataRef = useRef({
    loaded: false,
    waitTime: 0,
    queueNumber: 0
  });

  const bookingId = searchParams.get('id') || 'GS' + Date.now().toString().slice(-6);
  const salonName = searchParams.get('salon') || 'Great Cuts T Nagar';

  // Load booking from localStorage
  // Load booking from localStorage
const loadBookingFromStorage = () => {
  if (typeof window !== 'undefined') {
    const bookings = localStorage.getItem('green_saloon_bookings');
    console.log('📦 Raw localStorage:', bookings);
    
    if (bookings) {
      const allBookings = JSON.parse(bookings);
      console.log('📋 All bookings:', allBookings);
      
      const booking = allBookings.find(b => b.id === bookingId);
      console.log('🎯 Found booking:', booking);
      
      if (booking) {
        setBookingData(booking);
        return {
          queueNumber: booking.queueNumber,
          waitTime: parseInt(booking.waitTime) || 15
        };
      }
    }
  }
  
  // Fallback to URL params
  const urlWaitTime = parseInt(searchParams.get('waitTime'));
  const urlQueue = parseInt(searchParams.get('queue')) || Math.floor(Math.random() * 20) + 1;
  
  console.log('🔗 Fallback to URL params:', { urlWaitTime, urlQueue });
  
  return {
    queueNumber: urlQueue,
    waitTime: urlWaitTime || (urlQueue * 5)
  };
};


  // Calculate wait time based on queue position
  const calculateWaitTime = (queuePosition) => {
    const avgServiceTime = 5;
    return Math.max(0, Math.round((queuePosition - 1) * avgServiceTime));
  };

  useEffect(() => {
    // Set checked-in time on client side only
    setCheckedInTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    
    // Only load initial data once
    if (!initialDataRef.current.loaded) {
      const bookingInfo = loadBookingFromStorage();
      initialDataRef.current = {
        loaded: true,
        waitTime: bookingInfo.waitTime,
        queueNumber: bookingInfo.queueNumber
      };
      
      setCurrentQueuePosition(bookingInfo.queueNumber);
      setCurrentWaitTime(bookingInfo.waitTime);
    }

    const handleStorageChange = () => {
      const newBookingInfo = loadBookingFromStorage();
      if (newBookingInfo.queueNumber !== Math.ceil(currentQueuePosition)) {
        setCurrentQueuePosition(newBookingInfo.queueNumber);
        setCurrentWaitTime(newBookingInfo.waitTime);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const storageCheckInterval = setInterval(() => {
      const newBookingInfo = loadBookingFromStorage();
      if (newBookingInfo.queueNumber !== Math.ceil(currentQueuePosition)) {
        setCurrentQueuePosition(newBookingInfo.queueNumber);
        setCurrentWaitTime(newBookingInfo.waitTime);
      }
    }, 2000);

    // Countdown timer
    const queueMoveInterval = 300; // 5 minutes = 300 seconds
    const updateFrequency = 1; // Update every 1 second

    const timer = setInterval(() => {
      setCurrentQueuePosition(prev => {
        const decrementAmount = updateFrequency / queueMoveInterval;
        const newPosition = Math.max(1, prev - decrementAmount);
        
        // Calculate new wait time based on queue movement
        const newWaitTime = calculateWaitTime(Math.ceil(newPosition));
        setCurrentWaitTime(newWaitTime);
        
        if (newPosition <= 1) {
          clearInterval(timer);
          return 1;
        }
        
        return newPosition;
      });
    }, updateFrequency * 1000);

    return () => {
      clearInterval(timer);
      clearInterval(storageCheckInterval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [bookingId]);

  const displayQueueNumber = Math.ceil(currentQueuePosition);

  const getStatusColor = () => {
    if (displayQueueNumber <= 3) return 'bg-red-500';
    if (displayQueueNumber <= 10) return 'bg-orange-500';
    return 'bg-emerald-500';
  };

  const getStatusText = () => {
    if (displayQueueNumber === 1) return 'Your turn! Please proceed to the salon';
    if (displayQueueNumber <= 3) return 'Almost your turn! Get ready';
    if (displayQueueNumber <= 10) return 'You\'re in the queue';
    return 'Please wait, your turn is coming';
  };

  const getWaitTimeColor = () => {
    if (currentWaitTime <= 5) return {
      bg: 'bg-green-500',
      ring: 'ring-green-200',
      text: 'text-green-500'
    };
    if (currentWaitTime <= 15) return {
      bg: 'bg-orange-500',
      ring: 'ring-orange-200',
      text: 'text-orange-500'
    };
    return {
      bg: 'bg-red-500',
      ring: 'ring-red-200',
      text: 'text-red-500'
    };
  };

  const waitTimeColors = getWaitTimeColor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
            <svg className="w-16 h-16 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600 text-lg">
            You're all set. We'll notify you when it's your turn.
          </p>
        </div>

        {/* Main Status Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
          {/* Status Banner */}
          <div className={`${getStatusColor()} text-white py-4 px-6 text-center transition-colors duration-500`}>
            <p className="font-semibold text-lg">{getStatusText()}</p>
          </div>

          {/* Wait Time Circle */}
          <div className="py-12 text-center border-b border-gray-200">
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-4">Estimated Wait Time</p>
            
            <div className="flex justify-center mb-4">
              <div className={`relative inline-flex items-center justify-center w-48 h-48 rounded-full ${waitTimeColors.bg} ring-8 ${waitTimeColors.ring} shadow-lg transition-all duration-500`}>
                <div className="text-center">
                  {currentWaitTime < 60 ? (
                    <>
                      <div className="text-6xl font-bold text-white mb-1 transition-all duration-300">
                        {Math.round(currentWaitTime)}
                      </div>
                      <div className="text-xl text-white font-medium">
                        minutes
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-5xl font-bold text-white mb-1 transition-all duration-300">
                        {Math.floor(currentWaitTime / 60)}h {Math.round(currentWaitTime % 60)}m
                      </div>
                      <div className="text-sm text-white font-medium">
                        {Math.round(currentWaitTime)} minutes
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-emerald-600">
              <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Auto-updating in real-time</span>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              ~5 min per person • Based on current queue
            </div>
          </div>

          {/* Queue Status */}
          <div className="py-8 px-6 bg-gray-50 text-center border-b border-gray-200">
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-3">Your Position in Queue</p>
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="text-center">
                <div className="text-5xl font-bold text-emerald-600 mb-1 transition-all duration-300">
                  #{displayQueueNumber.toString().padStart(2, '0')}
                </div>
                <p className="text-xs text-gray-500 uppercase">Your Position</p>
              </div>
              
              <div className="h-12 w-px bg-gray-300"></div>
              
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-700 mb-1 transition-all duration-300">
                  {Math.max(0, displayQueueNumber - 1)}
                </div>
                <p className="text-xs text-gray-500 uppercase">Ahead of You</p>
              </div>
            </div>

            {/* Visual Queue Progress */}
            <div className="mt-4 px-8">
              <div className="relative w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                <div 
                  className={`absolute left-0 top-0 h-full ${getStatusColor()} transition-all duration-1000`}
                  style={{ width: `${Math.max(5, Math.min(100, ((initialDataRef.current.queueNumber - currentQueuePosition + 1) / initialDataRef.current.queueNumber) * 100))}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Start: #{initialDataRef.current.queueNumber}</span>
                <span>Current: #{displayQueueNumber}</span>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Salon</p>
                <p className="font-semibold text-gray-900">{salonName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Booking ID</p>
                <p className="font-semibold text-gray-900 font-mono">{bookingId}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Checked in at</p>
                <p className="font-semibold text-gray-900">
                  {checkedInTime || 'Loading...'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Expected Service Time</p>
                <p className="font-semibold text-gray-900">
                  {new Date(Date.now() + currentWaitTime * 60000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            {/* Show initial wait time from salon */}
            {initialDataRef.current.waitTime > 0 && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Salon Wait Time When Booked</p>
                  <p className="font-semibold text-gray-900">{initialDataRef.current.waitTime} minutes</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Status
          </button>

          <button 
            onClick={() => router.push('/find-salon')}
            className="w-full bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition font-semibold text-lg shadow-lg"
          >
            View on Map
          </button>
          
          <Link href="/">
            <button className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-lg hover:bg-gray-50 transition font-semibold text-lg">
              Back to Home
            </button>
          </Link>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Important Information</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• SMS notification sent to your number</li>
                <li>• Please arrive 5 minutes before your turn</li>
                <li>• Show this page or booking ID at the salon</li>
                <li>• Wait time updates in real-time as queue moves</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function BookingStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading booking status...</p>
        </div>
      </div>
    }>
      <BookingStatusContent />
    </Suspense>
  );
}
