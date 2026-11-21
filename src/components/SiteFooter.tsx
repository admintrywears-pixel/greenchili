import { PAGE_URDU_LABELS } from '../data/urduContent';
import type { PageId } from '../types/navigation';
import { WHATSAPP_DISPLAY_NUMBER } from '../utils/whatsapp';

interface SiteFooterProps {
  onNavigate: (page: PageId) => void;
}

const FOOTER_LINKS: Array<{ id: PageId; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'health', label: 'Health Benefits' },
  { id: 'orders', label: 'Orders' },
  { id: 'story', label: 'Our Story' },
  { id: 'branches', label: 'Branches' },
  { id: 'reserve', label: 'Reserve' },
  { id: 'contact', label: 'Contact Us' },
  { id: 'privacy', label: 'Privacy Policy' },
];

export default function SiteFooter({ onNavigate }: SiteFooterProps) {
  return (
    <footer className="relative z-10 bg-[#04100A]/94 text-[#93B09E] border-t border-[#84CC16]/15 pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="shrink-0 cursor-pointer text-left overflow-hidden rounded-lg border border-[#84CC16]/25 bg-[#03210B]"
            aria-label="Go to Green Chili Home"
          >
            <img
              src="/assets/aistudio/Analysis_output_1_7813f308.png"
              alt="Green Chili — All Food With Green Chili"
              referrerPolicy="no-referrer"
              className="h-14 w-auto object-contain scale-[1.05]"
            />
          </button>
          <div className="space-y-1 text-xs">
            <p className="font-semibold text-[#F4F7F0]">
              Pakistani Clean-Spice Health Kitchen ·{' '}
              <span lang="ur" className="font-urdu-inline text-[13px] text-[#EAB308]">
                خالص ہری مرچ کچن — لال مرچ سے مکمل پاک
              </span>
            </p>
            <p>
              100% Red-Chilli-Free Health Food · WhatsApp Orders:{' '}
              <a
                href="https://wa.me/923185519151"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A3E635] font-mono hover:underline"
              >
                {WHATSAPP_DISPLAY_NUMBER}
              </a>
            </p>
          </div>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
          {FOOTER_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onNavigate(link.id)}
              className="inline-flex items-center gap-1.5 hover:text-[#A3E635] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{link.label}</span>
              <span lang="ur" className="font-urdu-inline text-xs text-[#EAB308]">
                {PAGE_URDU_LABELS[link.id]}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </footer>
  );
}
