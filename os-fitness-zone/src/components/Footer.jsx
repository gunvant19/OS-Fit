import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient text-white shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined text-2xl font-bold">fitness_center</span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">
                OS FITNESS
              </h2>
            </Link>
            <p className="text-slate-600 leading-relaxed text-sm">
              Premium fitness training, personalized coaching, and a thriving community dedicated to helping you achieve your ultimate health goals.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <span className="material-symbols-outlined">public</span>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <span className="material-symbols-outlined">camera</span>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <span className="material-symbols-outlined">share</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <Link to="/about" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Our Services</Link>
              </li>
              <li>
                <Link to="/plans" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Membership Plans</Link>
              </li>
              <li>
                <Link to="/trainers" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Expert Trainers</Link>
              </li>
              <li>
                <Link to="/schedule" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Class Schedule</Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Programs</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <Link to="/services" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Weight Lifting</Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">HIIT Training</Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Yoga & Zen</Link>
              </li>
              <li>
                <Link to="/bmi" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">BMI Calculator</Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Diet Planning</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0">location_on</span>
                <span className="text-slate-600 text-sm font-medium leading-relaxed">1st Floor, Khandare Plaza, Bidi Kamgar, Amrutdham, Nashik-422003, Maharashtra</span>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0">call</span>
                <div className="flex flex-col gap-1">
                  <a href="tel:9011756935" className="text-slate-600 text-sm font-medium hover:text-primary transition-colors">9011756935</a>
                  <a href="tel:9209092417" className="text-slate-600 text-sm font-medium hover:text-primary transition-colors">9209092417</a>
                  <a href="tel:8888634345" className="text-slate-600 text-sm font-medium hover:text-primary transition-colors">8888634345</a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0">mail</span>
                <a href="mailto:shelarvishal892@gmail.com" className="text-slate-600 text-sm font-medium hover:text-primary transition-colors">shelarvishal892@gmail.com</a>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0">schedule</span>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-600 text-sm font-medium">Mon – Sat: 6:00 AM – 11:00 AM, 4:00 PM – 9:30 PM</span>
                  <span className="text-slate-600 text-sm font-medium">Sunday: Closed</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} OS FITNESS ZONE. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-slate-500 hover:text-slate-900 text-sm transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-slate-500 hover:text-slate-900 text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
