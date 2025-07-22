import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import doctorData from '../data/doctorData';

function DoctorLoginPage() {
  const navigate = useNavigate();
  const { doctorLogin } = useAuthStore();
  
  const [loginData, setLoginData] = useState({ 
    email: '', 
    password: '' 
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    setTimeout(() => {
      // Find doctor by email and password
      const doctor = doctorData.find(d => 
        d.email === loginData.email && d.password === loginData.password
      );

      if (doctor) {
        // Login as doctor
        const doctorLoginData = {
          id: doctor.id,
          name: doctor.name,
          email: doctor.email,
          specialization: doctor.specialization,
          role: 'doctor'
        };
        
        doctorLogin(doctorLoginData);
        navigate('/doctor-dashboard');
      } else {
        setErrors({
          general: 'Invalid credentials. Please check your email and password.'
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-secondary-content text-2xl">👨‍⚕️</span>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-base-content">Doctor Login</h2>
          <p className="text-base-content/70">Access your medical dashboard</p>
        </div>

        {/* Login Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="alert alert-error">
                  <span>{errors.general}</span>
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span className="label-text-alt text-error">{errors.email}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <span className="label-text-alt text-error">{errors.password}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`btn btn-secondary w-full ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? 'Logging in...' : 'Login to Dashboard'}
              </button>
            </form>

            <div className="divider"></div>
            <div className="text-center space-y-2">
              <p className="text-sm text-base-content/70">
                Patient?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="link link-primary"
                >
                  Patient Login
                </button>
              </p>
              <p className="text-sm text-base-content/70">
                Need help?{' '}
                <button
                  onClick={() => navigate('/contact')}
                  className="link link-primary"
                >
                  Contact support
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="alert alert-info">
          <div>
            <h3 className="font-medium">Demo Doctor Credentials:</h3>
            <div className="text-sm space-y-1 mt-2">
              <p><strong>Dr. Sharma:</strong> dr.sharma@cliniccare.com / sharma123</p>
              <p><strong>Dr. Mehta:</strong> dr.mehta@cliniccare.com / mehta123</p>
              <p><strong>Dr. Smith:</strong> dr.smith@cliniccare.com / smith123</p>
              <p className="opacity-70 mt-2">Use any doctor's credentials to login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorLoginPage;
