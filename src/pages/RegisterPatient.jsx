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

  const [allergyInput, setAllergyInput] = useState('');
  const [medicalHistoryInput, setMedicalHistoryInput] = useState('');

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other'];
  const relationships = ['Spouse', 'Parent', 'Sibling', 'Child', 'Friend', 'Other'];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Convert age, height, weight to numbers
    const patientData = {
      ...formData,
      age: parseInt(formData.age),
      height: formData.height ? parseInt(formData.height) : '',
      weight: formData.weight ? parseInt(formData.weight) : '',
    };

    // Add patient to store
    addPatient(patientData);
    
    alert('Patient registered successfully!');
    navigate('/patients');
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="avatar placeholder mb-4">
            <div className="w-16 h-16 bg-primary rounded-full">
              <span className="text-primary-content text-2xl">+</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-base-content mb-3">
            Patient Registration
          </h1>
          <p className="text-base-content/70 text-lg">
            Create your ClinicCare patient account
          </p>
        </div>

        {/* Registration Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.name}</span>
                  </label>
                )}
              </div>

              {/* Age */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={`input input-bordered ${errors.age ? 'input-error' : ''}`}
                  placeholder="Enter your age"
                />
                {errors.age && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.age}</span>
                  </label>
                )}
              </div>

              {/* Gender */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`select select-bordered ${errors.gender ? 'select-error' : ''}`}
                >
                  <option value="">Select Gender</option>
                  {genders.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
                {errors.gender && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.gender}</span>
                  </label>
                )}
              </div>

              {/* Blood Type */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Blood Type</span>
                </label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  className="select select-bordered"
                >
                  <option value="">Select Blood Type</option>
                  {bloodTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Height */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Height (cm)</span>
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="Enter height in cm"
                />
              </div>

              {/* Weight */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Weight (kg)</span>
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="Enter weight in kg"
                />
              </div>

              {/* Phone Number */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  name="contactInfo.phone"
                  value={formData.contactInfo.phone}
                  onChange={handleInputChange}
                  className={`input input-bordered ${errors.phone ? 'input-error' : ''}`}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.phone}</span>
                  </label>
                )}
              </div>

              {/* Email Address */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  name="contactInfo.email"
                  value={formData.contactInfo.email}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="Enter email address"
                />
              </div>

              {/* Emergency Contact Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Emergency Contact Name</span>
                </label>
                <input
                  type="text"
                  name="emergencyContact.name"
                  value={formData.emergencyContact.name}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="Enter emergency contact name"
                />
              </div>

              {/* Emergency Contact Relationship */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Relationship</span>
                </label>
                <select
                  name="emergencyContact.relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleInputChange}
                  className="select select-bordered"
                >
                  <option value="">Select Relationship</option>
                  {relationships.map(rel => (
                    <option key={rel} value={rel}>{rel}</option>
                  ))}
                </select>
              </div>

              {/* Emergency Contact Phone */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Emergency Contact Phone</span>
                </label>
                <input
                  type="tel"
                  name="emergencyContact.phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="Enter emergency contact phone"
                />
              </div>

              {/* Allergies */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Allergies</span>
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
                    className="input input-bordered flex-1"
                    placeholder="Enter allergy"
                  />
                  <button
                    type="button"
                    onClick={addAllergy}
                    className="btn btn-primary"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.allergies.map((allergy, index) => (
                    <span key={index} className="badge badge-error">
                      {allergy}
                      <button
                        type="button"
                        onClick={() => removeAllergy(allergy)}
                        className="btn btn-sm btn-circle btn-error"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Medical History */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Medical History</span>
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={medicalHistoryInput}
                    onChange={(e) => setMedicalHistoryInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMedicalHistory())}
                    className="input input-bordered flex-1"
                    placeholder="Enter medical condition"
                  />
                  <button
                    type="button"
                    onClick={addMedicalHistory}
                    className="btn btn-primary"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.medicalHistory.map((condition, index) => (
                    <span key={index} className="badge badge-warning">
                      {condition}
                      <button
                        type="button"
                        onClick={() => removeMedicalHistory(condition)}
                        className="btn btn-sm btn-circle btn-warning"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                >
                  {isLoading ? 'Creating Account...' : 'Register Patient'}
                </button>
              </div>
            </form>

            <div className="divider my-8"></div>
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