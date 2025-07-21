import React from 'react';
import { useNavigate } from 'react-router-dom';

function DoctorsPage() {
  const navigate = useNavigate();

  // Available doctors with detailed information
  const doctors = [
    { 
      id: 1, 
      name: 'Dr. Sharma', 
      specialization: 'General Medicine', 
      experience: '15 years',
      education: 'MBBS, MD Internal Medicine',
      phone: '9876543210',
      email: 'dr.sharma@cliniccare.com',
      available: true,
      about: 'Dr. Sharma is an experienced general physician with expertise in preventive care and chronic disease management. He believes in personalized treatment and patient education.',
      languages: ['English', 'Hindi', 'Marathi']
    },
    { 
      id: 2, 
      name: 'Dr. Mehta', 
      specialization: 'Cardiology', 
      experience: '12 years',
      education: 'MBBS, MD Cardiology, DM',
      phone: '9876543211',
      email: 'dr.mehta@cliniccare.com',
      available: true,
      about: 'Dr. Mehta is a renowned cardiologist specializing in interventional cardiology and heart disease prevention. She has performed over 1000 successful cardiac procedures.',
      languages: ['English', 'Hindi', 'Gujarati']
    },
    { 
      id: 3, 
      name: 'Dr. Smith', 
      specialization: 'Orthopedics', 
      experience: '10 years',
      education: 'MBBS, MS Orthopedics',
      phone: '9876543212',
      email: 'dr.smith@cliniccare.com',
      available: true,
      about: 'Dr. Smith specializes in joint replacement surgery and sports medicine. He has helped thousands of patients regain mobility and return to active lifestyles.',
      languages: ['English', 'Hindi']
    },
    { 
      id: 4, 
      name: 'Dr. Patel', 
      specialization: 'Pediatrics', 
      experience: '8 years',
      education: 'MBBS, MD Pediatrics',
      phone: '9876543213',
      email: 'dr.patel@cliniccare.com',
      available: true,
      about: 'Dr. Patel is a compassionate pediatrician who provides comprehensive care for children from birth to adolescence. She specializes in child development and immunizations.',
      languages: ['English', 'Hindi', 'Gujarati']
    },
    { 
      id: 5, 
      name: 'Dr. Kumar', 
      specialization: 'Dermatology', 
      experience: '6 years',
      education: 'MBBS, MD Dermatology',
      phone: '9876543214',
      email: 'dr.kumar@cliniccare.com',
      available: true,
      about: 'Dr. Kumar is a skilled dermatologist with expertise in medical and cosmetic dermatology. He provides advanced treatments for skin conditions and aesthetic procedures.',
      languages: ['English', 'Hindi', 'Tamil']
    }
  ];

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Our Medical Team
          </h1>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            Meet our experienced doctors who are committed to providing exceptional healthcare services with compassion and expertise
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body">
                {/* Doctor Header */}
                <div className="flex items-start space-x-6 mb-6">
                  {/* Doctor Image Placeholder */}
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xl text-primary-content font-bold">DR</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="card-title text-2xl text-base-content mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-primary font-semibold text-lg mb-2">
                      {doctor.specialization}
                    </p>
                    <p className="text-base-content/70 mb-2">
                      {doctor.education}
                    </p>
                    <p className="text-base-content/70">
                      Experience: {doctor.experience}
                    </p>
                  </div>
                </div>

                {/* About Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-base-content mb-2">About</h4>
                  <p className="text-base-content/70 leading-relaxed">
                    {doctor.about}
                  </p>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-base-content/80 mb-2">Languages Spoken</h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((language, index) => (
                      <span key={index} className="badge badge-outline">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="divider"></div>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-base-content/80 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-base-content/70">
                      <span className="w-5 h-5 mr-3 text-primary">Phone:</span>
                      {doctor.phone}
                    </div>
                    <div className="flex items-center text-sm text-base-content/70">
                      <span className="w-5 h-5 mr-3 text-primary">Email:</span>
                      {doctor.email}
                    </div>
                  </div>
                </div>

                {/* Availability and Actions */}
                <div className="card-actions justify-between">
                  <div className={`badge ${doctor.available ? 'badge-success' : 'badge-error'} gap-2`}>
                    <span className={`w-2 h-2 rounded-full ${doctor.available ? 'bg-success-content' : 'bg-error-content'}`}></span>
                    {doctor.available ? 'Available' : 'Busy'}
                  </div>

                  <button
                    onClick={() => navigate('/book-appointment')}
                    className="btn btn-primary"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="card bg-primary text-primary-content">
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-2xl mb-4">
              Need Help Choosing the Right Doctor?
            </h2>
            <p className="text-primary-content/80 mb-6 max-w-2xl mx-auto">
              Our healthcare coordinators can help you find the right specialist for your specific needs. 
              We're here to guide you through your healthcare journey.
            </p>
            <div className="card-actions justify-center">
              <button
                onClick={() => navigate('/contact')}
                className="btn btn-secondary"
              >
                Contact Us
              </button>
              <button
                onClick={() => navigate('/book-appointment')}
                className="btn btn-outline btn-secondary"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-12 card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl text-base-content mb-8">
              Our Medical Excellence
            </h2>
            <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
              <div className="stat">
                <div className="stat-value text-primary">5+</div>
                <div className="stat-desc">Specialist Doctors</div>
              </div>
              <div className="stat">
                <div className="stat-value text-secondary">50+</div>
                <div className="stat-desc">Years Combined Experience</div>
              </div>
              <div className="stat">
                <div className="stat-value text-accent">1000+</div>
                <div className="stat-desc">Patients Treated</div>
              </div>
              <div className="stat">
                <div className="stat-value text-success">98%</div>
                <div className="stat-desc">Patient Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorsPage;
