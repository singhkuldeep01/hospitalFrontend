import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePatientStore from '../store/patientStore';

function DoctorDashboard() {
  const navigate = useNavigate();
  const { patients } = usePatientStore();
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleLogout = () => {
    navigate('/');
  };

  const openPatientDetails = (patient) => {
    setSelectedPatient(patient);
  };

  const closePatientDetails = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-secondary text-secondary-content shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-secondary-content/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-secondary-content text-2xl">👨‍⚕️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-secondary-content">Doctor Dashboard</h1>
                <p className="text-secondary-content/80">Manage your patients and appointments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-value text-primary">{patients.length}</div>
            <div className="stat-desc">Total Patients</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-value text-secondary">
              {patients.reduce((acc, p) => acc + (p.appointments?.length || 0), 0)}
            </div>
            <div className="stat-desc">Total Appointments</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-value text-accent">
              {patients.filter(p => p.appointments?.some(a => a.status === 'scheduled')).length}
            </div>
            <div className="stat-desc">Scheduled Today</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-value text-success">
              {patients.reduce((acc, p) => acc + (p.appointments?.filter(a => a.status === 'completed').length || 0), 0)}
            </div>
            <div className="stat-desc">Completed</div>
          </div>
        </div>

        {/* Patients List */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-header px-6 py-4 border-b border-base-300">
            <h2 className="card-title text-base-content">All Patients</h2>
          </div>
          <div className="card-body">
            {patients.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-base-content/60">No patients registered yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Patient ID</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Blood Type</th>
                      <th>Contact</th>
                      <th>Appointments</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="font-mono">#{patient.id}</td>
                        <td className="font-medium">{patient.name}</td>
                        <td>{patient.age}</td>
                        <td>{patient.gender}</td>
                        <td>
                          <span className="badge badge-outline">
                            {patient.bloodType || 'N/A'}
                          </span>
                        </td>
                        <td>{patient.contactInfo.phone}</td>
                        <td>
                          <span className="badge badge-info">
                            {patient.appointments?.length || 0}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openPatientDetails(patient)}
                              className="btn btn-sm btn-primary"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => navigate(`/edit-prescription/${patient.id}`)}
                              className="btn btn-sm btn-secondary"
                            >
                              {patient.prescription ? 'Edit Rx' : 'Add Rx'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-5xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Patient Details</h3>
              <button onClick={closePatientDetails} className="btn btn-sm btn-circle">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="card-title">Personal Information</h4>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {selectedPatient.name}</p>
                    <p><strong>Age:</strong> {selectedPatient.age}</p>
                    <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                    <p><strong>Blood Type:</strong> {selectedPatient.bloodType || 'Not specified'}</p>
                    <p><strong>Height:</strong> {selectedPatient.height ? `${selectedPatient.height} cm` : 'Not specified'}</p>
                    <p><strong>Weight:</strong> {selectedPatient.weight ? `${selectedPatient.weight} kg` : 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="card-title">Contact Information</h4>
                  <div className="space-y-2">
                    <p><strong>Phone:</strong> {selectedPatient.contactInfo.phone}</p>
                    <p><strong>Email:</strong> {selectedPatient.contactInfo.email || 'Not provided'}</p>
                    {selectedPatient.emergencyContact?.name && (
                      <>
                        <div className="divider">Emergency Contact</div>
                        <p><strong>Name:</strong> {selectedPatient.emergencyContact.name}</p>
                        <p><strong>Relationship:</strong> {selectedPatient.emergencyContact.relationship}</p>
                        <p><strong>Phone:</strong> {selectedPatient.emergencyContact.phone}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="card-title">Medical Information</h4>
                  <div className="space-y-3">
                    <div>
                      <strong>Allergies:</strong>
                      {selectedPatient.allergies && selectedPatient.allergies.length > 0 ? (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedPatient.allergies.map((allergy, index) => (
                            <span key={index} className="badge badge-error badge-sm">
                              {allergy}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-base-content/60 ml-2">None</span>
                      )}
                    </div>
                    <div>
                      <strong>Medical History:</strong>
                      {selectedPatient.medicalHistory && selectedPatient.medicalHistory.length > 0 ? (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedPatient.medicalHistory.map((condition, index) => (
                            <span key={index} className="badge badge-warning badge-sm">
                              {condition}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-base-content/60 ml-2">None</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointments */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="card-title">Appointments</h4>
                  {selectedPatient.appointments && selectedPatient.appointments.length > 0 ? (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedPatient.appointments.map((appointment, index) => (
                        <div key={index} className="p-2 bg-base-100 rounded">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{appointment.doctorName}</span>
                            <span className={`badge badge-sm ${
                              appointment.status === 'completed' ? 'badge-success' :
                              appointment.status === 'scheduled' ? 'badge-info' :
                              'badge-error'
                            }`}>
                              {appointment.status}
                            </span>
                          </div>
                          <p className="text-sm text-base-content/70">
                            {appointment.date} at {appointment.time}
                          </p>
                          <p className="text-sm">{appointment.reason}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-base-content/60">No appointments</p>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button onClick={closePatientDetails} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorDashboard;
