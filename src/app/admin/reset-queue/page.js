'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BOOKINGS_KEY = 'green_saloon_bookings';

export default function ResetQueuePage() {
  const router = useRouter();
  const [allBookings, setAllBookings] = useState([]);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    if (isAuthenticated) {
      loadBookings();
    }
  }, [isAuthenticated]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const loadBookings = () => {
    if (typeof window !== 'undefined') {
      const bookings = localStorage.getItem(BOOKINGS_KEY);
      setAllBookings(bookings ? JSON.parse(bookings) : []);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      showMessage('success', 'Admin access granted!');
    } else {
      showMessage('error', 'Incorrect password!');
    }
  };

  const resetSingleQueue = (bookingId) => {
    if (typeof window !== 'undefined') {
      const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
      const updatedBookings = bookings.map(booking => {
        if (booking.id === bookingId) {
          return {
            ...booking,
            queueNumber: Math.floor(Math.random() * 20) + 1,
            waitTime: 15,
            updatedAt: new Date().toISOString()
          };
        }
        return booking;
      });
      
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
      showMessage('success', `Queue reset for booking ${bookingId}`);
      loadBookings();
    }
  };

  const resetAllQueues = () => {
    if (confirm('Are you sure you want to reset ALL queues?')) {
      if (typeof window !== 'undefined') {
        const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
        const resetBookings = bookings.map(booking => ({
          ...booking,
          queueNumber: Math.floor(Math.random() * 20) + 1,
          waitTime: 15,
          updatedAt: new Date().toISOString()
        }));
        
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(resetBookings));
        showMessage('success', 'All queues reset!');
        loadBookings();
      }
    }
  };

  const deleteBooking = (bookingId) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      if (typeof window !== 'undefined') {
        const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
        const filteredBookings = bookings.filter(b => b.id !== bookingId);
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filteredBookings));
        showMessage('success', 'Booking deleted!');
        loadBookings();
      }
    }
  };

  const clearAllBookings = () => {
    if (confirm('⚠️ WARNING: This will delete ALL bookings permanently. Are you sure?')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(BOOKINGS_KEY);
        showMessage('success', 'All bookings cleared!');
        loadBookings();
      }
    }
  };

  const toggleSelectBooking = (bookingId) => {
    setSelectedBookings(prev => 
      prev.includes(bookingId) 
        ? prev.filter(id => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const resetSelectedQueues = () => {
    if (selectedBookings.length === 0) {
      showMessage('error', 'Please select bookings to reset');
      return;
    }

    if (confirm(`Reset ${selectedBookings.length} selected queue(s)?`)) {
      if (typeof window !== 'undefined') {
        const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
        const updatedBookings = bookings.map(booking => {
          if (selectedBookings.includes(booking.id)) {
            return {
              ...booking,
              queueNumber: Math.floor(Math.random() * 20) + 1,
              waitTime: 15,
              updatedAt: new Date().toISOString()
            };
          }
          return booking;
        });

        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
        showMessage('success', `${selectedBookings.length} queue(s) reset!`);
        setSelectedBookings([]);
        loadBookings();
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {message.text && (
              <div className={`mb-4 p-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {message.text}
              </div>
            )}

            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Access
              </h1>
              <p className="text-gray-600">
                Enter password to manage queues
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => router.push('/')}
                className="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
              >
                Back to Home
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {message.text && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Queue Management
              </h1>
              <p className="text-gray-600">
                Reset queues and manage bookings
              </p>
            </div>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setAdminPassword('');
                router.push('/');
              }}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{allBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Bookings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {allBookings.filter(b => b.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-full">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Selected</p>
                <p className="text-2xl font-bold text-gray-900">{selectedBookings.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <button
              onClick={resetAllQueues}
              className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Reset All
            </button>

            <button
              onClick={resetSelectedQueues}
              disabled={selectedBookings.length === 0}
              className={`py-3 px-4 rounded-lg transition font-semibold ${
                selectedBookings.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              Reset Selected
            </button>

            <button
              onClick={loadBookings}
              className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Refresh
            </button>

            <button
              onClick={clearAllBookings}
              className="bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">All Bookings</h2>

          {allBookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No bookings found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {allBookings.map((booking) => (
                <div key={booking.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-emerald-300 transition">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={() => toggleSelectBooking(booking.id)}
                      className="mt-1 w-5 h-5 text-emerald-600 rounded"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{booking.salonName}</h3>
                          <p className="text-sm text-gray-600">ID: {booking.id}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-3">
                        <div>
                          <p className="text-gray-500">Phone</p>
                          <p className="font-semibold">+91 {booking.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Queue</p>
                          <p className="font-semibold text-emerald-600">#{booking.queueNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Wait Time</p>
                          <p className="font-semibold">{booking.waitTime} min</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Total</p>
                          <p className="font-semibold">₹{booking.total}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => resetSingleQueue(booking.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-semibold"
                        >
                          Reset Queue
                        </button>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
