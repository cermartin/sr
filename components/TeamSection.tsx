import React from 'react';
import { TEAM_MEMBERS } from '../constants';

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-stone-500 text-xs tracking-[0.2em] uppercase block mb-4">Who We Are</span>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6 leading-tight">
            The Workshop <span className="italic text-stone-400">Collective</span>
          </h2>
          <p className="text-stone-600 leading-relaxed font-light max-w-2xl mx-auto">
            We aren't just manufacturers; we are curators. Serrano Rivers was born from a desire to inspect, select, and refine the finest artisan pieces from around the globe. Our team consists of quality experts and craft devotees dedicated to one mission: delivering functional art safely to your doorstep.
          </p>
        </div>

        {/* Team Grid — 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="w-36 h-36 mx-auto mb-6 overflow-hidden rounded-full border-2 border-stone-200 group-hover:border-stone-400 transition-colors duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h4 className="font-serif text-xl text-stone-900 mb-1">{member.name}</h4>
              <p className="text-xs uppercase tracking-[0.15em] text-stone-400 mb-3">{member.role}</p>
              {member.description && (
                <p className="text-sm text-stone-500 font-light leading-relaxed max-w-xs mx-auto">
                  {member.description}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;
