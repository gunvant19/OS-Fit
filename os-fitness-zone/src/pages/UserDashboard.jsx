import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../utils/api';
import { Link } from 'react-router-dom';

const API = API_URL;

export default function UserDashboard() {
  const { user, token, login } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [payment, setPayment] = useState(null);
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [saveMsg, setSaveMsg] = useState('');

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API}/users/me`, { headers: authHeaders });
      const data = await res.json();
      setProfile(data.user);
      setNewName(data.user?.name || '');
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPayment = async () => {
    try {
      const res = await fetch(`${API}/payments/my-payment`, { headers: authHeaders });
      const data = await res.json();
      setPayment(data.payment);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDietPlan = async () => {
    try {
      const res = await fetch(`${API}/diet-plans/my-plan`, { headers: authHeaders });
      const data = await res.json();
      if (res.ok) setDietPlan(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchProfile(), fetchPayment(), fetchDietPlan()]);
      setLoading(false);
    };
    init();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/users/me`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      setProfile(data.user);
      login(token, data.user); // update context
      setSaveMsg('Profile updated successfully!');
      setEditing(false);
      setTimeout(() => setSaveMsg(''), 3000);
    } catch (e) {
      setSaveMsg('Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <main className="flex-grow flex items-center justify-center pt-24 min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Dashboard</h1>
            <p className="text-slate-500 font-medium mt-1">Welcome back, {profile?.name || user?.name}! 👋</p>
          </div>
          {saveMsg && (
            <div className="bg-emerald-50 text-emerald-700 font-bold px-5 py-2.5 rounded-xl border border-emerald-100 text-sm">
              {saveMsg}
            </div>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-xl shadow-md hover:bg-primary-dark transition-colors">
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              Admin Panel
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Col: Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-4xl text-primary">person</span>
              </div>
              <h2 className="text-xl font-black text-slate-900">{profile?.name}</h2>
              <p className="text-slate-500 font-medium text-sm mt-1">{profile?.email}</p>
              <span className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                profile?.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
              }`}>{profile?.role}</span>

              {!editing ? (
                <button onClick={() => setEditing(true)} className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3 rounded-xl border border-slate-200 transition-colors text-sm">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  Update Profile
                </button>
              ) : (
                <form onSubmit={updateProfile} className="mt-6 space-y-3 text-left">
                  <label className="label-xs">Display Name</label>
                  <input
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="input-field text-sm"
                    placeholder="Your name"
                    required
                  />
                  <div className="flex gap-2 pt-1">
                    <button type="submit" className="flex-1 bg-primary text-white font-bold py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-colors">Save</button>
                    <button type="button" onClick={() => setEditing(false)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-2.5 rounded-xl text-sm hover:bg-slate-200 transition-colors">Cancel</button>
                  </div>
                </form>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 space-y-4">
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider">Account Info</h3>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">Member Since</span>
                <span className="text-sm font-bold text-slate-900">{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '—'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">Membership Status</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
                  profile?.payment_status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}>{profile?.payment_status || 'none'}</span>
              </div>
            </div>
          </div>

          {/* Right Col */}
          <div className="lg:col-span-2 space-y-6">

            {/* Active Membership */}
            {payment ? (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-slate-900">Active Membership</h2>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Active</span>
                </div>
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full -translate-y-12 translate-x-12 blur-2xl pointer-events-none"></div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">{payment.plan_id?.plan_name || 'Unknown Plan'}</h3>
                  <p className="text-sm text-slate-500 font-medium mb-4">{payment.plan_id?.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Duration</p>
                      <p className="font-black text-slate-800 capitalize">{payment.plan_id?.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Price Paid</p>
                      <p className="font-black text-primary">₹{payment.plan_id?.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Purchased On</p>
                      <p className="font-black text-slate-800">{new Date(payment.payment_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {payment.plan_id?.features?.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {payment.plan_id.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <span className="material-symbols-outlined text-emerald-500 text-[16px]">check_circle</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl text-slate-300">card_membership</span>
                </div>
                <h2 className="text-xl font-black text-slate-700 mb-2">No Active Membership</h2>
                <p className="text-slate-500 font-medium mb-6">Unlock all facilities and classes by subscribing to a plan.</p>
                <Link to="/plans" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:bg-primary-dark transition-colors">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Browse Plans
                </Link>
              </div>
            )}

            {/* Assigned Trainer */}
            {profile?.trainer_id && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-slate-900">Personal Trainer</h2>
                  <span className="material-symbols-outlined text-primary text-2xl">fitness_center</span>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl text-primary">person</span>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900">{profile.trainer_id.name}</h3>
                    <p className="text-sm font-bold text-primary uppercase tracking-tight">{profile.trainer_id.specialization}</p>
                    <p className="text-xs text-slate-500 mt-1">{profile.trainer_id.contact}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Diet Plan */}
            {dietPlan ? (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-slate-900">Personal Diet Plan</h2>
                  <span className="material-symbols-outlined text-orange-500 text-2xl">restaurant</span>
                </div>
                <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl -translate-y-8 translate-x-8"></div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{dietPlan.title}</h3>
                  <div className="flex gap-4 items-center mb-6">
                    <span className="bg-white px-3 py-1 rounded-full text-xs font-black text-orange-600 border border-orange-100 uppercase">{dietPlan.goal}</span>
                    <span className="text-sm font-bold text-slate-500">{dietPlan.calories} kcal • {dietPlan.dietType}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Breakfast', val: dietPlan.breakfast, icon: 'wb_sunny' },
                      { label: 'Lunch', val: dietPlan.lunch, icon: 'lunch_dining' },
                      { label: 'Dinner', val: dietPlan.dinner, icon: 'dark_mode' },
                      { label: 'Snacks', val: dietPlan.snacks, icon: 'cookie' },
                    ].map(m => (
                      <div key={m.label} className="bg-white p-4 rounded-2xl border border-orange-100/50">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="material-symbols-outlined text-sm text-orange-400">{m.icon}</span>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{m.label}</p>
                        </div>
                        <p className="text-sm font-bold text-slate-800 leading-relaxed">{m.val || 'Not specified'}</p>
                      </div>
                    ))}
                  </div>

                  {dietPlan.notes && (
                    <div className="mt-6 p-4 bg-white/60 rounded-2xl border border-orange-100/30">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Coach's Notes</p>
                        <p className="text-sm font-medium text-slate-600 italic leading-relaxed">{dietPlan.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-black text-slate-900">Personal Diet Plan</h2>
                        <span className="material-symbols-outlined text-slate-300 text-2xl">restaurant</span>
                    </div>
                    <div className="text-center py-10 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-500 font-medium">Your nutritionist hasn't assigned a plan yet.</p>
                        <p className="text-xs text-slate-400 mt-1">Check back soon for your personalized guide!</p>
                    </div>
                </div>
            )}

            {/* Quick Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'View Trainers', icon: 'fitness_center', to: '/trainers' },
                { label: 'Class Schedule', icon: 'calendar_month', to: '/schedule' },
                { label: 'BMI Calculator', icon: 'monitor_weight', to: '/bmi' },
              ].map(item => (
                <Link key={item.to} to={item.to} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col items-center gap-3 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all text-center group">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
