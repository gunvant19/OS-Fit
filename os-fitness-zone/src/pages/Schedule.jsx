export default function Schedule() {
  return (
    <main className="flex-grow pt-24 pb-24 bg-slate-50 relative min-h-screen">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary tracking-wide uppercase mb-4 shadow-sm">
            Gym Timings
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Our Schedule
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            Check our gym operating hours and plan your visits accordingly.
          </p>
        </div>

        {/* Gym Timings Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden max-w-2xl mx-auto mb-10">
          
          {/* Mon - Sat */}
          <div className="p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-2xl">fitness_center</span>
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-black text-slate-900 mb-1">Monday – Saturday</h3>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-bold px-3 py-1.5 rounded-lg border border-emerald-100">
                  <span className="material-symbols-outlined text-[16px]">wb_sunny</span>
                  6:00 AM – 11:00 AM
                </span>
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm font-bold px-3 py-1.5 rounded-lg border border-blue-100">
                  <span className="material-symbols-outlined text-[16px]">dark_mode</span>
                  4:00 PM – 9:30 PM
                </span>
              </div>
            </div>
          </div>

          {/* Sunday */}
          <div className="p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-red-500 text-2xl">event_busy</span>
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Sunday</h3>
              <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-sm font-bold px-3 py-1.5 rounded-lg border border-red-100">
                <span className="material-symbols-outlined text-[16px]">block</span>
                Closed
              </span>
            </div>
          </div>
        </div>

        {/* Reserved for Future */}
        <div className="bg-white rounded-3xl shadow-sm border border-dashed border-slate-200 p-10 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl text-slate-400">construction</span>
          </div>
          <h2 className="text-xl font-black text-slate-700 mb-2">Reserved for Future</h2>
          <p className="text-slate-500 font-medium">
            Detailed class timetable and online booking features are coming soon. Stay tuned!
          </p>
        </div>

      </section>
    </main>
  );
}
