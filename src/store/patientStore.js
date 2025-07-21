import { create } from 'zustand';
import patientsData from '../data/patientData.js';

const usePatientStore = create((set) => ({
    patients: patientsData, // Initialize from JSON file

    addPatient: (newPatient) =>
        set((state) => ({
            patients: [
                ...state.patients,
                {
                    id: Date.now(), // Unique timestamp-based ID
                    ...newPatient,
                    appointments: [], // Initialize with empty appointments array
                },
            ],
        })),

    addAppointment: (patientId, appointmentDetails) =>
        set((state) => ({
            patients: state.patients.map((patient) =>
                patient.id === patientId
                    ? {
                          ...patient,
                          appointments: [
                              ...(patient.appointments || []),
                              {
                                  id: Date.now(), // Unique timestamp-based ID
                                  ...appointmentDetails,
                                  status: 'scheduled',
                                  createdAt: new Date().toISOString(),
                              },
                          ],
                      }
                    : patient
            ),
        })),

    updateAppointmentStatus: (patientId, appointmentId, status) =>
        set((state) => ({
            patients: state.patients.map((patient) =>
                patient.id === patientId
                    ? {
                          ...patient,
                          appointments:
                              patient.appointments?.map((appointment) =>
                                  appointment.id === appointmentId
                                      ? { ...appointment, status }
                                      : appointment
                              ) || [],
                      }
                    : patient
            ),
        })),

    resetPatients: () => set({ patients: [] }),
}));

export default usePatientStore;
