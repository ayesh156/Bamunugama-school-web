import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Results from './pages/Results';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageGallery from './pages/admin/ManageGallery';
import ManageVideos from './pages/admin/ManageVideos';
import AdminSidebar from './components/admin/AdminSidebar';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

function AdminLayout({ children }) {
  return (
    <AdminSidebar>
      {children}
    </AdminSidebar>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public routes (with Navbar & Footer) */}
              <Route path="/*" element={
                <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
                  <Navbar />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/results" element={<Results />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              } />

              {/* Admin routes (protected, no Navbar/Footer, full-screen sidebar layout) */}
              <Route path="/admin" element={<Login />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/manage-gallery" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <ManageGallery />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/manage-videos" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <ManageVideos />
                  </AdminLayout>
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
