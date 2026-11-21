import { ArrowRight, MessageCircle } from 'lucide-react';
import OrdersCheckoutSection from '../OrdersCheckoutSection';
import type { CartEntry } from '../OrderDrawer';
import { MENU_ITEMS, type MenuItem } from '../../data/restaurantData';
import type { PageId } from '../../types/navigation';
import { WHATSAPP_DISPLAY_NUMBER } from '../../utils/whatsapp';

interface OrdersPageProps {
  entries: CartEntry[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNavigate: (page: PageId) => void;
}

const DISPATCH_STEPS = [
  {
    num: '01',
    title: 'Auto-Attached Dishes & Photos',
    body: `Every dish added from our ${MENU_ITEMS.length}-item Menu or Orbital Wheel attaches automatically below with its dish photograph, spice level, and live PKR subtotal.`,
  },
  {
    num: '02',
    title: 'Instant Address or Self-Pickup',
    body: 'Choose Home Delivery (Cash on Delivery, free above Rs. 2,500) or Pickup at Karachi Boat Basin, Lahore Gulberg III, or Islamabad F-7.',
  },
  {
    num: '03',
    title: `Direct WhatsApp to ${WHATSAPP_DISPLAY_NUMBER}`,
    body: 'One click formats your complete dish list, image references, and location directly into WhatsApp so our kitchen fires your clay handi immediately.',
  },
];

export default function OrdersPage({
  entries,
  onAddToCart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onNavigate,
}: OrdersPageProps) {
  return (
    <div className="relative z-10 text-[#F4F7F0] pb-16">
      {/* STAGE 01: Opening Dispatch Hero Over 3D Conveyor Rings */}
      <section className="min-h-[68vh] pt-28 pb-12 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
          <div className="max-w-3xl p-8 sm:p-10 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#071A10]/85 border border-[#84CC16]/30 shadow-2xl space-y-5">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A3E635]">
              Direct Kitchen Dispatch · {WHATSAPP_DISPLAY_NUMBER}
            </p>
            <h1
              className="text-4xl sm:text-5xl font-semibold leading-[1.06] tracking-tight text-[#F4F7F0]"
              style={{ textWrap: 'balance' }}
            >
              Order Fresh Green Chilli Food Straight to Our WhatsApp Kitchen.
            </h1>
            <p className="text-base leading-relaxed text-[#C8DDD0]">
              Your selected menu items and dish photos are automatically attached to the checkout
              form below. Need more dishes first? Spin our {MENU_ITEMS.length}-dish Menu or quick-attach
              headliners below.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
              >
                <span>Browse {MENU_ITEMS.length}-Dish Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href="https://wa.me/923185519151"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#84CC16]/40 bg-[#081C12]/88 text-xs font-medium text-[#F4F7F0] hover:border-[#A3E635] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>WhatsApp Desk: {WHATSAPP_DISPLAY_NUMBER}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Auto-Attached Orders & Dish Image Form */}
      <OrdersCheckoutSection
        entries={entries}
        onAddToCart={onAddToCart}
        onUpdateQty={onUpdateQty}
        onRemoveItem={onRemoveItem}
        onClearCart={onClearCart}
      />

      {/* STAGE 03: 3-Step Dispatch Flow */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DISPATCH_STEPS.map((step) => (
            <article
              key={step.num}
              className="p-6 rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-lg rounded-bl-lg bg-[#071A10]/88 border border-[#84CC16]/20 space-y-2.5"
            >
              <span className="font-display italic text-3xl font-semibold text-[#A3E635] tabular-nums">
                {step.num}
              </span>
              <h2 className="text-xl font-semibold text-[#F4F7F0]">{step.title}</h2>
              <p className="text-sm leading-relaxed text-[#C2D6C9]">{step.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
