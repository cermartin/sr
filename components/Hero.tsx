import React from 'react';
import { ArrowDown } from 'lucide-react';
import heroImg from '../images/cpffe-table-3.jpeg';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Artisan epoxy coffee table in a cosy interior"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-stone-900/30 mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <span className="inline-block py-1 px-3 mb-6 border border-white/40 text-white text-xs tracking-[0.2em] uppercase backdrop-blur-sm">
          Functional Art
        </span>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 drop-shadow-sm">
          Artisan-Crafted <br />
          <span className="italic font-light">Epoxy Furniture</span>
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          Bringing the raw beauty of nature into your modern home. <br className="hidden md:block"/>
          Curated 1-of-1 pieces for the discerning collector.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <a
            href="#collection"
            className="px-8 py-4 bg-white text-stone-900 font-medium tracking-widest uppercase text-sm hover:bg-stone-100 transition-colors w-full md:w-auto"
          >
            Explore Collection
          </a>
          <a
            href="#care-engine"
            className="px-8 py-4 bg-transparent border border-white text-white font-medium tracking-widest uppercase text-sm hover:bg-white/10 transition-colors w-full md:w-auto"
          >
            Take Care Quiz
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70">
        <ArrowDown size={24} />
      </div>
    </section>
  );
};

export default Hero;
