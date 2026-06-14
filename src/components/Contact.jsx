import React, { useState } from 'react';

const Contact = ({ schoolData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!schoolData) return null;

  const { contact, portal_link } = schoolData;
  const secondary = schoolData.secondary_color || '#1A1A2E';
  const accent = schoolData.accent_color || '#D4AF37';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 rounded-full px-3 py-1 text-sm font-semibold" style={{ backgroundColor: 'rgba(244, 196, 48, 0.16)', color: secondary }}>
            Connect With Us
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl" style={{ color: secondary }}>
            Contact Information
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Use the official portal for admissions, updates, and school services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-fadeIn">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: secondary }}>
                Official Portal
              </p>
              <p className="mt-3 text-gray-600">
                {contact?.description || 'Use the official school portal for admissions, updates, and student services.'}
              </p>
              <a
                href={contact?.portal_url || portal_link}
                className="mt-6 inline-flex items-center rounded-full px-5 py-3 font-semibold transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: accent, color: secondary }}
              >
                Visit Portal
              </a>
            </div>

            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: secondary }}>
                School Note
              </p>
              <p className="mt-3 text-gray-600">
                Communication and access are centered around the official portal, so the preview stays realistic without inventing contact details.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-fadeIn">
            <h3 className="mb-6 text-2xl font-bold" style={{ color: secondary }}>Send us a Message</h3>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">
                  Thank you! Your message has been received.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': 'rgba(212, 175, 55, 0.25)' }}
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Your email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': 'rgba(212, 175, 55, 0.25)' }}
                />
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Your message"
                  rows="4"
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': 'rgba(212, 175, 55, 0.25)' }}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-semibold transform duration-300 hover:scale-105"
                style={{ backgroundColor: secondary, color: '#fff' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
