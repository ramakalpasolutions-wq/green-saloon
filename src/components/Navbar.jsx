'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl sm:text-3xl font-bold text-emerald-600 hover:text-emerald-700 transition">
              Green Saloon
            </Link>
          </div>

          {/* Desktop: Check In + Find a Salon Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/check-in">
              <button className="border-2 border-emerald-600 text-emerald-600 px-5 lg:px-6 py-2.5 lg:py-3 rounded-lg hover:bg-emerald-50 transition font-semibold text-sm lg:text-base">
                Check In
              </button>
            </Link>
            <Link href="/find-salon">
              <button className="bg-emerald-600 text-white px-5 lg:px-6 py-2.5 lg:py-3 rounded-lg hover:bg-emerald-700 transition font-semibold text-sm lg:text-base shadow-md">
                Find a Salon
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-emerald-600 p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="/check-in">
                <button 
                  className="border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition font-semibold text-base w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Check In
                </button>
              </Link>
              <Link href="/find-salon">
                <button 
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition font-semibold text-base shadow-lg w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Find a Salon
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
