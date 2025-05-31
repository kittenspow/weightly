import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './features/auth/AuthContext'; // Menggunakan AuthProvider dan useAuth dari mock
import { LoginForm, RegisterForm } from './features/auth/AuthForms';
import HomePage from './pages/Home';
import TrackerPage from './pages/Tracker';
import CalculatorPage from './pages/Calculator';
import ProfilePage from './pages/Profile';
import Card from './components/Card';
import Button from './components/Button';
import Navbar from './components/Navbar';


const App = () => {
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
  // create a seperated component file for authentication page next time (like log in and register page)
  if (!user && !showAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Weight Tracker</h1>
          <p className="text-gray-600 mb-6">
            Start your journey now!
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Navigation Bar */}
      <Navbar/>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
      </main>
    </div>
  );
};


// root component that provides the AuthContext to the entire application.
export default function WeightTrackerApp() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  );
}
