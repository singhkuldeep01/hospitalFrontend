import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function HomePage() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();

  const services = [
    { name: 'General Medicine', icon: '⚕️', color: 'from-blue-500 to-blue-600' },
    { name: 'Cardiology', icon: '💟', color: 'from-rose-500 to-rose-600' },
    { name: 'Pediatrics', icon: '🧒', color: 'from-amber-500 to-amber-600' },
    { name: 'Orthopedics', icon: '🦾', color: 'from-emerald-500 to-emerald-600' },
    { name: 'Dermatology', icon: '🧬', color: 'from-pink-500 to-pink-600' },
    { name: 'Mental Health', icon: '🧠', color: 'from-purple-500 to-purple-600' },
    { name: 'Emergency Care', icon: '🏥', color: 'from-red-500 to-red-600' },
    { name: 'Laboratory', icon: '🔬', color: 'from-indigo-500 to-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-screen relative overflow-hidden">
        {/* Enhanced Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--p),0.05),transparent_70%)]"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-primary/5"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMjhWMTBtMCA0MFYzMm0tMi02aDRNNSAzMGg4bTM0IDBoOCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-20"></div>
        </div>

        <div className="hero-content text-center relative z-10">
          <div className="max-w-md">
            <h1 className="text-6xl font-black text-base-content tracking-tight">
              Welcome to <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ClinicCare
                <div className="absolute -inset-1 bg-primary/5 blur-xl -z-10"></div>
              </span>
            </h1>
            <p className="py-8 text-base-content/80 text-lg leading-relaxed">
              Your trusted healthcare partner providing comprehensive medical services with 
              state-of-the-art technology and compassionate care for over 25 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {isLoggedIn ? (
                <button
                  onClick={() => navigate('/patient-dashboard')}
                  className="btn btn-primary btn-lg shadow-lg hover:shadow-primary/50 transition-all duration-300"
                >
                  Go to Dashboard
                </button>
              ) : (
                <button
                  onClick={() => navigate('/register')}
                  className="btn btn-primary btn-lg shadow-lg hover:shadow-primary/50 transition-all duration-300"
                >
                  Register New Patient
                </button>
              )}   
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-base-100 to-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center text-base-content mb-16 tracking-tight">
            Why Choose <span className="text-primary">ClinicCare</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="mx-auto mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center transform rotate-45">
                    <span className="text-white text-2xl -rotate-45">🏥</span>
                  </div>
                </div>
                <h3 className="card-title justify-center">Modern Facilities</h3>
                <p className="text-base-content/70">
                  Equipped with cutting-edge medical technology and comfortable facilities 
                  to ensure the best patient experience.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="mx-auto mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center transform rotate-45">
                    <span className="text-white text-2xl -rotate-45">👨‍⚕️</span>
                  </div>
                </div>
                <h3 className="card-title justify-center">Expert Doctors</h3>
                <p className="text-base-content/70">
                  Our team of experienced specialists and general practitioners 
                  are committed to providing exceptional healthcare.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="mx-auto mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center transform rotate-45">
                    <span className="text-white text-2xl -rotate-45">⏰</span>
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
      <div className="py-24 bg-gradient-to-t from-base-200 via-base-100 to-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-16 tracking-tight">
            Our Medical <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Services</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="card-body items-center text-center p-8">
                  <div className={`w-14 h-14 mb-4 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="card-title text-xl font-bold text-base-content">{service.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 bg-gradient-to-r from-primary via-secondary to-accent text-primary-content relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="stats stats-vertical lg:stats-horizontal shadow-2xl bg-base-100/20 backdrop-blur">
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
      <div className="py-24 bg-gradient-to-b from-base-200 to-base-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold mb-8 tracking-tight">
            Ready to Get <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Started?</span>
          </h2>
          <p className="text-xl text-base-content/70 mb-12 leading-relaxed">
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
              className="btn btn-outline btn-lg hover:shadow-lg transition-all duration-300"
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
