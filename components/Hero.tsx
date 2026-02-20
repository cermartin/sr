import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Zap, Leaf, Award, Shield } from 'lucide-react';
import img1 from '../images/coffe-table-1.jpeg';
import img2 from '../images/coffe-table-2.jpeg';
import img3 from '../images/cpffe-table-3.jpeg';
import imgAngle from '../images/angle-coffe-table.png';

/** Fires `inView = true` once the element enters the viewport. */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const Hero: React.FC = () => {
  const [scrollY,       setScrollY]       = useState(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const craft   = useInView(0.2);
  const promise = useInView(0.15);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setShowStickyCTA(y > window.innerHeight * 0.75);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const parallax = (factor: number): React.CSSProperties => ({
    transform: `translateY(${scrollY * factor}px)`,
    willChange: 'transform',
  });

  return (
    <>
      {/* ════════════════════════════════════════════════
           01 · ARRIVAL  — parchment cream / museumcore
          ════════════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-[#F8F6F1] overflow-hidden flex flex-col justify-center">

        {/* Subtle dot-grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage: 'radial-gradient(#1c191714 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Ghost catalog number — Museumcore signature */}
        <span
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 font-serif font-bold text-stone-900 leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(120px, 26vw, 340px)', opacity: 0.04 }}
        >01</span>

        <div className="relative z-10 container mx-auto px-6 pt-28 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* ─── LEFT: Editorial text stack ─── */}
            <div className="flex flex-col order-2 lg:order-1">

              {/* Eyebrow */}
              <div
                className="flex items-center gap-3 mb-8 animate-fade-up"
                style={{ animationDelay: '0.05s' }}
              >
                <span className="block w-8 h-px bg-orange-500 flex-shrink-0" />
                <span className="text-orange-500 text-[10px] font-semibold uppercase tracking-[0.35em]">
                  Functional Art · Est. 2024
                </span>
              </div>

              {/* Giant mixed-weight headline */}
              <h1
                className="font-serif leading-[0.9] mb-10 animate-fade-up"
                style={{ animationDelay: '0.2s' }}
              >
                <span
                  className="block italic text-stone-400 font-light"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
                >Where</span>
                <span
                  className="block text-stone-900 font-bold"
                  style={{ fontSize: 'clamp(3rem, 7.5vw, 5.5rem)' }}
                >Nature</span>
                <span
                  className="block text-orange-500"
                  style={{ fontSize: 'clamp(3rem, 7.5vw, 5.5rem)' }}
                >Becomes</span>
                <span
                  className="block italic font-light text-stone-900"
                  style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
                >Art.</span>
              </h1>

              <p
                className="text-stone-500 text-base md:text-lg font-light leading-relaxed max-w-sm mb-10 animate-fade-up"
                style={{ animationDelay: '0.4s' }}
              >
                Hand-poured epoxy meets sustainably sourced walnut.
                Every Serrano Rivers piece is a&nbsp;1-of-1 collector's statement.
              </p>

              {/* ── CTAs — Thumb Zone optimised ──
                  Full-width on mobile so they sit naturally in the lower 40 % of the screen.
                  min-height: 56 px meets WCAG touch-target size and thumb ergonomics.  */}
              <div
                className="flex flex-col sm:flex-row gap-3 animate-fade-up"
                style={{ animationDelay: '0.55s' }}
              >
                <a
                  href="#collection"
                  className="group inline-flex items-center justify-center gap-2 px-8 bg-orange-500 hover:bg-orange-600 active:scale-[0.97] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-orange-500/25 transition-all duration-150"
                  style={{ minHeight: '56px' }}
                >
                  <Zap size={14} className="group-hover:scale-125 transition-transform duration-150" />
                  Order Now
                </a>
                <a
                  href="#team"
                  className="inline-flex items-center justify-center gap-2 px-8 border-2 border-stone-800 hover:bg-stone-900 hover:text-white text-stone-900 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-150"
                  style={{ minHeight: '56px' }}
                >
                  Our Story
                </a>
              </div>

              {/* Dopamine micro-stats */}
              <div
                className="flex items-center gap-6 mt-10 pt-8 border-t border-stone-200/70 animate-fade-in"
                style={{ animationDelay: '0.9s' }}
              >
                {[
                  { n: '100%',  sub: 'Natural Walnut'     },
                  { n: '1-of-1', sub: 'Every Piece'       },
                  { n: '∞',     sub: 'Clarity Guarantee'  },
                ].map(s => (
                  <div key={s.sub} className="text-center">
                    <span className="font-serif text-lg font-bold text-stone-900 block leading-tight">{s.n}</span>
                    <span className="text-[9px] uppercase tracking-widest text-stone-400 block mt-0.5">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── RIGHT: 3-D parallax photo stack ─── */}
            <div
              className="relative order-1 lg:order-2"
              style={{ height: 'clamp(300px, 52vw, 580px)' }}
            >
              {/* Back card — strongest parallax */}
              <div
                className="absolute top-0 right-0 overflow-hidden shadow-2xl"
                style={{
                  width: '56%', aspectRatio: '1/1',
                  rotate: '7deg',
                  ...parallax(0.08),
                }}
              >
                <img src={img3} alt="Midnight epoxy table" className="w-full h-full object-cover scale-110" loading="eager" />
                <div className="absolute inset-0 bg-stone-900/25" />
              </div>

              {/* Mid card */}
              <div
                className="absolute top-[10%] left-0 overflow-hidden shadow-xl"
                style={{
                  width: '46%', aspectRatio: '1/1',
                  rotate: '-5deg',
                  ...parallax(0.04),
                }}
              >
                <img src={img2} alt="Deep Ocean resin table" className="w-full h-full object-cover" loading="eager" />
                <div className="absolute inset-0 bg-stone-900/10" />
              </div>

              {/* Front hero card — counter-parallax for depth */}
              <div
                className="absolute bottom-0 left-[12%] overflow-hidden shadow-2xl border-[5px] border-white"
                style={{
                  width: '58%', aspectRatio: '4/5',
                  rotate: '-1.5deg',
                  ...parallax(-0.025),
                }}
              >
                <img src={img1} alt="Nordic River epoxy coffee table" className="w-full h-full object-cover" loading="eager" />
                {/* Museum catalog label */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-3 py-2.5">
                  <span className="block text-[8px] uppercase tracking-[0.3em] text-stone-400 mb-0.5">Cat. No. 001</span>
                  <span className="block font-serif text-sm text-stone-900 font-semibold leading-tight">The Nordic River</span>
                  <span className="block text-[10px] text-stone-400 mt-0.5">Walnut · Sapphire Resin</span>
                </div>
              </div>

              {/* Dopamine price badge */}
              <div
                className="absolute z-10 bg-orange-500 text-white px-3 py-2 shadow-xl shadow-orange-500/40"
                style={{ top: '18%', left: '38%', rotate: '-2deg' }}
              >
                <span className="block text-[7px] uppercase tracking-widest opacity-75">from</span>
                <span className="font-serif text-xl font-bold leading-none">£200</span>
              </div>

              {/* 1-of-1 circle badge */}
              <div
                className="absolute z-10 w-12 h-12 bg-stone-900 text-white rounded-full flex items-center justify-center shadow-lg"
                style={{ bottom: '43%', right: '2%' }}
              >
                <span className="font-serif text-[8px] leading-tight text-center">1<br />of<br />1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll nudge */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 animate-bounce">
          <span className="text-[8px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown size={14} />
        </div>

        {/* ─ Organic wave transition → Chapter 2 (stone-900) ─ */}
        <div className="absolute bottom-[-1px] left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 88" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '88px', width: '100%' }}>
            <path d="M0,44 C240,88 480,8 720,44 C960,80 1200,12 1440,48 L1440,88 L0,88 Z" fill="#1c1917" />
          </svg>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
           02 · THE CRAFT  — dark stone / dramatic
          ════════════════════════════════════════════════ */}
      <section
        ref={craft.ref}
        className="relative bg-stone-900 py-28 overflow-hidden"
      >
        {/* Ghost number */}
        <span
          aria-hidden
          className="absolute left-0 top-1/2 -translate-y-1/2 font-serif font-bold text-white leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(120px, 26vw, 340px)', opacity: 0.03 }}
        >02</span>

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Organic-cropped image */}
          <div
            className={`relative transition-all duration-1000 ease-out ${
              craft.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div
              className="relative overflow-hidden shadow-2xl"
              style={{ borderRadius: '4px 28% 4px 28%' }}
            >
              <img
                src={imgAngle}
                alt="Artisan crafting an epoxy river table"
                className="w-full object-cover"
                style={{ aspectRatio: '4/3' }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/55 to-transparent" />
            </div>

            {/* Floating orange process label */}
            <div
              className={`absolute -bottom-5 -right-2 md:-right-5 bg-orange-500 text-white p-4 md:p-5 shadow-2xl transition-all duration-1000 delay-300 ease-out ${
                craft.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="block text-[8px] uppercase tracking-widest opacity-75 mb-1">Process</span>
              <span className="font-serif text-lg block leading-tight">Hand-Poured</span>
              <span className="font-serif text-lg italic font-light">Resin</span>
            </div>
          </div>

          {/* Story text */}
          <div
            className={`transition-all duration-1000 delay-150 ease-out ${
              craft.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-orange-500 flex-shrink-0" />
              <span className="text-orange-500 text-[10px] uppercase tracking-[0.3em]">The Craft</span>
            </div>

            <h2
              className="font-serif text-white leading-[0.93] mb-8"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
            >
              <span className="block">Every Pour</span>
              <span className="block italic text-stone-400 font-light">is Unique.</span>
              <span className="block">Every Table</span>
              <span className="block text-orange-500">Unrepeatable.</span>
            </h2>

            <p className="text-stone-400 text-base font-light leading-relaxed mb-10 max-w-sm">
              Our artisans spend up to 72 hours on a single piece — from timber selection to final resin cure. High-clarity, non-yellowing epoxy ensures your investment stays vibrant for decades.
            </p>

            <div className="space-y-4">
              {[
                { Icon: Leaf,   label: 'Sustainably sourced black walnut', accent: true  },
                { Icon: Award,  label: 'Zero-yellowing epoxy formula',      accent: false },
                { Icon: Shield, label: 'Lifetime Clarity Guarantee',        accent: true  },
              ].map(({ Icon, label, accent }, i) => (
                <div
                  key={label}
                  className={`flex items-center gap-4 transition-all duration-700 ease-out ${
                    craft.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${(i + 3) * 120}ms` }}
                >
                  <span className={`p-2 rounded-full flex-shrink-0 ${
                    accent ? 'bg-orange-500/15 text-orange-400' : 'bg-white/5 text-stone-400'
                  }`}>
                    <Icon size={15} />
                  </span>
                  <span className="text-stone-300 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─ Organic wave → Chapter 3 (stone-100) ─ */}
        <div className="absolute bottom-[-1px] left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 88" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '88px', width: '100%' }}>
            <path d="M0,55 C320,10 640,88 960,44 C1160,16 1320,70 1440,52 L1440,88 L0,88 Z" fill="#f5f5f4" />
          </svg>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
           03 · THE PROMISE  — stone-100 / warm neutral
          ════════════════════════════════════════════════ */}
      <section
        ref={promise.ref}
        className="relative bg-stone-100 py-24 overflow-hidden"
      >
        {/* Ghost number */}
        <span
          aria-hidden
          className="absolute right-0 bottom-0 font-serif font-bold text-stone-900 leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(120px, 26vw, 340px)', opacity: 0.04 }}
        >03</span>

        <div className="container mx-auto px-6 text-center">

          <div
            className={`flex items-center justify-center gap-4 mb-8 transition-all duration-700 ease-out ${
              promise.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="w-8 h-px bg-orange-500" />
            <span className="text-orange-500 text-[10px] uppercase tracking-[0.35em] font-semibold">Our Promise</span>
            <span className="w-8 h-px bg-orange-500" />
          </div>

          <h2
            className={`font-serif text-stone-900 leading-tight mb-6 max-w-4xl mx-auto transition-all duration-1000 delay-100 ease-out ${
              promise.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)' }}
          >
            A piece that{' '}
            <span className="italic text-orange-500">outlives</span>{' '}
            trends,<br />
            and{' '}
            <span className="italic text-stone-400">outlasts</span>{' '}
            decades.
          </h2>

          <p
            className={`text-stone-500 text-lg font-light max-w-xl mx-auto mb-12 transition-all duration-1000 delay-200 ease-out ${
              promise.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Every Serrano Rivers table comes with our Lifetime Clarity Guarantee — if your epoxy ever yellows,
            we'll refinish it. No questions asked.
          </p>

          {/* Trio images with organic Dopamine shapes */}
          <div
            className={`grid grid-cols-3 gap-3 md:gap-5 max-w-sm md:max-w-xl mx-auto mb-14 transition-all duration-1000 delay-300 ease-out ${
              promise.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {([img1, img2, img3] as const).map((src, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden shadow-lg"
                style={{
                  borderRadius: i === 0 ? '30% 4px 30% 4px' : i === 1 ? '50%' : '4px 30% 4px 30%',
                  transform:    `rotate(${i === 0 ? '-2' : i === 1 ? '0' : '2'}deg)`,
                }}
              >
                <img
                  src={src}
                  alt={`Serrano Rivers table variant ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          {/* Electric orange CTA */}
          <div
            className={`transition-all duration-1000 delay-500 ease-out ${
              promise.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a
              href="#collection"
              className="inline-flex items-center gap-3 px-10 bg-orange-500 hover:bg-orange-600 active:scale-[0.97] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-orange-500/30 transition-all duration-150"
              style={{ minHeight: '56px' }}
            >
              <Zap size={14} />
              Order Now
            </a>
          </div>
        </div>

        {/* ─ Organic wave → ProductGallery (stone-50) ─ */}
        <div className="absolute bottom-[-1px] left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 88" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '88px', width: '100%' }}>
            <path d="M0,32 C200,80 480,8 800,48 C1000,72 1240,18 1440,44 L1440,88 L0,88 Z" fill="#fafaf9" />
          </svg>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
           MOBILE STICKY CTA — Thumb Zone
           Appears after scroll past initial fold.
           Bottom of screen = natural one-handed thumb reach.
          ════════════════════════════════════════════════ */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-3 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-2xl transition-all duration-300 ${
          showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <a
          href="#collection"
          className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-150"
          style={{ minHeight: '56px' }}
        >
          <Zap size={16} />
          Order Now
        </a>
      </div>
    </>
  );
};

export default Hero;
