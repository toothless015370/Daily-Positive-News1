import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/dailyLogo.jpeg';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);  // নতুন state menu-এর জন্য

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsOpen(false);  // menu বন্ধ করো logout-এর পর
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Daily Positive Logo" className="h-8 w-auto object-contain" />
          <span className="text-2xl font-black tracking-tighter text-gray-900">Daily Positive</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/admin" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Admin Dashboard</Link>
              <button 
                onClick={handleLogout}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger Button (Mobile) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/admin" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-blue-600 font-medium">Admin Dashboard</Link>
                <button 
                  onClick={handleLogout}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 shadow-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;