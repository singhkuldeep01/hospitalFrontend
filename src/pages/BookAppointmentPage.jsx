import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import usePatientStore from '../store/patientStore';

function BookAppointmentPage() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();
  const { addAppointment } = usePatientStore();
  
  const [appointmentData, setAppointmentData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: '',
    type: 'general'
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Available doctors
  const doctors = [
    { id: 1, name: 'Dr. Sharma', specialization: 'General Medicine', available: true },
    { id: 2, name: 'Dr. Mehta', specialization: 'Cardiology', available: true },
    { id: 3, name: 'Dr. Smith', specialization: 'Orthopedics', available: true },
    { id: 4, name: 'Dr. Patel', specialization: 'Pediatrics', available: true },
    { id: 5, name: 'Dr. Kumar', specialization: 'Dermatology', available: true }
  ];

  // Available time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
    '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  // Appointment types
  const appointmentTypes = [
    { value: 'general', label: 'General Checkup' },
    { value: 'followup', label: 'Follow-up' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'emergency', label: 'Emergency' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({
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
    
    if (!appointmentData.doctorId) {
      newErrors.doctorId = 'Please select a doctor';
    }
    
    if (!appointmentData.date) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(appointmentData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }
    
    if (!appointmentData.time) {
      newErrors.time = 'Please select a time';
    }
    
    if (!appointmentData.reason.trim()) {
      newErrors.reason = 'Please provide a reason for the appointment';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const selectedDoctor = doctors.find(d => d.id.toString() === appointmentData.doctorId);
      
      // Create appointment details
      const appointmentDetails = {
        doctorId: parseInt(appointmentData.doctorId),
        doctorName: selectedDoctor.name,
        date: appointmentData.date,
        time: appointmentData.time,
        reason: appointmentData.reason,
        type: appointmentData.type
      };
      
      // Add appointment to patient's record
      addAppointment(user.id, appointmentDetails);
      
      setIsLoading(false);
      setIsSuccess(true);
      
      // Reset form after 3 seconds and redirect
      setTimeout(() => {
        setIsSuccess(false);
        navigate('/patient-dashboard');
      }, 3000);
    }, 1500);   
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-success-content text-2xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-base-content mb-4">
                Appointment Booked Successfully!
              </h2>
              <p className="text-base-content/70 mb-6">
                Your appointment has been scheduled. You will receive a confirmation shortly.
              </p>
              <span className="loading loading-spinner loading-lg text-success"></span>
              <p className="text-sm text-base-content/60 mt-2">Redirecting to dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Book an Appointment
          </h1>
          <p className="text-base-content/70">
            Schedule your visit with our expert medical professionals
          </p>
        </div>

        {/* Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Doctor Selection */}
              <div className="form-control">
                <label className="label" htmlFor="doctorId">
                  <span className="label-text">Select Doctor</span>
                </label>
                <select
                  id="doctorId"
                  name="doctorId"
                  value={appointmentData.doctorId}
                  onChange={handleInputChange}
                  className={`select select-bordered ${errors.doctorId ? 'select-error' : ''}`}
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization}
                    </option>
                  ))}
                </select>
                {errors.doctorId && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.doctorId}</span>
                  </label>
                )}
              </div>

              {/* Appointment Type */}
              <div className="form-control">
                <label className="label" htmlFor="type">
                  <span className="label-text">Appointment Type</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={appointmentData.type}
                  onChange={handleInputChange}
                  className="select select-bordered"
                >
                  {appointmentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div className="form-control">
                <label className="label" htmlFor="date">
                  <span className="label-text">Preferred Date</span>
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  min={today}
                  value={appointmentData.date}
                  onChange={handleInputChange}
                  className={`input input-bordered ${errors.date ? 'input-error' : ''}`}
                />
                {errors.date && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.date}</span>
                  </label>
                )}
              </div>

              {/* Time Selection */}
              <div className="form-control">
                <label className="label" htmlFor="time">
                  <span className="label-text">Preferred Time</span>
                </label>
                <select
                  id="time"
                  name="time"
                  value={appointmentData.time}
                  onChange={handleInputChange}
                  className={`select select-bordered ${errors.time ? 'select-error' : ''}`}
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.time}</span>
                  </label>
                )}
              </div>

              {/* Reason */}
              <div className="form-control">
                <label className="label" htmlFor="reason">
                  <span className="label-text">Reason for Appointment</span>
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  rows={4}
                  value={appointmentData.reason}
                  onChange={handleInputChange}
                  className={`textarea textarea-bordered ${errors.reason ? 'textarea-error' : ''}`}
                  placeholder="Please describe your symptoms or reason for the visit..."
                />
                {errors.reason && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.reason}</span>
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex-1 btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 btn btn-primary ${isLoading ? 'loading' : ''}`}
                >
                  {isLoading ? 'Booking...' : 'Book Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Login Prompt */}
        {!isLoggedIn && (
          <div className="mt-6 alert alert-warning">
            <div>
              <strong>Note:</strong> You need to be logged in to book an appointment. 
              <button
                onClick={() => navigate('/login')}
                className="ml-1 link link-primary"
              >
                Login here
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookAppointmentPage;
// export default BookAppointmentPage;
