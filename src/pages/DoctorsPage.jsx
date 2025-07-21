import React from 'react';
import { useNavigate } from 'react-router-dom';
import doctorData from '../data/doctorData';

function DoctorsPage() {
  const navigate = useNavigate();

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
          {doctorData.map((doctor) => (
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
                <div className="grid grid-cols-2 gap-4 p-4 bg-base-200/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-xl text-primary">📞</span>
                    </div>
                    <div>
                      <p className="text-xs text-base-content/60 font-medium">Phone</p>
                      <p className="text-sm font-semibold">{doctor.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <span className="text-xl text-secondary">✉️</span>
                    </div>
                    <div>
                      <p className="text-xs text-base-content/60 font-medium">Email</p>
                      <p className="text-sm font-semibold">{doctor.email}</p>
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
  