export default function NewsCards() {
  const news = [
    {
      title: 'Hair & beard styles that work',
      description: 'Discover four go-to haircut and beard pairings designed to keep your look sharp and confident.',
      cta: 'Read more'
    },
    {
      title: 'Find your next great cut',
      description: 'From layers to fades, our lookbook is here to inspire what\'s next for your hair.',
      cta: 'Browse haircuts'
    },
    {
      title: 'Work greatly',
      description: 'Grow your career at a Great Cuts, whether that\'s as a stylist, manager or receptionist.',
      cta: 'Learn more'
    }
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-gray-900">
          Great news
        </h2>

        {/* Mobile: Stack, Tablet: 2 Col, Desktop: 3 Col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 md:gap-8">
          {news.map((item, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-xl p-5 sm:p-6 hover:shadow-lg transition transform hover:-translate-y-1 duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
                {item.description}
              </p>
              <a 
                href="#" 
                className="text-emerald-600 font-semibold hover:text-emerald-700 inline-flex items-center text-sm sm:text-base group"
              >
                {item.cta}
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
