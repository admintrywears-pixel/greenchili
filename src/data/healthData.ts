import type { MenuItem } from './restaurantData';

export type WellnessCategory =
  | 'All Benefits'
  | 'Immunity & Vitamin C'
  | 'Gut & Digestion'
  | 'Metabolism & Energy'
  | 'Clean Fats & Heart';

export interface HealthBenefit {
  id: string;
  num: string;
  goal: Exclude<WellnessCategory, 'All Benefits'>;
  title: string;
  metric: string;
  unit: string;
  summary: string;
  scienceNote: string;
}

export const HEALTH_BENEFITS: HealthBenefit[] = [
  {
    id: 'vitamin-c-immunity',
    num: '01',
    goal: 'Immunity & Vitamin C',
    title: '3x More Vitamin C Than Oranges for Daily Immunity',
    metric: '242 mg',
    unit: 'per 100g fresh hari mirch',
    summary:
      'Fresh raw green chillies contain nearly three times the Vitamin C of citrus fruits—powering white blood cell defense, radiant skin collagen synthesis, and faster tissue repair.',
    scienceNote:
      'Because we grind whole fresh chillies at dawn rather than drying them under harsh sun, Vitamin C stays biologically active.',
  },
  {
    id: 'zero-gastric-acidity',
    num: '02',
    goal: 'Gut & Digestion',
    title: 'Zero Gastric Burning — Gentle on Your Stomach',
    metric: '0%',
    unit: 'dried red chilli or lal mirch',
    summary:
      'Commercial dried red chilli powder often triggers acid reflux, bloating, and stomach lining irritation. Fresh green chillies paired with pudina, ginger, and Multani clay alkaline cooking soothe digestion.',
    scienceNote:
      'Alkaline terracotta handis naturally balance meal pH while fresh dietary fiber supports clean gut motility.',
  },
  {
    id: 'capsaicin-metabolism',
    num: '03',
    goal: 'Metabolism & Energy',
    title: 'Clean Capsaicin Thermogenesis & Steady Metabolism',
    metric: '+15%',
    unit: 'post-meal metabolic spark',
    summary:
      'Natural green capsaicinoids gently raise thermogenic energy expenditure and activate endorphins—supporting active weight management and focused afternoon energy without heavy food coma.',
    scienceNote:
      'Helps moderate post-meal blood glucose spikes when paired with whole herbs and pasture-raised protein.',
  },
  {
    id: 'chlorophyll-antioxidants',
    num: '04',
    goal: 'Immunity & Glow',
    title: 'Living Chlorophyll, Beta-Carotene & Vision Protection',
    metric: '1,170 IU',
    unit: 'pro-vitamin A & chlorophyll',
    summary:
      'Deep emerald chillies, wild mountain mint, and fresh coriander leaves pack living chlorophyll, lutein, and beta-carotene that fight cellular oxidative stress and protect eye & skin health.',
    scienceNote:
      'Rich in natural Vitamin B6, iron, and magnesium to reduce everyday fatigue.',
  } as unknown as HealthBenefit,
  {
    id: 'pure-desi-ghee-fats',
    num: '05',
    goal: 'Clean Fats & Heart',
    title: 'Pure Desi Ghee & Cold-Pressed Oils — Zero Seed Oils',
    metric: '100%',
    unit: 'clean traditional fats',
    summary:
      'Industrial bleached soybean and canola oils oxidize at high karahi heat. Every Green Chili wok and clay handi uses pure cultured desi ghee, white makhan, or cold-pressed mustard oil.',
    scienceNote:
      'Fat-soluble Vitamins A, D, E & K from fresh herbs absorb properly only inside clean healthy fats.',
  },
  {
    id: 'zero-red-ketchup-sugars',
    num: '06',
    goal: 'Clean Fats & Heart',
    title: 'Zero High-Fructose Ketchup & Zero Artificial Dyes',
    metric: '0g',
    unit: 'refined sugar sauces',
    summary:
      'Ordinary fast-food joints mask stale ingredients with corn-syrup tomato ketchup and synthetic red dyes. Our burgers, pizzas, and crispy fries serve only living pudina, roasted garlic, and kagzi lime.',
    scienceNote:
      'Pure minerals from Himalayan pink salt replenish electrolytes cleanly.',
  },
];

// Normalize category of benefit 04 cleanly for type safety
HEALTH_BENEFITS[3].goal = 'Immunity & Vitamin C';

export interface KitchenAuditRow {
  pillar: string;
  greenChiliStandard: string;
  ordinaryRestaurant: string;
}

export const PURE_KITCHEN_COMPARISON: KitchenAuditRow[] = [
  {
    pillar: 'Chilli & Spice Source',
    greenChiliStandard: 'Dawn-picked Sindh green chillies stone-ground wet on basalt sil-batta',
    ordinaryRestaurant: 'Sun-dried powdered red chilli often mixed with starch or synthetic dyes',
  },
  {
    pillar: 'Cooking Fat & Heat Medium',
    greenChiliStandard: 'Pure desi ghee, cultured butter & cold-pressed mustard oil',
    ordinaryRestaurant: 'Repeatedly reheated bleached industrial seed oils & palmolein',
  },
  {
    pillar: 'Fast-Food Dips & Sauces',
    greenChiliStandard: 'Living pudina yogurt, garlic herb toum & freshly squeezed kagzi lime',
    ordinaryRestaurant: 'Glucose-fructose red tomato ketchup, artificial vinegar & thickeners',
  },
  {
    pillar: 'Stomach & Gut Aftermath',
    greenChiliStandard: 'Light, alkaline terracotta cooking with zero heartburn or sluggishness',
    ordinaryRestaurant: 'Heavy bloating, gastric acidity, and post-meal drowsiness',
  },
  {
    pillar: 'Micronutrient Density',
    greenChiliStandard: 'Active Vitamin C, chlorophyll, dietary fiber, gingerol & natural iron',
    ordinaryRestaurant: 'Oxidized starches with heat-destroyed micronutrients',
  },
];

const DISH_HEALTH_NOTES: Record<string, string> = {
  'gc-handi-chicken': 'Vitamin C & Clean Protein · Alkaline Clay Cooked',
  'gc-peshawari-karahi': 'High-Iron Lean Lamb · Pure Desi Ghee & Fresh Ginger',
  'gc-matka-biryani': 'Gut-Friendly Pudina Herbs · Zero Artificial Color',
  'gc-prawn-karahi': 'Omega-3 Marine Protein · Garlic & Green Capsaicin',
  'kc-sabz-nehari': 'Collagen Bone-Marrow Broth · Natural Zinc & Lime',
  'kc-roll-paratha': 'Charcoal Lean Boti · Live Probiotic Mint Chutney',
  'kc-katakat': 'Nutrient-Dense Mineral Meal · Fresh Ginger & Desi Makhan',
  'kc-crispy-broast': 'Cold-Pressed Clean Fry · Probiotic Green Garlic Toum',
  'kc-memoni-haleem': '22g Fiber & Protein Lentils · Slow-Release Energy',
  'kc-bun-kebab': 'Lentil & Farm Egg Protein · Zero Red Ketchup Sugar',
  'gc-hariyali-tikka': 'Papaya-Enzyme Tenderized · Zero Charred Sugar Glaze',
  'gc-malai-boti': 'Green Cardamom Digestive Relief · Heart-Healthy Pistachio',
  'gc-tawa-champ': 'Potassium & Zinc Rich Cuts · Cold-Squeezed Citrus Lift',
  'gc-green-behari': 'Mustard Oil Antioxidant Marinade · Gut-Safe Marinade',
  'pz-green-tikka': 'Herbal Garlic Yogurt Base · Zero Tomato Acid Base',
  'pz-malai-boti': 'Calcium-Rich Mozzarella · Fresh Coriander Detox Herbs',
  'fr-loaded-hari-mirch': 'Vitamin C Green Chillies · House Garlic Herb Aioli',
  'fr-karachi-chaat': 'Digestive Roasted Zeera · Himalayan Pink Salt Minerals',
  'gc-zinger-burger': 'Crisp Herb Buttermilk Fillet · Zero Ketchup Preservatives',
  'gc-lime-smash': 'Iron-Rich Pure Beef · Antioxidant Lime-Pepper Chimichurri',
  'gc-mint-margarita': 'Cooling Mint Electrolytes · 100% Fresh Kagzi Vitamin C',
  'gc-sabz-kahwa': 'EGCG Green Tea Catechins · Post-Meal Fat Oxidation',
  'gc-kachi-lassi': 'Live Gut Probiotics · Roasted Pistachio Vitamin E',
  'gc-roghni-naan': 'Fresh Crushed Garlic Immunity · Whole Coriander Seeds',
  'gc-shinwari-green': 'Pure Animal Fat Keto Energy · Zero Powder Masala',
  'gc-chapli-kabab': 'Antioxidant Pomegranate Seed · Mineral Iron Boost',
  'fr-clifton-garlic': 'Allicin Roasted Garlic · Fresh Parsley Chlorophyll',
  'gc-doodh-patti': 'Whole Buffalo Milk Calcium · Cardamom Digestive Spice',
  'kc-sabz-pulao': 'Warming Fennel & Yakhni Gut Broth · Zero Oil Heaviness',
  'gc-sabz-chargha': 'Steam-Tenderized Protein · Minimal Clean Oil Crisp',
  'gc-surmai-fish': 'Heart-Healthy Marine Omega-3 · Ajwain Digestive Spice',
  'pz-garlic-jalapeno': 'Roasted Garlic Immunity · Active Capsaicin Metabolism',
  'gc-pudina-chutney': 'Raw Digestive Enzymes · Vitamin C & Fresh Chlorophyll',
  'gc-chilli-hotsauce': 'Zero Ketchup Corn Syrup · Apple Cider & Capsaicin',
  'gc-imli-sabz-chutney': 'Natural Mineral Jaggery · Gut-Clearing Tamarind Fiber',
  'gc-garlic-herb-toum': 'Allicin Heart-Healthy Garlic · Cold-Pressed Herb Oil',
  'gc-nimbu-mirch-achar': 'Naturally Fermented Probiotics · Cold Mustard Oil',
  'gc-mint-raita': 'Live Gut Probiotics · Cooling Calcium & Electrolytes',
};

export function getDishHealthNote(item: MenuItem): string {
  return DISH_HEALTH_NOTES[item.id] ?? '100% Red-Chilli-Free · Fresh Vitamin C & Clean Herbs';
}
