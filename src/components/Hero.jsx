export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 to-white overflow-hidden">
      {/* Mobile: py-12, Tablet: py-16, Desktop: py-24 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="text-center">
          {/* Main Headline - Responsive Text Sizes */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            That fresh haircut feeling
            <span className="block sm:inline text-emerald-600">—faster</span>
          </h1>
          
          {/* Subheading - Responsive Text & Spacing */}
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto px-2">
            <p className="font-semibold mb-2 sm:mb-3">
              Great haircuts are easier with Online Check-In
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl">
              Find a salon near you and add your name to the waitlist from anywhere, with Online Check-In.
            </p>
          </div>

          {/* CTA Buttons - Fully Responsive Layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
            <button className="w-full sm:w-auto bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl">
              Check In Online
            </button>
            <button className="w-full sm:w-auto border-2 border-emerald-600 text-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-emerald-50 active:bg-emerald-100 transition font-semibold text-base sm:text-lg">
              Find a Location
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Hidden on Mobile, Visible on Tablet+ */}
      <div className="hidden sm:block absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-emerald-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="hidden sm:block absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-emerald-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
    </section>
  );
}
