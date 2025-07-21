import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePatientStore from '../store/patientStore';
import useAuthStore from '../store/authStore';

function LoginPage() {
  const navigate = useNavigate();
  const { patients } = usePatientStore();
  const { login } = useAuthStore();

  const [loginData, setLoginData] = useState({ phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!loginData.phone && !loginData.email) {
      newErrors.general = 'Please enter either phone number or email address';
    }
    if (loginData.phone && !/^\d{10}$/.test(loginData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (loginData.email && !/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    setTimeout(() => {
      const patient = patients.find(
        (p) =>
          (loginData.phone && p.contactInfo.phone === loginData.phone) ||
          (loginData.email && p.contactInfo.email === loginData.email)
      );
      if (patient) {
        login({
          id: patient.id,
          name: patient.name,
          email: patient.contactInfo.email,
          phone: patient.contactInfo.phone
        });
        navigate('/patient-dashboard');
      } else {
        setErrors({
          general:
            'No patient found with these credentials. Please check your information or register as a new patient.'
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <span className="text-primary-content text-2xl">🏥</span>
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-2">
            Patient Login
          </h2>
          <p className="text-base-content/70">
            Access your ClinicCare patient dashboard
          </p>
        </div>

        {/* Enhanced Login Form */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="alert alert-error shadow-lg">
                  <div>
                    <span className="text-lg mr-2">⚠️</span>
                    <span>{errors.general}</span>
                  </div>
                </div>
              )}

              <div className="form-control">
                <label className="label" htmlFor="phone">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={loginData.phone}
                  onChange={handleInputChange}
                  className={`input input-bordered ${errors.phone ? 'input-error' : ''}`}
                  placeholder="Enter your registered phone number"
                />
                {errors.phone && (
                  <span className="label-text-alt text-error">{errors.phone}</span>
                )}
              </div>

              {/* OR Divider */}
              <div className="divider">OR</div>

              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                  placeholder="Enter your registered email address"
                />
                {errors.email && (
                  <span className="label-text-alt text-error">{errors.email}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                >
                  {isLoading ? 'Logging in...' : 'Login to Dashboard'}
                </button>
              </div>
            </form>

            {/* Footer Links */}
            <div className="divider"></div>
            <div className="text-center space-y-2">
              <p className="text-sm text-base-content/70">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="link link-primary font-medium hover:text-primary/80 transition-colors"
                >
                  Register as new patient
                </button>
              </p>
              <p className="text-base-content/70">
                Need help?{' '}
                <button
                  onClick={() => navigate('/contact')}
                  className="link link-primary font-medium hover:text-primary/80 transition-colors"
                >
                  Contact support
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="alert alert-warning">
          <div>
            <h3 className="font-medium">Demo Credentials:</h3>
            <div className="text-sm space-y-1 mt-2">
              <p><strong>Phone:</strong> 9876543210</p>
              <p><strong>Email:</strong> rohan.sharma@example.com</p>
              <p className="opacity-70 mt-2">Use these credentials to test the login functionality</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
