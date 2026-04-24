"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Message sent successfully! We'll be in touch soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Have questions? We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h3>

              {/* Address */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  📍 Address
                </h4>
                <p className="text-gray-600">
                  123 Car Street, Auto City, AC 12345
                </p>
              </div>

              {/* Phone */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  📱 Phone
                </h4>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>

              {/* Email */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  ✉️ Email
                </h4>
                <p className="text-gray-600">info@cardoctor.com</p>
              </div>

              {/* Hours */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  ⏰ Business Hours
                </h4>
                <p className="text-gray-600 mb-1">
                  Monday - Friday: 8:00 AM - 6:00 PM
                </p>
                <p className="text-gray-600 mb-1">
                  Saturday: 9:00 AM - 4:00 PM
                </p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600">Map integration coming soon</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows="5"
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-6"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
