import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../utils/api';

export default function Trainers() {
  const { user, token } = useContext(AuthContext);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
    contact: '',
    bio: '',
    photo: ''
  });
  const [message, setMessage] = useState('');

  const fetchTrainers = async () => {
    try {
      const response = await fetch(`${API_URL}/trainers`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (response.ok) {
        const data = await response.json();
        setTrainers(Array.isArray(data) ? data : data.trainers || []);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const isAdmin = user?.role === 'admin';

  const handleOpenModal = (trainer = null) => {
    if (trainer) {
      setEditingTrainer(trainer);
      setFormData({
        name: trainer.name,
        specialization: trainer.specialization,
        experience: trainer.experience,
        contact: trainer.contact,
        bio: trainer.bio || '',
        photo: trainer.photo || trainer.photoUrl || ''
      });
    } else {
      setEditingTrainer(null);
      setFormData({ name: '', specialization: '', experience: '', contact: '', bio: '', photo: '' });
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this trainer?')) return;
    try {
      const res = await fetch(`${API_URL}/trainers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setMessage('Trainer deleted successfully');
        fetchTrainers();
      }
    } catch (err) {
      setMessage('Error deleting trainer');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingTrainer 
      ? `${API_URL}/trainers/${editingTrainer._id}`
      : `${API_URL}/trainers`;
    const method = editingTrainer ? 'PUT' : 'POST';

    try {
      console.log('Sending trainer data:', { url, method, body: { ...formData, experience: Number(formData.experience) } });
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...formData, experience: Number(formData.experience) })
      });

      console.log('Server response status:', res.status);

      if (res.ok) {
        setMessage(editingTrainer ? 'Trainer updated!' : 'Trainer added!');
        setShowModal(false);
        fetchTrainers();
      } else {
        const data = await res.json();
        console.error('Submission failed:', data);
        setMessage(data.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Fetch error during submission:', err);
      setMessage('Network error');
    }
  };

  return (
    <main className="flex-grow pt-24 pb-24 bg-white relative min-h-screen">
      {/* Background Decorators */}
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary tracking-wide uppercase mb-4">
            Meet The Elite
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            World-Class Coaches.
          </h1>
          <p className="text-lg text-slate-600 font-medium mb-8">
            Train with industry-leading experts dedicated to pushing your limits and maximizing your potential.
          </p>

          {isAdmin && (
            <button 
              onClick={() => handleOpenModal()}
              className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-primary/30 transition-all active:scale-95 flex items-center gap-2 mx-auto"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Add New Trainer
            </button>
          )}

          {message && (
            <div className="mt-6 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg inline-block animate-bounce">
              {message}
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-slate-900">
            {trainers.map((trainer, i) => (
              <div key={trainer._id} className="group flex flex-col rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0 bg-slate-200 animate-pulse -z-10"></div>
                  <img 
                    src={trainer.photo || trainer.photoUrl || `https://source.unsplash.com/random/600x800/?fitness,trainer&sig=${i}`} 
                    alt={trainer.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Action / Stats */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {isAdmin && (
                      <>
                        <button 
                          onClick={() => handleOpenModal(trainer)}
                          className="bg-white/90 backdrop-blur-md p-2 rounded-xl text-blue-600 hover:bg-white transition-all shadow-sm border border-white"
                        >
                          <span className="material-symbols-outlined block text-[20px]">edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(trainer._id)}
                          className="bg-white/90 backdrop-blur-md p-2 rounded-xl text-red-600 hover:bg-white transition-all shadow-sm border border-white"
                        >
                          <span className="material-symbols-outlined block text-[20px]">delete</span>
                        </button>
                      </>
                    )}
                    {!isAdmin && (
                      <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl text-primary border border-white">
                        <span className="material-symbols-outlined block">person_add</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-8 relative bg-white flex-grow flex flex-col">
                  {/* Badge sticking up */}
                  <div className="absolute -top-6 left-8 bg-primary-gradient text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                    {trainer.experience}+ Years Exp
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 mb-1 leading-tight">{trainer.name}</h3>
                  <p className="text-sm font-bold text-primary mb-4 uppercase tracking-wide">{trainer.specialization}</p>
                  
                  <p className="text-slate-600 text-[15px] leading-relaxed mb-6 font-medium flex-grow">
                    {trainer.bio || "Success starts with the right guidance. Join my sessions to push your boundaries."}
                  </p>
                  
                  <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                    </div>
                    <button className="ml-auto text-sm font-bold text-slate-900 hover:text-primary flex items-center gap-1 transition-colors group/btn">
                      View Schedule 
                      <span className="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Admin Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-8 animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-black text-slate-900 mb-6">{editingTrainer ? 'Edit Trainer' : 'Add New Trainer'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Full Name</label>
                <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 font-bold text-sm" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Wick" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Specialization</label>
                <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 font-bold text-sm" 
                  value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} placeholder="e.g. Tactical Fitness" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Experience (Yrs)</label>
                  <input required type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 font-bold text-sm" 
                    value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} placeholder="5" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Contact</label>
                  <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 font-bold text-sm" 
                    value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Photo URL (Optional)</label>
                <input className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 font-bold text-sm" 
                  value={formData.photo} onChange={e => setFormData({...formData, photo: e.target.value})} placeholder="https://..." />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Bio</label>
                <textarea rows="3" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 font-bold text-sm resize-none" 
                  value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} placeholder="Small description..." />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-primary/30 active:scale-95 transition-all">
                  {editingTrainer ? 'Update Details' : 'Create Trainer'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="px-6 bg-slate-100 text-slate-500 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
