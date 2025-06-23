import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './features/auth/AuthContext';

// pages
import { LoginPage } from './pages/authPages/LoginPage';
import { RegisterPage } from './pages/authPages/RegisterPage';
import HomePage from './pages/Home';
import TrackerPage from './pages/Tracker';
import CalculatorPage from './pages/Calculator';
import ProfilePage from './pages/Profile';
import WelcomePage from './pages/authPages/WelcomePage';

// navbar & footer
import AuthNavbar from './components/AuthNavbar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// article
import Article1 from './features/article/articlePages/article_1';
import Article2 from './features/article/articlePages/article_2';
import Article3 from './features/article/articlePages/article_3';
import Article4 from './features/article/articlePages/article_4';
import Article5 from './features/article/articlePages/article_5';
import Article6 from './features/article/articlePages/article_6';

// scroll to top component
import ScrollToTop from './components/ScrollToTop';

// wrapper
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

// jika user belum login
  if (!user) {
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  return children;
};

// wrapper component untuk route autentikasi (Welcome/Login/Register)
// jika user sudah login, arahkan mereka ke /home (atau halaman yang ingin mereka tuju)
const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // loading 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4 font-poppins"></div>
          <p className="text-gray-600 font-poppins">Loading Weightly...</p>
        </div>
      </div>
    );
  }

  // Jika user sudah login, arahkan ke /home atau dari mana mereka berasal
  if (user) {
    const from = location.state?.from?.pathname || '/home';
    return <Navigate to={from} replace />;
  }

  // Jika user belum login, tampilkan halaman autentikasi
  return (
    <div className="w-full h-full flex items-center justify-center">
      {children}
    </div>
  );
};


const AppContent = () => {
  const { user, loading } = useAuth(); // Tetap ambil user dan loading untuk kondisi loading screen

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
      {/* Render Navbar secara kondisional berdasarkan status user */}
      {user ? <Navbar /> : <AuthNavbar />}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto pt-7">
        <Routes>
          {/* Public Routes */}
          {/* Welcome, Login, Register: hanya bisa diakses jika user belum login */}
          <Route path="/signin" element={<AuthRoute><WelcomePage /></AuthRoute>} />
          <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><RegisterPage /></AuthRoute>} />

          {/* Home Page: data diakses user yang belum login (public)*/}
          <Route path="/home" element={<HomePage />} />
          <Route path="/article001" element={<Article1 />} />
          <Route path="/article002" element={<Article2 />} />
          <Route path="/article003" element={<Article3 />} />
          <Route path="/article004" element={<Article4 />} />
          <Route path="/article005" element={<Article5 />} />
          <Route path="/article006" element={<Article6 />} />

          {/* protected Routes: hanya bisa diakses jika user sudah login */}
          <Route path="/tracker" element={<ProtectedRoute><TrackerPage /></ProtectedRoute>} />
          <Route path="/calculator" element={<ProtectedRoute><CalculatorPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

          {/* jika user sudah login, arahkan ke /home. Jika belum, arahkan ke / (welcome) */}
          <Route path="*" element={user ? <Navigate to="/home" replace /> : <Navigate to="/home" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};


export default function WeightTrackerApp() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
