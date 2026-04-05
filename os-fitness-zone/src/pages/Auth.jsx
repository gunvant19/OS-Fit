import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/api';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`${API_URL}${endpoint.replace('/api', '')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      if (isLogin) {
        login(data.accessToken, data.user);
        navigate('/dashboard');
      } else {
        setIsLogin(true);
        setError('Registration successful! Please login with your new credentials.');
      }
    } catch (err) {
      console.error('Auth Error:', err);
      setError(err.message === 'Failed to fetch' 
        ? 'Could not connect to the server. Please ensure the backend is running.' 
        : err.message);
    }
  };

  return (
    <main className="flex-grow bg-slate-50 relative min-h-screen z-0 py-24 px-4 sm:px-6 flex items-center justify-center">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-400/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-100">
        
        {/* Visual Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 text-white relative overflow-hidden bg-primary-gradient">
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/40 blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-black/30 blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover mix-blend-overlay"
              alt="Gym Background"
            />
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md flex items-center justify-center rounded-xl mb-6 shadow-sm border border-white/30">
              <span className="material-symbols-outlined text-white text-2xl">fitness_center</span>
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight">
              Start your fitness<br/>journey today.
            </h1>
            <p className="text-lg font-medium opacity-90 max-w-sm">
              Join OS Fitness Zone's premium community. Personalized programs designed exclusively for your success.
            </p>
          </div>
          
          <div className="relative z-10 mt-16">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg">
              <p className="italic mb-6 text-[15px] font-medium leading-relaxed">
                "The customized programs changed everything for me. Elite trainers, premium facilities, and a supportive environment."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 shadow-sm">
                  <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfS0Z_vKx_C4s67DpPt9WLF1h8lty1rdXS9GdWiwaeTb9-cCpNlIJrL7fvaln2pwnSsn2RgvSaLCzcGlItgaHMuw6RRNmkj4Ff2JKmR7w1JWPoOsB62g60ShToMM70c5X7bzY4u7u6V45cHyz8Ay-B6WNC7dtNpDsdIknA3oI92KCuIjvrirCBVp4LG32PfkUGmJZKNEGOnCdIk2489B9PTLRWp2XbIIdzV017CL00AnXqIhpJ-ELz6_jedH7rnjAaAg8wVybEo5A"/>
                </div>
                <div>
                  <p className="font-bold text-sm tracking-wide">Sarah Jenkins</p>
                  <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">Pro Member Since '22</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <div className="flex border-b border-slate-200 mb-10 w-full relative">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 pb-4 text-center text-sm uppercase tracking-wider font-bold transition-all ${isLogin ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 pb-4 text-center text-sm uppercase tracking-wider font-bold transition-all ${!isLogin ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Create Account
              </button>
              
              {/* Animated underline */}
              <div 
                className="absolute bottom-[-1px] h-0.5 bg-primary transition-all duration-300 ease-in-out" 
                style={{ left: isLogin ? '0%' : '50%', width: '50%' }}
              />
            </div>
            
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">
              {isLogin ? 'Welcome back.' : 'Join the club.'}
            </h3>
            <p className="text-slate-500 font-medium mt-2">
              {isLogin ? 'Enter your credentials to access your dashboard.' : 'Fill in the details below to get started.'}
            </p>
          </div>
          
          {error && (
            <div className={`p-4 mb-6 rounded-xl border text-sm font-semibold flex items-center gap-2 ${error.includes('successful') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              <span className="material-symbols-outlined text-[18px]">
                {error.includes('successful') ? 'check_circle' : 'error'}
              </span>
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">person</span>
                  <input 
                    required 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none text-slate-900 transition-all font-medium" 
                    placeholder="John Doe" 
                    type="text" 
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">mail</span>
                <input 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none text-slate-900 transition-all font-medium" 
                  placeholder="name@example.com" 
                  type="email" 
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                {isLogin && <a className="text-xs font-bold text-primary hover:text-primary-dark transition-colors" href="#">Forgot passing?</a>}
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">lock</span>
                <input 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none text-slate-900 transition-all font-medium" 
                  placeholder="Enter your security phrase" 
                  type="password" 
                />
              </div>
            </div>
            
            <button className="w-full text-white font-black py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 bg-primary hover:bg-primary-light active:scale-[0.98] mt-4" type="submit">
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              <span className="material-symbols-outlined text-xl">arrow_right_alt</span>
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-slate-100 w-full text-center">
             <p className="text-sm text-slate-500 font-medium">
                {isLogin ? "Don't have an account?" : "Already a member?"} 
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="font-bold text-slate-900 hover:text-primary ml-1.5 transition-colors underline decoration-2 underline-offset-2"
                >
                  {isLogin ? 'Join us today' : 'Sign in instead'}
                </button>
             </p>
          </div>
        </div>
      </div>
    </main>
  );
}
