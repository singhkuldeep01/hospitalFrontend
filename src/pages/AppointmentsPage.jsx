import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import usePatientStore from '../store/patientStore';

function AppointmentsPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { patients, updateAppointmentStatus } = usePatientStore();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
      return;
    }

    try {
      const authData = localStorage.getItem('auth-storage');
      let patientId = null;
      if (authData) {
        const parsedData = JSON.parse(authData);
        patientId = parsedData?.state?.user?.id;
      }

      if (!patientId) {
        navigate('/login', { replace: true });
        return;
      }

      const foundPatient = patients.find(p => p.id === patientId);

      if (!foundPatient) {
        navigate('/login', { replace: true });
        return;
      }

      setPatient(foundPatient);
      setLoading(false);
    } catch (error) {
      console.error('Error parsing auth data:', error);
      navigate('/login', { replace: true });
    }
  }, [patients, navigate, isLoggedIn]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Please Login</h2>
          <button
            onClick={() => navigate('/login')}
            className="btn btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const filteredAppointments = patient.appointments?.filter((appointment) => {
    if (filter === 'all') return true;
    return appointment.status === filter;
  }) || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'badge-info';
      case 'completed':
        return 'badge-success';
      case 'cancelled':
        return 'badge-error';
      case 'pending':
        return 'badge-warning';
      default:
        return 'badge-ghost';
    }
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    updateAppointmentStatus(patient.id, appointmentId, newStatus);
    const updatedPatient = patients.find(p => p.id === patient.id);
    setPatient(updatedPatient);
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Appointments</h1>
            <p className="text-base-content/70">Manage and view all your appointment schedules</p>
          </div>
          <button
            onClick={() => navigate('/book-appointment')}
            className="btn btn-primary"
          >
            Book New Appointment
          </button>
        </div>

        <div className="tabs tabs-boxed mb-6">
          {[
            { key: 'all', label: 'All Appointments' },
            { key: 'scheduled', label: 'Scheduled' },
            { key: 'completed', label: 'Completed' },
            { key: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <a
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`tab cursor-pointer ${filter === tab.key ? 'tab-active' : ''}`}
            >
              {tab.label}
            </a>
          ))}
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="hero bg-base-100 rounded-lg">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <div className="text-6xl mb-4">📅</div>
                  <h1 className="text-2xl font-bold">No appointments found</h1>
                  <p className="text-base-content/70 mb-6">
                    {filter === 'all'
                      ? "You don't have any appointments yet."
                      : `No ${filter} appointments found.`}
                  </p>
                  <button
                    onClick={() => navigate('/book-appointment')}
                    className="btn btn-primary"
                  >
                    Book Your First Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="card-title">{appointment.doctorName}</h3>
                    <div className={`badge ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="stat">
                      <div className="stat-title">Date</div>
                      <div className="stat-value text-base">{formatDate(appointment.date)}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Time</div>
                      <div className="stat-value text-base">{appointment.time}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Type</div>
                      <div className="stat-value text-base capitalize">{appointment.type}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Reason</p>
                    <p>{appointment.reason}</p>
                  </div>

                  {appointment.status === 'scheduled' && (
                    <div className="card-actions justify-end">
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'completed')}
                        className="btn btn-success btn-sm"
                      >
                        Mark Complete
                      </button>
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                        className="btn btn-error btn-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentsPage;
