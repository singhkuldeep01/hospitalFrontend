import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePatientStore from '../store/patientStore';
import useAuthStore from '../store/authStore';

function PatientDashboard() {
  const navigate = useNavigate();
  const { patients } = usePatientStore();
  const { isLoggedIn, user, logout } = useAuthStore();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const authData = localStorage.getItem('auth-storage');
      let patientId = null;
      
      if (authData) {
        const parsedData = JSON.parse(authData);
        patientId = parsedData?.state?.user?.id;
      }

      if (!patientId || !isLoggedIn) {
        navigate('/login');
        return;
      }

      const foundPatient = patients.find(p => p.id === patientId);
      
      if (!foundPatient) {
        logout();
        navigate('/login');
        return;
      }

      setPatient(foundPatient);
      setLoading(false);
    } catch (error) {
      console.error('Error parsing auth data:', error);
      logout();
      navigate('/login');
    }
  }, [patients, navigate, isLoggedIn, logout]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const calculateBMI = () => {
    if (patient.height && patient.weight) {
      const heightInMeters = patient.height / 100;
      const bmi = patient.weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return null;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Patient Not Found</h2>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const bmi = calculateBMI();
  const bmiInfo = bmi ? getBMICategory(parseFloat(bmi)) : null;

  // Get upcoming and recent appointments
  const upcomingAppointments = patient.appointments?.filter(apt => apt.status === 'scheduled') || [];
  const recentAppointments = patient.appointments?.filter(apt => apt.status === 'completed').slice(-3) || [];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-primary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-content/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-primary-content text-2xl">👤</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-content">Patient Dashboard</h1>
                <p className="text-primary-content/80">Welcome back, {patient.name}!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary">🆔</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-base-content/60">Patient ID</p>
                  <p className="text-lg font-semibold text-base-content">#{patient.id}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                  <span className="text-success">🩸</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-base-content/60">Blood Type</p>
                  <p className="text-lg font-semibold text-base-content">{patient.bloodType || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-secondary">🎂</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-base-content/60">Age</p>
                  <p className="text-lg font-semibold text-base-content">{patient.age} years</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent">⚖️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-base-content/60">BMI</p>
                  <p className={`text-lg font-semibold ${bmiInfo ? (bmiInfo.category === 'Normal' ? 'text-success' : 'text-warning') : 'text-base-content'}`}>
                    {bmi ? `${bmi} (${bmiInfo.category})` : 'Not calculated'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-header px-6 py-4 border-b border-base-300">
              <h2 className="card-title text-base-content">Personal Information</h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-base-content/60">Full Name</label>
                  <p className="text-base-content font-medium">{patient.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-base-content/60">Gender</label>
                  <p className="text-base-content">{patient.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-base-content/60">Height</label>
                  <p className="text-base-content">{patient.height ? `${patient.height} cm` : 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-base-content/60">Weight</label>
                  <p className="text-base-content">{patient.weight ? `${patient.weight} kg` : 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-header px-6 py-4 border-b border-base-300">
              <h2 className="card-title text-base-content">Contact Information</h2>
            </div>
            <div className="card-body space-y-4">
              <div>
                <label className="text-sm font-medium text-base-content/60">Phone Number</label>
                <p className="text-base-content">{patient.contactInfo.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-base-content/60">Email Address</label>
                <p className="text-base-content">{patient.contactInfo.email || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-header px-6 py-4 border-b border-base-300">
              <h2 className="card-title text-base-content">Emergency Contact</h2>
            </div>
            <div className="card-body space-y-4">
              {patient.emergencyContact && patient.emergencyContact.name ? (
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium text-base-content/60">Name</label>
                    <p className="text-base-content">{patient.emergencyContact.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-base-content/60">Relationship</label>
                    <p className="text-base-content">{patient.emergencyContact.relationship || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-base-content/60">Phone Number</label>
                    <p className="text-base-content">{patient.emergencyContact.phone || 'Not provided'}</p>
                  </div>
                </div>
              ) : (
                <p className="text-base-content/60 italic">No emergency contact information provided</p>
              )}
            </div>
          </div>

          {/* Medical Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-header px-6 py-4 border-b border-base-300">
              <h2 className="card-title text-base-content">Medical Information</h2>
            </div>
            <div className="card-body space-y-6">
              {/* Allergies */}
              <div>
                <label className="text-sm font-medium text-base-content/60 mb-2 block">Allergies</label>
                {patient.allergies && patient.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies.map((allergy, index) => (
                      <span key={index} className="badge badge-error gap-2">
                        {allergy}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-base-content/60 italic">No known allergies</p>
                )}
              </div>

              {/* Medical History */}
              <div>
                <label className="text-sm font-medium text-base-content/60 mb-2 block">Medical History</label>
                {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {patient.medicalHistory.map((condition, index) => (
                      <span key={index} className="badge badge-warning gap-2">
                        {condition}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-base-content/60 italic">No medical history recorded</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <div className="mt-8 card bg-base-100 shadow-xl">
            <div className="card-header px-6 py-4 border-b border-base-300">
              <h2 className="card-title text-base-content">Upcoming Appointments</h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="alert alert-info">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                      <div>
                        <label className="text-sm font-medium">Doctor</label>
                        <p className="font-medium">{appointment.doctorName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Date</label>
                        <p>{new Date(appointment.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Time</label>
                        <p>{appointment.time}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Type</label>
                        <p className="capitalize">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="mt-3 w-full">
                      <label className="text-sm font-medium">Reason</label>
                      <p>{appointment.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recent Appointments */}
        {recentAppointments.length > 0 && (
          <div className="mt-8 card bg-base-100 shadow-xl">
            <div className="card-header px-6 py-4 border-b border-base-300">
              <h2 className="card-title text-base-content">Recent Appointments</h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="alert alert-success">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                      <div>
                        <label className="text-sm font-medium">Doctor</label>
                        <p className="font-medium">{appointment.doctorName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Date</label>
                        <p>{new Date(appointment.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Time</label>
                        <p>{appointment.time}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Status</label>
                        <span className="badge badge-success">
                          Completed
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 w-full">
                      <label className="text-sm font-medium">Reason</label>
                      <p>{appointment.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Prescription Information */}
        {patient.prescription && (
          <div className="mt-8 card bg-base-100 shadow-xl">
            <div className="card-header px-6 py-4 border-b border-base-300">
              <h2 className="card-title text-base-content">Current Prescription</h2>
            </div>
            <div className="card-body">
              {patient.prescription.medications && patient.prescription.medications.length > 0 ? (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="table table-zebra">
                      <thead>
                        <tr>
                          <th>Medication</th>
                          <th>Dosage</th>
                          <th>Frequency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patient.prescription.medications.map((med, index) => (
                          <tr key={index}>
                            <td className="font-medium">{med.name}</td>
                            <td>{med.dosage}</td>
                            <td>{med.frequency}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {patient.prescription.notes && (
                    <div className="alert alert-info">
                      <h4 className="font-medium">Doctor's Notes:</h4>
                      <p>{patient.prescription.notes}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-base-content/60 italic">No current prescriptions</p>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 card bg-base-100 shadow-xl">
          <div className="card-header px-6 py-4 border-b border-base-300">
            <h2 className="card-title text-base-content">Quick Actions</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                onClick={() => navigate('/book-appointment')}
                className="btn btn-outline"
              >
                📅 Book Appointment
              </button>
              <button
                onClick={() => navigate('/appointments')}
                className="btn btn-outline"
              >
                📋 View All Appointments
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="btn btn-outline"
              >
                📞 Contact Clinic
              </button>
              <button
                onClick={() => navigate('/emergency')}
                className="btn btn-error"
              >
                🚨 Emergency
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;