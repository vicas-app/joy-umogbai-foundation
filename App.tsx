import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { Team } from './pages/Team';
import { Gallery } from './pages/Gallery';
import { GetInvolved } from './pages/GetInvolved';
import { Contact } from './pages/Contact';
import { JoinForm } from './pages/JoinForm';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { AdminProvider } from './contexts/AdminContext';
import { EditModal } from './components/EditModal';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user || user.isAnonymous) return <Navigate to="/admin/login" />;
  return <>{children}</>;
};

// Layout for public pages
const PublicLayout = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen font-sans text-gray-800 bg-sh-blue-light">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
    <EditModal />
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <AdminProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Admin Login */}
              <Route path="/admin/login" element={<Login />} />
              
              {/* Dashboard now just redirects to home for inline editing */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />

              {/* Public Routes with Inline Editing Enabled via PublicLayout */}
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/programs" element={<PublicLayout><Programs /></PublicLayout>} />
              <Route path="/team" element={<PublicLayout><Team /></PublicLayout>} />
              <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
              <Route path="/get-involved" element={<PublicLayout><GetInvolved /></PublicLayout>} />
              <Route path="/join" element={<PublicLayout><JoinForm /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
              <Route path="/impact" element={<PublicLayout><Home /></PublicLayout>} />
            </Routes>
          </Router>
        </AdminProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;