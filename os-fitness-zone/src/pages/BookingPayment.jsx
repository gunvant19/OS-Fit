import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { API_URL } from '../utils/api';

const API = API_URL;

export default function BookingPayment() {
  const { user, token, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentSent, setPaymentSent] = useState(false);
  const [error, setError] = useState('');

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    fetch(`${API}/membership-plans`)
      .then(res => res.json())
      .then(data => setPlans(Array.isArray(data) ? data : []))
      .catch(() => setPlans([]));
  }, []);

  const processPayment = async (e) => {
    e.preventDefault();
    setStep(3);
    try {
      const res = await fetch(`${API}/payments/purchase`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ plan_id: selectedPlan._id }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Payment failed');
      }

      // Refresh user profile to get updated membership
      const profileRes = await fetch(`${API}/users/me`, { headers: authHeaders });
      const profileData = await profileRes.json();
      if (profileData.user) {
        login(token, profileData.user);
      }

      setPaymentSent(true);
    } catch (err) {
      setError(err.message);
      setStep(2);
    }
  };

  if (paymentSent) {
    return (
      <main className="flex-grow pt-24 pb-24 bg-slate-50 flex items-center justify-center min-h-[80vh]">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 text-center max-w-lg w-full mx-4">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-500 mx-auto rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-50">
            <span className="material-symbols-outlined text-5xl">check_circle</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Payment Successful!</h2>
          <p className="text-slate-500 font-medium mb-2">
            Your <strong>{selectedPlan?.plan_name}</strong> membership is now active.
          </p>
          <p className="text-sm text-slate-400 mb-8">A receipt has been sent to {user?.email}.</p>
          <Link to="/dashboard" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg block text-center">
            Go to My Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-24 pb-24 bg-slate-50 min-h-screen">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Stepper */}
        <div className="mb-12">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center mb-8">Secure Checkout</h1>
          <div className="flex items-center justify-center max-w-md mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 -z-10 rounded-full"></div>
            <div className="absolute top-1/2 left-0 h-1 bg-primary transition-all duration-500 -translate-y-1/2 -z-10 rounded-full"
              style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
            <div className="w-full flex justify-between">
              {[1, 2, 3].map(n => (
                <div key={n} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-4 border-slate-50 shadow-sm ${step >= n ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}`}>{n}</div>
              ))}
            </div>
          </div>
          <div className="flex justify-between max-w-md mx-auto mt-2 text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
            <span className={step >= 1 ? 'text-primary' : ''}>Select Plan</span>
            <span className={step >= 2 ? 'text-primary' : ''}>Payment</span>
            <span className={step >= 3 ? 'text-primary' : ''}>Confirm</span>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          
          {/* Step 1: Plan Selection */}
          {step === 1 && (
            <div className="p-8 md:p-12">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Select your plan</h2>
              {error && <p className="text-red-500 text-sm mb-4 font-medium bg-red-50 p-3 rounded-xl">{error}</p>}
              <div className="space-y-4">
                {plans.length === 0 ? (
                  <p className="text-slate-400 text-center py-8 font-medium">No plans available. Please ask the admin to create a plan.</p>
                ) : plans.map(plan => (
                  <label key={plan._id} className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${selectedPlan?._id === plan._id ? 'border-primary bg-primary/5 ring-4 ring-primary/10' : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPlan?._id === plan._id ? 'border-primary' : 'border-slate-300'}`}>
                        {selectedPlan?._id === plan._id && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                      </div>
                      <div>
                        <input type="radio" name="plan" className="hidden" onChange={() => setSelectedPlan(plan)} />
                        <span className="block font-black text-slate-900 text-lg">{plan.plan_name}</span>
                        <span className="block text-sm font-medium text-slate-500 capitalize mt-0.5">{plan.duration} • {plan.description}</span>
                      </div>
                    </div>
                    <span className="text-2xl font-black text-slate-900">₹{plan.price}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => { setError(''); setStep(2); }}
                disabled={!selectedPlan}
                className={`w-full py-4 rounded-xl font-black transition-all shadow-md mt-8 flex justify-center items-center gap-2 ${selectedPlan ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
              >
                Continue to Payment
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          )}

          {/* Step 2: Payment Form */}
          {step === 2 && (
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-slate-900">Payment Details</h2>
                  <button onClick={() => setStep(1)} className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">← Back</button>
                </div>
                {error && <p className="text-red-500 text-sm mb-4 font-medium bg-red-50 p-3 rounded-xl">{error}</p>}
                <form onSubmit={processPayment} className="space-y-5">
                  <div>
                    <label className="label-xs">Card Number</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">credit_card</span>
                      <input required className="input-field pl-12" placeholder="4242 4242 4242 4242" type="text" maxLength={19} defaultValue="4242 4242 4242 4242" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="label-xs">Expiry Date</label>
                      <input required className="input-field text-center" placeholder="MM/YY" type="text" maxLength={5} defaultValue="12/28" />
                    </div>
                    <div>
                      <label className="label-xs">CVC</label>
                      <input required className="input-field text-center" placeholder="123" type="password" maxLength={3} defaultValue="123" />
                    </div>
                  </div>
                  <div>
                    <label className="label-xs">Name on Card</label>
                    <input required className="input-field" placeholder="John Doe" type="text" defaultValue={user?.name} />
                  </div>
                  <button className="w-full bg-slate-900 text-white font-black py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-colors mt-2 flex items-center justify-center gap-2" type="submit">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Pay ₹{selectedPlan?.price} – Mock Payment
                  </button>
                  <p className="text-center text-[11px] text-slate-400 font-medium">This is a mock payment. No real charge will be made.</p>
                </form>
              </div>

              <div className="md:w-64 bg-slate-50 p-6 rounded-2xl border border-slate-100 self-start">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Order Summary</p>
                <h3 className="font-black text-slate-900 mb-1">{selectedPlan?.plan_name}</h3>
                <p className="text-sm text-slate-500 capitalize mb-4">{selectedPlan?.duration}</p>
                <div className="h-px bg-slate-200 mb-4"></div>
                <div className="flex justify-between font-black text-primary text-lg">
                  <span>Total</span>
                  <span>₹{selectedPlan?.price}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Processing */}
          {step === 3 && (
            <div className="p-16 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-6"></div>
              <h2 className="text-xl font-bold text-slate-900">Processing Payment...</h2>
              <p className="text-slate-500 mt-2 font-medium">Please do not close this window.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
