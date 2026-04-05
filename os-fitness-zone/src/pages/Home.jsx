import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="flex-grow pb-12">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen mb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* The user needs to save their image as 'hero-bg.jpg' into the 'public' folder */}
          <img 
            className="h-full w-full object-cover opacity-50" 
            alt="OS Fitness Zone gym interior with modern equipment" 
            src="/hero-bg.jpg" 
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop'; }}
          />
          {/* Dark overlay with gradient for text readability */}
          <div className="absolute inset-0 bg-slate-900/60 transition-all duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-screen pt-24 pb-16">
          <div className="max-w-3xl flex flex-col gap-8">
            <div className="space-y-4">
              <span className="inline-flex rounded-full bg-primary/20 px-4 py-1.5 text-sm font-bold text-primary-light tracking-wide uppercase shadow-sm border border-primary/30 backdrop-blur-md animate-in slide-in-from-left duration-500">
                Elite Performance Training
              </span>
              <h1 className="text-5xl font-black leading-[1.05] tracking-tighter text-white sm:text-6xl md:text-8xl md:leading-[1.1] animate-in slide-in-from-left duration-700">
                Transform your body.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-white">
                  Elevate your life.
                </span>
              </h1>
              <p className="max-w-[500px] text-lg text-slate-200 leading-relaxed font-medium animate-in slide-in-from-left duration-1000">
                Unlock your potential with expert-led training, personalized nutrition plans, and a high-performance community dedicated to your ultimate success.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5 pt-4 animate-in fade-in duration-1000 slide-in-from-bottom-4">
              <Link to="/plans" className="flex items-center justify-center gap-2 rounded-xl bg-primary px-10 py-5 text-lg font-black text-white shadow-xl shadow-primary/30 hover:-translate-y-1 hover:bg-primary-light transition-all duration-300 active:scale-[0.98]">
                <span>Get Started Today</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md px-10 py-5 text-lg font-bold text-white hover:bg-white/20 transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]">
                <span className="material-symbols-outlined">play_circle</span>
                <span>Watch Success Stories</span>
              </button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/10 mt-10 max-w-2xl animate-in fade-in duration-1000 delay-500">
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-white">10k+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-primary-light">Active Members</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-white">50+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-primary-light">Expert Trainers</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-white">2.5k+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-primary-light">Success Stories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section className="bg-slate-50 py-24 border-y border-slate-200 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col items-center text-center gap-4">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">Discover your potential</span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">OUR TRAINING PROGRAMS</h2>
            <div className="h-1.5 w-24 rounded-full bg-primary-gradient mt-2"></div>
            <p className="max-w-2xl text-slate-600 font-medium text-lg mt-4">
              Designed by world-class athletes to push your limits and deliver guaranteed results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Weight Lifting */}
            <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-slate-100 aspect-[4/5] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <img className="absolute h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Professional athlete performing heavy weight lifting exercise" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1m1hAYbFye33jH1ESsw2dqXbwb0Fvn98YIsvM61qA2OPBpkhC7sImcrUWMBrRYVwXCmweSwECkxq4TYs77dAa_lC9Lb0YWOnycnRejo0aNCKKS32P64pWZ_B-4U-WX4IEDcxF_XYDymcZ-FhNSmw6aAofCroGqvZdtXVIgKFjK8Qjcz0iCvnHf--AJ9Irae9645MSlbAu1VviWVDnoYpUAzQpCzv__dyemeW6TvpMwcPyLp4OaVAPFdegvhQtGcaEHStkojwGPTo" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sms border border-primary/30">
                  <span className="material-symbols-outlined text-primary text-3xl">fitness_center</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Weight Lifting</h3>
                <p className="text-slate-200 text-sm mb-6 leading-relaxed opacity-90">Build functional strength and muscle mass with our progressive resistance programs.</p>
                <Link className="inline-flex items-center gap-2 text-white font-bold bg-primary px-5 py-2.5 rounded-lg hover:bg-primary-light transition-all shadow-md group/btn" to="/services">
                  Learn More <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                </Link>
              </div>
            </div>
            
            {/* HIIT Training */}
            <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-slate-100 aspect-[4/5] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <img className="absolute h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt="High intensity aerobic workout session in progress" src="https://images.unsplash.com/photo-1661439193765-392d81462003?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sms border border-primary/30">
                  <span className="material-symbols-outlined text-primary text-3xl">speed</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">HIIT Training</h3>
                <p className="text-slate-200 text-sm mb-6 leading-relaxed opacity-90">Burn calories efficiently with heart-pounding intervals and explosive movements.</p>
                <Link className="inline-flex items-center gap-2 text-white font-bold bg-primary px-5 py-2.5 rounded-lg hover:bg-primary-light transition-all shadow-md group/btn" to="/services">
                  Learn More <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                </Link>
              </div>
            </div>
            
            {/* Yoga & Zen */}
            <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-slate-100 aspect-[4/5] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 md:col-span-2 lg:col-span-1">
              <img className="absolute h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Peaceful person practicing yoga at sunrise for mindfulness" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGt3AbZig1y_VvcjHScoyy369dOIiCQTY6R_PBlHCDFavkYliPuhQv10wkrg-_aB-Rhx4vgd3puMKQcgmmWcELI6MORfBQOz6N8Y_QcrHkODAK51ydBicHMjsUt02TWfccJM579E7n_bnQO3xnlOPLCJAJEoHoKLbJuqd67qs_NgCtQipjLNxtZivGfom9xlNmYLBLhaQNY395AOR4CDIymhFZqyRS4388yWA2RfGK1dKD0_7legPRBveNkZOjfGEUu4TDK6US5Wo" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sms border border-primary/30">
                  <span className="material-symbols-outlined text-primary text-3xl">self_improvement</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Yoga &amp; Zen</h3>
                <p className="text-slate-200 text-sm mb-6 leading-relaxed opacity-90">Improve flexibility, balance and mental clarity with expert-guided flow sessions.</p>
                <Link className="inline-flex items-center gap-2 text-white font-bold bg-primary px-5 py-2.5 rounded-lg hover:bg-primary-light transition-all shadow-md group/btn" to="/services">
                  Learn More <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Facility Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl">
          {/* Decorative glow */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Content */}
            <div className="flex flex-col justify-center gap-8 px-8 py-16 sm:px-14 lg:py-20 z-10">
              <div className="space-y-3">
                <span className="inline-flex rounded-full bg-primary/20 px-4 py-1.5 text-sm font-bold text-primary-light tracking-wide uppercase border border-primary/30">
                  World-Class Equipment
                </span>
                <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-white">Facility</span>
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                  Step into a state-of-the-art environment built for serious athletes and beginners alike. Every piece of equipment is premium-grade, maintained daily for peak performance.
                </p>
              </div>

              {/* Feature checklist */}
              <ul className="space-y-4">
                {[
                  { icon: 'fitness_center', label: 'Premium strength & cardio machines' },
                  { icon: 'self_improvement', label: 'Dedicated yoga & stretching zone' },
                  { icon: 'ac_unit', label: 'Fully air-conditioned training floors' },
                  { icon: 'shower', label: 'Modern locker rooms & showers' },
                ].map(({ icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-slate-200 font-medium">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-light text-xl">{icon}</span>
                    </div>
                    {label}
                  </li>
                ))}
              </ul>

              <Link
                to="/services"
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                Explore All Services
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            {/* Right: Gym Image */}
            <div className="relative h-72 lg:h-auto min-h-[420px] overflow-hidden rounded-b-[2.5rem] lg:rounded-l-none lg:rounded-r-[2.5rem]">
              <img
                src="/gym-facility.jpg"
                alt="OS Fitness Zone gym interior showcasing modern equipment"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Subtle gradient blend on left edge */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/20 to-transparent lg:via-transparent"></div>

              {/* Floating badge */}
              <div className="absolute bottom-6 right-6 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-widest text-primary-light mb-1">Est. 2024</p>
                <p className="text-white font-black text-2xl">OS Fitness Zone</p>
                <p className="text-slate-400 text-sm font-medium">Your transformation starts here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary-gradient px-8 py-20 text-center sm:px-16 shadow-2xl shadow-primary/20 border border-primary-light">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_100%)]"></div>
          
          <div className="relative z-10 mx-auto max-w-2xl space-y-8">
            <span className="inline-flex rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white uppercase tracking-wider backdrop-blur-sm border border-white/30 shadow-sm">
              Limited Time Offer
            </span>
            <h2 className="text-4xl font-black sm:text-5xl uppercase tracking-tight text-white drop-shadow-sm">
              Ready to start your journey?
            </h2>
            <p className="text-lg font-medium text-white/90">
              Get a free consultation and a 7-day trial pass. No commitments, just results. Join our thriving community today.
            </p>
            <form className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-4">
              <input 
                className="rounded-xl border border-white/30 bg-white/20 px-6 py-4 text-white placeholder-white/70 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all sm:min-w-[320px] backdrop-blur-md" 
                placeholder="Enter your email address" 
                type="email" 
                required
              />
              <button 
                className="rounded-xl bg-white px-8 py-4 font-black text-primary hover:bg-slate-50 transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2" 
                type="submit"
              >
                CLAIM FREE PASS
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
