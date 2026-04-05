import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import About from './pages/About';
import Auth from './pages/Auth';
import BMICalculator from './pages/BMICalculator';
import BookingPayment from './pages/BookingPayment';
import Contact from './pages/Contact';
import MembershipPlans from './pages/MembershipPlans';
import Schedule from './pages/Schedule';
import Services from './pages/Services';
import Trainers from './pages/Trainers';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/bmi" element={<BMICalculator />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/plans" element={<MembershipPlans />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/services" element={<Services />} />
            <Route path="/trainers" element={<Trainers />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/booking" element={<BookingPayment />} />
            </Route>

            {/* Admin Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
