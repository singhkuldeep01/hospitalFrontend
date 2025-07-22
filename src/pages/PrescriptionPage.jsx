import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import usePatientStore from '../store/patientStore';

function PrescriptionPage() {
  const navigate = useNavigate();
  const { isLoggedIn, user, isPatient } = useAuthStore();
  const { patients } = usePatientStore();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !isPatient()) {
      navigate('/login');
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
        navigate('/login');
        return;
      }

      const foundPatient = patients.find(p => p.id === patientId);
      
      if (!foundPatient) {
        navigate('/login');
        return;
      }

      setPatient(foundPatient);
      setLoading(false);
    } catch (error) {
      console.error('Error parsing auth data:', error);
      navigate('/login');
    }
  }, [patients, navigate, isLoggedIn, isPatient]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-base-content mb-4">Patient Not Found</h2>
          <button
            onClick={() => navigate('/login')}
            className="btn btn-primary"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-base-content mb-2">
              My Prescriptions
            </h1>
            <p className="text-base-content/70">
              View your current and past prescriptions
            </p>
          </div>
          <button
            onClick={() => navigate('/patient-dashboard')}
            className="btn btn-outline"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Current Prescription */}
        {patient.prescription && patient.prescription.medications && patient.prescription.medications.length > 0 ? (
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-header px-6 py-4 border-b border-base-300">
              <h2 className="card-title text-base-content">Current Prescription</h2>
              <div className="badge badge-success">Active</div>
            </div>
            <div className="card-body">
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Medication</th>
                      <th>Dosage</th>
                      <th>Frequency</th>
                      <th>Instructions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.prescription.medications.map((med, index) => (
                      <tr key={index}>
                        <td>
                          <div className="font-bold">{med.name}</div>
                          <div className="text-sm opacity-50">{med.type || 'Tablet'}</div>
                        </td>
                        <td>{med.dosage}</td>
                        <td>
                          <span className="badge badge-outline">{med.frequency}</span>
                        </td>
                        <td>{med.instructions || 'Take as directed'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {patient.prescription.notes && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-base-content mb-2">Doctor's Notes</h4>
                  <div className="alert alert-info">
                    <p>{patient.prescription.notes}</p>
                  </div>
                </div>
              )}

              {patient.prescription.prescribedBy && (
                <div className="mt-4">
                  <p className="text-sm text-base-content/70">
                    Prescribed by: <span className="font-medium">{patient.prescription.prescribedBy}</span>
                  </p>
                  {patient.prescription.prescribedDate && (
                    <p className="text-sm text-base-content/70">
                      Date: <span className="font-medium">{new Date(patient.prescription.prescribedDate).toLocaleDateString()}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body text-center py-12">
              <div className="text-6xl mb-4">💊</div>
              <h2 className="text-2xl font-bold text-base-content mb-4">No Active Prescriptions</h2>
              <p className="text-base-content/70 mb-6">
                You currently don't have any active prescriptions. Book an appointment with a doctor to get a prescription.
              </p>
              <button
                onClick={() => navigate('/book-appointment')}
                className="btn btn-primary"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}

        {/* Prescription History */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-header px-6 py-4 border-b border-base-300">
            <h2 className="card-title text-base-content">Prescription History</h2>
          </div>
          <div className="card-body">
            {patient.prescriptionHistory && patient.prescriptionHistory.length > 0 ? (
              <div className="space-y-4">
                {patient.prescriptionHistory.map((prescription, index) => (
                  <div key={index} className="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                      <div className="flex justify-between items-center">
                        <span>Prescription #{index + 1}</span>
                        <div className="flex gap-2">
                          <span className="badge badge-ghost">
                            {new Date(prescription.date).toLocaleDateString()}
                          </span>
                          <span className="badge badge-outline">
                            {prescription.prescribedBy}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="collapse-content">
                      <div className="overflow-x-auto">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Medication</th>
                              <th>Dosage</th>
                              <th>Frequency</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prescription.medications.map((med, medIndex) => (
                              <tr key={medIndex}>
                                <td>{med.name}</td>
                                <td>{med.dosage}</td>
                                <td>{med.frequency}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {prescription.notes && (
                        <div className="mt-3">
                          <p className="text-sm"><strong>Notes:</strong> {prescription.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-base-content/60">No prescription history available.</p>
              </div>
            )}
          </div>
        </div>

        {/* Important Information */}
        <div className="alert alert-warning mt-8">
          <div>
            <h3 className="font-bold">Important Reminders:</h3>
            <ul className="text-sm mt-2 space-y-1">
              <li>• Take medications exactly as prescribed by your doctor</li>
              <li>• Complete the full course even if you feel better</li>
              <li>• Contact your doctor if you experience any side effects</li>
              <li>• Keep medications in a cool, dry place away from children</li>
              <li>• Never share your medications with others</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrescriptionPage;
