export default function PricingPage() {
  const pricingTiers = [
    {
      name: "Basic",
      price: "₹299",
      popular: false,
      description: "Perfect for a quick, quality cut",
      features: [
        "Classic Haircut",
        "Basic Styling",
        "15-30 minutes",
        "Walk-in available",
        "All skill levels"
      ]
    },
    {
      name: "Premium",
      price: "₹599",
      popular: true,
      description: "Our most popular package",
      features: [
        "Premium Haircut & Style",
        "Hair Wash Included",
        "Beard Trim",
        "Hot Towel Service",
        "45-60 minutes",
        "Book online",
        "Senior stylists"
      ]
    },
    {
      name: "Deluxe",
      price: "₹999",
      popular: false,
      description: "Complete grooming experience",
      features: [
        "Everything in Premium",
        "Hair Spa Treatment",
        "Scalp Massage",
        "Face Cleanup",
        "Complimentary Beverage",
        "90 minutes",
        "Priority booking",
        "Master stylists only"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto">
            Choose the package that fits your style and budget
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: Stack, Tablet: 2 Col + 1, Desktop: 3 Col */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, idx) => (
              <div 
                key={idx}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 overflow-hidden ${
                  tier.popular ? 'ring-4 ring-emerald-500 md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {tier.popular && (
                  <div className="bg-emerald-600 text-white text-center py-2 px-4 text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                    {tier.description}
                  </p>
                  
                  <div className="mb-6 sm:mb-8">
                    <span className="text-4xl sm:text-5xl font-bold text-emerald-600">
                      {tier.price}
                    </span>
                    <span className="text-gray-500 text-base sm:text-lg ml-2">/ visit</span>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm sm:text-base">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={`w-full py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition shadow-md ${
                      tier.popular 
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                        : 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    Book {tier.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
            Add-On Services
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { name: "Beard Trim", price: "₹199" },
              { name: "Hair Color", price: "₹799" },
              { name: "Hair Spa", price: "₹599" },
              { name: "Face Cleanup", price: "₹399" }
            ].map((addon, idx) => (
              <div 
                key={idx}
                className="flex justify-between items-center bg-gray-50 p-4 sm:p-6 rounded-xl hover:shadow-md transition"
              >
                <span className="font-semibold text-gray-900 text-base sm:text-lg">
                  {addon.name}
                </span>
                <span className="text-emerald-600 font-bold text-lg sm:text-xl">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-emerald-50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
            Pricing FAQs
          </h2>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
                Do you accept walk-ins?
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Yes! While we recommend booking online for guaranteed service, we welcome walk-ins based on availability.
              </p>
            </div>
            
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We accept cash, all major credit/debit cards, UPI, and digital wallets.
              </p>
            </div>
            
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
                Is there a cancellation fee?
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                No cancellation fee if you cancel at least 2 hours before your appointment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
