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
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-content text-2xl">🏥</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Patient Login</h2>
          <p className="text-base-content/70">Access your ClinicCare dashboard</p>
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
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={loginData.phone}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
                  placeholder="Registered phone number"
                />
                {errors.phone && (
                  <span className="label-text-alt text-error">{errors.phone}</span>
                )}
              </div>

              <div className="divider">OR</div>

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
                  placeholder="Registered email address"
                />
                {errors.email && (
                  <span className="label-text-alt text-error">{errors.email}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? 'Logging in...' : 'Login to Dashboard'}
              </button>
            </form>

            <div className="divider"></div>
            <div className="text-center space-y-2">
              <p className="text-sm text-base-content/70">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="link link-primary"
                >
                  Register as new patient
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

        <div className="alert alert-warning">
          <div>
            <h3 className="font-medium">Demo Credentials:</h3>
            <div className="text-sm space-y-1 mt-2">
              <p>
                <strong>Phone:</strong> 9876543210
              </p>
              <p>
                <strong>Email:</strong> rohan.sharma@example.com
              </p>
              <p className="opacity-70 mt-2">Use these credentials to test the login functionality</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
