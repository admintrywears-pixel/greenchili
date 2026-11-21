import { useState, type FormEvent } from 'react';
import { CalendarCheck, AlertCircle } from 'lucide-react';

export default function ReserveAndFooter() {
  const [guestName, setGuestName] = useState('');
  const [branch, setBranch] = useState('Gulberg III, Lahore');
  const [date, setDate] = useState('2026-11-22');
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState('4 Guests');
  const [seating, setSeating] = useState('Clay Hearth Patio');
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
    <>
      <section
        id="reserve"
        className="relative z-10 text-[#F4F7F0] py-16 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Image Column framed as a tall Pakistani Mehrab Arch */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-6">
              <div className="rounded-t-[200px] rounded-b-3xl p-2.5 border border-[#84CC16]/30 bg-[#081C12]/85 flex-1 min-h-[300px] shadow-2xl">
                <div className="w-full h-full rounded-t-[190px] rounded-b-2xl overflow-hidden bg-[#0D2418]">
                  <img
                    src="/src/assets/images/elaichi_doodh_patti_1795251586501.jpg"
                    alt="Green Chilli dining room copper kettle cardamom tea and mint leaf"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-4 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#081C12]/88 border border-white/10 text-xs text-[#A7C4B5]">
                <div>
                  <p className="font-semibold text-[#F4F7F0]">Lahore</p>
                  <p>MM Alam Rd, Gulberg III</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F4F7F0]">Karachi</p>
                  <p>Boat Basin, Clifton 4</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F4F7F0]">Islamabad</p>
                  <p>Jinnah Super, F-7</p>
                </div>
              </div>
            </div>

            {/* Right Table Booking Pavilion with Leaf-Curved Diagonal Corners */}
            <div className="lg:col-span-6 rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-2xl rounded-br-2xl bg-[#091E13]/92 border border-[#84CC16]/28 p-7 sm:p-9 flex flex-col justify-between shadow-2xl">
              <div className="space-y-2 mb-6">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#A3E635]">
                  Dine Around The Clay Hearth
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-[#F4F7F0]">
                  Reserve Your Table at Green Chilli
                </h2>
                <p className="text-sm text-[#B7CEBF]">
                  Watch our chefs finish your clay handi tableside with sizzling desi ghee, fresh
                  green chillies, and aromatic cardamom kahwa.
                </p>
              </div>

              {bookingRef ? (
                <div className="p-6 rounded-xl bg-[#07170F] border border-[#84CC16]/35 space-y-4">
                  <div className="flex items-center gap-2.5 text-[#A3E635]">
                    <CalendarCheck className="w-6 h-6 shrink-0" />
                    <div>
                      <p className="text-xs font-mono uppercase">Table Reserved</p>
                      <p className="text-xl font-semibold text-[#F4F7F0]">{bookingRef}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#C2D6C9]">
                    Confirmed for <span className="font-semibold text-[#F4F7F0]">{guestName}</span>{' '}
                    ({guests}) at <span className="font-semibold">{branch}</span> on {date} at{' '}
                    {time} — {seating}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setBookingRef(null);
                      setGuestName('');
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
                        <option>Gulberg III, Lahore</option>
                        <option>Clifton Block 4, Karachi</option>
                        <option>F-7 Markaz, Islamabad</option>
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
                      Seating Preference
                    </label>
                    <select
                      value={seating}
                      onChange={(e) => setSeating(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#07170F] border border-white/15 text-sm text-[#F4F7F0] focus:outline-none focus:border-[#84CC16]"
                    >
                      <option>Clay Hearth Patio</option>
                      <option>Indoor Botanical Hall</option>
                      <option>Private Family Lounge</option>
                    </select>
                  </div>

                  {formError && (
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-xs font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#84CC16] text-[#07170F] text-sm font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
                  >
                    Book My Table
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
