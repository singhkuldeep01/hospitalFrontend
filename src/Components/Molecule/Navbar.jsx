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
    { name: 'Home', path: '/' },
    { name: 'Patients', path: '/patient-dashboard' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Appointments', path: '/appointments' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown md:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={isActiveRoute(item.path) ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <Link to="/" className="btn btn-ghost text-xl">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
            <span className="text-primary-content text-lg">🏥</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-bold">ClinicCare</span>
            <span className="text-xs opacity-70">Healthcare Excellence</span>
          </div>
        </Link>
      </div>
      
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={isActiveRoute(item.path) ? 'active' : ''}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="navbar-end">
        {/* Theme Selector */}
        <ThemeSelector />

        {/* User Actions */}
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium">{user?.name?.charAt(0)}</span>
                </div>
                <span className="hidden md:inline">{user?.name}</span>
              </div>
            </label>
            <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/patient-dashboard">Dashboard</Link></li>
              <li><Link to="/appointments">My Appointments</Link></li>
              <li><button onClick={handleLogout} className="text-error">Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => navigate('/login')} className="btn btn-ghost">
              Login
            </button>
            <button onClick={() => navigate('/register')} className="btn btn-primary">
              Register
            </button>
          </div>
        )}

        {/* Emergency Button */}
        <button onClick={() => navigate('/emergency')} className="btn btn-error ml-2">
          🚨 Emergency
        </button>
      </div>
    </div>
  );
}

export default Navbar;