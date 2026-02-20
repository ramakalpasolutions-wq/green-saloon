export const metadata = {
  title: 'Contact Us | Great Cuts',
  description: 'Get in touch with Great Cuts for bookings, feedback, and support.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-emerald-50">
      <section className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Contact Great Cuts
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Have questions about bookings, services, or feedback? Fill out the form below and our team will get back to you soon.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 sm:p-8">
          {/* Small info row */}
          <div className="mb-6">
            <p className="text-sm text-emerald-700 font-medium">
              We usually respond within a few hours during working days.
            </p>
          </div>

          <form className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 outline-none transition"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 outline-none transition"
                placeholder="Ex: +91 98765 43210"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                How can we help?
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 outline-none transition resize-none"
                placeholder="Tell us about your booking, service request, or feedback"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex w-full sm:w-auto justify-center rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
