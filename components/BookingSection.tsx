import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Calendar, Clock, Users, Check, Loader2, Zap, Coffee, Mail } from 'lucide-react';

const TIME_SLOTS = [
  '07:30', '08:00', '08:30', '09:00',
  '09:30', '10:00', '10:30', '11:00',
];

const formatTime = (t: string): string => {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
};

const formatDate = (d: string): string => {
  if (!d) return '';
  // Add noon to avoid timezone-shift day-off issues
  return new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
};

const getMinDate = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

type AvailState = 'idle' | 'checking' | 'available' | 'unavailable';
type StepState  = 'form' | 'submitting' | 'success' | 'error';

const OWNER_EMAIL = 'emilyjacksn688@gmail.com';

const BookingSection: React.FC = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    date: '', time: '', guests: 2, notes: '',
  });

  const [availability, setAvailability] = useState<AvailState>('idle');
  const [step,         setStep        ] = useState<StepState>('form');
  const [bookingRef,   setBookingRef  ] = useState('');
  const [errorMsg,     setErrorMsg    ] = useState('');

  /* ── Availability check (debounced 400 ms) ── */
  useEffect(() => {
    if (!form.date || !form.time) {
      setAvailability('idle');
      return;
    }
    setAvailability('checking');
    const timer = setTimeout(async () => {
      try {
        const res  = await fetch(`/api/check-availability?date=${form.date}&time=${form.time}`);
        const data = await res.json();
        setAvailability(data.available ? 'available' : 'unavailable');
      } catch {
        setAvailability('idle');
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [form.date, form.time]);

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (availability !== 'available') return;

    setStep('submitting');
    setErrorMsg('');

    try {
      const res  = await fetch('/api/create-booking', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');

      setBookingRef(data.bookingRef);

      /* ── Send both emails via EmailJS ── */
      const SERVICE_ID     = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const PUBLIC_KEY     = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
      const CUSTOMER_TMPL  = import.meta.env.VITE_EMAILJS_BOOKING_CUSTOMER_TEMPLATE_ID as string;
      const OWNER_TMPL     = import.meta.env.VITE_EMAILJS_BOOKING_OWNER_TEMPLATE_ID as string;

      const emailParams = {
        booking_ref:     data.bookingRef,
        booking_date:    formatDate(form.date),
        booking_time:    formatTime(form.time),
        guests:          form.guests,
        notes:           form.notes || 'None',
        customer_name:   form.name,
        customer_email:  form.email,
        customer_phone:  form.phone || 'Not provided',
        to_name:         form.name,
        to_email:        form.email,
        from_name:       'Serrano Rivers',
      };

      await Promise.allSettled([
        emailjs.send(SERVICE_ID, CUSTOMER_TMPL, emailParams, PUBLIC_KEY),
        emailjs.send(SERVICE_ID, OWNER_TMPL,    { ...emailParams, to_email: OWNER_EMAIL }, PUBLIC_KEY),
      ]);

      setStep('success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStep('error');
    }
  };

  /* ── Shared style tokens ── */
  const inputCls = 'w-full px-4 py-3 bg-stone-800 border border-stone-700 text-white placeholder:text-stone-500 text-sm focus:outline-none focus:border-orange-500 transition-colors';
  const labelCls = 'block text-[10px] uppercase tracking-widest text-stone-400 mb-1.5';

  /* ────────────────────────────────────────
     SUCCESS SCREEN
     ──────────────────────────────────────── */
  if (step === 'success') {
    return (
      <section id="booking" className="py-24 bg-stone-900">
        <div className="container mx-auto px-6 max-w-lg text-center">
          <div className="w-16 h-16 bg-orange-500/15 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={30} />
          </div>
          <p className="text-orange-500 text-[10px] uppercase tracking-[0.3em] mb-3">Booking Confirmed</p>
          <h2 className="font-serif text-4xl text-white mb-2">See you for breakfast!</h2>
          <p className="text-stone-400 text-xs uppercase tracking-widest mb-8">Ref #{bookingRef}</p>

          <div className="bg-stone-800 border border-stone-700 p-6 text-left space-y-3 mb-8">
            {[
              { label: 'Date',      value: formatDate(form.date)    },
              { label: 'Time',      value: formatTime(form.time)    },
              { label: 'Guests',    value: String(form.guests)      },
            ].map(row => (
              <div key={row.label} className="flex justify-between text-sm">
                <span className="text-stone-400">{row.label}</span>
                <span className="text-white">{row.value}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm border-t border-stone-700 pt-3">
              <span className="text-stone-400">Confirmation sent to</span>
              <span className="text-orange-400 truncate ml-4">{form.email}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setStep('form');
              setForm({ name: '', email: '', phone: '', date: '', time: '', guests: 2, notes: '' });
              setAvailability('idle');
            }}
            className="text-stone-400 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            Make another booking
          </button>
        </div>
      </section>
    );
  }

  /* ────────────────────────────────────────
     BOOKING FORM
     ──────────────────────────────────────── */
  return (
    <section id="booking" className="relative py-24 bg-stone-900 overflow-hidden">

      {/* Ghost coffee cup — decorative museumcore bg detail */}
      <span
        aria-hidden
        className="absolute -right-8 top-1/2 -translate-y-1/2 font-serif font-bold text-white leading-none select-none pointer-events-none text-[30vw]"
        style={{ opacity: 0.03 }}
      >☕</span>

      <div className="container mx-auto px-6">

        {/* ─── Section Header ─── */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-orange-500 flex-shrink-0" />
            <span className="text-orange-500 text-[10px] font-semibold uppercase tracking-[0.3em]">Reservations</span>
          </div>
          <h2
            className="font-serif text-white leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}
          >
            Reserve Your<br />
            <span className="italic text-stone-400 font-light">Morning.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ─── FORM (2 cols) ─── */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">

            {/* Date */}
            <div>
              <label className={labelCls}>
                <Calendar size={10} className="inline mr-1.5" />
                Choose a Date
              </label>
              <input
                type="date"
                required
                min={getMinDate()}
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value, time: '' }))}
                className={inputCls}
                style={{ colorScheme: 'dark' }}
              />
            </div>

            {/* Time slots */}
            <div>
              <label className={labelCls}>
                <Clock size={10} className="inline mr-1.5" />
                Choose a Time
              </label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map(t => (
                  <button
                    key={t}
                    type="button"
                    disabled={!form.date}
                    onClick={() => setForm(f => ({ ...f, time: t }))}
                    className={`py-3 text-xs font-semibold uppercase tracking-wide transition-all duration-150 border ${
                      form.time === t
                        ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/25'
                        : 'bg-stone-800 border-stone-700 text-stone-300 hover:border-orange-500/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed'
                    }`}
                  >
                    {formatTime(t)}
                  </button>
                ))}
              </div>

              {/* Availability indicator */}
              {availability !== 'idle' && (
                <div
                  className={`flex items-center gap-2 mt-3 text-xs font-medium ${
                    availability === 'checking'     ? 'text-stone-400'  :
                    availability === 'available'    ? 'text-green-400'  :
                                                      'text-red-400'
                  }`}
                >
                  {availability === 'checking'    && <Loader2 size={12} className="animate-spin" />}
                  {availability === 'available'   && <Check size={12} />}
                  {availability === 'unavailable' && <span className="text-xs">✕</span>}
                  <span>
                    {availability === 'checking'    ? 'Checking availability...'              :
                     availability === 'available'   ? 'Available — this slot is free'         :
                                                      'Not available — please choose another time'}
                  </span>
                </div>
              )}
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <p className={labelCls}>Your Details</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Full Name</label>
                  <input
                    type="text" required placeholder="Jane Smith"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input
                    type="email" required placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Phone (optional)</label>
                  <input
                    type="tel" placeholder="+44 7700 900000"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    <Users size={10} className="inline mr-1.5" />
                    Number of Guests
                  </label>
                  <div className="flex items-center border border-stone-700 bg-stone-800">
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, guests: Math.max(1, f.guests - 1) }))}
                      className="w-12 h-12 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-colors text-xl"
                    >−</button>
                    <span className="flex-1 text-center text-white text-sm font-medium">{form.guests}</span>
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, guests: Math.min(12, f.guests + 1) }))}
                      className="w-12 h-12 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-colors text-xl"
                    >+</button>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelCls}>Notes / Dietary Requirements (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Any allergies, special requests, occasions..."
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>

            {/* Error message */}
            {step === 'error' && (
              <p className="text-red-400 text-sm bg-red-900/20 border border-red-800/40 p-3">
                {errorMsg}
              </p>
            )}

            {/* Submit — electric orange, thumb-zone height */}
            <button
              type="submit"
              disabled={step === 'submitting' || availability !== 'available'}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20 transition-all duration-150"
              style={{ minHeight: '56px' }}
            >
              {step === 'submitting' ? (
                <><Loader2 size={14} className="animate-spin" /> Booking...</>
              ) : (
                <><Zap size={14} /> Book Now</>
              )}
            </button>
          </form>

          {/* ─── INFO SIDEBAR ─── */}
          <div className="space-y-6 lg:pt-2">
            {[
              {
                Icon: Coffee,
                title: 'Breakfast Slots',
                body:  'Morning sittings from 7:30 AM to 11:00 AM. Each sitting is 90 minutes.',
              },
              {
                Icon: Clock,
                title: 'Duration',
                body:  'Allow 90 minutes. Arrive a few minutes early to get settled.',
              },
              {
                Icon: Users,
                title: 'Party Size',
                body:  'Up to 12 guests per sitting. Ideal for groups and special occasions.',
              },
              {
                Icon: Mail,
                title: 'Confirmation',
                body:  "You'll receive an email confirmation immediately. We'll also be notified.",
              },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <span className="p-2.5 bg-orange-500/10 text-orange-400 rounded-full flex-shrink-0 h-fit">
                  <Icon size={16} />
                </span>
                <div>
                  <h4 className="text-white text-sm font-semibold mb-1">{title}</h4>
                  <p className="text-stone-400 text-sm font-light leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Organic wave → TeamSection (white) */}
      <div className="absolute bottom-[-1px] left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '72px', width: '100%' }}>
          <path d="M0,36 C320,72 640,0 960,36 C1120,54 1300,20 1440,40 L1440,72 L0,72 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
};

export default BookingSection;
