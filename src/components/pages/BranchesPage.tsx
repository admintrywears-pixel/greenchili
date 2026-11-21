import { useState, type FormEvent } from 'react';
import { MapPin, Clock, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import type { PageId } from '../../types/navigation';

interface BranchesPageProps {
  onNavigate: (page: PageId) => void;
}

const BRANCHES = [
  {
    index: '01',
    city: 'Karachi Flagship',
    area: 'Boat Basin, Clifton Block 4',
    hours: '12:00 PM – 2:00 AM Daily',
    seats: '140 Covers · Open Sea-Breeze Hearth',
    signature: 'Beef Sabz Nehari, Burns Road Katakat, Green Prawn Karahi & Loaded Fries',
    story:
      'Our coastal flagship sits at the heart of Boat Basin with an open sea-breeze charcoal angithi, live stone-baked green pizza oven, and late-night roll paratha counter running until 2:00 AM.',
    image: '/src/assets/images/karachi_sabz_pulao_1795251691372.jpg',
    align: 'left' as const,
  },
  {
    index: '02',
    city: 'Lahore Kitchen',
    area: 'MM Alam Road, Gulberg III',
    hours: '12:30 PM – 1:00 AM Daily',
    seats: '110 Covers · Botanical Courtyard',
    signature: 'Lahori Sabz Tawa Champ, Chicken Makhni Handi & Wood-Fired Green Tikka Pizza',
    story:
      'Designed around a shaded emerald courtyard in Gulberg III, our Lahore kitchen specializes in heavy iron tawa chops, slow-simmered clay handis, and crisp mint coolers.',
    image: '/src/assets/images/lahori_tawa_champ_1795251494612.jpg',
    align: 'right' as const,
  },
  {
    index: '03',
    city: 'Islamabad Pavilion',
    area: 'Jinnah Super Market, F-7',
    hours: '12:00 PM – 12:30 AM Daily',
    seats: '95 Covers · Margalla Terrace',
    signature: 'Peshawari Hari Mirch Karahi, Pistachio Malai Boti & Brass Sabz Kahwa',
    story:
      'Looking up toward the Margalla ridges, the F-7 terrace pairs smoky Peshawari namkeen hari mirch karahi and cardamom-infused brass kahwa with crisp mountain evening air.',
    image: '/src/assets/images/peshawari_sabz_kahwa_1795251583716.jpg',
    align: 'left' as const,
  },
];

export default function BranchesPage({ onNavigate }: BranchesPageProps) {
  const [orgName, setOrgName] = useState('');
  const [city, setCity] = useState('Karachi Flagship');
  const [eventType, setEventType] = useState('Corporate Dastarkhwan');
  const [headcount, setHeadcount] = useState('50 – 100 Guests');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [inquiryId, setInquiryId] = useState<string | null>(null);

  const handleCateringSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!orgName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your name or company and contact number.');
      return;
    }
    setErrorMsg('');
    setInquiryId(`CAT-${Math.floor(2000 + Math.random() * 7999)}`);
  };

  return (
    <div className="relative z-10 text-[#F4F7F0] pb-20">
      {/* STAGE 01: Full-Viewport Architectural Horizon Opening */}
      <section className="min-h-[84vh] pt-28 pb-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
          <div className="max-w-3xl p-8 sm:p-11 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#071A10]/82 border border-[#84CC16]/25 shadow-2xl space-y-5">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A3E635]">
              Karachi · Lahore · Islamabad
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.06] tracking-tight text-[#F4F7F0]"
              style={{ textWrap: 'balance' }}
            >
              Three Pakistani Hearth Kitchens &amp; Live Event Catering.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#C8DDD0]">
              Scroll northward across the 3D terrain beacons—from Boat Basin Karachi to Gulberg
              Lahore and Margalla F-7 Islamabad. Every branch runs our open charcoal angithi and
              live stone-baked pizza oven.
            </p>
            <div className="pt-2 flex flex-wrap gap-6 text-xs text-[#A3E635] font-mono">
              <span>01 · Boat Basin Coast</span>
              <span>02 · Gulberg Courtyard</span>
              <span>03 · Margalla Terrace</span>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE 02: City-by-City Scroll Flight Spotlights (alternating flanks over the 3D Terrain!) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12 space-y-28">
        {BRANCHES.map((b) => (
          <div key={b.city} className="min-h-[64vh] flex items-center">
            <article className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Photo Frame */}
              <div
                className={`lg:col-span-6 ${
                  b.align === 'right' ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="rounded-tl-[3.25rem] rounded-br-[3.25rem] rounded-tr-xl rounded-bl-xl p-2.5 bg-[#071A10]/85 border border-[#84CC16]/30 shadow-2xl">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-tl-[2.75rem] rounded-br-[2.75rem] rounded-tr-lg rounded-bl-lg bg-[#0D2B1C]">
                    <img
                      src={b.image}
                      alt={`${b.city} — ${b.area}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Editorial Card */}
              <div
                className={`lg:col-span-6 ${
                  b.align === 'right' ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="rounded-tr-[3.25rem] rounded-bl-[3.25rem] rounded-tl-xl rounded-br-xl bg-[#071A10]/90 border border-[#84CC16]/25 p-7 sm:p-10 space-y-5 shadow-2xl">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display italic text-4xl font-semibold text-[#A3E635] tabular-nums">
                      {b.index}
                    </span>
                    <span className="text-xs font-mono text-[#EAB308]">{b.city}</span>
                  </div>

                  <h2 className="text-3xl font-semibold text-[#F4F7F0]">{b.area}</h2>
                  <p className="text-sm sm:text-base leading-relaxed text-[#C2D6C9]">{b.story}</p>

                  <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-[#B7CEBF]">
                    <p className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#A3E635] shrink-0" />
                      <span>{b.hours}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#A3E635] shrink-0" />
                      <span>{b.seats}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#A3E635] shrink-0 mt-0.5" />
                      <span>{b.signature}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('reserve')}
                    className="w-full py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
                  >
                    Reserve at {b.city}
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </section>

      {/* STAGE 03: Dastarkhwan & Corporate Catering Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-8">
        <div className="rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-2xl rounded-br-2xl bg-[#081C12]/92 border border-[#84CC16]/25 p-7 sm:p-11 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#A3E635]">
              Live Clay Handi &amp; BBQ Setup
            </p>
            <h2 className="text-3xl font-semibold text-[#F4F7F0]">
              Book Green Chili Live Dastarkhwan Catering
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#C2D6C9]">
              Hosting a corporate dinner, mehndi, or family dawat in Karachi, Lahore, or Islamabad?
              Our chefs bring live clay handi stations, seekh angithis, and fresh mint margarita
              bars straight to your venue.
            </p>
            <div className="pt-2 text-xs text-[#9BB7A6] space-y-1">
              <p>Live Clay Handi Station · Charcoal BBQ Angithi · Fresh Naan Tandoor</p>
              <p>Custom Green Pizza &amp; Loaded Fries Counter for Youth Events</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {inquiryId ? (
              <div className="p-6 rounded-2xl bg-[#06140D] border border-[#84CC16]/35 space-y-4">
                <div className="flex items-center gap-2.5 text-[#A3E635]">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="text-xs font-mono uppercase">Catering Request Logged</p>
                    <h3 className="text-xl font-semibold text-[#F4F7F0]">{inquiryId}</h3>
                  </div>
                </div>
                <p className="text-sm text-[#C2D6C9]">
                  Thank you, <span className="font-semibold text-[#F4F7F0]">{orgName}</span>. Our{' '}
                  {city} events team will contact {phone} with a custom {eventType} proposal for{' '}
                  {headcount}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setInquiryId(null);
                    setOrgName('');
                    setPhone('');
                  }}
                  className="px-4 py-2 rounded-lg bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleCateringSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                      Name / Organization
                    </label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Ayesha Khan / Systems Ltd"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#06130C] border border-white/15 text-sm text-[#F4F7F0] placeholder:text-[#6B8776] focus:outline-none focus:border-[#84CC16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#06130C] border border-white/15 text-sm text-[#F4F7F0] placeholder:text-[#6B8776] focus:outline-none focus:border-[#84CC16]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                      Kitchen Hub
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#06130C] border border-white/15 text-sm text-[#F4F7F0] focus:outline-none focus:border-[#84CC16]"
                    >
                      <option>Karachi Flagship</option>
                      <option>Lahore Kitchen</option>
                      <option>Islamabad Pavilion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                      Event Style
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#06130C] border border-white/15 text-sm text-[#F4F7F0] focus:outline-none focus:border-[#84CC16]"
                    >
                      <option>Corporate Dastarkhwan</option>
                      <option>Wedding / Mehndi Live Handi</option>
                      <option>Birthday Pizza &amp; Fries Bar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                      Guest Count
                    </label>
                    <select
                      value={headcount}
                      onChange={(e) => setHeadcount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#06130C] border border-white/15 text-sm text-[#F4F7F0] focus:outline-none focus:border-[#84CC16]"
                    >
                      <option>25 – 50 Guests</option>
                      <option>50 – 100 Guests</option>
                      <option>100 – 250 Guests</option>
                      <option>250+ Grand Banquet</option>
                    </select>
                  </div>
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-sm font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
                >
                  Request Catering Quote
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
