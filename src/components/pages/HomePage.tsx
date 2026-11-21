import { ArrowRight } from 'lucide-react';
import WalkthroughChapters from '../WalkthroughChapters';
import HealthBenefitsBand from '../HealthBenefitsBand';
import MenuSection from '../MenuSection';
import OrdersCheckoutSection from '../OrdersCheckoutSection';
import ReserveAndFooter from '../ReserveAndFooter';
import type { CartEntry } from '../OrderDrawer';
import { MENU_ITEMS, type MenuItem } from '../../data/restaurantData';
import type { PageId } from '../../types/navigation';

interface HomePageProps {
  activeStage: number;
  entries: CartEntry[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  cartQuantities: Record<string, number>;
  onNavigate: (page: PageId) => void;
}

export default function HomePage({
  activeStage,
  entries,
  onAddToCart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  cartQuantities,
  onNavigate,
}: HomePageProps) {
  return (
    <>
      <WalkthroughChapters
        activeStage={activeStage}
        onJumpToMenu={() => onNavigate('menu')}
      />

      {/* Quick Multi-Page Navigation Strip */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <button
            type="button"
            onClick={() => onNavigate('health')}
            className="group text-left p-5 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg bg-[#081C12]/88 border border-[#84CC16]/25 hover:border-[#A3E635] transition-colors cursor-pointer space-y-1.5"
          >
            <p className="text-xs font-mono text-[#A3E635]">01 · Complete Health Brand</p>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[#F4F7F0]">
                Health Benefits · <span lang="ur" className="font-urdu-inline text-sm text-[#EAB308]">صحت</span>
              </h3>
              <ArrowRight className="w-4 h-4 text-[#A3E635] transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-[#B7CEBF]">
              Vitamin C immunity, zero gut acidity &amp; clean fats.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('menu')}
            className="group text-left p-5 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg bg-[#081C12]/88 border border-[#84CC16]/25 hover:border-[#A3E635] transition-colors cursor-pointer space-y-1.5"
          >
            <p className="text-xs font-mono text-[#EAB308]">
              02 · {MENU_ITEMS.length} Dishes
            </p>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[#F4F7F0]">
                3D Menu · <span lang="ur" className="font-urdu-inline text-sm text-[#EAB308]">مینیو</span>
              </h3>
              <ArrowRight className="w-4 h-4 text-[#A3E635] transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-[#B7CEBF]">
              Handis, Nehari, Pizzas, Fries &amp; Green Chutneys.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('orders')}
            className="group text-left p-5 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg bg-[#081C12]/88 border border-[#84CC16]/25 hover:border-[#A3E635] transition-colors cursor-pointer space-y-1.5"
          >
            <p className="text-xs font-mono text-[#A3E635]">03 · Direct WhatsApp</p>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[#F4F7F0]">
                Orders · <span lang="ur" className="font-urdu-inline text-sm text-[#EAB308]">آرڈر</span>
              </h3>
              <ArrowRight className="w-4 h-4 text-[#A3E635] transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-[#B7CEBF]">
              Auto-attached dish photos to +92 318 5519151.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="group text-left p-5 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg bg-[#081C12]/88 border border-[#84CC16]/25 hover:border-[#A3E635] transition-colors cursor-pointer space-y-1.5"
          >
            <p className="text-xs font-mono text-[#EAB308]">04 · Guest Care</p>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[#F4F7F0]">
                Contact · <span lang="ur" className="font-urdu-inline text-sm text-[#EAB308]">رابطہ</span>
              </h3>
              <ArrowRight className="w-4 h-4 text-[#A3E635] transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-[#B7CEBF]">
              Karachi, Lahore &amp; Islamabad kitchen desks.
            </p>
          </button>
        </div>
      </section>

      <HealthBenefitsBand onNavigate={onNavigate} />

      <MenuSection
        onAddToCart={onAddToCart}
        onUpdateQty={onUpdateQty}
        cartQuantities={cartQuantities}
      />

      {/* Auto-Attached Orders & Dish Photo Section Right on Home */}
      <OrdersCheckoutSection
        entries={entries}
        onAddToCart={onAddToCart}
        onUpdateQty={onUpdateQty}
        onRemoveItem={onRemoveItem}
        onClearCart={onClearCart}
      />

      <ReserveAndFooter />
    </>
  );
}
