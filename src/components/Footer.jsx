export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Stack, Tablet: 2 Col, Desktop: 4 Col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-3 sm:mb-4">
              Green Saloon
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Fresh cuts. Green style. Great vibes.
            </p>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Haircuts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Beard Styling
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Kids Cuts
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Locations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>Email: info@greensaloon.com</li>
              <li>Phone: +91 123 456 7890</li>
              <li>Guntur, Andhra Pradesh</li>
            </ul>
          </div>
        </div>

        {/* Copyright - Responsive Spacing */}
        <div className="border-t border-gray-800 mt-8 sm:mt-10 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
          <p>&copy; 2026 Green Saloon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
