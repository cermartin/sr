import React from 'react';
import { TEAM_MEMBERS } from '../constants';

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Text Content */}
          <div className="lg:w-1/3 pt-12">
            <span className="text-stone-500 text-xs tracking-[0.2em] uppercase block mb-4">Who We Are</span>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6 leading-tight">
              The Workshop <br /><span className="italic text-stone-400">Collective</span>
            </h2>
            <p className="text-stone-600 leading-relaxed mb-8 font-light">
              We aren't just manufacturers; we are curators. Serrano Rivers was born from a desire to inspect, select, and refine the finest artisan pieces from around the globe.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8 font-light">
              Our team consists of quality experts and logistics masters dedicated to one mission: delivering functional art safely to your doorstep.
            </p>

            <div className="hidden lg:grid grid-cols-1 gap-6 mt-12">
              {TEAM_MEMBERS.map((member) => (
                 <div key={member.name} className="flex items-center gap-4">
                    <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover grayscale opacity-80" />
                    <div>
                      <h4 className="font-serif text-stone-900">{member.name}</h4>
                      <p className="text-xs uppercase tracking-wider text-stone-400">{member.role}</p>
                    </div>
                 </div>
              ))}
            </div>
          </div>

          {/* Main Visual - The "Team" Photo */}
          <div className="lg:w-2/3 relative">
            <div className="aspect-[16/9] w-full bg-stone-200 overflow-hidden relative">
              {/* This represents the "attached team photo" requested. Using a high-quality workshop vibe image. */}
              <img 
                src="https://images.unsplash.com/photo-1558138838-81261a868f0f?q=80&w=2000&auto=format&fit=crop" 
                alt="Serrano Rivers Team in Workshop" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-stone-900/10"></div>
            </div>

            {/* Mobile/Tablet Team Grid (visible on smaller screens) */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
               {TEAM_MEMBERS.map((member) => (
                 <div key={member.name} className="flex items-center gap-4 border border-stone-100 p-4">
                    <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover grayscale opacity-80" />
                    <div>
                      <h4 className="font-serif text-stone-900">{member.name}</h4>
                      <p className="text-xs uppercase tracking-wider text-stone-400">{member.role}</p>
                    </div>
                 </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;