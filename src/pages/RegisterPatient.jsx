import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePatientStore from '../store/patientStore';
import useAuthStore from '../store/authStore';

function RegisterPatient() {
  const navigate = useNavigate();
  const { addPatient } = usePatientStore();
  const { login } = useAuthStore();
  
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    bloodType: '',
    phone: '',
    email: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    allergies: '',
    medicalHistory: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!patientData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!patientData.age || patientData.age < 1 || patientData.age > 120) {
      newErrors.age = 'Please enter a valid age';
    }
    
    if (!patientData.gender) {
      newErrors.gender = 'Please select gender';
    }
    
    if (!patientData.phone || !/^\d{10}$/.test(patientData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (patientData.email && !/\S+@\S+\.\S+/.test(patientData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        const newPatient = {
          id: Date.now(), // Simple ID generation
          name: patientData.name,
          age: parseInt(patientData.age),
          gender: patientData.gender,
          height: patientData.height ? parseInt(patientData.height) : null,
          weight: patientData.weight ? parseInt(patientData.weight) : null,
          bloodType: patientData.bloodType || null,
          contactInfo: {
            phone: patientData.phone,
            email: patientData.email || null
          },
          emergencyContact: {
            name: patientData.emergencyContactName || null,
            relationship: patientData.emergencyContactRelation || null,
            phone: patientData.emergencyContactPhone || null
          },
          allergies: patientData.allergies ? patientData.allergies.split(',').map(a => a.trim()) : [],
          medicalHistory: patientData.medicalHistory ? patientData.medicalHistory.split(',').map(h => h.trim()) : [],
          appointments: [],
          prescription: null
        };
        
        // Add patient to store
        addPatient(newPatient);
        
        // Auto-login the new patient
        const userData = {
          id: newPatient.id,
          name: newPatient.name,
          email: newPatient.contactInfo.email,
          phone: newPatient.contactInfo.phone
        };
        
        login(userData);
        setIsLoading(false);
        navigate('/patient-dashboard');
      } catch (error) {
        setErrors({ general: 'Registration failed. Please try again.' });
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-content text-2xl font-bold">+</span>
          </div>
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Patient Registration
          </h1>
          <p className="text-base-content/70">
            Create your ClinicCare patient account
          </p>
        </div>

        {/* Registration Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="alert alert-error">
                  <span>{errors.general}</span>
                </div>
              )}

              {/* Personal Information */}
              <div className="divider">Personal Information</div>
              
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={patientData.name}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.name}</span>
                  </label>
                )}
              </div>

              {/* Age and Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Age *</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={patientData.age}
                    onChange={handleInputChange}
                    className={`input input-bordered w-full ${errors.age ? 'input-error' : ''}`}
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                  />
                  {errors.age && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.age}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Gender *</span>
                  </label>
                  <select
                    name="gender"
                    value={patientData.gender}
                    onChange={handleInputChange}
                    className={`select select-bordered w-full ${errors.gender ? 'select-error' : ''}`}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.gender}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Height, Weight, Blood Type */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Height (cm)</span>
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={patientData.height}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Height in cm"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Weight (kg)</span>
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={patientData.weight}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Weight in kg"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Blood Type</span>
                  </label>
                  <select
                    name="bloodType"
                    value={patientData.bloodType}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="divider">Contact Information</div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={patientData.phone}
                    onChange={handleInputChange}
                    className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.phone}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={patientData.email}
                    onChange={handleInputChange}
                    className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.email}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="divider">Emergency Contact</div>

              <div className="grid grid-cols-1 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Contact Name</span>
                  </label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={patientData.emergencyContactName}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Emergency contact name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Relationship</span>
                    </label>
                    <input
                      type="text"
                      name="emergencyContactRelation"
                      value={patientData.emergencyContactRelation}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="Relationship"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Contact Phone</span>
                    </label>
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={patientData.emergencyContactPhone}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="Emergency contact phone"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="divider">Medical Information</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Allergies</span>
                  </label>
                  <textarea
                    name="allergies"
                    value={patientData.allergies}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered w-full"
                    placeholder="List any allergies (comma separated)"
                    rows="3"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Medical History</span>
                  </label>
                  <textarea
                    name="medicalHistory"
                    value={patientData.medicalHistory}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered w-full"
                    placeholder="List any medical conditions (comma separated)"
                    rows="3"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                >
                  {isLoading ? 'Creating Account...' : 'Register Patient'}
                </button>
              </div>
            </form>

            <div className="divider"></div>
            <div className="text-center">
              <p className="text-sm text-base-content/70">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="link link-primary"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPatient;