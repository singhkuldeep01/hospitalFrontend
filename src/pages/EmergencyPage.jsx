import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function EmergencyPage() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();
  const [isCallInitiated, setIsCallInitiated] = useState(false);

  const emergencyContacts = [
    { name: 'ClinicCare Emergency', number: '108', type: 'Primary' },
    { name: 'National Emergency', number: '112', type: 'National' },
    { name: 'Ambulance Service', number: '102', type: 'Ambulance' },
    { name: 'Police Emergency', number: '100', type: 'Police' },
    { name: 'Fire Emergency', number: '101', type: 'Fire' }
  ];

  const firstAidTips = [
    {
      condition: 'Heart Attack',
      steps: [
        'Call emergency services immediately',
        'Have the person sit down and rest',
        'Loosen tight clothing',
        'If prescribed, help them take their heart medication',
        'Stay calm and reassure the person'
      ]
    },
    {
      condition: 'Choking',
      steps: [
        'Encourage coughing if they can still breathe',
        'Give 5 back blows between shoulder blades',
        'Give 5 abdominal thrusts (Heimlich maneuver)',
        'Alternate between back blows and abdominal thrusts',
        'Call emergency services if object doesn\'t dislodge'
      ]
    },
    {
      condition: 'Severe Bleeding',
      steps: [
        'Apply direct pressure to the wound',
        'Elevate the injured area above heart level',
        'Use clean cloth or bandage',
        'Don\'t remove objects stuck in wounds',
        'Call emergency services immediately'
      ]
    }
  ];

  const handleEmergencyCall = (number) => {
    setIsCallInitiated(true);
    setTimeout(() => {
      setIsCallInitiated(false);
      alert(`Emergency call to ${number} would be initiated in a real application`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="bg-error text-error-content">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <span className="text-4xl mr-4">🚨</span>
              <div>
                <h1 className="text-3xl font-bold">Emergency Services</h1>
                <p className="opacity-80">24/7 Emergency Care Available</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-80">Emergency Hotline</p>
              <p className="text-2xl font-bold">108</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="card bg-base-100 shadow-xl mb-8 border-l-4 border-error">
          <div className="card-body">
            <h2 className="card-title text-2xl">Quick Emergency Action</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {emergencyContacts.map((contact, idx) => (
                <button
                  key={idx}
                  onClick={() => handleEmergencyCall(contact.number)}
                  disabled={isCallInitiated}
                  className={`btn btn-outline btn-error h-auto py-4 ${isCallInitiated ? 'btn-disabled' : ''}`}
                >
                  <div className="text-center">
                    <p className="font-semibold text-sm">{contact.name}</p>
                    <p className="text-2xl font-bold my-1">{contact.number}</p>
                    <p className="text-xs opacity-70">{contact.type}</p>
                  </div>
                </button>
              ))}
            </div>
            {isCallInitiated && (
              <div className="mt-4 text-center">
                <span className="loading loading-spinner loading-md text-error mr-2"></span>
                <span className="text-error">Initiating emergency call...</span>
              </div>
            )}
          </div>
        </div>

        {isLoggedIn && (
          <div className="card bg-base-100 shadow-xl mb-8 border-l-4 border-info">
            <div className="card-body">
              <h2 className="card-title mb-4">Your Emergency Information</h2>
              <div className="stats stats-vertical lg:stats-horizontal shadow">
                <div className="stat">
                  <div className="stat-title">Patient Name</div>
                  <div className="stat-value">{user?.name}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Contact</div>
                  <div className="stat-value">{user?.phone}</div>
                </div>
              </div>
              <div className="alert alert-info mt-4">
                <span>Your medical records are available via Patient ID: #{user?.id}</span>
              </div>
            </div>
          </div>
        )}

        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title mb-6">Emergency First Aid Guide</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {firstAidTips.map((tip, idx) => (
                <div key={idx} className="card bg-base-200 border border-base-300">
                  <div className="card-body">
                    <h3 className="card-title">{tip.condition}</h3>
                    <ol className="space-y-2 mt-2">
                      {tip.steps.map((step, stepIdx) => (
                        <li key={stepIdx} className="text-sm opacity-70 flex">
                          <span className="font-semibold text-primary mr-2">{stepIdx + 1}.</span> {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title mb-4">ClinicCare Emergency Department</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Location & Contact</h3>
                <p><strong>Address:</strong> 123 Healthcare Avenue, Medical District, City 400001</p>
                <p><strong>Emergency Hotline:</strong> 108</p>
                <p><strong>Direct Line:</strong> +91-22-1234-5678</p>
                <p><strong>Available:</strong> 24/7 Emergency Services</p>
                <button
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                  className="btn btn-primary mt-4"
                >
                  Get Directions
                </button>
              </div>
              <div className="card bg-base-200 flex items-center justify-center">
                <div className="text-center opacity-60">
                  <span className="text-4xl">🏥</span>
                  <p>Interactive Map</p>
                  <p className="text-sm">(Google Maps integration)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={() => navigate('/book-appointment')} className="btn btn-primary">
                📅 Book Appointment
              </button>
              <button onClick={() => navigate('/contact')} className="btn btn-secondary">
                📞 Contact Hospital
              </button>
              <button onClick={() => navigate('/')} className="btn btn-accent">
                🏠 Back to Home
              </button>
            </div>
          </div>
        </div>

        <div className="alert alert-warning">
          <span className="text-xl mr-3">⚠️</span>
          <div>
            <h3 className="font-medium">Important Disclaimer</h3>
            <p className="text-sm mt-1">
              This page provides general emergency guidance only. Always call your local emergency services in a real emergency. Do not delay professional medical help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyPage;
