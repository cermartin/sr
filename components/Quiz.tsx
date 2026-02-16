import React, { useState } from 'react';
import { ChevronRight, Check, RotateCcw, Droplets, Sun, ShieldCheck } from 'lucide-react';
import { QuizState } from '../types';

const INITIAL_STATE: QuizState = {
  step: 0,
  location: '',
  usage: '',
  cleaning: '',
  userName: '',
  userEmail: '',
};

const Quiz: React.FC = () => {
  const [state, setState] = useState<QuizState>(INITIAL_STATE);

  const handleOptionSelect = (key: keyof QuizState, value: string) => {
    setState(prev => ({ ...prev, [key]: value, step: prev.step + 1 }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const resetQuiz = () => {
    setState(INITIAL_STATE);
  };

  // Render Logic
  const renderStep = () => {
    switch (state.step) {
      case 0:
        return (
          <div className="text-center animate-fadeIn">
            <h3 className="font-serif text-3xl mb-4 text-stone-800">Resin Longevity Quiz</h3>
            <p className="text-stone-500 mb-8 max-w-md mx-auto">
              Answer 3 simple questions to generate a custom care roadmap for your functional art piece.
            </p>
            <button 
              onClick={() => setState(prev => ({ ...prev, step: 1 }))}
              className="px-8 py-3 bg-stone-800 text-stone-50 uppercase tracking-widest text-xs hover:bg-stone-600 transition-colors"
            >
              Start Engine
            </button>
          </div>
        );

      case 1:
        return (
          <div className="animate-fadeIn">
            <span className="text-xs uppercase text-stone-400 tracking-widest mb-2 block">Question 1 of 3</span>
            <h3 className="font-serif text-2xl mb-6 text-stone-800">Where will your piece live?</h3>
            <div className="grid gap-3">
              {['Indoors (Controlled Temp)', 'Sunroom / High Light', 'Office / Studio'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => handleOptionSelect('location', opt)}
                  className="p-4 border border-stone-200 text-left hover:border-stone-800 hover:bg-stone-50 transition-all flex justify-between items-center group"
                >
                  <span className="text-stone-600 group-hover:text-stone-900">{opt}</span>
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="animate-fadeIn">
             <span className="text-xs uppercase text-stone-400 tracking-widest mb-2 block">Question 2 of 3</span>
            <h3 className="font-serif text-2xl mb-6 text-stone-800">What is the intended use?</h3>
            <div className="grid gap-3">
              {['Heavy Daily Use (Dining)', 'Decorative / Occasional', 'Workspace / Desk'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => handleOptionSelect('usage', opt)}
                  className="p-4 border border-stone-200 text-left hover:border-stone-800 hover:bg-stone-50 transition-all flex justify-between items-center group"
                >
                  <span className="text-stone-600 group-hover:text-stone-900">{opt}</span>
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="animate-fadeIn">
             <span className="text-xs uppercase text-stone-400 tracking-widest mb-2 block">Question 3 of 3</span>
            <h3 className="font-serif text-2xl mb-6 text-stone-800">Preferred cleaning style?</h3>
            <div className="grid gap-3">
              {['Standard Household Cleaners', 'Natural / Eco-friendly', 'Warm Water Only'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => handleOptionSelect('cleaning', opt)}
                  className="p-4 border border-stone-200 text-left hover:border-stone-800 hover:bg-stone-50 transition-all flex justify-between items-center group"
                >
                  <span className="text-stone-600 group-hover:text-stone-900">{opt}</span>
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="animate-fadeIn">
            <h3 className="font-serif text-2xl mb-2 text-stone-800">Almost there...</h3>
            <p className="text-stone-500 mb-6 text-sm">Where should we send your Custom Care Roadmap?</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  name="userName"
                  placeholder="Your First Name"
                  required
                  value={state.userName}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-stone-50 border border-stone-200 focus:outline-none focus:border-stone-500 placeholder-stone-400"
                />
              </div>
              <div>
                 <input 
                  type="email" 
                  name="userEmail"
                  placeholder="Your Email Address"
                  required
                  value={state.userEmail}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-stone-50 border border-stone-200 focus:outline-none focus:border-stone-500 placeholder-stone-400"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-stone-800 text-stone-50 uppercase tracking-widest text-xs hover:bg-stone-700 transition-colors"
              >
                Reveal My Roadmap
              </button>
            </form>
          </div>
        );

      case 5:
        return (
          <div className="animate-fadeIn text-left">
            <div className="flex items-center gap-3 mb-6 border-b border-stone-200 pb-4">
              <div className="bg-green-100 p-2 rounded-full text-green-800">
                <Check size={20} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-stone-800">Care Roadmap Ready</h3>
                <p className="text-xs text-stone-500">Prepared for {state.userName}</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Dynamic advice based on basic logic */}
              <div className="flex gap-4">
                 <div className="bg-stone-100 p-2 h-fit rounded text-stone-600"><Droplets size={20}/></div>
                 <div>
                   <h4 className="font-medium text-stone-900 text-sm uppercase tracking-wide mb-1">Cleaning Protocol</h4>
                   <p className="text-sm text-stone-600 leading-relaxed">
                     Based on your preference for <strong>{state.cleaning}</strong>, we recommend using a pH-neutral soap mixed with warm water. Avoid ammonia-based glass cleaners to maintain the resin's high gloss.
                   </p>
                 </div>
              </div>

              <div className="flex gap-4">
                 <div className="bg-stone-100 p-2 h-fit rounded text-stone-600"><Sun size={20}/></div>
                 <div>
                   <h4 className="font-medium text-stone-900 text-sm uppercase tracking-wide mb-1">UV Protection</h4>
                   <p className="text-sm text-stone-600 leading-relaxed">
                     Since this piece will live in <strong>{state.location}</strong>, rotate the table 180° every 6 months to ensure even light exposure, even with our anti-yellowing technology.
                   </p>
                 </div>
              </div>

               <div className="flex gap-4">
                 <div className="bg-stone-100 p-2 h-fit rounded text-stone-600"><ShieldCheck size={20}/></div>
                 <div>
                   <h4 className="font-medium text-stone-900 text-sm uppercase tracking-wide mb-1">Durability Check</h4>
                   <p className="text-sm text-stone-600 leading-relaxed">
                     For <strong>{state.usage}</strong>, always use coasters for hot items above 120°F. While durable, resin is heat-resistant, not heat-proof.
                   </p>
                 </div>
              </div>
            </div>
            
            <button 
              onClick={resetQuiz}
              className="mt-8 flex items-center gap-2 text-stone-400 hover:text-stone-600 text-xs uppercase tracking-wider"
            >
              <RotateCcw size={14} /> Start Over
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="care-engine" className="py-24 bg-stone-100">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-xl shadow-stone-200/50 rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          
          {/* Visual Side */}
          <div className="md:w-1/2 relative bg-stone-800 hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1549488344-c7052fb518f2?q=80&w=1000&auto=format&fit=crop" 
              alt="Polishing wood" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-8 text-white/90">
              <div>
                <h4 className="font-serif text-2xl">Table Care Engine</h4>
                <p className="text-sm font-light mt-2 opacity-80">Preserving beauty through science.</p>
              </div>
              <div className="text-xs tracking-widest uppercase opacity-60">
                Serrano Rivers Intelligence
              </div>
            </div>
          </div>

          {/* Interactive Side */}
          <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center">
             <div className="w-full max-w-sm">
               {renderStep()}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Quiz;