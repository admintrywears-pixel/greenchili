export interface HandiStep {
  id: number;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  keyIngredients: string[];
  heatTemp: string;
  duration: string;
}

export type MenuCategory =
  | 'All'
  | 'Handi & Karahi'
  | 'Karachi Specials'
  | 'BBQ & Grill'
  | 'Pizza, Burgers & Fries'
  | 'Chutneys & Sauces'
  | 'Drinks & Sides';

export type SpiceHeat = 'Mild Green' | 'Zesty Lime' | 'Fiery Hari Mirch';

export interface MenuItem {
  id: string;
  name: string;
  urduTag: string;
  category: Exclude<MenuCategory, 'All'>;
  pricePkr: number;
  spice: SpiceHeat;
  prepTime: string;
  description: string;
  image: string;
  featured?: boolean;
}

export const HANDI_STEPS: HandiStep[] = [
  {
    id: 1,
    stepNumber: '01',
    title: 'Clay Hearth & Sizzling Desi Ghee',
    subtitle: 'Tadka of Cumin, Crushed Garlic & Green Cardamom',
    description:
      'An unglazed Multani clay handi is seasoned over glowing charcoal embers. Pure desi ghee melts and shimmers before whole roasted cumin seeds, green elaichi pods, and hand-crushed garlic crackle in golden warmth.',
    keyIngredients: ['Desi Ghee', 'Whole Zeera', 'Green Cardamom', 'Crushed Garlic'],
    heatTemp: '185°C',
    duration: '4 min',
  },
  {
    id: 2,
    stepNumber: '02',
    title: 'Fresh Green Chilli & Herb Infusion',
    subtitle: 'Hand-Pounded Hari Mirch, Coriander & Wild Mint',
    description:
      'Zero red chilli powder ever touches our kitchen. Fresh Sindh and Punjab green chillies, garden coriander stems, and crisp mint leaves cascade into the hot ghee, releasing an electric emerald aroma.',
    keyIngredients: ['Desi Hari Mirch', 'Fresh Coriander', 'Pudina Leaves', 'Green Peppercorn'],
    heatTemp: '165°C',
    duration: '8 min',
  },
  {
    id: 3,
    stepNumber: '03',
    title: 'Slow Bhunai & Velvet Yogurt Masala',
    subtitle: 'Tender Cuts Simmered Under the Sheesham Chamcha',
    description:
      'Char-marinated chicken or mutton boti folds into whisked desi yogurt and stone-ground green masala. The carved wooden chamcha stirs in slow figure-eights until the emerald gravy turns glossy and thick.',
    keyIngredients: ['Marinated Boti', 'Whisked Dahi', 'Roasted Dhania', 'White Pepper'],
    heatTemp: '135°C',
    duration: '22 min',
  },
  {
    id: 4,
    stepNumber: '04',
    title: 'Clay Dum Seal & Lime Ginger Finish',
    subtitle: 'Aromatic Steam Bloom with Desi Makhan & Fresh Lime',
    description:
      'The sculpted clay dhakkan seals in fragrant herb steam on low embers. Lifted tableside with julienned ginger, freshly squeezed kagzi lime, whole slit green chillies, and a ribbon of cultured butter.',
    keyIngredients: ['Kagzi Lime', 'Ginger Julienne', 'Cultured Makhan', 'Whole Mint'],
    heatTemp: '95°C',
    duration: '6 min Dum',
  },
];

export const RESTAURANT_IMAGES = {
  handi: '/src/assets/images/green_chilli_handi_hero_1795117438984.jpg',
  bbq: '/src/assets/images/green_karahi_bbq_1795117438816.jpg',
  fastFood: '/src/assets/images/green_fast_food_burger_1795117439421.jpg',
  drinks: '/src/assets/images/mint_margarita_drinks_1795117439374.jpg',
  pizza: '/src/assets/images/green_chilli_pizza_1795119271471.jpg',
  fries: '/src/assets/images/green_loaded_fries_1795119271060.jpg',
  karachiStreet: '/src/assets/images/karachi_roll_paratha_broast_1795119271001.jpg',
  chutneys: '/src/assets/images/green_chutney_sauce_dips_1795163120368.jpg',
  stage1: '/src/assets/images/vfx_stage1_ghee_hearth_1795118552265.jpg',
  stage2: '/src/assets/images/vfx_stage2_chilli_mist_1795118552493.jpg',
  stage3: '/src/assets/images/vfx_stage3_charcoal_smoke_1795118553509.jpg',
  stage4: '/src/assets/images/vfx_stage4_lime_finale_1795118552467.jpg',
};

export const MENU_ITEMS: MenuItem[] = [
  // HANDI & KARAHI
  {
    id: 'gc-handi-chicken',
    name: 'Signature Green Chilli Chicken Handi',
    urduTag: 'Sabz Makhni Handi',
    category: 'Handi & Karahi',
    pricePkr: 1950,
    spice: 'Zesty Lime',
    prepTime: '25 min',
    description:
      'Boneless chicken simmered in clay pot with fresh green chilli paste, coriander cream, desi ghee, and ginger juliennes.',
    image: RESTAURANT_IMAGES.handi,
    featured: true,
  },
  {
    id: 'gc-peshawari-karahi',
    name: 'Peshawari Hari Mirch Mutton Karahi',
    urduTag: 'Namkeen Sabz Karahi',
    category: 'Handi & Karahi',
    pricePkr: 3450,
    spice: 'Fiery Hari Mirch',
    prepTime: '35 min',
    description:
      'Tender lamb cuts wok-seared over high flame with crushed black pepper, whole green chillies, garlic, and Himalayan pink salt.',
    image: '/src/assets/images/peshawari_mutton_karahi_1795251467443.jpg',
  },
  {
    id: 'gc-matka-biryani',
    name: 'Karachi Emerald Matka Dum Biryani',
    urduTag: 'Sabz Masala Biryani',
    category: 'Handi & Karahi',
    pricePkr: 1450,
    spice: 'Zesty Lime',
    prepTime: '20 min',
    description:
      'Aged basmati rice steamed in a clay matka layered with mint-coriander chicken, green chillies, saffron-turmeric, and fried shallots.',
    image: '/src/assets/images/emerald_matka_biryani_1795251466444.jpg',
  },
  {
    id: 'gc-prawn-karahi',
    name: 'Boat Basin Green Chilli Prawn Karahi',
    urduTag: 'Samundari Sabz Karahi',
    category: 'Handi & Karahi',
    pricePkr: 2950,
    spice: 'Fiery Hari Mirch',
    prepTime: '22 min',
    description:
      'Fresh Arabian Sea king prawns wok-tossed in sizzling desi ghee with crushed garlic, whole green chillies, lemon, and fresh coriander.',
    image: '/src/assets/images/green_prawn_karahi_1795251467559.jpg',
  },

  // KARACHI SPECIALS
  {
    id: 'kc-sabz-nehari',
    name: 'Karachi Sabz Beef Nehari',
    urduTag: 'Dastoor-e-Sabz Nehari',
    category: 'Karachi Specials',
    pricePkr: 1850,
    spice: 'Zesty Lime',
    prepTime: '25 min',
    description:
      'Slow-braised beef bong in aromatic bone-marrow stock thickened with roasted gram flour, crushed green chillies, ginger, and fresh lime.',
    image: '/src/assets/images/karachi_sabz_nehari_1795251466516.jpg',
    featured: true,
  },
  {
    id: 'kc-roll-paratha',
    name: 'Clifton Sabz Seekh Roll Paratha',
    urduTag: 'Karachi Lachha Roll',
    category: 'Karachi Specials',
    pricePkr: 640,
    spice: 'Zesty Lime',
    prepTime: '12 min',
    description:
      'Flaky golden lachha paratha stuffed with charcoal green seekh kebab, crisp onion rings, and emerald pudina-imli chutney.',
    image: RESTAURANT_IMAGES.karachiStreet,
    featured: true,
  },
  {
    id: 'kc-katakat',
    name: 'Burns Road Green Chilli Katakat',
    urduTag: 'Tawa Tak-a-Tak',
    category: 'Karachi Specials',
    pricePkr: 1790,
    spice: 'Fiery Hari Mirch',
    prepTime: '18 min',
    description:
      'Sizzling Karachi tawa specialty finely chopped on cast iron with melted desi butter, crushed green chillies, ginger, and lemon.',
    image: '/src/assets/images/burns_road_katakat_1795251466989.jpg',
  },
  {
    id: 'kc-crispy-broast',
    name: 'Karachi Crunchy Broast & Green Toum',
    urduTag: 'Zero-Ketchup Broast',
    category: 'Karachi Specials',
    pricePkr: 1290,
    spice: 'Mild Green',
    prepTime: '16 min',
    description:
      'Pressure-fried crunchy quarter chicken marinated in green peppercorn & buttermilk, served with roasted garlic toum, green chilli dip & fries.',
    image: '/src/assets/images/karachi_crispy_broast_1795251466165.jpg',
  },
  {
    id: 'kc-memoni-haleem',
    name: 'Karachi Memoni Sabz Resha Haleem',
    urduTag: 'Green Tadka Haleem',
    category: 'Karachi Specials',
    pricePkr: 980,
    spice: 'Zesty Lime',
    prepTime: '15 min',
    description:
      'Velvety slow-beaten beef and lentil haleem topped with sizzling green chilli ghee tadka, crispy golden onions, and kagzi lime.',
    image: '/src/assets/images/memoni_sabz_haleem_1795251493116.jpg',
  },
  {
    id: 'kc-bun-kebab',
    name: 'Anday Wala Sabz Bun Kebab',
    urduTag: 'Karachi Street Classic',
    category: 'Karachi Specials',
    pricePkr: 690,
    spice: 'Zesty Lime',
    prepTime: '12 min',
    description:
      'Crispy lentil-and-beef shami patty griddled with farm egg, pickled green chillies, crispy onions, and tangy mint-coriander sauce.',
    image: '/src/assets/images/karachi_bun_kebab_1795251493055.jpg',
  },

  // BBQ & GRILL
  {
    id: 'gc-hariyali-tikka',
    name: 'Charcoal Hariyali Tikka & Seekh Platter',
    urduTag: 'Sabz Angithi BBQ',
    category: 'BBQ & Grill',
    pricePkr: 2450,
    spice: 'Zesty Lime',
    prepTime: '22 min',
    description:
      'Smoky boneless chicken boti and hand-minced seekh kebabs marinated 12 hours in fresh green chilli, mint, and raw papaya.',
    image: RESTAURANT_IMAGES.bbq,
    featured: true,
  },
  {
    id: 'gc-malai-boti',
    name: 'Pistachio & Green Pepper Malai Boti',
    urduTag: 'Reshmi Sabz Boti',
    category: 'BBQ & Grill',
    pricePkr: 1680,
    spice: 'Mild Green',
    prepTime: '18 min',
    description:
      'Velvety cream and crushed green cardamom skewer grilled over white oak charcoal, served with emerald pudina chutney.',
    image: '/src/assets/images/pistachio_malai_boti_1795251494798.jpg',
  },
  {
    id: 'gc-tawa-champ',
    name: 'Lahori Sabz Masala Tawa Champ',
    urduTag: 'Tawa Fry Chops',
    category: 'BBQ & Grill',
    pricePkr: 2650,
    spice: 'Fiery Hari Mirch',
    prepTime: '24 min',
    description:
      'Pressed mutton chops pan-seared on heavy iron tawa with sizzling lime juice, green chilli butter, and crushed coriander seeds.',
    image: '/src/assets/images/lahori_tawa_champ_1795251494612.jpg',
  },
  {
    id: 'gc-green-behari',
    name: 'Karachi Green Behari Beef Kabab',
    urduTag: 'Sabz Behari Boti',
    category: 'BBQ & Grill',
    pricePkr: 1990,
    spice: 'Fiery Hari Mirch',
    prepTime: '22 min',
    description:
      'Melt-in-mouth beef strips tenderized in raw papaya, roasted mustard oil, crushed green chillies, and smoky charcoal aroma.',
    image: '/src/assets/images/green_behari_kabab_1795251496199.jpg',
  },

  // PIZZA, BURGERS & FRIES
  {
    id: 'pz-green-tikka',
    name: 'Karachi Green Tikka & Chilli Crust Pizza',
    urduTag: 'Zero-Red Stone Bake',
    category: 'Pizza, Burgers & Fries',
    pricePkr: 1850,
    spice: 'Fiery Hari Mirch',
    prepTime: '18 min',
    description:
      'Hand-stretched wood-fired crust with creamy garlic herb base, mozzarella, smoky green tikka chunks, fresh sliced green chillies & coriander.',
    image: RESTAURANT_IMAGES.pizza,
    featured: true,
  },
  {
    id: 'pz-malai-boti',
    name: 'Green Chilli Malai Boti & Cheese Pizza',
    urduTag: 'Creamy Sabz Pizza',
    category: 'Pizza, Burgers & Fries',
    pricePkr: 1950,
    spice: 'Mild Green',
    prepTime: '18 min',
    description:
      'Velvety cream-cheese white sauce topped with pistachio malai boti, green bell peppers, caramelized onions, and mint ranch swirl.',
    image: '/src/assets/images/creamy_malai_pizza_1795251495744.jpg',
  },
  {
    id: 'fr-loaded-hari-mirch',
    name: 'Loaded Hari Mirch & Cheddar French Fries',
    urduTag: 'Skillet Loaded Fries',
    category: 'Pizza, Burgers & Fries',
    pricePkr: 890,
    spice: 'Fiery Hari Mirch',
    prepTime: '12 min',
    description:
      'Crispy golden French fries piled in hot skillet with warm cheddar fondue, house green chilli garlic aioli, sliced green chillies & herbs.',
    image: RESTAURANT_IMAGES.fries,
    featured: true,
  },
  {
    id: 'fr-karachi-chaat',
    name: 'Karachi Zeera-Lime Masala French Fries',
    urduTag: 'Chatpata Herb Fries',
    category: 'Pizza, Burgers & Fries',
    pricePkr: 540,
    spice: 'Zesty Lime',
    prepTime: '10 min',
    description:
      'Double-fried skin-on potato fries dusted with roasted cumin, kala namak, lime zest & coriander, served with emerald mint dip.',
    image: '/src/assets/images/zeera_lime_fries_1795251583343.jpg',
  },
  {
    id: 'gc-zinger-burger',
    name: 'Crispy Green Zinger & Herb Fries',
    urduTag: 'Zero-Ketchup Crunch',
    category: 'Pizza, Burgers & Fries',
    pricePkr: 1150,
    spice: 'Fiery Hari Mirch',
    prepTime: '14 min',
    description:
      'Double-crunch buttermilk chicken thigh in toasted brioche with house green chilli herb aioli, pickled jalapenos, and rosemary fries.',
    image: RESTAURANT_IMAGES.fastFood,
  },
  {
    id: 'gc-lime-smash',
    name: 'Double Lime-Pepper Smash Burger',
    urduTag: 'Charcoal Smash',
    category: 'Pizza, Burgers & Fries',
    pricePkr: 1390,
    spice: 'Zesty Lime',
    prepTime: '14 min',
    description:
      'Two lacy-edged beef patties seared with cracked green peppercorns, aged cheddar, chimichurri relish, and crispy shallots.',
    image: '/src/assets/images/double_lime_smash_1795251581956.jpg',
  },

  // DRINKS & SIDES
  {
    id: 'gc-mint-margarita',
    name: 'Crushed Ice Mint Lime Margarita',
    urduTag: 'Fresh Pudina Cooler',
    category: 'Drinks & Sides',
    pricePkr: 490,
    spice: 'Mild Green',
    prepTime: '5 min',
    description:
      'Hand-muddled garden mint, fresh kagzi lime juice, black salt, and sparkling soda over crushed ice.',
    image: RESTAURANT_IMAGES.drinks,
    featured: true,
  },
  {
    id: 'gc-sabz-kahwa',
    name: 'Peshawari Cardamom Sabz Kahwa',
    urduTag: 'Brass Kettle Tea',
    category: 'Drinks & Sides',
    pricePkr: 380,
    spice: 'Mild Green',
    prepTime: '6 min',
    description:
      'Slow-brewed green tea leaves infused with crushed green elaichi, lemon zest, and wild mountain honey.',
    image: '/src/assets/images/peshawari_sabz_kahwa_1795251583716.jpg',
  },
  {
    id: 'gc-kachi-lassi',
    name: 'Karachi Mint & Pistachio Lassi',
    urduTag: 'Thandi Dahi Lassi',
    category: 'Drinks & Sides',
    pricePkr: 450,
    spice: 'Mild Green',
    prepTime: '5 min',
    description:
      'Chilled hand-churned yogurt blended with fresh garden mint, crushed green cardamom, and roasted pistachio crumble.',
    image: '/src/assets/images/mint_pistachio_lassi_1795251584163.jpg',
  },
  {
    id: 'gc-roghni-naan',
    name: 'Garlic Coriander Roghni Naan',
    urduTag: 'Clay Tandoor Bread',
    category: 'Drinks & Sides',
    pricePkr: 240,
    spice: 'Mild Green',
    prepTime: '7 min',
    description:
      'Blistered tandoor naan brushed with desi ghee, roasted sesame, minced garlic, and fresh chopped coriander.',
    image: '/src/assets/images/garlic_roghni_naan_1795251583919.jpg',
  },
  {
    id: 'gc-shinwari-green',
    name: 'Khyber Green Chilli Shinwari Karahi',
    urduTag: 'Charcoal Dum Karahi',
    category: 'Handi & Karahi',
    pricePkr: 3150,
    spice: 'Fiery Hari Mirch',
    prepTime: '30 min',
    description:
      'Pure mutton shoulder tossed in hot animal fat & desi ghee with hand-crushed green chillies, garlic cloves, and lime—zero red masala.',
    image: '/src/assets/images/khyber_shinwari_karahi_1795251584536.jpg',
  },
  {
    id: 'gc-chapli-kabab',
    name: 'Peshawari Hari Mirch Chapli Kabab',
    urduTag: 'Tawa Sabz Chapli',
    category: 'BBQ & Grill',
    pricePkr: 1490,
    spice: 'Fiery Hari Mirch',
    prepTime: '18 min',
    description:
      'Coarse-minced beef medallions studded with crushed pomegranate seeds, coriander, and diced green chillies seared on cast iron.',
    image: '/src/assets/images/peshawari_chapli_kabab_1795251586527.jpg',
  },
  {
    id: 'fr-clifton-garlic',
    name: 'Clifton Green Garlic & Herb Mayo Fries',
    urduTag: 'Coastal Basket Fries',
    category: 'Pizza, Burgers & Fries',
    pricePkr: 720,
    spice: 'Mild Green',
    prepTime: '10 min',
    description:
      'Crisp crinkle fries drizzled with roasted garlic emerald ranch, crushed black pepper, and fresh chopped parsley.',
    image: '/src/assets/images/clifton_herb_fries_1795251585612.jpg',
  },
  {
    id: 'gc-doodh-patti',
    name: 'Karachi Elaichi & Mint Doodh Patti',
    urduTag: 'Copper Kettle Chai',
    category: 'Drinks & Sides',
    pricePkr: 340,
    spice: 'Mild Green',
    prepTime: '6 min',
    description:
      'Slow-simmered whole buffalo milk tea infused with crushed green cardamom pods, fennel, and a crisp leaf of fresh pudina.',
    image: '/src/assets/images/elaichi_doodh_patti_1795251586501.jpg',
  },
  {
    id: 'kc-sabz-pulao',
    name: 'Karachi Sabz Beef Yakhni Pulao & Kabab',
    urduTag: 'Yakhni Sabz Pulao',
    category: 'Karachi Specials',
    pricePkr: 1550,
    spice: 'Zesty Lime',
    prepTime: '22 min',
    description:
      'Fragrant basmati rice steamed in rich bone-marrow beef stock with whole green chillies, white cumin, fennel, and charred seekh kabab.',
    image: '/src/assets/images/karachi_sabz_pulao_1795251691372.jpg',
  },
  {
    id: 'gc-sabz-chargha',
    name: 'Lahori Crispy Sabz Chargha Whole Chicken',
    urduTag: 'Steam-Roast Chargha',
    category: 'BBQ & Grill',
    pricePkr: 2350,
    spice: 'Zesty Lime',
    prepTime: '26 min',
    description:
      'Whole pasture-raised chicken marinated overnight in crushed green chilli, raw ginger, coriander, and kagzi lime—steamed then flash-crisped.',
    image: '/src/assets/images/lahori_sabz_chargha_1795251691877.jpg',
  },
  {
    id: 'gc-surmai-fish',
    name: 'Kemari Green Masala Grilled Surmai',
    urduTag: 'Coastal Tawa Fish',
    category: 'BBQ & Grill',
    pricePkr: 2680,
    spice: 'Fiery Hari Mirch',
    prepTime: '20 min',
    description:
      'Arabian Sea kingfish fillets seared over cast iron in wild ajwain, fresh coriander, crushed green chillies, and toasted garlic butter.',
    image: '/src/assets/images/kemari_grilled_surmai_1795251691897.jpg',
  },
  {
    id: 'pz-garlic-jalapeno',
    name: 'Green Garlic & Smoked Jalapeno Crust Pizza',
    urduTag: 'Stone-Baked Herbs',
    category: 'Pizza, Burgers & Fries',
    pricePkr: 1690,
    spice: 'Fiery Hari Mirch',
    prepTime: '16 min',
    description:
      'Wood-fired sourdough crust brushed with roasted garlic herb cream, aged mozzarella, charred green jalapenos, scallions, and mint ranch.',
    image: '/src/assets/images/garlic_jalapeno_pizza_1795251691289.jpg',
  },

  // CHUTNEYS & GREEN CHILLI SAUCES
  {
    id: 'gc-pudina-chutney',
    name: 'Sil-Batta Wild Pudina & Coriander Green Chutney',
    urduTag: 'Taza Sabz Chatni',
    category: 'Chutneys & Sauces',
    pricePkr: 180,
    spice: 'Zesty Lime',
    prepTime: '5 min',
    description:
      'Hand-ground Swat garden mint, fresh coriander leaves, young Sindh green chillies, roasted cumin, and cold-squeezed kagzi lime.',
    image: RESTAURANT_IMAGES.chutneys,
    featured: true,
  },
  {
    id: 'gc-chilli-hotsauce',
    name: 'House Fire-Roasted Green Chilli Sauce (Bottle / Pour)',
    urduTag: 'Hari Mirch Hot Sauce',
    category: 'Chutneys & Sauces',
    pricePkr: 320,
    spice: 'Fiery Hari Mirch',
    prepTime: 'Ready Bottle',
    description:
      'Zero-ketchup table hot sauce crafted from blistered Sindh green chillies, slow-roasted garlic, raw apple cider vinegar & mountain herbs.',
    image: '/src/assets/images/green_chilli_hotsauce_1795251691115.jpg',
    featured: true,
  },
  {
    id: 'gc-imli-sabz-chutney',
    name: 'Karachi Imli & Hari Mirch Tangy Chutney',
    urduTag: 'Khatti Meethi Sabz Chatni',
    category: 'Chutneys & Sauces',
    pricePkr: 220,
    spice: 'Zesty Lime',
    prepTime: '5 min',
    description:
      'Aged seedless tamarind reduction simmered with crushed green chillies, organic jaggery (gur), ginger & roasted fennel—zero white sugar.',
    image: '/src/assets/images/imli_chilli_chutney_1795251691224.jpg',
  },
  {
    id: 'gc-garlic-herb-toum',
    name: 'Creamy Green Garlic & Herb Toum Sauce',
    urduTag: 'Lehsan Pudina Dip',
    category: 'Chutneys & Sauces',
    pricePkr: 260,
    spice: 'Mild Green',
    prepTime: '5 min',
    description:
      'Silky whipped garlic emulsion folded with fresh parsley, emerald green chilli zest & cold-pressed olive-herb oil for broast, rolls & fries.',
    image: '/src/assets/images/garlic_herb_toum_1795251691163.jpg',
  },
  {
    id: 'gc-nimbu-mirch-achar',
    name: 'Fresh Green Chilli & Kagzi Lime Achar',
    urduTag: 'Taza Mirch Nimbu Achar',
    category: 'Chutneys & Sauces',
    pricePkr: 290,
    spice: 'Fiery Hari Mirch',
    prepTime: 'Jar 250g',
    description:
      'Crisp morning-picked whole green chillies naturally cured in cold-pressed mustard oil, turmeric root, fenugreek & lime juice.',
    image: '/src/assets/images/nimbu_mirch_achar_1795251693689.jpg',
  },
  {
    id: 'gc-mint-raita',
    name: 'Cooling Probiotic Dahi & Mint Raita Bowl',
    urduTag: 'Thanda Pudina Dahi',
    category: 'Chutneys & Sauces',
    pricePkr: 210,
    spice: 'Mild Green',
    prepTime: '4 min',
    description:
      'Chilled farmhouse probiotic yogurt whisked with stone-ground mint-coriander paste, roasted zeera, and Himalayan pink salt.',
    image: '/src/assets/images/clean_mint_raita_1795251739370.jpg',
  },
];

