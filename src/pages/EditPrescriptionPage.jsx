import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import usePatientStore from '../store/patientStore';

function EditPrescriptionPage() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const { isLoggedIn, user, isDoctor } = useAuthStore();
  const { patients, addPrescription, updatePrescription, deletePrescription } = usePatientStore();
  
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [medications, setMedications] = useState([
    { name: '', dosage: '', frequency: '', instructions: '', type: 'Tablet' }
  ]);
  const [notes, setNotes] = useState('');
  const [prescribedBy, setPrescribedBy] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !isDoctor()) {
      navigate('/doctor-login');
      return;
    }

    const foundPatient = patients.find(p => p.id.toString() === patientId);
    if (!foundPatient) {
      navigate('/doctor-dashboard');
      return;
    }

    setPatient(foundPatient);
    setPrescribedBy(user?.name || 'Dr. Admin');

    // Load existing prescription if available
    if (foundPatient.prescription) {
      setMedications(foundPatient.prescription.medications || []);
      setNotes(foundPatient.prescription.notes || '');
      setPrescribedBy(foundPatient.prescription.prescribedBy || user?.name || 'Dr. Admin');
    }

    setLoading(false);
  }, [patientId, patients, navigate, isLoggedIn, isDoctor, user]);

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', instructions: '', type: 'Tablet' }]);
  };

  const removeMedication = (index) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  const updateMedication = (index, field, value) => {
    const newMedications = medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setMedications(newMedications);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validMedications = medications.filter(med => med.name.trim() && med.dosage.trim() && med.frequency.trim());

    if (validMedications.length === 0) {
      alert('Please add at least one valid medication');
      setIsSubmitting(false);
      return;
    }

    const prescriptionData = {
      medications: validMedications,
      notes: notes.trim(),
      prescribedBy: prescribedBy
    };

    try {
      if (patient.prescription) {
        updatePrescription(patient.id, prescriptionData);
      } else {
        addPrescription(patient.id, prescriptionData);
      }

      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/doctor-dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error saving prescription:', error);
      setIsSubmitting(false);
    }
  };

  const handleDeletePrescription = () => {
    if (window.confirm('Are you sure you want to delete this prescription?')) {
      deletePrescription(patient.id);
      navigate('/doctor-dashboard');
    }
  };

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
          <button onClick={() => navigate('/doctor-dashboard')} className="btn btn-primary">
            Back to Dashboard
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
              {patient.prescription ? 'Edit Prescription' : 'Create Prescription'}
            </h1>
            <p className="text-base-content/70">
              Patient: <span className="font-medium">{patient.name}</span> (ID: #{patient.id})
            </p>
          </div>
          <button
            onClick={() => navigate('/doctor-dashboard')}
            className="btn btn-outline"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Patient Info Card */}
        <div className="card bg-base-100 shadow-lg mb-6">
          <div className="card-body">
            <h3 className="card-title">Patient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <strong>Age:</strong> {patient.age}
              </div>
              <div>
                <strong>Blood Type:</strong> {patient.bloodType || 'N/A'}
              </div>
              <div>
                <strong>Allergies:</strong> {patient.allergies?.join(', ') || 'None'}
              </div>
            </div>
          </div>
        </div>

        {/* Prescription Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Prescribed By */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Prescribed By</span>
                </label>
                <input
                  type="text"
                  value={prescribedBy}
                  onChange={(e) => setPrescribedBy(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Medications */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Medications</h3>
                  <button
                    type="button"
                    onClick={addMedication}
                    className="btn btn-primary btn-sm"
                  >
                    Add Medication
                  </button>
                </div>

                <div className="space-y-4">
                  {medications.map((medication, index) => (
                    <div key={index} className="card bg-base-200 p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Medication Name</span>
                          </label>
                          <input
                            type="text"
                            value={medication.name}
                            onChange={(e) => updateMedication(index, 'name', e.target.value)}
                            className="input input-bordered input-sm w-full"
                            placeholder="Medicine name"
                            required
                          />
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Type</span>
                          </label>
                          <select
                            value={medication.type}
                            onChange={(e) => updateMedication(index, 'type', e.target.value)}
                            className="select select-bordered select-sm w-full"
                          >
                            <option value="Tablet">Tablet</option>
                            <option value="Capsule">Capsule</option>
                            <option value="Syrup">Syrup</option>
                            <option value="Injection">Injection</option>
                            <option value="Inhaler">Inhaler</option>
                            <option value="Drops">Drops</option>
                            <option value="Cream">Cream</option>
                            <option value="Ointment">Ointment</option>
                          </select>
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Dosage</span>
                          </label>
                          <input
                            type="text"
                            value={medication.dosage}
                            onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                            className="input input-bordered input-sm w-full"
                            placeholder="e.g., 10mg"
                            required
                          />
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Frequency</span>
                          </label>
                          <select
                            value={medication.frequency}
                            onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                            className="select select-bordered select-sm w-full"
                            required
                          >
                            <option value="">Select frequency</option>
                            <option value="Once daily">Once daily</option>
                            <option value="Twice daily">Twice daily</option>
                            <option value="Three times daily">Three times daily</option>
                            <option value="Four times daily">Four times daily</option>
                            <option value="As needed">As needed</option>
                            <option value="Before meals">Before meals</option>
                            <option value="After meals">After meals</option>
                            <option value="At bedtime">At bedtime</option>
                          </select>
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Action</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => removeMedication(index)}
                            className="btn btn-error btn-sm"
                            disabled={medications.length === 1}
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="form-control mt-3">
                        <label className="label">
                          <span className="label-text">Instructions</span>
                        </label>
                        <input
                          type="text"
                          value={medication.instructions}
                          onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                          className="input input-bordered input-sm w-full"
                          placeholder="Special instructions (optional)"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Doctor's Notes</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Additional notes, precautions, or instructions..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end">
                {patient.prescription && (
                  <button
                    type="button"
                    onClick={handleDeletePrescription}
                    className="btn btn-error"
                  >
                    Delete Prescription
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => navigate('/doctor-dashboard')}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                >
                  {isSubmitting ? 'Saving...' : patient.prescription ? 'Update Prescription' : 'Create Prescription'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPrescriptionPage;
