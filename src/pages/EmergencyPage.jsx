import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function EmergencyPage() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();
  const [isCallInitiated, setIsCallInitiated] = useState(false);
  const [emergencyType, setEmergencyType] = useState('');

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

  const emergencyTypes = [
    { value: 'cardiac', label: 'Heart Attack', icon: '💔', color: 'bg-red-100' },
    { value: 'trauma', label: 'Injury/Trauma', icon: '🚑', color: 'bg-orange-100' },
    { value: 'breathing', label: 'Breathing', icon: '🫁', color: 'bg-blue-100' },
    { value: 'stroke', label: 'Stroke', icon: '🧠', color: 'bg-purple-100' },
  ];

  const handleEmergencyCall = (number) => {
    try {
      setIsCallInitiated(true);
      setTimeout(() => {
        setIsCallInitiated(false);
        alert(`Emergency call to ${number} would be initiated in a real application`);
      }, 2000);
    } catch (error) {
      console.error('Emergency call error:', error);
      setIsCallInitiated(false);
      alert('Failed to initiate emergency call. Please try again or dial manually.');
    }
  };

  return (
    <div className="min-h-screen bg-error/10">
      {/* Emergency Header */}
      <div className="bg-error text-error-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-5xl mr-4">🚨</span>
              <div>
                <h1 className="text-3xl font-bold">Emergency Services</h1>
                <p className="text-error-content/80">24/7 Emergency Care Available</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-error-content/80 text-sm">Emergency Hotline</p>
              <p className="text-2xl font-bold">108</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Emergency Call */}
        <div className="card bg-base-100 shadow-xl mb-8 border-l-4 border-error">
          <div className="card-body">
            <h2 className="card-title text-2xl text-base-content mb-6">Emergency Contacts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyContacts.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleEmergencyCall(contact.number)}
                  disabled={isCallInitiated}
                  className="card bg-base-200 hover:bg-base-300 transition-colors"
                >
                  <div className="card-body p-6 text-center">
                    <h3 className="font-medium text-base-content/80">{contact.name}</h3>
                    <p className="text-4xl font-black tabular-nums my-2">{contact.number}</p>
                    <p className="text-sm text-base-content/60">{contact.type}</p>
                  </div>
                </button>
              ))}
            </div>
            {isCallInitiated && (
              <div className="mt-6 text-center bg-error/10 p-4 rounded-lg">
                <span className="loading loading-dots loading-lg text-error"></span>
                <p className="text-error font-bold mt-2">Connecting to Emergency Services...</p>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Type Selection */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body p-6">
            <h2 className="text-2xl font-bold text-base-content mb-6">
              Select Emergency Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {emergencyTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setEmergencyType(type.value)}
                  className={`btn h-auto py-4 ${
                    emergencyType === type.value
                      ? 'btn-primary shadow-lg'
                      : 'btn-ghost hover:bg-base-200'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-3xl mb-2">{type.icon}</span>
                    <p className="font-bold mt-2">{type.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* First Aid Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {firstAidTips.map((tip, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body p-6">
                <h3 className="card-title text-lg font-bold text-error mb-4">
                  {tip.condition}
                </h3>
                <ul className="space-y-3">
                  {tip.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start">
                      <span className="font-bold mr-2">{stepIndex + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
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
              This page provides general emergency guidance only. In case of a real emergency, 
              always call your local emergency services immediately. Do not delay seeking professional medical help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyPage;
