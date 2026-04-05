import { useState } from 'react';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!weight || !height) return;

    // Convert height from cm to meters
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setStatus('Underweight');
    else if (bmiValue >= 18.5 && bmiValue < 24.9) setStatus('Normal weight');
    else if (bmiValue >= 25 && bmiValue < 29.9) setStatus('Overweight');
    else setStatus('Obese');
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setStatus('');
  };

  return (
    <main className="flex-grow pt-24 pb-24 bg-white relative min-h-screen">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary tracking-wide uppercase mb-4 shadow-sm">
            Health Check
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            BMI Calculator
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            Body Mass Index (BMI) is a simple calculation using your height and weight to determine if you are at a healthy weight range.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
          
          {/* Form Side */}
          <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
             
            <form onSubmit={calculateBMI} className="space-y-6 relative z-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex justify-between">
                    Weight
                    <span className="text-slate-400 capitalize normal-case text-xs font-medium">in Kilograms (kg)</span>
                  </label>
                  <div className="relative">
                    <input 
                      required 
                      type="number"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-4 py-4 pr-12 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-slate-900 text-lg transition-all font-bold" 
                      placeholder="e.g. 70" 
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">kg</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex justify-between">
                    Height
                    <span className="text-slate-400 capitalize normal-case text-xs font-medium">in Centimeters (cm)</span>
                  </label>
                  <div className="relative">
                    <input 
                      required 
                      type="number"
                      step="0.1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-4 pr-12 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-slate-900 text-lg transition-all font-bold" 
                      placeholder="e.g. 175" 
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">cm</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  className="flex-1 text-white font-black py-4 px-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5 shadow-primary/30 flex items-center justify-center gap-2 bg-primary hover:bg-primary-light" 
                  type="submit"
                >
                  Calculate BMI
                </button>
                {bmi && (
                  <button 
                    onClick={resetCalculator}
                    className="w-16 flex items-center justify-center bg-slate-200 text-slate-600 rounded-xl hover:bg-slate-300 transition-colors" 
                    type="button"
                    title="Reset"
                  >
                    <span className="material-symbols-outlined">refresh</span>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Results Side */}
          <div className="flex flex-col gap-6">
            <div className={`p-10 rounded-3xl border shadow-sm transition-all duration-500 flex flex-col items-center justify-center text-center h-full min-h-[300px] ${
              bmi === null ? 'bg-slate-50 border-slate-100' :
              status === 'Normal weight' ? 'bg-emerald-50 border-emerald-100' :
              status === 'Underweight' ? 'bg-blue-50 border-blue-100' :
              'bg-amber-50 border-amber-100'
            }`}>
              
              {bmi === null ? (
                <>
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm mb-6">
                    <span className="material-symbols-outlined text-4xl text-slate-300">calculate</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-400">Awaiting Input</h3>
                  <p className="text-slate-500 font-medium mt-2">Enter your weight and height to view your results.</p>
                </>
              ) : (
                <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Your BMI Result</p>
                  <h2 className={`text-6xl font-black tracking-tighter mb-4 ${
                    status === 'Normal weight' ? 'text-emerald-600' :
                    status === 'Underweight' ? 'text-blue-600' :
                    'text-amber-600'
                  }`}>
                    {bmi}
                  </h2>
                  <div className={`px-6 py-2 rounded-full font-bold text-white shadow-sm ${
                    status === 'Normal weight' ? 'bg-emerald-500' :
                    status === 'Underweight' ? 'bg-blue-500' :
                    'bg-amber-500'
                  }`}>
                    {status}
                  </div>
                </div>
              )}
            </div>

            {/* Informational Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-slate-900 px-6 py-4">
                <h3 className="text-white font-bold tracking-wide">BMI Weight Ranges</h3>
              </div>
              <div className="p-0">
                <ul className="divide-y divide-slate-100">
                  <li className={`px-6 py-4 flex justify-between font-medium text-sm transition-colors ${status === 'Underweight' ? 'bg-blue-50/50 text-blue-900 font-bold' : 'text-slate-600'}`}>
                    <span>Less than 18.5</span>
                    <span className="font-bold">Underweight</span>
                  </li>
                  <li className={`px-6 py-4 flex justify-between font-medium text-sm transition-colors ${status === 'Normal weight' ? 'bg-emerald-50/50 text-emerald-900 font-bold' : 'text-slate-600'}`}>
                    <span>18.5 - 24.9</span>
                    <span className="font-bold">Normal weight</span>
                  </li>
                  <li className={`px-6 py-4 flex justify-between font-medium text-sm transition-colors ${status === 'Overweight' ? 'bg-amber-50/50 text-amber-900 font-bold' : 'text-slate-600'}`}>
                    <span>25 - 29.9</span>
                    <span className="font-bold">Overweight</span>
                  </li>
                  <li className={`px-6 py-4 flex justify-between font-medium text-sm transition-colors ${status === 'Obese' ? 'bg-amber-50/50 text-amber-900 font-bold' : 'text-slate-600'}`}>
                    <span>30 and above</span>
                    <span className="font-bold">Obese</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
