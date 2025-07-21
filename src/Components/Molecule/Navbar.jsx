import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import ThemeSelector from '../Atom/ThemeSelector';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuthStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Home', path: '/', icon: '🏛️' },
    { name: 'Patients', path: '/patient-dashboard', icon: '🧑‍⚕️' },
    { name: 'Doctors', path: '/doctors', icon: '👨‍⚕️' },
    { name: 'Appointments', path: '/appointments', icon: '📋' },
    { name: 'Contact', path: '/contact', icon: '📱' }
  ];

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 px-4 h-16">
      {/* Logo Section */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                    isActiveRoute(item.path) ? 'bg-primary/10 text-primary font-medium' : ''
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Logo */}
        <Link to="/" className="btn btn-ghost gap-3 normal-case">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <span className="text-primary-content text-xl">⚕️</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xl font-black tracking-tight">ClinicCare</span>
            <span className="text-xs text-base-content/70 font-medium">Healthcare Excellence</span>
          </div>
        </Link>
      </div>
      
      {/* Desktop Menu */}
      <div className="navbar-center hidden md:flex">
        <ul className="flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActiveRoute(item.path) 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'hover:bg-base-200'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Right Section with Updated Icons */}
      <div className="navbar-end gap-2">
        <ThemeSelector />

        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content flex items-center justify-center">
                <span className="text-lg font-black">{user?.name?.charAt(0)}</span>
              </div>
            </label>
            <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 gap-1">
              <li><Link to="/patient-dashboard" className="flex gap-3">👤 Dashboard</Link></li>
              <li><Link to="/appointments" className="flex gap-3">📅 Appointments</Link></li>
              <li><button onClick={handleLogout} className="flex gap-3 text-error">🔐 Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => navigate('/login')} className="btn btn-ghost btn-sm gap-2">
              🔑 Login
            </button>
            <button onClick={() => navigate('/register')} className="btn btn-primary btn-sm gap-2">
              📝 Register
            </button>
          </div>
        )}

        <button 
          onClick={() => navigate('/emergency')} 
          className="btn btn-error btn-sm gap-2 hover:scale-105 transition-transform"
        >
          🚨 Emergency
        </button>
      </div>
    </div>
  );
}

export default Navbar;