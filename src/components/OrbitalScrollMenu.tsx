import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  MessageCircle,
  Minus,
  Plus,
} from 'lucide-react';
import {
  MENU_ITEMS,
  type MenuCategory,
  type MenuItem,
  type SpiceHeat,
} from '../data/restaurantData';
import { getDishHealthNote } from '../data/healthData';
import { CATEGORY_URDU, DISH_URDU_MAP, SPICE_URDU } from '../data/urduContent';
import { WHATSAPP_RAW_NUMBER } from '../utils/whatsapp';

const CATEGORIES: MenuCategory[] = [
  'All',
  'Handi & Karahi',
  'Karachi Specials',
  'BBQ & Grill',
  'Pizza, Burgers & Fries',
  'Chutneys & Sauces',
  'Drinks & Sides',
];

function getSpiceFlames(spice: SpiceHeat): number {
  if (spice === 'Fiery Hari Mirch') return 3;
  if (spice === 'Zesty Lime') return 2;
  return 1;
}

function buildSingleDishWhatsAppUrl(item: MenuItem): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const lines = [
    '*GREEN CHILI™ — QUICK MENU ORDER*',
    `• Dish: *${item.name}* (${item.urduTag})`,
    `• Price: Rs. ${item.pricePkr.toLocaleString()}`,
    `• Spice: ${item.spice}`,
    `• Dish Photo: ${origin}${item.image}`,
    '',
    'Please confirm preparation time & delivery.',
  ];
  return `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

interface OrbitalScrollMenuProps {
  selectedCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty?: (id: string, delta: number) => void;
  cartQuantities: Record<string, number>;
  onJumpToGrid: () => void;
}

export default function OrbitalScrollMenu({
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onUpdateQty,
  cartQuantities,
  onJumpToGrid,
}: OrbitalScrollMenuProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [floatIndex, setFloatIndex] = useState(0);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const items = useMemo(() => {
    if (selectedCategory === 'All') return MENU_ITEMS;
    return MENU_ITEMS.filter((i) => i.category === selectedCategory);
  }, [selectedCategory]);

  const targetFloatRef = useRef(0);
  const smoothFloatRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Reset orbit position smoothly when category changes
  useEffect(() => {
    smoothFloatRef.current = 0;
    targetFloatRef.current = 0;
    setFloatIndex(0);
  }, [selectedCategory]);

  // High-responsiveness Scroll-to-Orbit mapping
  useEffect(() => {
    const computeTarget = () => {
      setIsMobile(window.innerWidth < 768);
      const el = trackRef.current;
      if (!el || items.length <= 1) {
        targetFloatRef.current = 0;
        return;
      }
      const rect = el.getBoundingClientRect();
      const scrollable = Math.max(1, el.offsetHeight - window.innerHeight);
      const scrolledInside = Math.min(scrollable, Math.max(0, -rect.top));
      const frac = scrolledInside / scrollable;
      targetFloatRef.current = frac * (items.length - 1);
    };

    const tick = () => {
      const diff = targetFloatRef.current - smoothFloatRef.current;
      if (Math.abs(diff) > 0.001) {
        smoothFloatRef.current += diff * 0.22;
        setFloatIndex(smoothFloatRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', computeTarget, { passive: true });
    window.addEventListener('resize', computeTarget, { passive: true });
    computeTarget();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', computeTarget);
      window.removeEventListener('resize', computeTarget);
      cancelAnimationFrame(rafRef.current);
    };
  }, [items.length]);

  const scrollToDishIndex = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(items.length - 1, idx));
    const scrollable = Math.max(1, el.offsetHeight - window.innerHeight);
    const frac = items.length > 1 ? clamped / (items.length - 1) : 0;
    const docTop = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: docTop + frac * scrollable,
      behavior: 'smooth',
    });
  };

  const handleCategoryChange = (cat: MenuCategory) => {
    onSelectCategory(cat);
    const el = trackRef.current;
    if (el) {
      const docTop = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: docTop, behavior: 'smooth' });
    }
  };

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setJustAddedId(item.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === item.id ? null : curr));
    }, 850);
  };

  const activeIdx = Math.min(items.length - 1, Math.max(0, Math.round(floatIndex)));
  const activeItem = items[activeIdx] ?? items[0];

  // Generous scroll depth per dish so spinning feels silky and effortless
  const trackHeightVh = Math.max(195, items.length * 20);

  return (
    <section
      id="orbital-wheel"
      ref={trackRef}
      style={{ height: `${trackHeightVh}vh` }}
      aria-label="Scroll-Orbiting 3D Menu Wheel"
      className="relative z-10"
    >
      <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden py-3 sm:py-5 px-4 sm:px-6 lg:px-10">
        {/* Top Row: Category Orbit Filter + Full Index Jump */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 p-1.5 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#06180E]/92 border border-[#84CC16]/30 shadow-xl">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              const count =
                cat === 'All'
                  ? MENU_ITEMS.length
                  : MENU_ITEMS.filter((m) => m.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3.5 py-1.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#84CC16] text-[#07170F]'
                      : 'text-[#C2D6C9] hover:text-[#F4F7F0]'
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span>{cat} ·</span>
                    <span lang="ur" className="font-urdu-inline text-[13px]">
                      {CATEGORY_URDU[cat]}
                    </span>
                    <span>({count})</span>
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onJumpToGrid}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#84CC16]/35 bg-[#06180E]/90 text-xs font-semibold text-[#A3E635] hover:border-[#A3E635] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Jump to Full {MENU_ITEMS.length}-Dish Catalog</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Grand 3D Cylindrical Orbital Menu Stage */}
        <div
          className="relative flex-1 w-full max-w-[1440px] mx-auto flex items-center justify-center my-1"
          style={{ perspective: '1650px' }}
        >
          {/* Dual Tilted Concentric 3D Brass & Lime Orbital Rings Behind Cards */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute w-[94vw] max-w-[1220px] h-[360px] sm:h-[460px] lg:h-[520px] rounded-[100%] border-2 border-[#EAB308]/25"
            style={{
              transform: `rotateX(73deg) rotateZ(${floatIndex * -16}deg)`,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute w-[76vw] max-w-[920px] h-[270px] sm:h-[360px] rounded-[100%] border border-[#84CC16]/35"
            style={{
              transform: `rotateX(73deg) rotateZ(${floatIndex * 11}deg)`,
            }}
          />

          {/* Orbiting Dish Cards Stage */}
          <div
            className="relative w-full h-[400px] sm:h-[455px] lg:h-[485px] flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {items.map((item, idx) => {
              const delta = idx - floatIndex;
              if (Math.abs(delta) > 3.6) return null;

              const angleRad = delta * 0.5;
              const radiusX = isMobile ? 245 : 540;
              const translateX = Math.sin(angleRad) * radiusX;
              const translateZ = (Math.cos(angleRad) - 1) * 440;
              const translateY = Math.sin(angleRad * 1.35) * -32 + Math.abs(delta) * 16;
              const rotateY = -angleRad * (180 / Math.PI) * 0.84;
              const scale = Math.max(0.58, 1 - Math.abs(delta) * 0.14);
              const opacity = Math.max(0.14, 1 - Math.abs(delta) * 0.27);
              const isFocus = Math.abs(delta) < 0.45;
              const zIndex = Math.round(50 - Math.abs(delta) * 10);

              const qty = cartQuantities[item.id] ?? 0;
              const justAdded = justAddedId === item.id;
              const flames = getSpiceFlames(item.spice);

              return (
                <article
                  key={item.id}
                  onClick={() => {
                    if (!isFocus) scrollToDishIndex(idx);
                  }}
                  style={{
                    transform: `translate3d(${translateX.toFixed(1)}px, ${translateY.toFixed(
                      1
                    )}px, ${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(
                      1
                    )}deg) scale(${scale.toFixed(3)})`,
                    opacity,
                    zIndex,
                  }}
                  className={`absolute w-[305px] sm:w-[420px] lg:w-[485px] rounded-tl-[3.25rem] rounded-br-[3.25rem] rounded-tr-2xl rounded-bl-2xl p-3.5 sm:p-4 border transition-colors ${
                    isFocus
                      ? 'bg-[#071D11]/96 border-[#A3E635] shadow-2xl'
                      : 'bg-[#06150D]/88 border-[#84CC16]/25 cursor-pointer hover:border-[#84CC16]/65'
                  }`}
                >
                  {/* Widescreen Dish Photo sized to keep card footer clearly visible on all laptop heights */}
                  <div className="relative h-[165px] sm:h-[205px] lg:h-[225px] w-full overflow-hidden rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-xl rounded-bl-xl bg-[#0D2B1C]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#071D11]/90 via-[#071D11]/40 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-2 left-3.5 right-3.5 flex items-center justify-between text-xs">
                      <span className="font-mono font-semibold text-[#EAB308] tabular-nums">
                        {String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                      </span>
                      <span className="font-medium text-[#D4E4DA]">{item.category}</span>
                    </div>
                  </div>

                  {/* Typographic Metadata & Unobstructed Order Actions */}
                  <div className="px-2 pt-2.5 pb-1 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#9BB7A6]">
                      <div className="flex items-center gap-2">
                        <span>{item.urduTag}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1 font-mono tabular-nums">
                          <Clock className="w-3 h-3 text-[#84CC16]" />
                          {item.prepTime}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1 text-[#A3E635] font-medium">
                        {Array.from({ length: 3 }).map((_, fIdx) => (
                          <Flame
                            key={fIdx}
                            className={`w-3.5 h-3.5 ${
                              fIdx < flames ? 'text-[#84CC16]' : 'text-white/15'
                            }`}
                          />
                        ))}
                        <span className="ml-0.5 inline-flex items-center gap-1">
                          <span>{item.spice} ·</span>
                          <span lang="ur" className="font-urdu-inline text-[13px]">
                            {SPICE_URDU[item.spice]}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <h3 className="text-lg sm:text-xl font-semibold leading-snug text-[#F4F7F0] line-clamp-1">
                        {item.name}
                      </h3>
                      {DISH_URDU_MAP[item.id] && (
                        <p lang="ur" className="font-urdu-inline text-base sm:text-lg text-[#EAB308] line-clamp-1">
                          {DISH_URDU_MAP[item.id].name}
                        </p>
                      )}
                    </div>

                    <p className="text-[11px] sm:text-xs font-medium text-[#A3E635] line-clamp-1">
                      {getDishHealthNote(item)}
                    </p>

                    <p className="text-xs leading-relaxed text-[#C2D6C9] line-clamp-1 sm:line-clamp-2">
                      {item.description}
                    </p>

                    <div className="pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
                      <p className="text-lg sm:text-xl font-mono font-semibold tabular-nums text-[#EAB308]">
                        Rs. {item.pricePkr.toLocaleString()}
                      </p>

                      {isFocus ? (
                        <div className="flex items-center gap-2">
                          <a
                            href={buildSingleDishWhatsAppUrl(item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="Instant WhatsApp order for this dish"
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#84CC16]/40 bg-[#0B2618] text-xs font-medium text-[#A3E635] hover:border-[#A3E635] transition-colors whitespace-nowrap shrink-0"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">WhatsApp</span>
                          </a>

                          {qty > 0 && onUpdateQty ? (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] overflow-hidden"
                            >
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, -1)}
                                className="px-2.5 py-2 hover:bg-[#65A30D] transition-colors cursor-pointer"
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2.5 text-xs font-mono font-bold tabular-nums">
                                {qty} in Bag
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, 1)}
                                className="px-2.5 py-2 hover:bg-[#65A30D] transition-colors cursor-pointer"
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAdd(item);
                              }}
                              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                justAdded
                                  ? 'bg-[#65A30D] text-[#07170F]'
                                  : 'bg-[#84CC16] text-[#07170F] hover:bg-[#A3E635]'
                              }`}
                            >
                              {justAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Attached to Order</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>{qty > 0 ? `Add (${qty})` : 'Add to Order'}</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-[#A3E635]">
                          Click to spin front
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom Spin Bar & Progress Scrub — sits cleanly below dish cards with zero dock overlap */}
        <div className="max-w-3xl mx-auto w-full mb-1 flex items-center justify-between gap-3 px-4 py-2 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#06180E]/92 border border-[#84CC16]/30 shadow-xl">
          <button
            type="button"
            onClick={() => scrollToDishIndex(activeIdx - 1)}
            disabled={activeIdx <= 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B2517] text-xs font-medium text-[#F4F7F0] disabled:opacity-40 hover:border-[#84CC16] border border-white/10 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            aria-label="Previous dish"
          >
            <ChevronLeft className="w-4 h-4 text-[#A3E635]" />
            <span className="hidden sm:inline">Prev Dish</span>
          </button>

          <div className="flex-1 min-w-0 text-center space-y-1">
            <p className="text-xs sm:text-sm font-medium text-[#F4F7F0] truncate">
              <span className="font-mono text-[#EAB308] tabular-nums mr-2">
                {String(activeIdx + 1).padStart(2, '0')}/{items.length}
              </span>
              {activeItem?.name}
              <span className="hidden md:inline font-mono text-[#A3E635] tabular-nums ml-2">
                · Rs. {activeItem?.pricePkr.toLocaleString()}
              </span>
            </p>
            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[#84CC16] transition-all duration-150"
                style={{
                  width: `${
                    items.length > 1 ? ((floatIndex / (items.length - 1)) * 100).toFixed(1) : 100
                  }%`,
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollToDishIndex(activeIdx + 1)}
            disabled={activeIdx >= items.length - 1}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B2517] text-xs font-medium text-[#F4F7F0] disabled:opacity-40 hover:border-[#84CC16] border border-white/10 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            aria-label="Next dish"
          >
            <span className="hidden sm:inline">Next Dish</span>
            <ChevronRight className="w-4 h-4 text-[#A3E635]" />
          </button>
        </div>
      </div>
    </section>
  );
}
