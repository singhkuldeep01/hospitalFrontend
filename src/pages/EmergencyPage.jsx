import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function EmergencyPage() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();
  const [emergencyType, setEmergencyType] = useState('');
  const [isCallInitiated, setIsCallInitiated] = useState(false);

  const emergencyTypes = [
    { value: 'cardiac', label: 'Heart Attack / Chest Pain', color: 'bg-red-100 text-red-800', icon: '💔' },
    { value: 'breathing', label: 'Breathing Difficulty', color: 'bg-blue-100 text-blue-800', icon: '🫁' },
    { value: 'accident', label: 'Accident / Injury', color: 'bg-orange-100 text-orange-800', icon: '🚑' },
    { value: 'stroke', label: 'Stroke / Neurological', color: 'bg-purple-100 text-purple-800', icon: '🧠' },
    { value: 'poisoning', label: 'Poisoning / Overdose', color: 'bg-green-100 text-green-800', icon: '☠️' },
    { value: 'severe-pain', label: 'Severe Pain', color: 'bg-yellow-100 text-yellow-800', icon: '⚡' },
    { value: 'bleeding', label: 'Severe Bleeding', color: 'bg-red-100 text-red-800', icon: '🩸' },
    { value: 'other', label: 'Other Emergency', color: 'bg-gray-100 text-gray-800', icon: '🚨' }
  ];

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
    // In a real app, this would initiate a call
    setTimeout(() => {
      setIsCallInitiated(false);
      alert(`Emergency call to ${number} would be initiated in a real application`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-error/10">
      {/* Emergency Header */}
      <div className="bg-error text-error-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-4xl mr-4">🚨</span>
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
            <h2 className="card-title text-2xl text-base-content mb-4">
              Quick Emergency Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencyContacts.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleEmergencyCall(contact.number)}
                  disabled={isCallInitiated}
                  className={`btn btn-outline btn-error ${isCallInitiated ? 'btn-disabled' : ''}`}
                >
                  <div className="text-center">
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-2xl font-bold">{contact.number}</p>
                    <p className="text-sm opacity-70">{contact.type}</p>
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

        {/* Patient Information for Logged In Users */}
        {isLoggedIn && (
          <div className="card bg-base-100 shadow-xl mb-8 border-l-4 border-info">
            <div className="card-body">
              <h2 className="card-title text-base-content">Your Emergency Information</h2>
              <div className="stats stats-vertical lg:stats-horizontal shadow">
                <div className="stat">
                  <div className="stat-title">Patient Name</div>
                  <div className="stat-value text-lg">{user?.name}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Contact</div>
                  <div className="stat-value text-lg">{user?.phone}</div>
                </div>
              </div>
              <div className="alert alert-info mt-4">
                <span><strong>Note:</strong> Your medical records are available to emergency responders through your patient ID: #{user?.id}</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-base-content mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/book-appointment')}
                className="btn btn-primary"
              >
                <span className="text-2xl mr-2">📅</span>
                Book Follow-up Appointment
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="btn btn-secondary"
              >
                <span className="text-2xl mr-2">📞</span>
                Contact Hospital
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn btn-accent"
              >
                <span className="text-2xl mr-2">🏠</span>
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Disclaimer */}
        <div className="alert alert-warning mt-8">
          <span className="text-warning text-xl mr-3">⚠️</span>
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
        