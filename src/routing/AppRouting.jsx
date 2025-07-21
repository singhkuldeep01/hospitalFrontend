import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ContactUs from '../pages/ContactUs'
import RegisterPatient from '../pages/RegisterPatient'
import LoginPage from '../pages/LoginPage'
import PatientDashboard from '../pages/PatientDashboard'
import BookAppointmentPage from '../pages/BookAppointmentPage'
import DoctorsPage from '../pages/DoctorsPage'
import AppointmentsPage from '../pages/AppointmentsPage'
import EmergencyPage from '../pages/EmergencyPage'

const AppRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/register" element={<RegisterPatient />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/book-appointment" element={<BookAppointmentPage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/appointments" element={<AppointmentsPage />} />
      <Route path="/emergency" element={<EmergencyPage />} />
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  )
}

export default AppRouting