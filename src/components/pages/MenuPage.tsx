import { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import OrbitalScrollMenu from '../OrbitalScrollMenu';
import MenuSection from '../MenuSection';
import HealthBenefitsBand from '../HealthBenefitsBand';
import {
  MENU_ITEMS,
  RESTAURANT_IMAGES,
  type MenuCategory,
  type MenuItem,
} from '../../data/restaurantData';
import { CATEGORY_URDU } from '../../data/urduContent';
import type { PageId } from '../../types/navigation';

const CATEGORY_TILES: Array<{
  category: Exclude<MenuCategory, 'All'>;
  subtitle: string;
  image: string;
}> = [
  {
    category: 'Handi & Karahi',
    subtitle: 'Clay Pots & Shinwari',
    image: RESTAURANT_IMAGES.handi,
  },
  {
    category: 'Karachi Specials',
    subtitle: 'Nehari, Rolls & Katakat',
    image: RESTAURANT_IMAGES.karachiStreet,
  },
  {
    category: 'BBQ & Grill',
    subtitle: 'Chargha, Fish & Boti',
    image: RESTAURANT_IMAGES.bbq,
  },
  {
    category: 'Pizza, Burgers & Fries',
    subtitle: 'Stone Pizzas & Fries',
    image: RESTAURANT_IMAGES.pizza,
  },
  {
    category: 'Chutneys & Sauces',
    subtitle: 'Pudina Chatni & Hot Sauce',
    image: RESTAURANT_IMAGES.chutneys,
  },
  {
    category: 'Drinks & Sides',
    subtitle: 'Margaritas, Lassi & Chai',
    image: RESTAURANT_IMAGES.drinks,
  },
];

interface MenuPageProps {
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty?: (id: string, delta: number) => void;
  cartQuantities: Record<string, number>;
  onNavigate?: (page: PageId) => void;
}

export default function MenuPage({
  onAddToCart,
  onUpdateQty,
  cartQuantities,
  onNavigate,
}: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');

  const categoryStats = useMemo(() => {
    return CATEGORY_TILES.map((tile) => {
      const items = MENU_ITEMS.filter((i) => i.category === tile.category);
      const minPrice = items.reduce((min, i) => Math.min(min, i.pricePkr), Infinity);
      return {
        ...tile,
        count: items.length,
        minPrice: Number.isFinite(minPrice) ? minPrice : 0,
      };
    });
  }, []);

  const jumpToWheel = (cat?: MenuCategory) => {
    if (cat) setSelectedCategory(cat);
    const el = document.getElementById('orbital-wheel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const jumpToFullGrid = () => {
    const el = document.getElementById('full-menu-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-10 text-[#F4F7F0] pb-16">
      {/* Grand Architectural Menu Pavilion Hero Over 3D Culinary Observatory */}
      <section className="min-h-[78vh] pt-28 pb-12 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 p-7 sm:p-10 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#071A10]/88 border border-[#84CC16]/30 shadow-2xl">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A3E635]">
                Flagship 3D Menu · {MENU_ITEMS.length} Dishes · 100% Red-Chilli-Free
              </p>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.04] tracking-tight text-[#F4F7F0]"
                style={{ textWrap: 'balance' }}
              >
                Green Chili&apos;s{' '}
                <span className="italic font-medium text-[#A3E635]">Grand Culinary</span> Menu
                Showcase.
              </h1>
              <p lang="ur" className="font-urdu text-xl sm:text-2xl text-[#EAB308]">
                گرین چلی کا مکمل صحت بخش اور شاہی مینیو — تازہ ہری مرچ و چٹنیوں کے ساتھ
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#C8DDD0] max-w-2xl">
                Spin our full-scale 3D Scroll-Orbiting Menu Wheel below or dive directly into clay
                handis, Karachi Nehari, Roll Parathas, Charcoal BBQ, Stone-Baked Green Pizzas,
                Loaded Hari Mirch Fries, Green Chutneys &amp; Coolers.
              </p>
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => jumpToWheel('All')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span>Spin {MENU_ITEMS.length}-Dish 3D Wheel ·</span>
                    <span lang="ur" className="font-urdu-inline text-sm">
                      گھومتا مینیو
                    </span>
                  </span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={jumpToFullGrid}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#84CC16]/45 bg-[#0B2517]/90 text-xs font-semibold text-[#F4F7F0] hover:border-[#A3E635] transition-colors cursor-pointer"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span>Browse Full {MENU_ITEMS.length}-Dish Catalog ·</span>
                    <span lang="ur" className="font-urdu-inline text-sm text-[#EAB308]">
                      مکمل فہرست
                    </span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A3E635]" />
                </button>
              </div>
            </div>

            {/* Tall Interactive 3-Dish Photography Triptych */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3.5 items-end">
              <button
                type="button"
                onClick={() => jumpToWheel('Handi & Karahi')}
                className="group text-left rounded-t-[110px] rounded-b-2xl p-1.5 border border-[#84CC16]/35 bg-[#081C12]/85 hover:border-[#A3E635] transition-colors cursor-pointer"
              >
                <div className="aspect-[3/4.3] overflow-hidden rounded-t-[100px] rounded-b-xl bg-[#0D2B1C]">
                  <img
                    src="/src/assets/images/khyber_shinwari_karahi_1795251584536.jpg"
                    alt="Clay Handi & Shinwari Karahi"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="pt-2 pb-1 text-center text-[11px] font-medium text-[#C8DDD0] truncate">
                  Clay Handi
                </p>
              </button>

              <button
                type="button"
                onClick={() => jumpToWheel('Pizza, Burgers & Fries')}
                className="group text-left rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-lg rounded-bl-lg p-1.5 border border-[#EAB308]/45 bg-[#081C12]/90 -translate-y-4 hover:border-[#EAB308] transition-colors cursor-pointer shadow-2xl"
              >
                <div className="aspect-[3/4.5] overflow-hidden rounded-tl-[1.85rem] rounded-br-[1.85rem] rounded-tr-md rounded-bl-md bg-[#0D2B1C]">
                  <img
                    src="/src/assets/images/garlic_jalapeno_pizza_1795251691289.jpg"
                    alt="Stone-Baked Green Tikka Pizza"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="pt-2 pb-1 text-center text-[11px] font-semibold text-[#EAB308] truncate">
                  Green Pizza
                </p>
              </button>

              <button
                type="button"
                onClick={() => jumpToWheel('Karachi Specials')}
                className="group text-left rounded-t-[110px] rounded-b-2xl p-1.5 border border-[#84CC16]/35 bg-[#081C12]/85 hover:border-[#A3E635] transition-colors cursor-pointer"
              >
                <div className="aspect-[3/4.3] overflow-hidden rounded-t-[100px] rounded-b-xl bg-[#0D2B1C]">
                  <img
                    src="/src/assets/images/karachi_sabz_nehari_1795251466516.jpg"
                    alt="Karachi Sabz Nehari & Street Classics"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="pt-2 pb-1 text-center text-[11px] font-medium text-[#C8DDD0] truncate">
                  Karachi Rolls
                </p>
              </button>
            </div>
          </div>

          {/* 6 Interactive Category Launch Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {categoryStats.map((cat) => {
              const isSelected = selectedCategory === cat.category;
              return (
                <button
                  key={cat.category}
                  type="button"
                  onClick={() => jumpToWheel(cat.category)}
                  className={`group text-left p-3 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#0C2919]/95 border-[#A3E635] shadow-xl'
                      : 'bg-[#071910]/88 border-[#84CC16]/25 hover:border-[#A3E635]/70'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.category}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm object-cover shrink-0 bg-[#0D2B1C]"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#F4F7F0] truncate">
                      {cat.category}
                    </p>
                    <p lang="ur" className="font-urdu-inline text-xs text-[#A3E635] truncate">
                      {CATEGORY_URDU[cat.category]}
                    </p>
                    <p className="text-[11px] font-mono tabular-nums text-[#EAB308] mt-0.5">
                      {cat.count} · From Rs. {cat.minPrice.toLocaleString()}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flagship Enlarged Scroll-Orbiting 3D Menu Wheel */}
      <OrbitalScrollMenu
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddToCart={onAddToCart}
        onUpdateQty={onUpdateQty}
        cartQuantities={cartQuantities}
        onJumpToGrid={jumpToFullGrid}
      />

      {/* Green Chili Health & Wellness Charter Inside Menu */}
      <HealthBenefitsBand onNavigate={onNavigate} compact />

      {/* Full Searchable, Spotlighted & Filterable 32-Dish Index */}
      <div id="full-menu-grid">
        <MenuSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={onAddToCart}
          onUpdateQty={onUpdateQty}
          cartQuantities={cartQuantities}
        />
      </div>
    </div>
  );
}
