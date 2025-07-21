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

  const doctors = [
    { id: 1, name: 'Dr. Sharma', specialization: 'General Medicine' },
    { id: 2, name: 'Dr. Mehta', specialization: 'Cardiology' },
    { id: 3, name: 'Dr. Smith', specialization: 'Orthopedics' },
    { id: 4, name: 'Dr. Patel', specialization: 'Pediatrics' },
    { id: 5, name: 'Dr. Kumar', specialization: 'Dermatology' }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
    '11:30 AM', '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM',
    '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  const appointmentTypes = [
    { value: 'general', label: 'General Checkup' },
    { value: 'followup', label: 'Follow-up' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'emergency', label: 'Emergency' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!appointmentData.doctorId) newErrors.doctorId = 'Select a doctor';
    if (!appointmentData.date) newErrors.date = 'Select a date';
    else if (new Date(appointmentData.date) < new Date().setHours(0, 0, 0, 0)) newErrors.date = 'Choose a future date';
    if (!appointmentData.time) newErrors.time = 'Select a time';
    if (!appointmentData.reason.trim()) newErrors.reason = 'Provide a reason';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) return navigate('/login');
    if (!validateForm()) return;
    setIsLoading(true);

    setTimeout(() => {
      const selectedDoctor = doctors.find(d => d.id.toString() === appointmentData.doctorId);
      addAppointment(user.id, {
        doctorId: parseInt(appointmentData.doctorId),
        doctorName: selectedDoctor.name,
        date: appointmentData.date,
        time: appointmentData.time,
        reason: appointmentData.reason,
        type: appointmentData.type
      });
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        navigate('/patient-dashboard');
      }, 2500);
    }, 1200);
  };

  const today = new Date().toISOString().split('T')[0];

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="max-w-sm w-full card bg-base-100 shadow-md text-center p-8">
          <div className="text-success mb-4">✓</div>
          <h2 className="font-bold text-xl">Appointment Booked!</h2>
          <p className="text-base-content/70 mt-2">Redirecting to dashboard...</p>
          <div className="mt-4 loading loading-spinner text-success"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold">Book Appointment</h1>
          <p className="text-base-content/70">Schedule your visit with ease</p>
        </div>

        <div className="card bg-base-100 p-6 shadow-md space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="doctorId"
              value={appointmentData.doctorId}
              onChange={handleInputChange}
              className={`select select-bordered w-full ${errors.doctorId ? 'select-error' : ''}`}
            >
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>{`${d.name} (${d.specialization})`}</option>
              ))}
            </select>
            {errors.doctorId && <p className="text-error text-sm">{errors.doctorId}</p>}

            <select
              name="type"
              value={appointmentData.type}
              onChange={handleInputChange}
              className="select select-bordered w-full"
            >
              {appointmentTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              min={today}
              value={appointmentData.date}
              onChange={handleInputChange}
              className={`input input-bordered w-full ${errors.date ? 'input-error' : ''}`}
            />
            {errors.date && <p className="text-error text-sm">{errors.date}</p>}

            <select
              name="time"
              value={appointmentData.time}
              onChange={handleInputChange}
              className={`select select-bordered w-full ${errors.time ? 'select-error' : ''}`}
            >
              <option value="">Select Time</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.time && <p className="text-error text-sm">{errors.time}</p>}

            <textarea
              name="reason"
              rows="3"
              value={appointmentData.reason}
              onChange={handleInputChange}
              placeholder="Reason for visit..."
              className={`textarea textarea-bordered w-full ${errors.reason ? 'textarea-error' : ''}`}
            />
            {errors.reason && <p className="text-error text-sm">{errors.reason}</p>}

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => navigate('/')} className="btn btn-outline w-1/2">Cancel</button>
              <button type="submit" disabled={isLoading} className={`btn btn-primary w-1/2 ${isLoading ? 'loading' : ''}`}>
                {isLoading ? 'Booking...' : 'Book Now'}
              </button>
            </div>
          </form>
        </div>

        {!isLoggedIn && (
          <div className="alert alert-warning mt-4 text-sm">
            You must{' '}
            <button onClick={() => navigate('/login')} className="link link-primary">Login</button>{' '}
            to book an appointment.
          </div>
        )}
      </div>
    </div>
  );
}

export default BookAppointmentPage;
