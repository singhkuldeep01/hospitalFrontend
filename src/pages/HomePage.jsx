import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function HomePage() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-base-content">
              Welcome to <span className="text-primary">ClinicCare</span>
            </h1>
            <p className="py-6 text-base-content/80">
              Your trusted healthcare partner providing comprehensive medical services with 
              state-of-the-art technology and compassionate care for over 25 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isLoggedIn ? (
                <button
                  onClick={() => navigate('/patient-dashboard')}
                  className="btn btn-primary"
                >
                  Go to Dashboard
                </button>
              ) : (
                <button
                  onClick={() => navigate('/register')}
                  className="btn btn-primary"
                >
                  Register New Patient
                </button>
              )}   
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-base-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-base-content mb-12">
            Why Choose ClinicCare?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <div className="mx-auto mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-content text-2xl">🏥</span>
                  </div>
                </div>
                <h3 className="card-title justify-center">Modern Facilities</h3>
                <p className="text-base-content/70">
                  Equipped with cutting-edge medical technology and comfortable facilities 
                  to ensure the best patient experience.
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <div className="mx-auto mb-4">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-secondary-content text-2xl">👨‍⚕️</span>
                  </div>
                </div>
                <h3 className="card-title justify-center">Expert Doctors</h3>
                <p className="text-base-content/70">
                  Our team of experienced specialists and general practitioners 
                  are committed to providing exceptional healthcare.
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <div className="mx-auto mb-4">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-accent-content text-2xl">⏰</span>
                  </div>
                </div>
                <h3 className="card-title justify-center">24/7 Care</h3>
                <p className="text-base-content/70">
                  Round-the-clock emergency services and patient support 
                  to ensure you're never alone in your healthcare journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-base-content mb-12">
            Our Medical Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'General Medicine', icon: '🩺' },
              { name: 'Cardiology', icon: '❤️' },
              { name: 'Pediatrics', icon: '👶' },
              { name: 'Orthopedics', icon: '🦴' },
              { name: 'Dermatology', icon: '🧴' },
              { name: 'Mental Health', icon: '🧠' },
              { name: 'Emergency Care', icon: '🚑' },
              { name: 'Laboratory', icon: '🔬' }
            ].map((service, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="card-title text-base-content">{service.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-primary text-primary-content">
        <div className="max-w-6xl mx-auto px-4">
          <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div className="stat">
              <div className="stat-value">25+</div>
              <div className="stat-desc text-primary-content/70">Years of Service</div>
            </div>
            <div className="stat">
              <div className="stat-value">50+</div>
              <div className="stat-desc text-primary-content/70">Expert Doctors</div>
            </div>
            <div className="stat">
              <div className="stat-value">10K+</div>
              <div className="stat-desc text-primary-content/70">Happy Patients</div>
            </div>
            <div className="stat">
              <div className="stat-value">24/7</div>
              <div className="stat-desc text-primary-content/70">Emergency Care</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-base-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-base-content mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-base-content/70 mb-8">
            Experience healthcare the way it should be. Join thousands of satisfied patients 
            who trust ClinicCare for their medical needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/book-appointment')}
              className="btn btn-primary"
            >
              Book Appointment
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="btn btn-outline"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
