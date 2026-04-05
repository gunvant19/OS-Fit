import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const scheduleData = {
    Monday: [
      { time: '06:00 AM', class: 'Power Yoga', trainer: 'Sarah Chen', type: 'Mind & Body', duration: '60 min', spot: '12 spots left', id: 1 },
      { time: '08:30 AM', class: 'HIIT Extreme', trainer: 'David Reed', type: 'Cardio', duration: '45 min', spot: 'Full', id: 2 },
      { time: '05:30 PM', class: 'Olympic Lifting', trainer: 'Marcus Johnson', type: 'Strength', duration: '90 min', spot: '4 spots left', id: 3 },
      { time: '07:00 PM', class: 'Core Crusher', trainer: 'David Reed', type: 'Strength', duration: '30 min', spot: '8 spots left', id: 4 }
    ],
    Tuesday: [
      { time: '07:00 AM', class: 'Spin & Sprint', trainer: 'Elena Rodriguez', type: 'Cardio', duration: '45 min', spot: '2 spots left', id: 5 },
      { time: '12:00 PM', class: 'Express HIIT', trainer: 'David Reed', type: 'Cardio', duration: '30 min', spot: '15 spots left', id: 6 },
      { time: '06:00 PM', class: 'Vinyasa Flow', trainer: 'Sarah Chen', type: 'Mind & Body', duration: '75 min', spot: 'Booked', id: 7 }
    ],
    // Dummy repetitive data for other days to show functionality
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  };

  // Populate empty days with random classes for demonstration
  ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(day => {
    scheduleData[day] = scheduleData['Monday'].map(item => ({...item, id: Math.random()}));
  });

  return (
    <main className="flex-grow pt-24 pb-24 bg-slate-50 relative min-h-screen">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary tracking-wide uppercase mb-4 shadow-sm">
            Class Timetable
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Plan your workouts.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Own your week.</span>
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            Browse our comprehensive schedule of expert-led group fitness classes and reserve your spot instantly.
          </p>
        </div>

        {/* Day Selector Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 mb-8 overflow-x-auto mx-auto max-w-5xl hide-scrollbar">
          <div className="flex justify-between min-w-[600px] gap-2">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide text-center ${
                  activeDay === day 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Classes List */}
        <div className="max-w-5xl mx-auto space-y-4">
          {scheduleData[activeDay].length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center border border-slate-100 shadow-sm">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-4 block">event_busy</span>
              <p className="text-lg font-bold text-slate-600">No classes scheduled for {activeDay}.</p>
            </div>
          ) : (
            scheduleData[activeDay].map(cls => (
              <div key={cls.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow hover:border-slate-200 group">
                
                <div className="flex items-center gap-6">
                  <div className="w-24 shrink-0 text-center md:text-left md:border-r md:border-slate-100 pr-4">
                    <p className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">{cls.time.split(' ')[0]}</p>
                    <p className="text-sm font-bold text-slate-400">{cls.time.split(' ')[1]}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-black text-slate-900">{cls.class}</h3>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        cls.type === 'Cardio' ? 'bg-orange-100 text-orange-700' :
                        cls.type === 'Strength' ? 'bg-blue-100 text-blue-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {cls.type}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">person</span>
                        {cls.trainer}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        {cls.duration}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <p className={`text-sm font-bold ${cls.spot === 'Full' ? 'text-red-500' : 'text-emerald-500'}`}>
                      {cls.spot}
                    </p>
                  </div>
                  <Link 
                    to="/booking"
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all text-center min-w-[120px] ${
                      cls.spot === 'Full'
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                        : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    {cls.spot === 'Full' ? 'Waitlist' : 'Book Now'}
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

      </section>
    </main>
  );
}
