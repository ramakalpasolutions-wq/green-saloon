'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CheckInModal({ salon, isOpen, onClose }) {
  const [step, setStep] = useState(1); // Now: 1: Phone, 2: DateTime, 3: Services, 4: Staff, 5: Confirmation
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const services = [
    { id: 1, name: "Classic Haircut", price: "₹299", duration: "30 min" },
    { id: 2, name: "Fade Cut", price: "₹399", duration: "45 min" },
    { id: 3, name: "Beard Trim", price: "₹199", duration: "20 min" },
    { id: 4, name: "Hot Towel Shave", price: "₹399", duration: "30 min" },
    { id: 5, name: "Hair Color", price: "₹799", duration: "90 min" },
    { id: 6, name: "Hair Spa", price: "₹999", duration: "60 min" }
  ];

  const staff = [
    { id: 1, name: "Rajesh Kumar", role: "Master Stylist", experience: "15+ years", image: "👨‍🦱", rating: 4.8 },
    { id: 2, name: "Sanjay Reddy", role: "Senior Stylist", experience: "10+ years", image: "👨‍🦰", rating: 4.7 },
    { id: 3, name: "Venkat Rao", role: "Beard Specialist", experience: "8+ years", image: "🧔", rating: 4.9 },
    { id: 4, name: "Kiran Babu", role: "Hair Color Expert", experience: "12+ years", image: "👨‍🦳", rating: 4.6 }
  ];

  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        full: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
        isToday: i === 0
      });
    }
    return days;
  };

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM"
  ];

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const toggleService = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + parseInt(service.price.replace('₹', '').replace(',', ''));
    }, 0);
  };

  const getTotalDuration = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + parseInt(service.duration);
    }, 0);
  };

  const handleConfirm = () => {
    const loadingToast = toast.loading('Confirming your booking...');
    
    setTimeout(() => {
      toast.dismiss(loadingToast);
      
      const bookingData = {
        phone: phoneNumber,
        salon: salon?.name,
        date: selectedDate,
        time: selectedTime,
        services: selectedServices.map(id => services.find(s => s.id === id).name),
        staff: staff.find(s => s.id === selectedStaff)?.name,
        total: getTotalPrice()
      };
      
      console.log('Booking confirmed:', bookingData);
      
      toast.success(
        `Booking confirmed! SMS sent to +91 ${phoneNumber}`,
        {
          duration: 4000,
          icon: '✅',
        }
      );
      
      onClose();
      resetForm();
    }, 1500);
  };

  const resetForm = () => {
    setStep(1);
    setPhoneNumber('');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedServices([]);
    setSelectedStaff(null);
  };

  const handleNext = () => {
    if (step === 1 && phoneNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    if (step === 2 && (!selectedDate || !selectedTime)) {
      toast.error('Please select both date and time');
      return;
    }
    if (step === 3 && selectedServices.length === 0) {
      toast.error('Please select at least one service');
      return;
    }
    if (step === 4 && !selectedStaff) {
      toast.error('Please select a staff member');
      return;
    }
    
    if (step < 5) {
      setStep(step + 1);
      toast.success(`Step ${step} completed!`, { icon: '👍' });
    } else {
      handleConfirm();
    }
  };

  const getStepTitle = () => {
    switch(step) {
      case 1: return 'Enter Mobile Number';
      case 2: return 'Select Date & Time';
      case 3: return 'Choose Services';
      case 4: return 'Select Staff';
      case 5: return 'Confirm Booking';
      default: return '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{salon?.name}</h2>
            <p className="text-sm text-gray-600 mt-1">
              Step {step} of 5: {getStepTitle()}
            </p>
          </div>
          <button 
            onClick={() => {
              onClose();
              toast('Booking cancelled', { icon: '❌' });
            }}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 sm:px-6 pt-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div 
                key={s}
                className={`h-1 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-emerald-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Step 1: Phone Number */}
          {step === 1 && (
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
                  <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Mobile Number</h3>
                <p className="text-gray-600">We'll send booking confirmation and updates via SMS</p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-lg">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Enter 10-digit number"
                    className="w-full pl-16 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none text-lg"
                    maxLength="10"
                    autoFocus
                  />
                </div>
                {phoneNumber.length > 0 && phoneNumber.length < 10 && (
                  <p className="mt-2 text-sm text-orange-600">
                    {10 - phoneNumber.length} digits remaining
                  </p>
                )}
                {phoneNumber.length === 10 && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Valid number
                  </p>
                )}
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Why we need your number:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Booking confirmation SMS</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Real-time wait time updates</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Appointment reminders</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Select Date</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                  {getNext7Days().map((day) => (
                    <button
                      key={day.full}
                      onClick={() => setSelectedDate(day.full)}
                      className={`p-3 rounded-lg border-2 text-center transition ${
                        selectedDate === day.full
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="text-xs text-gray-600 mb-1">
                        {day.isToday ? 'Today' : day.display.split(',')[0]}
                      </div>
                      <div className="font-bold text-gray-900">
                        {day.display.split(' ')[1]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Select Time</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition ${
                        selectedTime === time
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 text-gray-700 hover:border-emerald-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Services */}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-4 rounded-xl border-2 text-left transition ${
                      selectedServices.includes(service.id)
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900">{service.name}</h4>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedServices.includes(service.id)
                          ? 'border-emerald-600 bg-emerald-600'
                          : 'border-gray-300'
                      }`}>
                        {selectedServices.includes(service.id) && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{service.duration}</span>
                      <span className="font-semibold text-emerald-600">{service.price}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {selectedServices.length > 0 && (
                <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Total Duration: {getTotalDuration()} min</p>
                      <p className="text-xl font-bold text-emerald-600">Total: ₹{getTotalPrice()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Staff */}
          {step === 4 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Select Your Stylist</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {staff.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedStaff(member.id)}
                    className={`p-4 rounded-xl border-2 text-left transition ${
                      selectedStaff === member.id
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-4xl">{member.image}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{member.name}</h4>
                        <p className="text-sm text-emerald-600 font-medium">{member.role}</p>
                        <p className="text-xs text-gray-500">{member.experience}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm font-semibold">{member.rating}</span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedStaff === member.id
                          ? 'border-emerald-600 bg-emerald-600'
                          : 'border-gray-300'
                      }`}>
                        {selectedStaff === member.id && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
                  <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Booking</h3>
                <p className="text-gray-600">Please review your appointment details</p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📱 Contact Number</h4>
                  <p className="text-gray-600 font-medium">+91 {phoneNumber}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📅 Date & Time</h4>
                  <p className="text-gray-600">{new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-gray-600 font-medium">{selectedTime}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">✂️ Services</h4>
                  {services.filter(s => selectedServices.includes(s.id)).map(service => (
                    <div key={service.id} className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{service.name}</span>
                      <span className="font-medium">{service.price}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-emerald-600">₹{getTotalPrice()}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">👨‍🦱 Your Stylist</h4>
                  {staff.filter(s => s.id === selectedStaff).map(member => (
                    <div key={member.id} className="flex items-center gap-3">
                      <span className="text-3xl">{member.image}</span>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="p-4 sm:p-6 border-t border-gray-200 flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-semibold shadow-lg"
          >
            {step === 5 ? 'Confirm Booking' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
