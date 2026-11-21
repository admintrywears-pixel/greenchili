import { ArrowRight } from 'lucide-react';
import { RESTAURANT_IMAGES } from '../../data/restaurantData';
import type { PageId } from '../../types/navigation';

interface StoryPageProps {
  onNavigate: (page: PageId) => void;
}

const HARVEST_JOURNEY = [
  {
    num: '01',
    time: '05:30 AM · Mirpurkhas & Kunri',
    title: 'Dawn Green Chilli Picking',
    body: 'Young, crisp Sindh hari mirch pods are harvested before midday sun softens their essential oils—ensuring vibrant herbal spice without dried red powder.',
    align: 'left' as const,
  },
  {
    num: '02',
    time: '08:15 AM · Sil-Batta Grinding',
    title: 'Basalt Stone Wet Masala',
    body: 'Whole green chillies, garden coriander stems, Swat wild mint, and garlic cloves are crushed slowly on heavy basalt stone so chlorophyll stays bright.',
    align: 'right' as const,
  },
  {
    num: '03',
    time: '10:00 AM · 12-Hour Tenderizing',
    title: 'Raw Papaya & Mint Marinade',
    body: 'Every skewer of Hariyali Tikka and Behari Beef rests in green papaya, cold-pressed mustard oil, and yogurt—zero artificial tenderizers or red dyes.',
    align: 'left' as const,
  },
  {
    num: '04',
    time: '12:00 PM · Multani Hearth Seal',
    title: 'Clay Handi & Charcoal Fire',
    body: 'Seasoned unglazed terracotta pots hold steady charcoal heat while balancing acidity, locking emerald aroma right until the clay lid lifts at your table.',
    align: 'right' as const,
  },
];

const GREEN_PANTRY = [
  {
    index: '01',
    name: 'Sindh Desi Hari Mirch',
    origin: 'Mirpurkhas & Kunri Farms',
    role: 'Primary Heat & Aroma',
    detail:
      'Picked young at peak chlorophyll crispness for bright, clean heat without harsh red-powder bitterness.',
  },
  {
    index: '02',
    name: 'Wild Mountain Pudina',
    origin: 'Swat & Potohar Valleys',
    role: 'Cooling Finish',
    detail:
      'Stone-ground fresh every morning with coriander stems for chutneys, seekh marinades, and mint margaritas.',
  },
  {
    index: '03',
    name: 'Green Cardamom (Elaichi)',
    origin: 'Whole Roasted Pods',
    role: 'Mughlai Perfume',
    detail:
      'Cracked straight into sizzling desi ghee during Stage 01 tempering and slow-brewed into brass kahwa.',
  },
  {
    index: '04',
    name: 'Garden Coriander & Roots',
    origin: 'Hand-Chopped Daily',
    role: 'Velvet Body',
    detail:
      'Tender stems give our handi gravies natural emerald depth while leaves garnish every clay pot tableside.',
  },
  {
    index: '05',
    name: 'Cracked White Peppercorn',
    origin: 'Coarse Mortar Grind',
    role: 'Warm Backbone',
    detail:
      'Provides subtle lingering warmth in our Peshawari Karahi, Malai Boti, and Karachi Beef Nehari.',
  },
  {
    index: '06',
    name: 'Fresh Kagzi Lime & Makhan',
    origin: 'Tableside Squeeze',
    role: 'Citrus Lift',
    detail:
      'Every dish is crowned with freshly squeezed green lime juice and cultured butter—zero artificial vinegar.',
  },
];

export default function StoryPage({ onNavigate }: StoryPageProps) {
  return (
    <div className="relative z-10 text-[#F4F7F0] pb-20">
      {/* STAGE 01: Full-Viewport Story Manifesto Over Living Botanical Ocean */}
      <section className="min-h-[86vh] pt-28 pb-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A3E635]">
              Our Culinary Manifesto · Zero Lal Mirch
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold leading-[1.06] tracking-tight text-[#F4F7F0]"
              style={{ textWrap: 'balance' }}
            >
              Born in Karachi to Prove Pakistani Spice Needs{' '}
              <span className="italic font-medium text-[#A3E635]">Zero</span> Red Chilli.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#C8DDD0] max-w-2xl">
              Most kitchens rely on dried red chilli powder for color and shortcut heat. At Green
              Chili, we banished red chilli, paprika, and tomato ketchup completely—building rich
              Pakistani gravies, charcoal BBQ, and modern fast food from living green harvests.
            </p>
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#84CC16] text-[#07170F] text-sm font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
              >
                <span>Taste The Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('reserve')}
                className="inline-flex items-center px-6 py-3 rounded-tr-2xl rounded-bl-2xl rounded-tl-md rounded-br-md border border-[#84CC16]/40 bg-[#081C12]/88 text-[#F4F7F0] text-sm font-medium hover:border-[#A3E635] transition-colors cursor-pointer"
              >
                Book Clay Hearth Table
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-t-[200px] rounded-b-3xl p-3 border border-[#84CC16]/35 bg-[#071A10]/85 shadow-2xl">
              <div className="rounded-t-[190px] rounded-b-2xl overflow-hidden aspect-[4/4.2] bg-[#0D2B1C]">
                <img
                  src={RESTAURANT_IMAGES.stage2}
                  alt="Fresh Pakistani green chillies, coriander, and mint suspended in emerald mist"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE 02: Alternating Harvest-to-Hearth Scroll Chapters (Leaves center viewport open for 3D Green Chillies!) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 space-y-28">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#A3E635]">
            Dawn-to-Dusk Craft
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#F4F7F0]">
            Scroll Through Our Daily Green Spice Journey
          </h2>
        </div>

        {HARVEST_JOURNEY.map((chapter) => (
          <div
            key={chapter.num}
            className="min-h-[48vh] flex items-center"
          >
            <div
              className={`w-full grid grid-cols-1 lg:grid-cols-12 items-center ${
                chapter.align === 'right' ? 'lg:text-left' : ''
              }`}
            >
              <article
                className={`lg:col-span-6 p-7 sm:p-10 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl bg-[#071A10]/88 border border-[#84CC16]/30 shadow-2xl space-y-4 ${
                  chapter.align === 'right' ? 'lg:col-start-7' : ''
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display italic text-4xl font-semibold text-[#A3E635] tabular-nums">
                    {chapter.num}
                  </span>
                  <span className="text-xs font-mono text-[#EAB308]">{chapter.time}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#F4F7F0]">
                  {chapter.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#C8DDD0]">
                  {chapter.body}
                </p>
              </article>
            </div>
          </div>
        ))}
      </section>

      {/* STAGE 03: The 6-Ingredient Green Spice Pantry */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#071A10]/88 border border-[#84CC16]/25 p-7 sm:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#A3E635]">
                The Botanical Pantry
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#F4F7F0]">
                Six Living Ingredients Behind Every Dish
              </h2>
            </div>
            <p className="text-sm text-[#9BB7A6] max-w-sm">
              Ground on basalt sil-batta stones in small morning batches so essential oils stay crisp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GREEN_PANTRY.map((item) => (
              <article
                key={item.index}
                className="rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-lg rounded-bl-lg bg-[#0A2216]/90 border border-[#84CC16]/20 p-6 space-y-3"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-display italic text-3xl font-semibold text-[#A3E635] tabular-nums">
                    {item.index}
                  </span>
                  <span className="text-xs font-mono text-[#EAB308]">{item.role}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#F4F7F0]">{item.name}</h3>
                <p className="text-xs text-[#84CC16]">{item.origin}</p>
                <p className="text-sm leading-relaxed text-[#C2D6C9]">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STAGE 04: Multani Terracotta Craft Showcase */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl p-2.5 border border-[#EAB308]/35 bg-[#081C12]/80 shadow-2xl">
              <img
                src={RESTAURANT_IMAGES.stage1}
                alt="Multani unglazed terracotta clay vessel simmering golden desi ghee over embers"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-lg rounded-bl-lg"
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-xl rounded-br-xl bg-[#081B11]/88 border border-[#84CC16]/25 p-8 sm:p-10 space-y-5">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#A3E635]">
                Multani Terracotta Craft
              </p>
              <h2 className="text-3xl font-semibold text-[#F4F7F0]">
                Why Clay Changes Every Drop of Masala
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#C2D6C9]">
                Alkaline Multani clay gently neutralizes sharp acidity while holding steady radiant
                charcoal heat. When fresh green chillies simmer inside porous terracotta with pure
                desi ghee, the spice stays vibrant, digestive-friendly, and aromatic right down to
                the final spoon.
              </p>
              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-[#9BB7A6]">
                <div>
                  <p className="text-lg font-mono font-medium text-[#EAB308] tabular-nums">12 hrs</p>
                  <p>Herb &amp; raw papaya BBQ marinade</p>
                </div>
                <div>
                  <p className="text-lg font-mono font-medium text-[#A3E635] tabular-nums">0 Drops</p>
                  <p>Artificial color or red chilli extract</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
