import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { API_URL } from '../utils/api';

const API = API_URL;

const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export default function AdminDashboard() {
  const { user, token } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('plans');

  // Plans state
  const [plans, setPlans] = useState([]);
  const [planForm, setPlanForm] = useState({ plan_name: '', description: '', duration: 'monthly', price: '', features: '' });
  const [editingPlan, setEditingPlan] = useState(null);

  // Trainers state
  const [trainers, setTrainers] = useState([]);
  const [trainerForm, setTrainerForm] = useState({ name: '', specialization: '', experience: '', contact: '', bio: '' });

  // Diet Plans state
  const [dietPlans, setDietPlans] = useState([]);
  const [dietForm, setDietForm] = useState({ user_id: '', title: '', goal: 'weight loss', breakfast: '', lunch: '', dinner: '', snacks: '', notes: '', calories: '', dietType: 'veg' });
  const [editingDiet, setEditingDiet] = useState(null);

  // Stats state
  const [stats, setStats] = useState({ totalUsers: 0, totalTrainers: 0, activeMemberships: 0, revenue: 0 });

  // User Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // --- Fetch Functions ---
  const fetchPlans = async () => {
    const res = await fetch(`${API}/membership-plans`, { headers: authHeaders(token) });
    const data = await res.json();
    setPlans(data);
  };

  const fetchTrainers = async () => {
    const res = await fetch(`${API}/trainers`, { headers: authHeaders(token) });
    const data = await res.json();
    setTrainers(Array.isArray(data) ? data : data.trainers || []);
  };

  const fetchUsers = async () => {
    let url = `${API}/users?`;
    if (searchTerm) url += `search=${searchTerm}&`;
    if (filterRole) url += `role=${filterRole}&`;
    
    const res = await fetch(url, { headers: authHeaders(token) });
    const data = await res.json();
    setAllUsers(data.users || []);
  };

  const fetchPayments = async () => {
    const res = await fetch(`${API}/payments/history`, { headers: authHeaders(token) });
    const data = await res.json();
    setPayments(data.payments || []);
  };

  const fetchDietPlans = async () => {
    const res = await fetch(`${API}/diet-plans`, { headers: authHeaders(token) });
    const data = await res.json();
    setDietPlans(data);
  };

  const fetchStats = async () => {
    const res = await fetch(`${API}/analytics/stats`, { headers: authHeaders(token) });
    const data = await res.json();
    if (res.ok) setStats(data);
  };

  useEffect(() => {
    fetchPlans();
    fetchTrainers();
    fetchUsers();
    fetchPayments();
    fetchDietPlans();
    fetchStats();
  }, [searchTerm, filterRole]);

  // --- Plan Actions ---
  const savePlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        plan_name: planForm.plan_name,
        description: planForm.description,
        duration: planForm.duration,
        price: Number(planForm.price),
        features: planForm.features.split(',').map(f => f.trim()).filter(Boolean),
      };

      const url = editingPlan ? `${API}/membership-plans/${editingPlan._id}` : `${API}/membership-plans`;
      const method = editingPlan ? 'PUT' : 'POST';

      const res = await fetch(url, { method, headers: authHeaders(token), body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Failed to save plan');

      showMessage(editingPlan ? 'Plan updated!' : 'Plan created!');
      setPlanForm({ plan_name: '', description: '', duration: 'monthly', price: '', features: '' });
      setEditingPlan(null);
      fetchPlans();
    } catch (err) {
      showMessage('Error: ' + err.message);
    }
    setLoading(false);
  };

  const deletePlan = async (id) => {
    if (!confirm('Delete this membership plan?')) return;
    await fetch(`${API}/membership-plans/${id}`, { method: 'DELETE', headers: authHeaders(token) });
    showMessage('Plan deleted.');
    fetchPlans();
  };

  const startEditPlan = (plan) => {
    setEditingPlan(plan);
    setPlanForm({
      plan_name: plan.plan_name,
      description: plan.description,
      duration: plan.duration,
      price: plan.price,
      features: (plan.features || []).join(', ')
    });
  };

  // --- Trainer Actions ---
  const saveTrainer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...trainerForm, experience: Number(trainerForm.experience) };
      const res = await fetch(`${API}/trainers`, { method: 'POST', headers: authHeaders(token), body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Failed to add trainer');
      showMessage('Trainer added!');
      setTrainerForm({ name: '', specialization: '', experience: '', contact: '', bio: '' });
      fetchTrainers();
    } catch (err) {
      showMessage('Error: ' + err.message);
    }
    setLoading(false);
  };

  const deleteTrainer = async (id) => {
    if (!confirm('Delete this trainer?')) return;
    await fetch(`${API}/trainers/${id}`, { method: 'DELETE', headers: authHeaders(token) });
    showMessage('Trainer deleted.');
    fetchTrainers();
  };

  // --- User Actions ---
  const assignTrainer = async (userId, trainerId) => {
    try {
      const res = await fetch(`${API}/users/${userId}`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify({ trainer_id: trainerId }),
      });
      if (!res.ok) throw new Error('Failed to assign trainer');
      showMessage('Trainer assigned!');
      fetchUsers();
    } catch (err) {
      showMessage('Error: ' + err.message);
    }
  };

  const deleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    try {
      const res = await fetch(`${API}/users/${id}`, {
        method: 'DELETE',
        headers: authHeaders(token),
      });
      if (!res.ok) throw new Error('Failed to delete user');
      showMessage('User deleted successfully');
      fetchUsers();
      fetchStats();
    } catch (err) {
      showMessage('Error: ' + err.message);
    }
  };

  // --- Diet Actions ---
  const saveDietPlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...dietForm, calories: Number(dietForm.calories) };
      const url = editingDiet ? `${API}/diet-plans/${editingDiet._id}` : `${API}/diet-plans`;
      const method = editingDiet ? 'PUT' : 'POST';

      const res = await fetch(url, { method, headers: authHeaders(token), body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Failed to save diet plan');

      showMessage(editingDiet ? 'Diet plan updated!' : 'Diet plan created!');
      setDietForm({ user_id: '', title: '', goal: 'weight loss', breakfast: '', lunch: '', dinner: '', snacks: '', notes: '', calories: '', dietType: 'veg' });
      setEditingDiet(null);
      fetchDietPlans();
    } catch (err) {
      showMessage('Error: ' + err.message);
    }
    setLoading(false);
  };

  const deleteDiet = async (id) => {
    if (!confirm('Delete this diet plan?')) return;
    await fetch(`${API}/diet-plans/${id}`, { method: 'DELETE', headers: authHeaders(token) });
    showMessage('Diet plan deleted.');
    fetchDietPlans();
  };

  const startEditDiet = (diet) => {
    setEditingDiet(diet);
    setDietForm({
      user_id: diet.user_id?._id || diet.user_id,
      title: diet.title,
      goal: diet.goal,
      breakfast: diet.breakfast || '',
      lunch: diet.lunch || '',
      dinner: diet.dinner || '',
      snacks: diet.snacks || '',
      notes: diet.notes || '',
      calories: diet.calories || '',
      dietType: diet.dietType || 'veg'
    });
  };

  const tabs = [
    { id: 'plans', label: 'Membership Plans', icon: 'card_membership' },
    { id: 'trainers', label: 'Trainers', icon: 'fitness_center' },
    { id: 'users', label: 'All Users', icon: 'group' },
    { id: 'diet', label: 'Diet Plans', icon: 'restaurant_menu' },
    { id: 'payments', label: 'Payment History', icon: 'receipt_long' },
  ];

  return (
    <main className="flex-grow pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 font-medium mt-1">Welcome back, {user?.name}! Manage your fitness platform below.</p>
          </div>
          {message && (
            <div className="bg-primary/10 text-primary font-bold px-5 py-2.5 rounded-xl border border-primary/20 shadow-sm text-sm">
              {message}
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Plans', value: plans.length, icon: 'card_membership', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
            { label: 'Trainers', value: stats.totalTrainers, icon: 'fitness_center', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
            { label: 'Total Users', value: stats.totalUsers, icon: 'group', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
            { label: 'Revenue', value: `₹${stats.revenue}`, icon: 'payments', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' },
          ].map(stat => (
            <div key={stat.label} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex gap-1 p-2 bg-slate-50 border-b border-slate-100 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 lg:p-10">

            {/* ---- MEMBERSHIP PLANS TAB ---- */}
            {activeTab === 'plans' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Form */}
                <div>
                  <h2 className="text-xl font-black text-slate-900 mb-6">{editingPlan ? 'Edit Plan' : 'Create New Plan'}</h2>
                  <form onSubmit={savePlan} className="space-y-5">
                    <div>
                      <label className="label-xs">Plan Name</label>
                      <input required className="input-field" placeholder="e.g. Gold Monthly" value={planForm.plan_name} onChange={e => setPlanForm({...planForm, plan_name: e.target.value})} />
                    </div>
                    <div>
                      <label className="label-xs">Description</label>
                      <textarea required rows="3" className="input-field resize-none" placeholder="What you get with this plan..." value={planForm.description} onChange={e => setPlanForm({...planForm, description: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label-xs">Duration</label>
                        <select className="input-field" value={planForm.duration} onChange={e => setPlanForm({...planForm, duration: e.target.value})}>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                      </div>
                      <div>
                        <label className="label-xs">Price (₹)</label>
                        <input required type="number" className="input-field" placeholder="49.99" value={planForm.price} onChange={e => setPlanForm({...planForm, price: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label className="label-xs">Features (comma-separated)</label>
                      <input className="input-field" placeholder="Gym Access, Locker Room, Classes" value={planForm.features} onChange={e => setPlanForm({...planForm, features: e.target.value})} />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="submit" disabled={loading} className="flex-1 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-colors shadow-md">
                        {loading ? 'Saving...' : (editingPlan ? 'Update Plan' : 'Create Plan')}
                      </button>
                      {editingPlan && (
                        <button type="button" onClick={() => { setEditingPlan(null); setPlanForm({ plan_name: '', description: '', duration: 'monthly', price: '', features: '' }); }}
                          className="px-5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Plans List */}
                <div>
                  <h2 className="text-xl font-black text-slate-900 mb-6">Current Plans ({plans.length})</h2>
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                    {plans.length === 0 ? (
                      <p className="text-slate-400 text-center py-10 font-medium">No plans created yet.</p>
                    ) : plans.map(plan => (
                      <div key={plan._id} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-black text-slate-900">{plan.plan_name}</h3>
                            <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded mt-1 inline-block ${
                              plan.duration === 'yearly' ? 'bg-emerald-100 text-emerald-700' :
                              plan.duration === 'quarterly' ? 'bg-blue-100 text-blue-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>{plan.duration}</span>
                          </div>
                          <p className="text-2xl font-black text-primary">₹{plan.price}</p>
                        </div>
                        <p className="text-sm text-slate-500 mb-3">{plan.description}</p>
                        <div className="flex gap-2">
                          <button onClick={() => startEditPlan(plan)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm hover:bg-blue-100 transition-colors">
                            <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                          </button>
                          <button onClick={() => deletePlan(plan._id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors">
                            <span className="material-symbols-outlined text-[16px]">delete</span> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ---- TRAINERS TAB ---- */}
            {activeTab === 'trainers' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Add Trainer Form */}
                <div>
                  <h2 className="text-xl font-black text-slate-900 mb-6">Add Trainer</h2>
                  <form onSubmit={saveTrainer} className="space-y-5">
                    <div>
                      <label className="label-xs">Full Name</label>
                      <input required className="input-field" placeholder="e.g. John Smith" value={trainerForm.name} onChange={e => setTrainerForm({...trainerForm, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="label-xs">Specialization</label>
                      <input required className="input-field" placeholder="e.g. Strength & Conditioning" value={trainerForm.specialization} onChange={e => setTrainerForm({...trainerForm, specialization: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label-xs">Experience (Years)</label>
                        <input required type="number" className="input-field" placeholder="5" value={trainerForm.experience} onChange={e => setTrainerForm({...trainerForm, experience: e.target.value})} />
                      </div>
                      <div>
                        <label className="label-xs">Contact (Phone/Email)</label>
                        <input required className="input-field" placeholder="+1 555-1234" value={trainerForm.contact} onChange={e => setTrainerForm({...trainerForm, contact: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label className="label-xs">Bio (Optional)</label>
                      <textarea rows="3" className="input-field resize-none" placeholder="Brief bio about the trainer..." value={trainerForm.bio} onChange={e => setTrainerForm({...trainerForm, bio: e.target.value})} />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-colors shadow-md">
                      {loading ? 'Adding...' : 'Add Trainer'}
                    </button>
                  </form>
                </div>

                {/* Trainers List */}
                <div>
                  <h2 className="text-xl font-black text-slate-900 mb-6">Current Trainers ({trainers.length})</h2>
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                    {trainers.length === 0 ? (
                      <p className="text-slate-400 text-center py-10 font-medium">No trainers added yet.</p>
                    ) : trainers.map(trainer => (
                      <div key={trainer._id} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-black text-slate-900">{trainer.name}</h3>
                            <p className="text-sm font-medium text-primary mt-0.5">{trainer.specialization}</p>
                            <p className="text-sm text-slate-500 mt-1">{trainer.experience} years experience • {trainer.contact}</p>
                            {trainer.bio && <p className="text-xs text-slate-400 mt-2 leading-relaxed">{trainer.bio}</p>}
                          </div>
                          <button onClick={() => deleteTrainer(trainer._id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors shrink-0 ml-2">
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ---- USERS TAB ---- */}
            {activeTab === 'users' && (
              <div>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">User Management</h2>
                    <p className="text-sm text-slate-500 font-medium">Manage permissions and view all registered users.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                      <input 
                        type="text" 
                        placeholder="Search name or email..." 
                        className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-primary/10 outline-none w-full sm:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select 
                      className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none cursor-pointer"
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                    >
                      <option value="">All Roles</option>
                      <option value="user">Users</option>
                      <option value="admin">Admins</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        {['User', 'Email', 'Role', 'Membership', 'Trainer', 'Status', 'Actions'].map(h => (
                          <th key={h} className="text-left px-5 py-3.5 font-bold text-slate-500 uppercase tracking-wide text-[11px]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {allUsers.map(u => (
                        <tr key={u._id} className="bg-white hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-4 font-bold text-slate-900">{u.name}</td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                              u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-slate-600">{u.membership_id?.plan_name || '—'}</td>
                          <td className="px-5 py-4">
                            <select 
                              className="bg-transparent border-0 font-medium text-slate-900 outline-none focus:ring-0 cursor-pointer"
                              value={u.trainer_id?._id || ''}
                              onChange={(e) => assignTrainer(u._id, e.target.value)}
                            >
                              <option value="">None</option>
                              {trainers.map(t => (
                                <option key={t._id} value={t._id}>{t.name}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                              u.payment_status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                            }`}>
                              {u.payment_status}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex gap-2">
                               <button 
                                 title="Delete User"
                                 onClick={() => deleteUser(u._id)}
                                 className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                >
                                 <span className="material-symbols-outlined text-[18px]">delete</span>
                               </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {allUsers.length === 0 && <p className="text-center py-10 text-slate-400 font-medium">No users registered yet.</p>}
                </div>
              </div>
            )}

            {/* ---- DIET PLANS TAB ---- */}
            {activeTab === 'diet' && (
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h2 className="text-xl font-black text-slate-900 mb-6">{editingDiet ? 'Edit Diet Plan' : 'Create Diet Plan for User'}</h2>
                  <form onSubmit={saveDietPlan} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-1">
                      <label className="label-xs">Select User</label>
                      <select required className="input-field" value={dietForm.user_id} onChange={e => setDietForm({...dietForm, user_id: e.target.value})}>
                        <option value="">Choose User...</option>
                        {allUsers.filter(u => u.role === 'user').map(u => (
                          <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label-xs">Plan Title</label>
                      <input required className="input-field" placeholder="e.g. Muscle Building Plan" value={dietForm.title} onChange={e => setDietForm({...dietForm, title: e.target.value})} />
                    </div>
                    <div>
                      <label className="label-xs">Goal</label>
                      <select className="input-field" value={dietForm.goal} onChange={e => setDietForm({...dietForm, goal: e.target.value})}>
                        <option value="weight loss">Weight Loss</option>
                        <option value="muscle gain">Muscle Gain</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                    <div>
                      <label className="label-xs">Diet Type</label>
                      <select className="input-field" value={dietForm.dietType} onChange={e => setDietForm({...dietForm, dietType: e.target.value})}>
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-Vegetarian</option>
                        <option value="vegan">Vegan</option>
                      </select>
                    </div>
                    <div>
                      <label className="label-xs">Breakfast</label>
                      <input className="input-field" placeholder="Oats, fruits, eggs..." value={dietForm.breakfast} onChange={e => setDietForm({...dietForm, breakfast: e.target.value})} />
                    </div>
                    <div>
                      <label className="label-xs">Lunch</label>
                      <input className="input-field" placeholder="Grilled chicken, rice, salad..." value={dietForm.lunch} onChange={e => setDietForm({...dietForm, lunch: e.target.value})} />
                    </div>
                    <div>
                      <label className="label-xs">Dinner</label>
                      <input className="input-field" placeholder="Salmon, sweet potato, veggies..." value={dietForm.dinner} onChange={e => setDietForm({...dietForm, dinner: e.target.value})} />
                    </div>
                    <div>
                      <label className="label-xs">Snacks</label>
                      <input className="input-field" placeholder="Nuts, yogurt, protein bar..." value={dietForm.snacks} onChange={e => setDietForm({...dietForm, snacks: e.target.value})} />
                    </div>
                    <div>
                      <label className="label-xs">Target Calories</label>
                      <input type="number" className="input-field" placeholder="2500" value={dietForm.calories} onChange={e => setDietForm({...dietForm, calories: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="label-xs">Additional Notes</label>
                        <textarea rows="2" className="input-field resize-none" placeholder="Drink 3L water, avoid sugar..." value={dietForm.notes} onChange={e => setDietForm({...dietForm, notes: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 flex gap-3">
                      <button type="submit" disabled={loading} className="flex-1 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-colors shadow-md">
                        {loading ? 'Saving...' : (editingDiet ? 'Update Diet Plan' : 'Assign Diet Plan')}
                      </button>
                      {editingDiet && (
                        <button type="button" onClick={() => { setEditingDiet(null); setDietForm({ user_id: '', title: '', goal: 'weight loss', breakfast: '', lunch: '', dinner: '', snacks: '', notes: '', calories: '', dietType: 'veg' }); }}
                          className="px-8 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="mt-10">
                  <h2 className="text-xl font-black text-slate-900 mb-6">Existing Diet Plans ({dietPlans.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dietPlans.map(plan => (
                      <div key={plan._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-black text-slate-900">{plan.title}</h3>
                                <p className="text-xs font-bold text-primary uppercase mt-1">For: {plan.user_id?.name || 'Unknown'}</p>
                            </div>
                            <span className="bg-slate-50 text-slate-500 text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter border border-slate-100">{plan.goal}</span>
                          </div>
                          <div className="space-y-3 text-sm mb-6">
                            <div className="flex gap-3 items-center text-slate-600"><span className="w-2 h-2 rounded-full bg-orange-400"></span> <strong>B:</strong> {plan.breakfast || '—'}</div>
                            <div className="flex gap-3 items-center text-slate-600"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> <strong>L:</strong> {plan.lunch || '—'}</div>
                            <div className="flex gap-3 items-center text-slate-600"><span className="w-2 h-2 rounded-full bg-blue-400"></span> <strong>D:</strong> {plan.dinner || '—'}</div>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-slate-50">
                          <button onClick={() => startEditDiet(plan)} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-colors">
                            <span className="material-symbols-outlined text-[14px]">edit</span> Edit
                          </button>
                          <button onClick={() => deleteDiet(plan._id)} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 transition-colors">
                            <span className="material-symbols-outlined text-[14px]">delete</span> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    {dietPlans.length === 0 && <p className="col-span-full text-center py-20 text-slate-400 font-medium">No diet plans created yet.</p>}
                  </div>
                </div>
              </div>
            )}

            {/* ---- PAYMENTS TAB ---- */}
            {activeTab === 'payments' && (
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-6">Payment History ({payments.length})</h2>
                <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        {['User', 'Email', 'Plan', 'Price', 'Status', 'Date'].map(h => (
                          <th key={h} className="text-left px-5 py-3.5 font-bold text-slate-500 uppercase tracking-wide text-[11px]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {payments.map(p => (
                        <tr key={p._id} className="bg-white hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-4 font-bold text-slate-900">{p.user_id?.name || '—'}</td>
                          <td className="px-5 py-4 text-slate-600">{p.user_id?.email || '—'}</td>
                          <td className="px-5 py-4 font-medium text-slate-800">{p.plan_id?.plan_name || '—'}</td>
                          <td className="px-5 py-4 font-black text-primary">₹{p.plan_id?.price || '—'}</td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                              p.payment_status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                            }`}>
                              {p.payment_status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-slate-500">{new Date(p.payment_date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {payments.length === 0 && <p className="text-center py-10 text-slate-400 font-medium">No payments recorded yet.</p>}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
