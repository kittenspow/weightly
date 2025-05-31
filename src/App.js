import React from 'react';
// Import komponen React Router yang diperlukan
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { LoginPage } from './pages/authPages/LoginPage';
import { RegisterPage } from './pages/authPages/RegisterPage';
import HomePage from './pages/Home';
import TrackerPage from './pages/Tracker';
import CalculatorPage from './pages/Calculator';
import ProfilePage from './pages/Profile';
import WelcomePage from './pages/authPages/WelcomePage';

import Navbar from './components/Navbar';


// Komponen Pembungkus untuk Rute yang Membutuhkan Autentikasi
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Weightly...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

// Komponen Pembungkus untuk Rute Autentikasi (Welcome/Login/Register)
const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4 font-poppins"></div>
          <p className="text-gray-600">Loading Weightly...</p>
        </div>
      </div>
    );
  }

  if (user) {
    const from = location.state?.from?.pathname || '/home';
    return <Navigate to={from} replace />;
  }

  // Konten akan ditengahkan oleh parent <main> di App.jsx
  return (
    <div className="w-full h-full flex items-center justify-center">
      {children}
    </div>
  );
};


const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4 font-poppins"></div>
          <p className="text-gray-600">Loading Weightly...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar hanya dirender jika user sudah login */}
      {user && <Navbar />} 

      {/* Main Content Area: */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<AuthRoute><WelcomePage /></AuthRoute>} />
          <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><RegisterPage /></AuthRoute>} />

          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/tracker" element={<ProtectedRoute><TrackerPage /></ProtectedRoute>} />
          <Route path="/calculator" element={<ProtectedRoute><CalculatorPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

          <Route path="*" element={!user ? <Navigate to="/" replace /> : <Navigate to="/home" replace />} />
        </Routes>
      </main>
    </div>
  );
};


export default function WeightTrackerApp() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
