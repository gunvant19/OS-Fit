import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main className="flex-grow pt-24 pb-24 bg-white relative">
      {/* Hero Content */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary tracking-wide uppercase shadow-sm">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              We build <span className="text-primary italic">stronger</span> bodies and unbreakable minds.
            </h1>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Founded in 2018, OS Fitness Zone started with a simple belief: fitness shouldn't be intimidating, and excellence shouldn't be exclusive. We created a space where world-class coaching meets an unwavering community.
            </p>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              We aren't just a gym; we are a high-performance lifestyle center dedicated to helping you break through plateaus and achieve sustainable, lifelong health.
            </p>
            
            <div className="pt-4 flex items-center gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-slate-900">10k+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Lives Changed</span>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-slate-900">50+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Global Awards</span>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-slate-900">2</span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Elite Facilities</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-60 mix-blend-multiply pointer-events-none"></div>
            <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-2xl border border-white">
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop" 
                alt="Gym facility showing strength training equipment" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-24 mt-12 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">The OS Philosophy</h2>
            <div className="h-1.5 w-24 rounded-full bg-primary-gradient mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary mx-auto rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[32px]">science</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Evidence-Based</h3>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">Every workout plan, diet regime, and recovery protocol we offer is backed by rigorous sports science, not fads.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary mx-auto rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[32px]">groups</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Radical Inclusion</h3>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">Whether you're lifting an empty bar or 400 pounds, our community respects effort above all else. Iron sharpens iron.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary mx-auto rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[32px]">trending_up</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Relentless Progress</h3>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">We don't settle for "good enough". Our coaches are dedicated to ensuring you are 1% better every single day.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mini CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-6">Want to be part of the story?</h2>
        <Link to="/plans" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-white font-black shadow-lg hover:bg-primary-light hover:scale-105 transition-all">
          View Membership Options
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </Link>
      </section>
    </main>
  );
}
