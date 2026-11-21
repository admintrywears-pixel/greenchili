import { ArrowDown } from 'lucide-react';
import { HANDI_STEPS, MENU_ITEMS, RESTAURANT_IMAGES } from '../data/restaurantData';
import { CHAPTER_URDU_MAP } from '../data/urduContent';

interface WalkthroughChaptersProps {
  activeStage: number;
  onJumpToMenu: () => void;
}

const STEP_IMAGES = [
  RESTAURANT_IMAGES.stage1,
  RESTAURANT_IMAGES.stage2,
  RESTAURANT_IMAGES.stage3,
  RESTAURANT_IMAGES.stage4,
];

// Distinct brand-native sculptural shapes per culinary stage (Arch, Organic Pebble, Slanted Leaf, Chamfered Crest)
const STAGE_FRAME_STYLES = [
  {
    wrapper: 'rounded-[46%_54%_42%_58%/52%_42%_58%_48%] p-2.5 border border-[#EAB308]/35 bg-[#081C12]/70',
    img: 'rounded-[45%_55%_41%_59%/51%_41%_59%_49%]',
    card: 'rounded-tl-[3.25rem] rounded-br-[3.25rem] rounded-tr-xl rounded-bl-xl',
  },
  {
    wrapper: 'p-2 border border-[#84CC16]/40 bg-[#081C12]/70 rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-lg rounded-br-lg',
    img: 'rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-md rounded-br-md',
    card: 'rounded-tr-[3.25rem] rounded-bl-[3.25rem] rounded-tl-xl rounded-br-xl',
  },
  {
    wrapper: 'rounded-t-[200px] rounded-b-3xl p-2.5 border border-[#D4A373]/40 bg-[#081C12]/70',
    img: 'rounded-t-[190px] rounded-b-2xl',
    card: 'rounded-tl-[3.25rem] rounded-br-[3.25rem] rounded-tr-xl rounded-bl-xl',
  },
  {
    wrapper: 'p-2.5 border border-[#A3E635]/40 bg-[#081C12]/70 rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl',
    img: 'rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl',
    card: 'rounded-tr-[3.25rem] rounded-bl-[3.25rem] rounded-tl-xl rounded-br-xl',
  },
];

export default function WalkthroughChapters({
  activeStage,
  onJumpToMenu,
}: WalkthroughChaptersProps) {
  const scrollToChapters = () => {
    document.getElementById('chapter-1')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="handi-walkthrough" className="relative z-10">
      {/* Opening Hero: Unboxed editorial typography on left + Sculpted Pakistani Mehrab Arch Dish Showcase on right */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[68%] bg-gradient-to-r from-[#04110A]/88 via-[#04110A]/62 to-transparent"
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Minimal botanical hairline ornament */}
              <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#A3E635]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="text-[#84CC16] shrink-0"
                >
                  <path
                    d="M17 3C11 4 6 9 5 16C5 19 7 21 10 21C16 20 20 14 21 7C21 4.5 19.5 3 17 3Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M19 5C14 9 10 14 8 20"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Pakistan&apos;s Complete Green Chilli Health Kitchen</span>
              </div>

              <h1
                className="text-4xl sm:text-6xl lg:text-[4.15rem] font-semibold leading-[1.03] tracking-tight text-[#F4F7F0] drop-shadow-[0_4px_24px_rgba(3,12,7,0.92)]"
                style={{ textWrap: 'balance' }}
              >
                Pure Green Flame.{' '}
                <span className="italic font-medium text-[#A3E635]">Zero</span> Red Chilli. Built
                for Health.
              </h1>

              <p
                lang="ur"
                className="font-urdu text-2xl sm:text-[1.7rem] font-semibold text-[#FDE047] drop-shadow-[0_3px_14px_rgba(2,10,5,0.98)] leading-[2.2]"
              >
                خالص ہری مرچ کا ذائقہ — لال مرچ سے مکمل پاک، صحت کا ضامن
              </p>

              <p className="text-base sm:text-lg leading-relaxed text-[#E1EFE6] max-w-xl drop-shadow-[0_2px_12px_rgba(3,12,7,0.95)]">
                Fresh green chillies carry 3x the Vitamin C of oranges and boost natural metabolism
                with zero gastric acidity. Enjoy clay handis, Karachi Nehari, Roll Parathas,
                Stone-Baked Pizzas &amp; Loaded Fries cooked only in pure desi ghee, herbs, and living
                green spice.
              </p>

              <p
                lang="ur"
                className="font-urdu-body text-sm sm:text-base text-[#D4E4DA] max-w-xl drop-shadow-[0_2px_10px_rgba(2,10,5,0.95)]"
              >
                تازہ ہری مرچ، خالص دیسی گھی، ہرا دھنیا اور پودینہ — مٹی کی ہانڈی، کراچی اسپیشلز، پیزا،
                فرائز اور گرین چٹنیوں کا مکمل صحت بخش ذائقہ۔
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={scrollToChapters}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#84CC16] text-[#07170F] text-sm font-semibold hover:bg-[#A3E635] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span>Scroll Story ·</span>
                    <span lang="ur" className="font-urdu-inline text-[15px]">
                      کہانی دیکھیں
                    </span>
                  </span>
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onJumpToMenu}
                  className="inline-flex items-center px-6 py-3 rounded-tr-2xl rounded-bl-2xl rounded-tl-md rounded-br-md border border-[#84CC16]/45 bg-[#081C12]/88 text-[#F4F7F0] text-sm font-medium hover:border-[#A3E635] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span>Explore {MENU_ITEMS.length} Dishes ·</span>
                    <span lang="ur" className="font-urdu-inline text-[15px] text-[#EAB308]">
                      مکمل مینیو
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* Right: Sculpted Pakistani Mehrab Arch Showcase Frame + Overlapping Leaf Inset */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* Decorative outer architectural arch hairline */}
                <div
                  className="rounded-t-[210px] rounded-b-[2rem] p-3 border border-[#84CC16]/35 bg-[#071A10]/82 shadow-2xl"
                >
                  <div className="rounded-t-[198px] rounded-b-[1.5rem] overflow-hidden aspect-[4/4.3] bg-[#0D2B1C]">
                    <img
                      src={RESTAURANT_IMAGES.handi}
                      alt="Green Chilli Signature Clay Handi with fresh green chillies and coriander"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-4 pt-4 pb-2 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-wider text-[#A3E635]">
                        House Specialty
                      </p>
                      <p className="font-display text-lg font-semibold text-[#F4F7F0]">
                        Sabz Makhni Chicken Handi
                      </p>
                    </div>
                    <p className="text-sm font-mono font-medium tabular-nums text-[#EAB308] shrink-0">
                      Rs. 1,950
                    </p>
                  </div>
                </div>

                {/* Overlapping Leaf-Shaped Mini Dish Frame */}
                <div className="hidden sm:block absolute -left-8 bottom-14 w-36 rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-lg rounded-bl-lg p-1.5 bg-[#07170F]/95 border border-[#EAB308]/45 shadow-2xl">
                  <img
                    src={RESTAURANT_IMAGES.karachiStreet}
                    alt="Karachi Lachha Roll Paratha and Broast"
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[4/3] object-cover rounded-tl-[1.85rem] rounded-br-[1.85rem] rounded-tr-md rounded-bl-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Sculptural Culinary Chapters Floating Over the Live Morphing 3D World */}
      <section
        className="py-10 sm:py-20 space-y-24 sm:space-y-36"
        aria-label="4-Stage Culinary Process"
      >
        {HANDI_STEPS.map((step, index) => {
          const isEven = index % 2 === 1;
          const isCurrent = activeStage === step.id;
          const shapes = STAGE_FRAME_STYLES[index] ?? STAGE_FRAME_STYLES[0];

          return (
            <div
              key={step.id}
              id={`chapter-${step.id}`}
              className="max-w-7xl mx-auto px-6 lg:px-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Narrative Column with Oversized Editorial Serif Index & Leaf-Curved Surface */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <article
                    className={`relative p-7 sm:p-10 bg-[#071910]/86 border transition-colors duration-300 space-y-4 ${
                      shapes.card
                    } ${isCurrent ? 'border-[#84CC16]/55' : 'border-white/12'}`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display italic text-4xl sm:text-5xl font-semibold text-[#84CC16]/90 leading-none tabular-nums">
                        {step.stepNumber}
                      </span>
                      <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-[#B7CEBF]">
                        <span>{step.heatTemp}</span>
                        <span aria-hidden="true">·</span>
                        <span>{step.duration}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <h2
                        className="text-2xl sm:text-4xl font-semibold leading-tight text-[#F4F7F0]"
                        style={{ textWrap: 'balance' }}
                      >
                        {step.title}
                      </h2>
                      <p className="text-sm font-medium text-[#A3E635]">{step.subtitle}</p>
                      {CHAPTER_URDU_MAP[step.id] && (
                        <p lang="ur" className="font-urdu text-lg sm:text-xl text-[#EAB308] pt-1">
                          {CHAPTER_URDU_MAP[step.id].title}
                        </p>
                      )}
                    </div>

                    <p className="text-sm sm:text-base leading-relaxed text-[#C2D6C9]">
                      {step.description}
                    </p>
                    {CHAPTER_URDU_MAP[step.id] && (
                      <p lang="ur" className="font-urdu-body text-sm text-[#B7CEBF]">
                        {CHAPTER_URDU_MAP[step.id].summary}
                      </p>
                    )}

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                      <p className="text-xs font-medium text-[#97B4A2]">
                        {step.keyIngredients.join(' · ')}
                      </p>
                    </div>
                  </article>
                </div>

                {/* Sculpted Organic Image Column */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className={`${shapes.wrapper} shadow-2xl`}>
                    <div className={`aspect-[4/3] w-full overflow-hidden bg-[#0D2B1C] ${shapes.img}`}>
                      <img
                        src={STEP_IMAGES[index]}
                        alt={step.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
