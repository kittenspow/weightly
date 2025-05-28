// src/App.jsx
import React, { useState } from 'react';
import { Scale, Calculator, TrendingUp, User, Heart } from 'lucide-react';
import { AuthProvider, useAuth } from './features/auth/AuthContext'; // Menggunakan AuthProvider dan useAuth dari mock
import { LoginForm, RegisterForm } from './features/auth/AuthForms';

import HomePage from './pages/Home';
import TrackerPage from './pages/Tracker';
import CalculatorPage from './pages/Calculator';
import ProfilePage from './pages/Profile';
import Card from './components/Card';
import Button from './components/Button';

/**
 * Main application component responsible for routing and overall layout.
 */
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { user, loading } = useAuth();

  // Show loading spinner while authentication state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  // Show authentication screen if no user is logged in and auth forms are not yet shown
  // For mock, 'user' will initially be null, then quickly become the mock user
  if (!user && !showAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Weight Tracker</h1>
          <p className="text-gray-600 mb-6">
            Track your weight, body fat, and health goals with our comprehensive fitness app.
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => { setShowAuth(true); setAuthMode('login'); }}
              className="w-full"
            >
              Login
            </Button>
            <Button
              onClick={() => { setShowAuth(true); setAuthMode('register'); }}
              variant="secondary"
              className="w-full"
            >
              Sign Up
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Show login/register forms if no user is logged in and auth forms are requested
  if (!user && showAuth) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        {authMode === 'login' ? (
          <LoginForm onSwitch={() => setAuthMode('register')} />
        ) : (
          <RegisterForm onSwitch={() => setAuthMode('login')} />
        )}
      </div>
    );
  }

  // Navigation button component
  const NavButton = ({ page, children, icon: Icon }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
        currentPage === page
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      <Icon className="w-4 h-4" />
      {children}
    </button>
  );

  // Render the current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'tracker': return <TrackerPage />;
      case 'calculator': return <CalculatorPage />;
      case 'profile': return <ProfilePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Scale className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-xl font-bold text-gray-900">Weight Tracker</span>
            </div>

            <div className="flex space-x-1">
              <NavButton page="home" icon={Heart}>Home</NavButton>
              <NavButton page="tracker" icon={TrendingUp}>Tracker</NavButton>
              <NavButton page="calculator" icon={Calculator}>Calculator</NavButton>
              <NavButton page="profile" icon={User}>Profile</NavButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderPage()}
      </main>
    </div>
  );
};


// root component that provides the AuthContext to the entire application.
export default function WeightTrackerApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
