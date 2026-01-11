export default function ServicesPage() {
  const services = [
    {
      category: "Men's Cuts",
      icon: "💇‍♂️",
      items: [
        { name: "Classic Haircut", price: "₹299", duration: "30 min", description: "Traditional scissors cut with styling" },
        { name: "Fade Cut", price: "₹399", duration: "45 min", description: "Modern fade with precision clipper work" },
        { name: "Buzz Cut", price: "₹199", duration: "15 min", description: "Clean, uniform length all over" },
        { name: "Premium Cut & Style", price: "₹599", duration: "60 min", description: "Consultation, cut, wash, and premium styling" }
      ]
    },
    {
      category: "Beard Services",
      icon: "🧔",
      items: [
        { name: "Beard Trim", price: "₹199", duration: "20 min", description: "Shape and trim to your preference" },
        { name: "Hot Towel Shave", price: "₹399", duration: "30 min", description: "Traditional straight razor shave" },
        { name: "Beard Design", price: "₹299", duration: "25 min", description: "Creative beard styling and shaping" },
        { name: "Combo (Cut + Beard)", price: "₹499", duration: "50 min", description: "Haircut and beard trim package" }
      ]
    },
    {
      category: "Special Services",
      icon: "✨",
      items: [
        { name: "Kids Cut (Under 12)", price: "₹249", duration: "25 min", description: "Patient, kid-friendly haircuts" },
        { name: "Hair Color", price: "₹799", duration: "90 min", description: "Full color or highlights" },
        { name: "Hair Spa Treatment", price: "₹999", duration: "60 min", description: "Deep conditioning and massage" },
        { name: "Scalp Treatment", price: "₹599", duration: "45 min", description: "Therapeutic scalp care" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Our Services
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto">
            Professional grooming services tailored to your style
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 sm:space-y-16">
            {services.map((category, idx) => (
              <div key={idx}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <span className="text-4xl sm:text-5xl">{category.icon}</span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                    {category.category}
                  </h2>
                </div>

                {/* Service Cards - Mobile: Stack, Tablet: 2 Col, Desktop: 2 Col */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {category.items.map((service, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition border border-gray-100"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                          {service.name}
                        </h3>
                        <span className="text-xl sm:text-2xl font-bold text-emerald-600">
                          {service.price}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base mb-3">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-500 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {service.duration}
                        </span>
                        <button className="bg-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-emerald-700 transition text-sm sm:text-base font-semibold">
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
            Not sure what you need?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Our experienced stylists can help you choose the perfect service
          </p>
          <button className="bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-emerald-700 transition font-semibold text-base sm:text-lg shadow-lg">
            Consult with a Stylist
          </button>
        </div>
      </section>
    </div>
  );
}
