'use client';
import { useState, useMemo, useEffect } from 'react';
import toast from 'react-hot-toast';
import { bookingService } from '@/utils/bookingService';
import Image from 'next/image';


export default function CheckInModal({ salon, isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  
  // ✅ NEW: Capture booking timestamp when modal opens
  const [bookingTimestamp, setBookingTimestamp] = useState(null);

  const services = [
    { id: 1, name: "Classic Haircut", price: "₹299", duration: "30 min" },
    { id: 2, name: "Fade Cut", price: "₹399", duration: "45 min" },
    { id: 3, name: "Beard Trim", price: "₹199", duration: "20 min" },
    { id: 4, name: "Hot Towel Shave", price: "₹399", duration: "30 min" },
    { id: 5, name: "Hair Color", price: "₹799", duration: "90 min" },
    { id: 6, name: "Hair Spa", price: "₹999", duration: "60 min" }
  ];

  const allStaff = [
    { id: 1, name: "Rajesh Kumar", role: "Master Stylist", experience: "15+ years", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", rating: 4.9 },
    { id: 2, name: "Priya Sharma", role: "Senior Stylist", experience: "12+ years", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", rating: 4.9 },
    { id: 3, name: "Sanjay Reddy", role: "Senior Stylist", experience: "10+ years", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", rating: 4.8 },
    { id: 4, name: "Kavya Menon", role: "Hair Color Expert", experience: "11+ years", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", rating: 4.9 },
    { id: 5, name: "Venkat Rao", role: "Beard Specialist", experience: "8+ years", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop", rating: 4.9 },
    { id: 6, name: "Divya Patel", role: "Hair Spa Specialist", experience: "9+ years", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop", rating: 4.8 },
    { id: 7, name: "Kiran Babu", role: "Hair Color Expert", experience: "12+ years", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop", rating: 4.7 },
    { id: 8, name: "Sneha Iyer", role: "Senior Stylist", experience: "10+ years", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop", rating: 4.8 },
    { id: 9, name: "Arun Kumar", role: "Master Stylist", experience: "14+ years", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop", rating: 4.8 },
    { id: 10, name: "Anjali Nair", role: "Bridal Specialist", experience: "13+ years", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop", rating: 4.9 },
    { id: 11, name: "Prakash Rao", role: "Senior Stylist", experience: "9+ years", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150&h=150&fit=crop", rating: 4.6 },
    { id: 12, name: "Meera Krishnan", role: "Hair Treatment Expert", experience: "11+ years", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop", rating: 4.9 },
    { id: 13, name: "Suresh Babu", role: "Fade Expert", experience: "11+ years", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop", rating: 4.9 },
    { id: 14, name: "Lakshmi Devi", role: "Master Stylist", experience: "14+ years", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop", rating: 4.8 },
    { id: 15, name: "Ramesh Kumar", role: "Hair Specialist", experience: "13+ years", image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop", rating: 4.7 },
    { id: 16, name: "Ritu Varma", role: "Color & Highlights Expert", experience: "10+ years", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop", rating: 4.9 },
    { id: 17, name: "Vijay Prakash", role: "Master Barber", experience: "16+ years", image: "https://images.unsplash.com/photo-1507081323647-4d250478b919?w=150&h=150&fit=crop", rating: 4.9 },
    { id: 18, name: "Swathi Reddy", role: "Senior Stylist", experience: "12+ years", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop", rating: 4.8 },
    { id: 19, name: "Kumar Raja", role: "Style Expert", experience: "10+ years", image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=150&h=150&fit=crop", rating: 4.8 },
    { id: 20, name: "Nisha Rani", role: "Keratin Specialist", experience: "9+ years", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop", rating: 4.7 },
    { id: 21, name: "Dinesh Kumar", role: "Senior Stylist", experience: "12+ years", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop", rating: 4.7 },
    { id: 22, name: "Pooja Hegde", role: "Makeup & Hair Artist", experience: "11+ years", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop", rating: 4.9 },
    { id: 23, name: "Anand Raj", role: "Beard Artist", experience: "8+ years", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop", rating: 4.8 },
    { id: 24, name: "Deepa Krishnan", role: "Hair Spa Specialist", experience: "10+ years", image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=150&h=150&fit=crop", rating: 4.8 },
    { id: 25, name: "Mohan Krishna", role: "Hair Expert", experience: "11+ years", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop", rating: 4.6 },
    { id: 26, name: "Aishwarya Rao", role: "Senior Stylist", experience: "13+ years", image: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=150&h=150&fit=crop", rating: 4.9 },
    { id: 27, name: "Ashok Kumar", role: "Master Stylist", experience: "15+ years", image: "https://images.unsplash.com/photo-1504199367641-aba8151af406?w=150&h=150&fit=crop", rating: 4.9 },
    { id: 28, name: "Yamini Reddy", role: "Bridal Hair Expert", experience: "12+ years", image: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=150&h=150&fit=crop", rating: 4.9 },
    { id: 29, name: "Gopal Reddy", role: "Senior Barber", experience: "13+ years", image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150&h=150&fit=crop", rating: 4.8 },
    { id: 30, name: "Radha Menon", role: "Hair Treatment Specialist", experience: "11+ years", image: "https://images.unsplash.com/photo-1551843073-4a9a5b6fcd5f?w=150&h=150&fit=crop", rating: 4.8 }
  ];

  // Get 3-5 random staff for this salon (consistent per salon ID)
  const salonStaff = useMemo(() => {
    if (!salon?.id) return allStaff.slice(0, 4);
    
    const seed = salon.id;
    const staffCount = 3 + (seed % 3);
    const startIndex = (seed * 3) % (allStaff.length - 5);
    
    return allStaff.slice(startIndex, startIndex + staffCount);
  }, [salon?.id]);

  // ✅ CAPTURE TIMESTAMP ONCE WHEN MODAL OPENS
  useEffect(() => {
    if (isOpen && salon && !bookingTimestamp) {
      const timestamp = new Date();
      setBookingTimestamp(timestamp);
      console.log('🕐 Booking timestamp captured:', timestamp.toISOString());
      console.log('🕐 Display time:', timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }));
    }
  }, [isOpen, salon]);

  // ESC key handler
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

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
    
    const queueNumber = Math.floor(Math.random() * 20) + 1;
    const bookingId = 'GS' + Date.now().toString().slice(-6);
    
    let actualWaitTime = 15;
    if (salon?.waitTime) {
      const parsed = parseInt(String(salon.waitTime).replace(/\D/g, ''));
      if (!isNaN(parsed) && parsed > 0) {
        actualWaitTime = parsed;
      }
    }  // ✅ if block closes here, still inside setTimeout

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🏪 SALON DATA:', salon);
    console.log('⏰ SALON WAIT TIME (raw):', salon?.waitTime);
    console.log('⏰ SALON WAIT TIME (parsed):', actualWaitTime);
    console.log('📍 QUEUE NUMBER:', queueNumber);
    console.log('🆔 BOOKING ID:', bookingId);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const bookingData = {
      id: bookingId,
      phone: phoneNumber,
      salonName: salon?.name || 'Green Saloon',
      address: salon?.address || '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
      status: 'confirmed',
      queueNumber: queueNumber,
      waitTime: actualWaitTime,
      services: selectedServices.length > 0
        ? selectedServices.map(id => {
            const service = services.find(s => s.id === id);
            return service.name;
          })
        : ['Walk-in service'],
      staff: selectedStaff
        ? salonStaff.find(s => s.id === selectedStaff)?.name
        : 'Any available',
      total: getTotalPrice(),
      salonId: salon?.id
    };
    
    bookingService.addBooking(bookingData);
    
    toast.success('Booking confirmed!', {
      duration: 2000,
      icon: '✅',
    });
    
    const queryParams = new URLSearchParams({
      id: bookingId,
      salon: salon?.name || 'Green Saloon',
      queue: queueNumber.toString(),
      waitTime: actualWaitTime.toString()
    });
    
    window.location.href = `/booking-status?${queryParams.toString()}`;
    
    onClose();
    resetForm();
  }, 1500);  // ✅ setTimeout closes here
};             // ✅ handleConfirm closes here


  const resetForm = () => {
    setStep(1);
    setPhoneNumber('');
    setSelectedServices([]);
    setSelectedStaff(null);
    setBookingTimestamp(null); // ✅ Reset timestamp
  };

  const handleClose = () => {
    onClose();
    toast('Booking cancelled', { icon: '❌' });
    resetForm();
  };

  const handleNext = () => {
    if (step === 1 && phoneNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
      if (step === 1) {
        toast.success('Phone number verified!', { icon: '📱' });
      }
    } else {
      handleConfirm();
    }
  };

  const handleSkip = () => {
    if (step === 2) {
      toast('Skipped service selection', { icon: 'ℹ️' });
    } else if (step === 3) {
      toast('No staff preference - Any available stylist', { icon: 'ℹ️' });
    }
    setStep(step + 1);
  };

  const getStepTitle = () => {
    switch(step) {
      case 1: return 'Enter Mobile Number';
      case 2: return 'Choose Services';
      case 3: return 'Select Staff';
      case 4: return 'Confirm Booking';
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
              Step {step} of 4: {getStepTitle()}
            </p>
          </div>
          <button 
            onClick={handleClose}
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
            {[1, 2, 3, 4].map((s) => (
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

          {/* Step 2: Services */}
          {step === 2 && (
            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>💡 Tip:</strong> Skip to choose services at the salon
                </p>
              </div>

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

          {/* Step 3: Staff */}
          {step === 3 && (
            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>💡 Tip:</strong> Skip to get any available stylist
                </p>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Select Your Stylist ({salonStaff.length} available)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {salonStaff.map((member) => (
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
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
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

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
                  <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Booking</h3>
                <p className="text-gray-600">Please review your walk-in details</p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📱 Contact Number</h4>
                  <p className="text-gray-600 font-medium">+91 {phoneNumber}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">✂️ Services</h4>
                  {selectedServices.length > 0 ? (
                    <>
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
                    </>
                  ) : (
                    <p className="text-gray-600 italic">To be decided at salon</p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">👨‍🦱 Your Stylist</h4>
                  {selectedStaff ? (
                    salonStaff.filter(s => s.id === selectedStaff).map(member => (
                      <div key={member.id} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 italic">Any available stylist</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="p-4 sm:p-6 border-t border-gray-200">
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Back
              </button>
            )}
            
            {step >= 2 && step <= 3 && (
              <button
                onClick={handleSkip}
                className="px-6 py-3 border-2 border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition font-semibold"
              >
                Skip
              </button>
            )}
            
            <button
              onClick={handleNext}
              disabled={step === 1 && phoneNumber.length !== 10}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                step === 1 && phoneNumber.length !== 10
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
              }`}
            >
              {step === 4 ? 'Confirm Booking' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}