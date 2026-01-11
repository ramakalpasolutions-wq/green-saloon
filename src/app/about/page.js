export default function AboutPage() {
  const team = [
    { name: "Rajesh Kumar", role: "Master Stylist", experience: "15+ years", image: "👨‍🦱" },
    { name: "Sanjay Reddy", role: "Senior Stylist", experience: "10+ years", image: "👨‍🦰" },
    { name: "Venkat Rao", role: "Beard Specialist", experience: "8+ years", image: "🧔" },
    { name: "Kiran Babu", role: "Hair Color Expert", experience: "12+ years", image: "👨‍🦳" }
  ];

  const values = [
    {
      icon: "✂️",
      title: "Expert Craftsmanship",
      description: "Every cut is a work of art, performed by trained professionals"
    },
    {
      icon: "🌿",
      title: "Eco-Friendly",
      description: "We use sustainable, organic products that are good for you and the planet"
    },
    {
      icon: "⭐",
      title: "Customer First",
      description: "Your satisfaction is our priority, every single visit"
    },
    {
      icon: "💚",
      title: "Community Focus",
      description: "Proud to serve the Guntur community since 2018"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            About Green Saloon
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto">
            Where tradition meets modern grooming excellence
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
            Our Story
          </h2>
          <div className="space-y-4 sm:space-y-6 text-gray-600">
            <p className="text-base sm:text-lg leading-relaxed">
              Founded in 2018 in the heart of Guntur, Green Saloon began with a simple vision: to provide 
              world-class grooming services with a personal touch. What started as a single chair operation 
              has grown into a trusted name with three locations across the city.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              We believe that a great haircut is more than just a service—it's an experience. Our team of 
              expert stylists combines traditional barbering techniques with modern trends to give you a 
              look that's uniquely yours.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              At Green Saloon, we're committed to sustainability, quality, and making every customer feel 
              like family. Whether you're here for a quick trim or a complete transformation, we're here 
              to make you look and feel your best.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 md:mb-16 text-gray-900">
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, idx) => (
              <div 
                key={idx}
                className="text-center p-6 sm:p-8 bg-gray-50 rounded-xl hover:shadow-lg transition"
              >
                <div className="text-5xl sm:text-6xl mb-4">{value.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 md:mb-16 text-gray-900">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {team.map((member, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-md hover:shadow-xl transition transform hover:-translate-y-2 duration-300"
              >
                <div className="text-6xl sm:text-7xl mb-4">{member.image}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-emerald-600 font-semibold mb-2 text-sm sm:text-base">
                  {member.role}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {member.experience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to experience the difference?
          </h2>
          <p className="text-lg sm:text-xl text-emerald-50 mb-6 sm:mb-8">
            Book your appointment today and join the Green Saloon family
          </p>
          <button className="bg-white text-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-emerald-50 transition font-semibold text-base sm:text-lg shadow-lg">
            Book Your Appointment
          </button>
        </div>
      </section>
    </div>
  );
}
