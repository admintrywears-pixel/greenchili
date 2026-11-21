import { ShieldCheck } from 'lucide-react';
import type { PageId } from '../../types/navigation';
import { WHATSAPP_DISPLAY_NUMBER } from '../../utils/whatsapp';

interface PrivacyPageProps {
  onNavigate: (page: PageId) => void;
}

const PRIVACY_SECTIONS = [
  {
    num: '01',
    title: 'Information You Provide Voluntarily',
    body: 'When you place an order, reserve a table, or request catering through Green Chili™, we collect only the details you type into our forms: your name, mobile/WhatsApp number, selected kitchen branch, delivery address (for delivery orders), and optional spice or dining notes. We do not collect financial card numbers on this site—deliveries operate on Cash on Delivery (COD) or pay-at-counter.',
  },
  {
    num: '02',
    title: 'Automatic Order Bag & WhatsApp Handoff',
    body: `Your selected dishes and dish photo references remain strictly inside your active browser session until you choose to send your order. When you click Send on WhatsApp, your itemized order text and dish details are transferred securely via HTTPS directly to WhatsApp (${WHATSAPP_DISPLAY_NUMBER}) under your explicit action.`,
  },
  {
    num: '03',
    title: 'Google Fonts, Hosting & Third-Party Transparency',
    body: 'Consistent with Google Web & Ad Policy transparency standards, this application uses Google Fonts for typography rendering and links externally to WhatsApp when you initiate an order or inquiry. We do not sell, rent, trade, or broker your personal phone number, home address, or dining preferences to data brokers or advertising networks.',
  },
  {
    num: '04',
    title: 'Cookies, Browser Preferences & Analytics',
    body: 'Green Chili™ operates without intrusive cross-site behavioral tracking cookies. Browser preferences such as reduced-motion accessibility settings (`prefers-reduced-motion`) are respected automatically in real time without storing persistent tracking identifiers.',
  },
  {
    num: '05',
    title: 'Data Retention & Security Safeguards',
    body: 'Order inquiries transmitted via WhatsApp are retained only as long as required to fulfill your fresh food delivery, resolve kitchen feedback, or honor catering agreements. All web traffic runs exclusively over encrypted HTTPS/TLS connections.',
  },
  {
    num: '06',
    title: 'Your Privacy Rights & Contact Officer',
    body: `You may request access to, correction of, or deletion of any WhatsApp order record or reservation history at any time by messaging our Privacy & Guest Care desk at ${WHATSAPP_DISPLAY_NUMBER} or emailing care@greenchilipakistan.com.`,
  },
];

export default function PrivacyPage({ onNavigate }: PrivacyPageProps) {
  return (
    <div className="relative z-10 text-[#F4F7F0] pb-20">
      {/* STAGE 01: Calm Sanctuary Opening */}
      <section className="min-h-[68vh] pt-28 pb-12 flex items-center">
        <div className="max-w-5xl mx-auto w-full px-6 lg:px-10">
          <div className="p-8 sm:p-11 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#071A10]/86 border border-[#84CC16]/30 shadow-2xl space-y-5">
            <div className="flex items-center gap-2.5 text-[#A3E635]">
              <ShieldCheck className="w-5 h-5" />
              <p className="text-xs font-semibold tracking-[0.18em] uppercase">
                Google-Compliant Privacy Policy · Updated November 2026
              </p>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-semibold leading-[1.06] tracking-tight text-[#F4F7F0]"
              style={{ textWrap: 'balance' }}
            >
              Your Order Details Stay Strictly Between Your Table &amp; Our Kitchen.
            </h1>
            <p className="text-base leading-relaxed text-[#C8DDD0] max-w-3xl">
              Green Chili™ Pakistan is committed to transparent, zero-spam guest privacy. Below is
              exactly how we handle order information, WhatsApp dispatch, browser storage, and your
              rights.
            </p>
          </div>
        </div>
      </section>

      {/* STAGE 02: Scroll-Paced Policy Chapters */}
      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-8 space-y-8">
        {PRIVACY_SECTIONS.map((sec) => (
          <article
            key={sec.num}
            className="p-7 sm:p-9 rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl bg-[#071A10]/88 border border-[#84CC16]/22 shadow-xl space-y-3"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-display italic text-3xl font-semibold text-[#A3E635] tabular-nums">
                {sec.num}
              </span>
              <h2 className="text-2xl font-semibold text-[#F4F7F0]">{sec.title}</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#C2D6C9]">{sec.body}</p>
          </article>
        ))}

        <div className="p-7 rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl bg-[#081C12]/90 border border-[#EAB308]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#F4F7F0]">
              Questions About Our Privacy Practices?
            </p>
            <p className="text-xs text-[#9BB7A6]">
              Reach our Guest Care &amp; Privacy Desk via Contact Us or WhatsApp{' '}
              {WHATSAPP_DISPLAY_NUMBER}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Open Contact Us Page
          </button>
        </div>
      </section>
    </div>
  );
}
