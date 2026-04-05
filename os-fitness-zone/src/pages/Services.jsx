import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      title: "Strength & Conditioning",
      desc: "Comprehensive programs utilizing free weights, machines, and functional movements to build lean muscle mass and serious strength.",
      icon: "fitness_center",
      bg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "HIIT Performance",
      desc: "High-intensity interval training designed to skyrocket your cardiovascular capacity and maximize calorie burn in 45-minute sessions.",
      icon: "speed",
      bg: "https://images.unsplash.com/photo-1661439193765-392d81462003?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Yoga & Mindfulness",
      desc: "Guided flow sessions ranging from restorative alignment to challenging vinyasa, improving mobility, balance, and mental clarity.",
      icon: "self_improvement",
      bg: "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Nutrition & Diet Planning",
      desc: "Work with our registered dietitians to create sustainable, macro-calculated meal plans tailored exactly to your body type and goals.",
      icon: "restaurant_menu",
      bg: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "1-on-1 Personal Training",
      desc: "Completely individualized coaching, biomechanical assessments, and dedicated attention to ensure perfect form and rapid progression.",
      icon: "accessibility_new",
      bg: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Recovery Studio",
      desc: "State-of-the-art recovery tools including infrared saunas, cold plunge therapy, and compression boots to accelerate healing.",
      icon: "spa",
      bg: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <main className="flex-grow pt-24 pb-24 bg-slate-50 relative min-h-screen">
      <div className="absolute top-0 left-0 right-0 h-96 bg-white -z-10 border-b border-slate-200"></div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 pt-8">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary tracking-wide uppercase mb-4">
            Our Offerings
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Elite Facilities.<br />Proven Programs.
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            Everything you need to transform your body and elevate your lifestyle under one premium roof.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((svc, i) => (
            <div key={i} className="group relative overflow-hidden rounded-3xl bg-white flex flex-col sm:flex-row shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:border-slate-200">
              <div className="sm:w-2/5 relative aspect-square sm:aspect-auto overflow-hidden bg-slate-200">
                <img 
                  src={svc.bg} 
                  alt={svc.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-300"></div>
              </div>
              
              <div className="sm:w-3/5 p-8 flex flex-col justify-center">
                <div className="w-12 h-12 bg-slate-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-[24px]">{svc.icon}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">{svc.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-6 flex-grow text-sm">
                  {svc.desc}
                </p>
                <Link to="/booking" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-primary transition-colors w-fit group/link uppercase tracking-wider">
                  Book Session
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover/link:translate-x-1">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-primary-gradient rounded-[2.5rem] p-12 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2)_0%,rgba(0,0,0,0)_100%)] pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Not sure where to start?</h2>
            <p className="text-white/80 font-medium text-lg lg:max-w-md">Schedule a complimentary fitness assessment with an elite coach to map out your perfect path.</p>
          </div>
          <div className="relative z-10 shrink-0">
            <Link to="/contact" className="bg-white text-primary px-8 py-4 rounded-xl font-black shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
              Book Assessment
              <span className="material-symbols-outlined">calendar_today</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
