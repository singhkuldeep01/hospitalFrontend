import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-base-content mb-4">
            Let's Start a <span className="text-primary">Conversation</span>
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-base-content/70 leading-relaxed mb-6">
              Your health is our priority. Reach out to us for any questions or concerns.
            </p>
            <div className="badge badge-primary badge-lg font-semibold py-4">
              24/7 Healthcare Support - Because Your Health Can't Wait
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form - Now equal width */}
          <div className="card bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body p-6">
              <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center border-b pb-4">
                <span className="text-primary text-3xl mr-3">📬</span>
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-base font-medium">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-base font-medium">Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-base font-medium">Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input input-bordered input-lg w-full focus:input-primary transition-colors"
                    placeholder="+1 (123) 456-7890"
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-base font-medium">Subject</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                    placeholder="How can we help?"
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-base font-medium">Message</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="textarea textarea-bordered h-32"
                    required
                    placeholder="Please describe your inquiry in detail..."
                  />
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-full hover:shadow-lg transition-all duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information - Now equal width */}
          <div className="space-y-4">
            <div className="card bg-gradient-to-r from-primary/10 to-base-100 shadow-xl">
              <div className="card-body p-6">
                <h3 className="text-2xl font-bold text-primary flex items-center mb-4">
                  <span className="text-3xl mr-3">🏥</span>
                  Hospital Location
                </h3>
                <div className="space-y-2 text-lg">
                  <p className="text-base-content">123 Healthcare Avenue</p>
                  <p className="text-base-content">Medical District, City 400001</p>
                  <p className="text-base-content/70 mt-4">
                    Located in the heart of the city, easily accessible by public transport
                  </p>
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-r from-secondary/10 to-base-100 shadow-xl">
              <div className="card-body p-6">
                <h3 className="text-2xl font-bold text-secondary flex items-center mb-4">
                  <span className="text-3xl mr-3">⚡</span>
                  Emergency Support
                </h3>
                <div className="space-y-2">
                  <p className="text-4xl font-black text-error">108</p>
                  <p className="text-base-content/70">24/7 Emergency Response</p>
                  <div className="badge badge-secondary mt-4">Priority Care Available</div>
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-r from-accent/10 to-base-100 shadow-xl">
              <div className="card-body p-6">
                <h3 className="text-2xl font-bold text-accent flex items-center mb-4">
                  <span className="text-3xl mr-3">🕒</span>
                  Visiting Hours
                </h3>
                <div className="grid grid-cols-2 gap-4 text-base-content">
                  <div>
                    <p className="font-semibold">Weekdays</p>
                    <p className="text-base-content/70">8:00 AM - 8:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold">Saturday</p>
                    <p className="text-base-content/70">9:00 AM - 6:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold">Sunday</p>
                    <p className="text-base-content/70">10:00 AM - 4:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Emergency</p>
                    <p className="text-base-content/70">24/7 Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Added Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-base-content/60">
            <span className="flex items-center">
              <span className="text-2xl mr-2">✓</span>
              Certified Healthcare Provider
            </span>
            <span className="flex items-center">
              <span className="text-2xl mr-2">🛡️</span>
              Privacy Protected
            </span>
            <span className="flex items-center">
              <span className="text-2xl mr-2">⭐</span>
              Top Rated Medical Care
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
                 