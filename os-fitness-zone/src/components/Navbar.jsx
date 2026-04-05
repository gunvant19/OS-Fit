import { Link, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, theme, toggleTheme } = useContext(AuthContext);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Plans', path: '/plans' },
    { name: 'Services', path: '/services' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'BMI Test', path: '/bmi' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3' : 'bg-white py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient text-white shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
              <span className="material-symbols-outlined text-2xl font-bold">fitness_center</span>
            </div>
            <h2 className="hidden sm:block text-xl font-black tracking-tight text-slate-900 uppercase">
              OS FITNESS
            </h2>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name}
                to={link.path} 
                className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg hover:bg-slate-50 ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-primary opacity-80" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Auth & CTA Section */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 border-l border-slate-200 pl-6 ml-2">
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  className="text-sm font-bold text-slate-700 hover:text-primary transition-colors" 
                  to="/dashboard"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={logout} 
                  className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Exit
                </button>
              </div>
            ) : (
              <Link 
                className="text-sm font-bold text-slate-600 hover:text-primary transition-colors px-2" 
                to="/auth"
              >
                Sign In
              </Link>
            )}
          </div>
          
          <button 
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors focus:outline-none"
            aria-label="Toggle Theme"
          >
            <span className="material-symbols-outlined text-2xl">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          <Link 
            to="/plans" 
            className="hidden sm:flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-slate-800 hover:shadow-xl transition-all duration-300"
          >
            <span>Join Now</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`lg:hidden absolute left-0 right-0 top-full bg-white shadow-2xl shadow-slate-900/10 border-t border-slate-100 transition-all duration-300 origin-top overflow-hidden ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100 visible py-4' : 'max-h-0 opacity-0 invisible py-0'
        }`}
      >
        <div className="flex flex-col px-4 gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                location.pathname === link.path 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="my-2 h-px bg-slate-100" />
          
          {user ? (
            <div className="grid grid-cols-2 gap-2">
              <Link 
                to="/dashboard" 
                className="flex items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-800"
              >
                Dashboard
              </Link>
              <button 
                onClick={logout} 
                className="flex items-center justify-center rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              className="flex items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-800"
            >
              Sign In to Account
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
