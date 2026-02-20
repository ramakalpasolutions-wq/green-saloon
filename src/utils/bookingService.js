// Booking Service - Manages bookings in localStorage

const BOOKINGS_KEY = 'green_saloon_bookings';

export const bookingService = {
  // Get all bookings
  getAllBookings() {
    if (typeof window === 'undefined') return [];
    const bookings = localStorage.getItem(BOOKINGS_KEY);
    return bookings ? JSON.parse(bookings) : [];
  },

  // Get bookings by phone number
  getBookingsByPhone(phoneNumber) {
    const allBookings = this.getAllBookings();
    return allBookings.filter(booking => booking.phone === phoneNumber);
  },

  // Add new booking
  addBooking(bookingData) {
    const allBookings = this.getAllBookings();
    const newBooking = {
      ...bookingData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    allBookings.push(newBooking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(allBookings));
    return newBooking;
  },

  // Get booking by ID
  getBookingById(bookingId) {
    const allBookings = this.getAllBookings();
    return allBookings.find(booking => booking.id === bookingId);
  },

  // Update booking status
  updateBookingStatus(bookingId, status) {
    const allBookings = this.getAllBookings();
    const index = allBookings.findIndex(booking => booking.id === bookingId);
    if (index !== -1) {
      allBookings[index].status = status;
      allBookings[index].updatedAt = new Date().toISOString();
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(allBookings));
      return allBookings[index];
    }
    return null;
  },

  // Delete booking
  deleteBooking(bookingId) {
    const allBookings = this.getAllBookings();
    const filteredBookings = allBookings.filter(booking => booking.id !== bookingId);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filteredBookings));
    return true;
  }
};
