export default function Features() {
  const features = [
    {
      icon: '📱',
      title: 'Online Check-In',
      description: 'Make the most of your time with Online Check-In—which lets you reserve your spot in line from anywhere.'
    },
    {
      icon: '✅',
      title: 'Consistent Quality',
      description: 'Feel confident that you\'ll get the same haircut from any Green Saloon stylist, every time.'
    }
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Stack Vertically, Tablet+: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
