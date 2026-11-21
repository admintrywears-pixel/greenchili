import { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Sprout,
  XCircle,
} from 'lucide-react';
import {
  HEALTH_BENEFITS,
  PURE_KITCHEN_COMPARISON,
  getDishHealthNote,
  type WellnessCategory,
} from '../../data/healthData';
import { DISH_URDU_MAP, HEALTH_BENEFIT_URDU, WELLNESS_GOAL_URDU } from '../../data/urduContent';
import { MENU_ITEMS, RESTAURANT_IMAGES, type MenuItem } from '../../data/restaurantData';
import type { PageId } from '../../types/navigation';
import { WHATSAPP_DISPLAY_NUMBER } from '../../utils/whatsapp';

const GOALS: WellnessCategory[] = [
  'All Benefits',
  'Immunity & Vitamin C',
  'Gut & Digestion',
  'Metabolism & Energy',
  'Clean Fats & Heart',
];

const FEATURED_HEALTH_DISH_IDS = [
  'gc-handi-chicken',
  'kc-sabz-nehari',
  'gc-surmai-fish',
  'gc-mint-margarita',
  'pz-green-tikka',
  'gc-sabz-kahwa',
];

interface HealthBenefitsPageProps {
  onAddToCart: (item: MenuItem) => void;
  cartQuantities: Record<string, number>;
  onNavigate: (page: PageId) => void;
}

export default function HealthBenefitsPage({
  onAddToCart,
  cartQuantities,
  onNavigate,
}: HealthBenefitsPageProps) {
  const [activeGoal, setActiveGoal] = useState<WellnessCategory>('All Benefits');

  const visibleBenefits = useMemo(() => {
    if (activeGoal === 'All Benefits') return HEALTH_BENEFITS;
    return HEALTH_BENEFITS.filter((b) => b.goal === activeGoal);
  }, [activeGoal]);

  const featuredHealthDishes = useMemo(() => {
    return FEATURED_HEALTH_DISH_IDS.map((id) => MENU_ITEMS.find((m) => m.id === id)).filter(
      Boolean
    ) as MenuItem[];
  }, []);

  return (
    <div className="relative z-10 text-[#F4F7F0] pb-20">
      {/* STAGE 01: Full-Presence Health Brand Manifesto Over 3D Double-Helix Sanctuary */}
      <section className="min-h-[82vh] pt-28 pb-14 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 p-7 sm:p-10 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#071A10]/88 border border-[#84CC16]/30 shadow-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A3E635]">
              Complete Nutritional Philosophy · Zero Red Chilli Kitchen
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-[#F4F7F0]"
              style={{ textWrap: 'balance' }}
            >
              Not Just Delicious Food. A Complete{' '}
              <span className="italic font-medium text-[#A3E635]">Health &amp; Vitality</span>{' '}
              Brand.
            </h1>
            <p lang="ur" className="font-urdu text-xl sm:text-2xl text-[#EAB308]">
              صرف لذیذ کھانا نہیں — مکمل صحت، قدرتی وٹامنز اور خالص ہری مرچ کا برانڈ
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-[#C8DDD0] max-w-2xl">
              Fresh raw green chillies deliver 3x more Vitamin C than oranges, boost natural
              metabolism with capsaicin, and nourish immunity—without the gastric burning, bleached
              seed oils, or red-powder adulterants hidden inside conventional fast food and
              restaurant curries.
            </p>
            <p lang="ur" className="font-urdu-body text-sm text-[#B7CEBF] max-w-2xl">
              تازہ ہری مرچ معدے کی تیزابیت پیدا کیے بغیر قوتِ مدافعت، ہاضمہ اور میٹابولزم کو مضبوط
              بناتی ہے۔ ہمارے کچن میں ریفائنڈ سیڈ آئل، لال مرچ یا کیچپ بالکل استعمال نہیں ہوتا۔
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/10">
              <div>
                <p className="font-display italic text-2xl sm:text-3xl font-semibold text-[#A3E635] tabular-nums">
                  242 mg
                </p>
                <p className="text-xs text-[#9BB7A6]">Vitamin C / 100g Fresh Chili</p>
              </div>
              <div>
                <p className="font-display italic text-2xl sm:text-3xl font-semibold text-[#EAB308] tabular-nums">
                  0%
                </p>
                <p className="text-xs text-[#9BB7A6]">Red Powder &amp; Seed Oils</p>
              </div>
              <div>
                <p className="font-display italic text-2xl sm:text-3xl font-semibold text-[#A3E635] tabular-nums">
                  100%
                </p>
                <p className="text-xs text-[#9BB7A6]">Alkaline Clay &amp; Whole Herbs</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
              >
                <span>Order Health-Crafted Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={`https://wa.me/923185519151?text=${encodeURIComponent(
                  'Hello Green Chili Wellness Desk, please recommend healthy zero-red-chilli meals for my family.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#84CC16]/45 bg-[#081C12]/90 text-xs font-medium text-[#F4F7F0] hover:border-[#A3E635] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>Meal Guidance on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-t-[200px] rounded-b-3xl p-2.5 border border-[#84CC16]/35 bg-[#071A10]/85 shadow-2xl">
              <div className="rounded-t-[190px] rounded-b-2xl overflow-hidden aspect-[4/4.2] bg-[#0D2B1C]">
                <img
                  src={RESTAURANT_IMAGES.stage2}
                  alt="Living green chillies, fresh mint, and antioxidant herbs in emerald mist"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE 02: Interactive Goal Filter & 6 Clinical-Backed Green Chilli Benefits */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#A3E635]">
              Science of Clean Desi Spice
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#F4F7F0]">
              Six Proven Benefits Inside Every Meal
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#06180E]/92 border border-[#84CC16]/25">
            {GOALS.map((goal) => {
              const active = activeGoal === goal;
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setActiveGoal(goal)}
                  className={`px-3.5 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#84CC16] text-[#07170F]'
                      : 'text-[#C2D6C9] hover:text-[#F4F7F0]'
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span>{goal} ·</span>
                    <span lang="ur" className="font-urdu-inline text-[13px]">
                      {WELLNESS_GOAL_URDU[goal]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleBenefits.map((b, i) => {
            const Icon = [ShieldCheck, HeartPulse, Sparkles, Sprout, HeartPulse, ShieldCheck][
              i % 6
            ];
            return (
              <article
                key={b.id}
                className="rounded-tl-[2.75rem] rounded-br-[2.75rem] rounded-tr-xl rounded-bl-xl bg-[#071A10]/92 border border-[#84CC16]/25 p-7 flex flex-col justify-between space-y-5 shadow-2xl"
              >
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-display italic text-3xl font-semibold text-[#A3E635] tabular-nums">
                      {b.num}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#EAB308]">
                      <Icon className="w-3.5 h-3.5" />
                      {b.goal}
                    </span>
                  </div>

                  <div className="pt-1">
                    <p className="text-2xl font-mono font-semibold tabular-nums text-[#EAB308]">
                      {b.metric}{' '}
                      <span className="text-xs font-sans font-normal text-[#9BB7A6]">
                        {b.unit}
                      </span>
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold leading-snug text-[#F4F7F0]">{b.title}</h3>
                  {HEALTH_BENEFIT_URDU[b.id] && (
                    <p lang="ur" className="font-urdu text-base text-[#EAB308]">
                      {HEALTH_BENEFIT_URDU[b.id].title}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed text-[#C2D6C9]">{b.summary}</p>
                  {HEALTH_BENEFIT_URDU[b.id] && (
                    <p lang="ur" className="font-urdu-body text-xs sm:text-sm text-[#B7CEBF]">
                      {HEALTH_BENEFIT_URDU[b.id].summary}
                    </p>
                  )}
                </div>

                <p className="pt-4 border-t border-white/10 text-xs leading-relaxed text-[#9BB7A6]">
                  {b.scienceNote}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* STAGE 03: Green Chili Health Kitchen vs Ordinary Commercial Restaurants */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-2xl rounded-br-2xl bg-[#071A10]/92 border border-[#84CC16]/30 p-7 sm:p-11 shadow-2xl space-y-8">
          <div className="space-y-2 max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#A3E635]">
              Ingredient Transparency Audit
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#F4F7F0]">
              Why Families Switch From Ordinary Kitchens to Green Chili
            </h2>
          </div>

          <div className="divide-y divide-white/10">
            {PURE_KITCHEN_COMPARISON.map((row) => (
              <div
                key={row.pillar}
                className="py-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
              >
                <div className="lg:col-span-3">
                  <p className="text-sm font-semibold text-[#EAB308]">{row.pillar}</p>
                </div>
                <div className="lg:col-span-5 flex items-start gap-2.5 text-sm text-[#F4F7F0]">
                  <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0 mt-0.5" />
                  <span>{row.greenChiliStandard}</span>
                </div>
                <div className="lg:col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-[#9BB7A6]">
                  <XCircle className="w-4 h-4 text-[#6B8776] shrink-0 mt-0.5" />
                  <span>{row.ordinaryRestaurant}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAGE 04: Top Nutrition-Forward Dishes Ready to Attach to Your Order */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#A3E635]">
              Nutritionist&apos;s Daily Plate Picks
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#F4F7F0]">
              Healthy Green-Chilli Signatures You Can Order Now
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('orders')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Open Orders &amp; WhatsApp ({WHATSAPP_DISPLAY_NUMBER})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {featuredHealthDishes.map((dish) => {
            const qty = cartQuantities[dish.id] ?? 0;
            return (
              <article
                key={dish.id}
                className="rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl bg-[#071A10]/92 border border-[#84CC16]/25 p-4 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="aspect-[16/10] rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg overflow-hidden bg-[#0D2B1C]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-medium text-[#A3E635]">{getDishHealthNote(dish)}</p>
                  <h3 className="text-lg font-semibold text-[#F4F7F0]">{dish.name}</h3>
                  {DISH_URDU_MAP[dish.id] && (
                    <p lang="ur" className="font-urdu text-base text-[#EAB308]">
                      {DISH_URDU_MAP[dish.id].name}
                    </p>
                  )}
                  <p className="text-xs leading-relaxed text-[#C2D6C9]">{dish.description}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="font-mono text-base font-semibold tabular-nums text-[#EAB308]">
                    Rs. {dish.pricePkr.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => onAddToCart(dish)}
                    className="px-4 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
                  >
                    {qty > 0 ? `Attached (${qty})` : 'Add Healthy Dish'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
