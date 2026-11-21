import { useMemo, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { WHATSAPP_DISPLAY_NUMBER, buildWhatsAppContactUrl } from '../../utils/whatsapp';
import type { PageId } from '../../types/navigation';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

const KITCHEN_DESKS = [
  {
    city: 'Karachi Flagship Desk',
    address: 'Plot 14-C, Boat Basin, Clifton Block 4, Karachi',
    hours: '12:00 PM – 2:00 AM Daily',
    phone: WHATSAPP_DISPLAY_NUMBER,
  },
  {
    city: 'Lahore Gulberg Desk',
    address: '82 MM Alam Road, Gulberg III, Lahore',
    hours: '12:30 PM – 1:00 AM Daily',
    phone: WHATSAPP_DISPLAY_NUMBER,
  },
  {
    city: 'Islamabad Pavilion Desk',
    address: 'Street 12, Jinnah Super Market, F-7 Markaz, Islamabad',
    hours: '12:00 PM – 12:30 AM Daily',
    phone: WHATSAPP_DISPLAY_NUMBER,
  },
];

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('Order Support & Delivery');
  const [branch, setBranch] = useState('Clifton Block 4, Karachi');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [sentRef, setSentRef] = useState<{ id: string; url: string } | null>(null);

  const isReady = name.trim().length > 0 && phone.trim().length > 0 && message.trim().length > 0;

  const liveWhatsappUrl = useMemo(
    () =>
      buildWhatsAppContactUrl({
        name: name.trim() || 'Guest',
        phone: phone.trim() || 'Not provided',
        topic,
        branch,
        message: message.trim() || 'Hello Green Chili team',
      }),
    [name, phone, topic, branch, message]
  );

  const confirmInquiry = () => {
    setErrorMsg('');
    setSentRef({
      id: `INQ-${Math.floor(1000 + Math.random() * 8999)}`,
      url: liveWhatsappUrl,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isReady) {
      setErrorMsg('Please enter your name, contact number, and message.');
      return;
    }
    confirmInquiry();
  };

  return (
    <div className="relative z-10 text-[#F4F7F0] pb-20">
      {/* STAGE 01: Opening Communication Hero Over 3D Signal Resonance Plane */}
      <section className="min-h-[78vh] pt-28 pb-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
          <div className="max-w-3xl p-8 sm:p-11 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#071A10]/84 border border-[#84CC16]/30 shadow-2xl space-y-5">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A3E635]">
              Contact Green Chili™ Pakistan
            </p>
            <h1
              className="text-4xl sm:text-5xl font-semibold leading-[1.06] tracking-tight text-[#F4F7F0]"
              style={{ textWrap: 'balance' }}
            >
              Direct Line to Our Kitchens, Catering &amp; Guest Care.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#C8DDD0]">
              Reach our central WhatsApp order &amp; hospitality desk directly at{' '}
              <span className="font-mono text-[#EAB308]">{WHATSAPP_DISPLAY_NUMBER}</span>, message
              any city branch, or inspect our{' '}
              <button
                type="button"
                onClick={() => onNavigate('privacy')}
                className="text-[#A3E635] underline cursor-pointer"
              >
                Privacy Policy
              </button>
              .
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-sm">
              <a
                href="https://wa.me/923185519151"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {WHATSAPP_DISPLAY_NUMBER}</span>
              </a>
              <a
                href="mailto:care@greenchilipakistan.com"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#84CC16]/35 bg-[#081C12]/90 text-xs font-medium text-[#F4F7F0] hover:border-[#A3E635] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#A3E635]" />
                <span>care@greenchilipakistan.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE 02: City Kitchen Contact Desks */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {KITCHEN_DESKS.map((desk) => (
            <article
              key={desk.city}
              className="p-6 rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-lg rounded-bl-lg bg-[#071A10]/90 border border-[#84CC16]/25 space-y-3 shadow-xl"
            >
              <h2 className="text-xl font-semibold text-[#F4F7F0]">{desk.city}</h2>
              <div className="space-y-2 text-xs text-[#C2D6C9]">
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#A3E635] shrink-0 mt-0.5" />
                  <span>{desk.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#A3E635] shrink-0" />
                  <span>{desk.hours}</span>
                </p>
                <p className="flex items-center gap-2 font-mono text-[#EAB308]">
                  <Phone className="w-3.5 h-3.5 text-[#A3E635] shrink-0" />
                  <span>{desk.phone}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* STAGE 03: Direct Contact & Feedback WhatsApp Form */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-2xl rounded-br-2xl bg-[#081C12]/92 border border-[#84CC16]/28 p-7 sm:p-11 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#A3E635]">
              Speak With Us Directly
            </p>
            <h2 className="text-3xl font-semibold text-[#F4F7F0]">
              Send Feedback, Franchise Inquiries, or Event Requests
            </h2>
            <p className="text-sm leading-relaxed text-[#C2D6C9]">
              Your inquiry opens straight inside WhatsApp on{' '}
              <span className="font-mono text-[#EAB308]">{WHATSAPP_DISPLAY_NUMBER}</span> so a real
              manager at your selected city branch replies promptly.
            </p>
          </div>

          <div className="lg:col-span-7">
            {sentRef ? (
              <div className="p-6 rounded-2xl bg-[#05140C] border border-[#84CC16]/35 space-y-4">
                <div className="flex items-center gap-2.5 text-[#A3E635]">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="text-xs font-mono uppercase">Inquiry Logged</p>
                    <h3 className="text-xl font-semibold text-[#F4F7F0]">{sentRef.id}</h3>
                  </div>
                </div>
                <p className="text-sm text-[#C2D6C9]">
                  Thank you, <span className="font-semibold text-[#F4F7F0]">{name}</span>. Your
                  message for {branch} is formatted for direct WhatsApp dispatch.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={sentRef.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp ({WHATSAPP_DISPLAY_NUMBER})</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSentRef(null);
                      setMessage('');
                    }}
                    className="px-4 py-2.5 rounded-lg border border-white/15 text-xs text-[#F4F7F0] cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#05140C] border border-white/15 text-sm text-[#F4F7F0] placeholder:text-[#6B8776] focus:outline-none focus:border-[#84CC16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03XX-XXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#05140C] border border-white/15 text-sm text-[#F4F7F0] placeholder:text-[#6B8776] focus:outline-none focus:border-[#84CC16]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">Topic</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#05140C] border border-white/15 text-sm text-[#F4F7F0] focus:outline-none focus:border-[#84CC16]"
                    >
                      <option>Order Support &amp; Delivery</option>
                      <option>Corporate &amp; Wedding Catering</option>
                      <option>Allergy / Spice Verification</option>
                      <option>Branch Feedback</option>
                      <option>Privacy &amp; Data Request</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">Branch</label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#05140C] border border-white/15 text-sm text-[#F4F7F0] focus:outline-none focus:border-[#84CC16]"
                    >
                      <option>Clifton Block 4, Karachi</option>
                      <option>Gulberg III, Lahore</option>
                      <option>F-7 Markaz, Islamabad</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#B7CEBF] mb-1">Message</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your question, event details, or feedback..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#05140C] border border-white/15 text-sm text-[#F4F7F0] placeholder:text-[#6B8776] focus:outline-none focus:border-[#84CC16]"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {isReady ? (
                  <a
                    href={liveWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={confirmInquiry}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-sm font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Message on WhatsApp ({WHATSAPP_DISPLAY_NUMBER})</span>
                  </a>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-sm font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
                  >
                    Send Contact Message
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
