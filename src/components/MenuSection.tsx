import { useMemo, useState } from 'react';
import {
  Check,
  Clock,
  Flame,
  MessageCircle,
  Minus,
  Plus,
  Search,
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

const HEAT_LEVELS: Array<'All Heat' | SpiceHeat> = [
  'All Heat',
  'Mild Green',
  'Zesty Lime',
  'Fiery Hari Mirch',
];

function getSpiceFlames(spice: SpiceHeat): number {
  if (spice === 'Fiery Hari Mirch') return 3;
  if (spice === 'Zesty Lime') return 2;
  return 1;
}

function buildQuickDishUrl(item: MenuItem): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const msg = [
    '*GREEN CHILI™ — DIRECT DISH ORDER*',
    `• Dish: *${item.name}* (${item.urduTag})`,
    `• Price: Rs. ${item.pricePkr.toLocaleString()}`,
    `• Spice Level: ${item.spice}`,
    `• Dish Photo: ${origin}${item.image}`,
    '',
    'Please confirm delivery availability.',
  ].join('\n');
  return `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(msg)}`;
}

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty?: (id: string, delta: number) => void;
  cartQuantities: Record<string, number>;
  selectedCategory?: MenuCategory;
  onSelectCategory?: (category: MenuCategory) => void;
}

export default function MenuSection({
  onAddToCart,
  onUpdateQty,
  cartQuantities,
  selectedCategory: controlledCategory,
  onSelectCategory,
}: MenuSectionProps) {
  const [internalCategory, setInternalCategory] = useState<MenuCategory>('All');
  const [selectedHeat, setSelectedHeat] = useState<'All Heat' | SpiceHeat>('All Heat');
  const [query, setQuery] = useState('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const selectedCategory = controlledCategory ?? internalCategory;
  const setCategory = (cat: MenuCategory) => {
    if (onSelectCategory) onSelectCategory(cat);
    else setInternalCategory(cat);
  };

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (selectedHeat !== 'All Heat' && item.spice !== selectedHeat) return false;
      if (
        q &&
        !item.name.toLowerCase().includes(q) &&
        !item.urduTag.toLowerCase().includes(q) &&
        !item.description.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedHeat, query]);

  const spotlightItem = useMemo(() => {
    return filteredItems.find((i) => i.featured) ?? filteredItems[0] ?? null;
  }, [filteredItems]);

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setJustAddedId(item.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === item.id ? null : curr));
    }, 900);
  };

  return (
    <div className="relative z-10 text-[#F4F7F0]">
      {/* Zero Red Chilli Promise: Asymmetric Leaf-Curved Architectural Pavilion */}
      <section id="our-promise" className="py-16" aria-label="Our Red-Chilli-Free Promise">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl bg-[#071B11]/90 border border-[#84CC16]/30 p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
              <div className="lg:col-span-7 space-y-3">
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#A3E635]">
                  Pakistani Culinary Purity
                </p>
                <h2
                  className="text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight leading-tight text-[#F4F7F0]"
                  style={{ textWrap: 'balance' }}
                >
                  Every Dish Cooked Fresh in Green Chillies,{' '}
                  <span className="italic font-medium text-[#A3E635]">Never</span> Red Powder.
                </h2>
              </div>
              <p className="lg:col-span-5 text-sm sm:text-base leading-relaxed text-[#C2D6C9]">
                From heirloom clay handis, Karachi Beef Nehari, Burns Road Katakat, and Roll
                Parathas to stone-baked Green Tikka Pizza and Loaded Hari Mirch Fries, every plate
                is 100% red-chilli-free.
              </p>
            </div>

            {/* Minimalist Botanical Branch Divider */}
            <div className="flex items-center gap-4 pb-8" aria-hidden="true">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#84CC16]/40 to-transparent" />
              <svg width="26" height="16" viewBox="0 0 26 16" fill="none" className="text-[#84CC16]">
                <path
                  d="M1 8C6 2 11 2 13 8C15 14 20 14 25 8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="13" cy="8" r="2.2" fill="#EAB308" />
              </svg>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#84CC16]/40 to-transparent" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-display italic font-semibold tabular-nums text-[#A3E635]">
                  0%
                </p>
                <p className="text-sm font-semibold text-[#F4F7F0]">Red Chilli or Ketchup</p>
                <p className="text-xs text-[#9BB7A6]">Zero lal mirch across all 3 kitchens</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-display italic font-semibold tabular-nums text-[#A3E635]">
                  100%
                </p>
                <p className="text-sm font-semibold text-[#F4F7F0]">Daily Fresh Hari Mirch</p>
                <p className="text-xs text-[#9BB7A6]">Sourced morning-fresh from Sindh farms</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-display italic font-semibold tabular-nums text-[#A3E635]">
                  4-Stage
                </p>
                <p className="text-sm font-semibold text-[#F4F7F0]">Clay Handi Craft</p>
                <p className="text-xs text-[#9BB7A6]">Slow-simmered in unglazed terracotta</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-display italic font-semibold tabular-nums text-[#A3E635]">
                  {MENU_ITEMS.length}
                </p>
                <p className="text-sm font-semibold text-[#F4F7F0]">
                  Karachi, Handi &amp; Fast Food Dishes
                </p>
                <p className="text-xs text-[#9BB7A6]">Nehari, Rolls, Pizza, Fries &amp; Drinks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Menu Catalog with Grand Controls, Spotlight & Large Dish Cards */}
      <section id="menu" className="max-w-7xl mx-auto px-6 lg:px-10 py-14 sm:py-20 space-y-12">
        <div className="rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-2xl rounded-br-2xl bg-[#071910]/90 border border-[#84CC16]/30 p-7 sm:p-11 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#A3E635]">
                  Green Chilli Grand Kitchen Menu · {filteredItems.length} Matching Dishes
                </p>
                <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F7F0]">
                  Karachi Specials, Handi, Pizza &amp; Chutneys
                </h2>
                <p lang="ur" className="font-urdu text-lg sm:text-2xl text-[#EAB308]">
                  شاہی سبز ہانڈی، کراچی اسپیشلز، گرین پیزا، فرائز اور تازہ ہری چٹنیاں
                </p>
              </div>

              <div className="relative w-full lg:w-80 shrink-0">
                <Search className="w-4 h-4 text-[#9BB7A6] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search nehari, chutney, pizza, fries..."
                  aria-label="Search menu items"
                  className="w-full pl-11 pr-4 py-3 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md bg-[#0D2619] border border-white/15 text-sm text-[#F4F7F0] placeholder:text-[#789684] focus:outline-none focus:border-[#84CC16]"
                />
              </div>
            </div>

            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#05120B] rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md border border-white/10">
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
                      onClick={() => setCategory(cat)}
                      className={`px-3.5 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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

              <div className="flex flex-wrap items-center gap-1.5">
                {HEAT_LEVELS.map((heat) => {
                  const active = selectedHeat === heat;
                  return (
                    <button
                      key={heat}
                      type="button"
                      onClick={() => setSelectedHeat(heat)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#65A30D] text-[#07170F] font-semibold border-[#84CC16]'
                          : 'bg-[#0D2619] text-[#C2D6C9] border-white/15 hover:border-[#84CC16]'
                      }`}
                    >
                      {heat !== 'All Heat' && <Flame className="w-3.5 h-3.5" />}
                      <span className="inline-flex items-center gap-1.5">
                        <span>{heat} ·</span>
                        <span lang="ur" className="font-urdu-inline text-[13px]">
                          {SPICE_URDU[heat]}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
        </div>

        {/* Chef's Highlight Spotlight Showcase Card (2-column balanced full-height photo split) */}
        {spotlightItem && (
          <article className="rounded-tl-[3.75rem] rounded-br-[3.75rem] rounded-tr-2xl rounded-bl-2xl bg-[#071B11]/94 border border-[#EAB308]/35 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 relative min-h-[270px] sm:min-h-[340px] bg-[#0D2B1C]">
              <img
                src={spotlightItem.image}
                alt={spotlightItem.name}
                referrerPolicy="no-referrer"
                className="w-full h-full lg:h-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071B11]/75 via-transparent to-transparent"
                aria-hidden="true"
              />
              <span className="absolute bottom-4 left-5 text-xs font-mono uppercase tracking-[0.16em] text-[#EAB308]">
                Chef&apos;s Signature Spotlight · {spotlightItem.category}
              </span>
            </div>

            <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#A3E635]">
                  <span className="font-medium">{spotlightItem.urduTag}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 font-mono tabular-nums text-[#C2D6C9]">
                    <Clock className="w-3.5 h-3.5 text-[#84CC16]" />
                    {spotlightItem.prepTime}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Flame
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < getSpiceFlames(spotlightItem.spice)
                            ? 'text-[#84CC16]'
                            : 'text-white/15'
                        }`}
                      />
                    ))}
                    <span className="ml-0.5 font-medium">{spotlightItem.spice}</span>
                  </span>
                </div>

                <h3
                  className="text-2xl sm:text-4xl font-semibold leading-tight text-[#F4F7F0]"
                  style={{ textWrap: 'balance' }}
                >
                  {spotlightItem.name}
                </h3>

                {DISH_URDU_MAP[spotlightItem.id] && (
                  <p lang="ur" className="font-urdu text-xl sm:text-2xl text-[#EAB308]">
                    {DISH_URDU_MAP[spotlightItem.id].name}
                  </p>
                )}

                <p className="text-xs sm:text-sm font-semibold text-[#A3E635]">
                  Health Focus: {getDishHealthNote(spotlightItem)}
                </p>

                <p className="text-sm sm:text-base leading-relaxed text-[#C8DDD0]">
                  {spotlightItem.description}
                </p>
                {DISH_URDU_MAP[spotlightItem.id] && (
                  <p lang="ur" className="font-urdu-body text-sm text-[#B7CEBF]">
                    {DISH_URDU_MAP[spotlightItem.id].tagline}
                  </p>
                )}
              </div>

              <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#9BB7A6]">Chef Serving Price</p>
                  <p className="text-2xl sm:text-3xl font-mono font-semibold tabular-nums text-[#EAB308]">
                    Rs. {spotlightItem.pricePkr.toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={buildQuickDishUrl(spotlightItem)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#84CC16]/40 bg-[#0B2618] text-xs font-semibold text-[#A3E635] hover:border-[#A3E635] transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Order on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleAdd(spotlightItem)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>
                      {(cartQuantities[spotlightItem.id] ?? 0) > 0
                        ? `In Bag (${cartQuantities[spotlightItem.id]}) — Add More`
                        : 'Add Spotlight to Order'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Monumental Leaf-Silhouette Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center rounded-tl-[3rem] rounded-br-[3rem] border border-white/15 bg-[#081C12]/90 space-y-3">
            <p className="text-base font-semibold text-[#F4F7F0]">
              No dishes match your current filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('All');
                setSelectedHeat('All Heat');
                setQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
            >
              Reset Menu Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-9">
            {filteredItems.map((item) => {
              const qty = cartQuantities[item.id] ?? 0;
              const justAdded = justAddedId === item.id;
              const imgFailed = brokenImages[item.id];
              const flames = getSpiceFlames(item.spice);

              return (
                <article
                  key={item.id}
                  className="group flex flex-col rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl bg-[#071A10]/94 border border-[#84CC16]/25 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[#A3E635]/70 shadow-2xl"
                >
                  {/* Large Inset Organic Leaf-Curved Photo Frame */}
                  <div className="relative aspect-[4/3] w-full bg-[#133826] overflow-hidden rounded-tl-[2.35rem] rounded-br-[2.35rem] rounded-tr-lg rounded-bl-lg">
                    {!imgFailed ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setBrokenImages((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0D2B1D] to-[#1D4E32] text-[#E5F2DC]">
                        <span className="text-sm font-display font-semibold">{item.name}</span>
                        <span className="text-xs text-[#A3E635] mt-1">{item.urduTag}</span>
                      </div>
                    )}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#071A10]/85 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-medium text-[#D4E4DA]">
                      <span>{item.category}</span>
                      <span className="font-mono tabular-nums text-[#EAB308]">{item.prepTime}</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between px-2 pt-4 pb-1 space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2 text-xs text-[#9BB7A6]">
                        <span className="truncate">{item.urduTag}</span>
                        <span className="inline-flex items-center gap-1 shrink-0 text-[#A3E635] font-medium">
                          {Array.from({ length: 3 }).map((_, fIdx) => (
                            <Flame
                              key={fIdx}
                              className={`w-3 h-3 ${
                                fIdx < flames ? 'text-[#84CC16]' : 'text-white/15'
                              }`}
                            />
                          ))}
                          <span className="ml-0.5">{item.spice}</span>
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold leading-snug text-[#F4F7F0]">
                        {item.name}
                      </h3>

                      {DISH_URDU_MAP[item.id] && (
                        <p lang="ur" className="font-urdu text-lg text-[#EAB308]">
                          {DISH_URDU_MAP[item.id].name}
                        </p>
                      )}

                      <p className="text-xs font-medium text-[#A3E635]">
                        {getDishHealthNote(item)}
                      </p>

                      <p className="text-sm leading-relaxed text-[#C2D6C9]">
                        {item.description}
                      </p>
                      {DISH_URDU_MAP[item.id] && (
                        <p lang="ur" className="font-urdu-body text-xs text-[#B7CEBF]">
                          {DISH_URDU_MAP[item.id].tagline}
                        </p>
                      )}
                    </div>

                    <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2.5">
                      <p className="text-lg font-mono font-semibold tabular-nums text-[#EAB308]">
                        Rs. {item.pricePkr.toLocaleString()}
                      </p>

                      {qty > 0 && onUpdateQty ? (
                        <div className="inline-flex items-center rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] overflow-hidden">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="px-2.5 py-2 hover:bg-[#65A30D] transition-colors cursor-pointer"
                            aria-label={`Remove one ${item.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-bold tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="px-2.5 py-2 hover:bg-[#65A30D] transition-colors cursor-pointer"
                            aria-label={`Add one more ${item.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAdd(item)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            justAdded
                              ? 'bg-[#65A30D] text-[#07170F]'
                              : 'bg-[#84CC16] text-[#07170F] hover:bg-[#A3E635]'
                          }`}
                        >
                          {justAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>{qty > 0 ? `Add Another (${qty})` : 'Add to Order'}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
