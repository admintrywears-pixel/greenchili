import { useState, type FormEvent } from 'react';
import { CalendarCheck, AlertCircle } from 'lucide-react';

const SEATING_ZONES = [
  {
    index: '01',
    name: 'Clay Hearth Patio',
    capacity: '2 – 6 Guests',
    note: 'Open-air terrace right beside the glowing charcoal angithi and clay tandoor.',
    perks: 'Live handi steam aroma · Evening sea & garden breeze · Priority tandoor service',
  },
  {
    index: '02',
    name: 'Botanical Glass Hall',
    capacity: '2 – 8 Guests',
    note: 'Air-conditioned emerald conservatory framed by live mint & lemon herbs.',
    perks: 'Climate-controlled quiet dining · Candlelit brass lanterns · Full mocktail bar view',
  },
  {
    index: '03',
    name: 'Private Family Dastarkhwan',
    capacity: '8 – 18 Guests',
    note: 'Dedicated majlis-style dining suite with tableside clay handi dum service.',
    perks: 'Custom spice calibration · Brass samovar kahwa · Dedicated server & family seating',
  },
];

const TABLESIDE_RITUALS = [
  {
    time: 'Arrival · Brass Welcome',
    title: 'Chilled Mint Lime Shot & Roasted Cumin Crisp',
    detail: 'Every booked table begins with cold-pressed pudina cooler before your starters hit the charcoal.',
  },
  {
    time: 'Course 02 · Live Dum Lift',
    title: 'Terracotta Seal Opened at Your Table',
    detail: 'Your server cracks the clay dough seal tableside and finishes the sizzling ghee handi with fresh kagzi lime.',
  },
  {
    time: 'Finale · Samovar Kahwa',
    title: 'Slow-Brewed Green Cardamom Tea',
    detail: 'Finished with crushed green elaichi, lemon zest, and mountain honey poured from antique Peshawari brass kettles.',
  },
];

export default function ReservePage() {
  const [guestName, setGuestName] = useState('');
  const [branch, setBranch] = useState('Boat Basin, Clifton 4 — Karachi');
  const [date, setDate] = useState('2026-11-22');
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState('4 Guests');
  const [seating, setSeating] = useState('Clay Hearth Patio');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const handleReserve = (e: FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setFormError('Please enter a guest name for your table reservation.');
      return;
    }
    setFormError('');
    setBookingRef(`TBL-${Math.floor(100 + Math.random() * 899)}`);
  };

  return (
    <div className="relative z-10 text-[#F4F7F0] pb-20">
      {/* STAGE 01: Full-Viewport Candlelit Archway Arrival */}
      <section className="min-h-[84vh] pt-28 pb-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
          <div className="max-w-3xl p-8 sm:p-11 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#071A10]/82 border border-[#EAB308]/30 shadow-2xl space-y-5">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A3E635]">
              Table &amp; Family Dastarkhwan Booking
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.06] tracking-tight text-[#F4F7F0]"
              style={{ textWrap: 'balance' }}
            >
              Walk Down the Candlelit Corridor &amp; Dine Around the Hearth.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#C8DDD0]">
              Scroll deeper through the brass Mehrab arches to choose your seating zone, explore
              tableside clay handi rituals, and confirm your evening reservation.
            </p>
          </div>
        </div>
      </section>

      {/* STAGE 02: Interactive Seating Zones (spaced cleanly while camera glides past swaying lanterns!) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 min-h-[68vh] flex flex-col justify-center">
        <div className="space-y-3 mb-10 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#A3E635]">
            Choose Your Atmosphere
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#F4F7F0]">
            Three Distinct Dining Sanctuaries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {SEATING_ZONES.map((zone) => {
            const active = seating === zone.name;
            return (
              <button
                key={zone.name}
                type="button"
                onClick={() => setSeating(zone.name)}
                className={`text-left p-7 rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl border transition-all cursor-pointer space-y-3 shadow-xl ${
                  active
                    ? 'bg-[#0C291A]/94 border-[#84CC16] -translate-y-1'
                    : 'bg-[#081C12]/84 border-white/15 hover:border-[#84CC16]/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#A3E635]">
                  <span>
                    {zone.index} · {zone.capacity}
                  </span>
                  <span>{active ? 'Selected' : 'Select'}</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#F4F7F0]">{zone.name}</h3>
                <p className="text-sm leading-relaxed text-[#C2D6C9]">{zone.note}</p>
                <p className="pt-2 border-t border-white/10 text-xs text-[#9BB7A6]">{zone.perks}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* STAGE 03: Tableside Dining Rituals */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 min-h-[60vh] flex flex-col justify-center">
        <div className="rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#071A10]/86 border border-[#EAB308]/25 p-7 sm:p-11">
          <div className="max-w-2xl space-y-2 mb-8">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#EAB308]">
              Evening Pacing
            </p>
            <h2 className="text-3xl font-semibold text-[#F4F7F0]">
              From Welcome Mint Shot to Brass Kahwa
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TABLESIDE_RITUALS.map((r) => (
              <div
                key={r.title}
                className="p-5 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#0A2216]/90 border border-white/10 space-y-2"
              >
                <p className="text-xs font-mono text-[#A3E635]">{r.time}</p>
                <h3 className="text-lg font-semibold text-[#F4F7F0]">{r.title}</h3>
                <p className="text-sm leading-relaxed text-[#C2D6C9]">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAGE 04: Mehrab Arch + Final Instant Reservation Form */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-5">
            <div className="rounded-t-[200px] rounded-b-3xl p-2.5 border border-[#84CC16]/30 bg-[#081C12]/85 h-full min-h-[340px] shadow-2xl">
              <div className="w-full h-full rounded-t-[190px] rounded-b-2xl overflow-hidden bg-[#0D2418]">
                <img
                  src="/src/assets/images/peshawari_sabz_kahwa_1795251583716.jpg"
                  alt="Candlelit Green Chilli dining room with antique brass green cardamom kahwa"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-2xl rounded-br-2xl bg-[#091E13]/92 border border-[#84CC16]/28 p-7 sm:p-10 flex flex-col justify-between shadow-2xl">
            <div className="space-y-2 mb-6">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#A3E635]">
                Instant Reservation
              </p>
              <h2 className="text-3xl font-semibold text-[#F4F7F0]">Confirm Your Seating</h2>
            </div>

            {bookingRef ? (
              <div className="p-6 rounded-2xl bg-[#07170F] border border-[#84CC16]/35 space-y-4">
                <div className="flex items-center gap-2.5 text-[#A3E635]">
                  <CalendarCheck className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="text-xs font-mono uppercase">Table Reserved</p>
                    <p className="text-xl font-semibold text-[#F4F7F0]">{bookingRef}</p>
                  </div>
                </div>
                <p className="text-sm text-[#C2D6C9]">
                  Confirmed for <span className="font-semibold text-[#F4F7F0]">{guestName}</span> (
                  {guests}) at <span className="font-semibold">{branch}</span> on {date} at {time}{' '}
                  — {seating}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBookingRef(null);
                    setGuestName('');
                    setNotes('');
                  }}
                  className="px-4 py-2 rounded-lg bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
                >
                  Make Another Booking
                </button>
              </div>
            ) : (
              <form onSubmit={handleReserve} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                      Guest Name
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#07170F] border border-white/15 text-sm text-[#F4F7F0] placeholder:text-[#6B8776] focus:outline-none focus:border-[#84CC16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                      Branch
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#07170F] border border-white/15 text-sm text-[#F4F7F0] focus:outline-none focus:border-[#84CC16]"
                    >
                      <option>Boat Basin, Clifton 4 — Karachi</option>
                      <option>MM Alam Rd, Gulberg III — Lahore</option>
                      <option>Jinnah Super, F-7 — Islamabad</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#07170F] border border-white/15 text-sm text-[#F4F7F0] focus:outline-none focus:border-[#84CC16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">Time</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#07170F] border border-white/15 text-sm text-[#F4F7F0] focus:outline-none focus:border-[#84CC16]"
                    >
                      <option value="13:30">1:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="21:30">9:30 PM</option>
                      <option value="23:00">11:00 PM (Karachi Late)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                      Party Size
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#07170F] border border-white/15 text-sm text-[#F4F7F0] focus:outline-none focus:border-[#84CC16]"
                    >
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6 Guests</option>
                      <option>8+ Family Dastarkhwan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                    Special Notes (Spice level, celebration, high-chair)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional dining note"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#07170F] border border-white/15 text-sm text-[#F4F7F0] placeholder:text-[#6B8776] focus:outline-none focus:border-[#84CC16]"
                  />
                </div>

                {formError && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-sm font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
                >
                  Confirm Table Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
