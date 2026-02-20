import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop"
            alt="Modern salon interior"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            Fresh Cuts, Great Vibes
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-gray-200">
            Skip the wait. Check in online and get styled on your schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/find-salon">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-bold text-lg shadow-xl">
                Check In Now
              </button>
            </Link>
            <Link href="/find-salon">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition font-bold text-lg border-2 border-white shadow-xl">
                Find a Salon
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12 sm:mb-16 text-lg max-w-2xl mx-auto">
            Get your perfect haircut in three simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop"
                  alt="Find salon location"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="inline-block w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Find Your Salon
              </h3>
              <p className="text-gray-600 text-base">
                Browse nearby Great cuts locations and see real-time wait times
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop"
                  alt="Book appointment online"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="inline-block w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Check In Online
              </h3>
              <p className="text-gray-600 text-base">
                Reserve your spot and choose your preferred stylist and services
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop"
                  alt="Get styled by professional"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="inline-block w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Get Styled
              </h3>
              <p className="text-gray-600 text-base">
                Walk in at your scheduled time and enjoy your fresh new look
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-center text-gray-600 mb-12 sm:mb-16 text-lg max-w-2xl mx-auto">
            Premium grooming services tailored just for you
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2070&auto=format&fit=crop"
                  alt="Haircut service"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Haircuts</h3>
                <p className="text-gray-600 mb-4">
                  Classic and modern cuts by expert stylists
                </p>
                <p className="text-emerald-600 font-bold text-lg">Starting at ₹299</p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop"
                  alt="Beard styling service"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Beard Styling</h3>
                <p className="text-gray-600 mb-4">
                  Shape, trim, and groom your beard to perfection
                </p>
                <p className="text-emerald-600 font-bold text-lg">Starting at ₹199</p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop"
                  alt="Hair coloring service"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hair Coloring</h3>
                <p className="text-gray-600 mb-4">
                  Professional color treatments and highlights
                </p>
                <p className="text-emerald-600 font-bold text-lg">Starting at ₹799</p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"
                  alt="Hair spa service"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hair Spa</h3>
                <p className="text-gray-600 mb-4">
                  Rejuvenating treatments for healthy hair
                </p>
                <p className="text-emerald-600 font-bold text-lg">Starting at ₹999</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">
            Why Choose Great cuts?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Save Time</h3>
              <p className="text-emerald-100">
                No more waiting. Check in online and arrive when it's your turn
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Stylists</h3>
              <p className="text-emerald-100">
                Trained professionals with years of experience
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Products</h3>
              <p className="text-emerald-100">
                Premium grooming products for the best results
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Affordable Prices</h3>
              <p className="text-emerald-100">
                Premium services at competitive rates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready for Your Fresh New Look?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers. Book your appointment today!
          </p>
          <Link href="/find-salon">
            <button className="bg-emerald-600 text-white px-10 py-4 rounded-lg hover:bg-emerald-700 transition font-bold text-lg shadow-xl">
              Check In Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
