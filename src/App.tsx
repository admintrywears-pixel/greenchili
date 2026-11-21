import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Menu, ShoppingBag, Volume2, VolumeX, X } from 'lucide-react';
import Global3DBackground from './components/Global3DBackground';
import HomePage from './components/pages/HomePage';
import MenuPage from './components/pages/MenuPage';
import HealthBenefitsPage from './components/pages/HealthBenefitsPage';
import OrdersPage from './components/pages/OrdersPage';
import StoryPage from './components/pages/StoryPage';
import BranchesPage from './components/pages/BranchesPage';
import ReservePage from './components/pages/ReservePage';
import ContactPage from './components/pages/ContactPage';
import PrivacyPage from './components/pages/PrivacyPage';
import SiteFooter from './components/SiteFooter';
import OrderDrawer, { type CartEntry } from './components/OrderDrawer';
import type { MenuItem } from './data/restaurantData';
import { HandiSizzleAudio } from './audio/sizzleAudio';
import { PAGE_URDU_LABELS } from './data/urduContent';
import { PAGE_ROUTE_MAP, type PageId } from './types/navigation';

// Top Bar Contract: 5 concise single-line links (Home, Menu, Health Benefits, Orders, Contact Us)
const DESKTOP_NAV_PAGES: Array<{ id: PageId; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'health', label: 'Health Benefits' },
  { id: 'orders', label: 'Orders' },
  { id: 'contact', label: 'Contact Us' },
];

// Full drawer & footer list includes Our Story, Branches, Reserve, and Privacy Policy
const ALL_PAGES: Array<{ id: PageId; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'health', label: 'Health Benefits' },
  { id: 'orders', label: 'Orders' },
  { id: 'story', label: 'Our Story' },
  { id: 'branches', label: 'Branches' },
  { id: 'reserve', label: 'Reserve' },
  { id: 'contact', label: 'Contact Us' },
  { id: 'privacy', label: 'Privacy Policy' },
];

function getInitialPage(): PageId {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (
    hash === 'menu' ||
    hash === 'health' ||
    hash === 'orders' ||
    hash === 'story' ||
    hash === 'branches' ||
    hash === 'reserve' ||
    hash === 'contact' ||
    hash === 'privacy'
  ) {
    return hash;
  }
  return 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(getInitialPage);
  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pageScrollProgress, setPageScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(1);
  const [dockCollapsed, setDockCollapsed] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const audioRef = useRef<HandiSizzleAudio | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);

    audioRef.current = new HandiSizzleAudio();
    return () => {
      mq.removeEventListener('change', onChange);
      audioRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setActivePage(getInitialPage());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setPageScrollProgress(progress);

      let stage = 1;
      if (activePage === 'home') {
        const c2 = document.getElementById('chapter-2');
        const c3 = document.getElementById('chapter-3');
        const c4 = document.getElementById('chapter-4');
        const mid = window.innerHeight * 0.55;
        if (c4 && c4.getBoundingClientRect().top <= mid) stage = 4;
        else if (c3 && c3.getBoundingClientRect().top <= mid) stage = 3;
        else if (c2 && c2.getBoundingClientRect().top <= mid) stage = 2;
      } else {
        if (progress >= 0.72) stage = 4;
        else if (progress >= 0.45) stage = 3;
        else if (progress >= 0.2) stage = 2;
      }
      setActiveStage(stage);
      audioRef.current?.setStep(stage);
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [activePage]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === 'h' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        setDockCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    if (window.location.hash !== `#${page}`) {
      window.history.pushState(null, '', `#${page}`);
    }
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const jumpToStageFraction = (stageIndex: number) => {
    if (activePage === 'home') {
      const target = document.getElementById(`chapter-${stageIndex}`);
      if (target) {
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
        return;
      }
    }
    const doc = document.documentElement;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    const fractions = [0.06, 0.3, 0.56, 0.85];
    const targetTop = (fractions[stageIndex - 1] ?? 0) * maxScroll;
    window.scrollTo({ top: targetTop, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const handleToggleAudio = () => {
    if (!audioRef.current) return;
    const enabled = audioRef.current.toggle();
    setIsAudioOn(enabled);
  };

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev[item.id];
      return {
        ...prev,
        [item.id]: {
          item,
          quantity: existing ? existing.quantity + 1 : 1,
        },
      };
    });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      const nextQty = existing.quantity + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return {
        ...prev,
        [id]: { ...existing, quantity: nextQty },
      };
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const cartEntries = useMemo(() => Object.values(cart), [cart]);
  const totalCount = useMemo(
    () => cartEntries.reduce((sum, entry) => sum + entry.quantity, 0),
    [cartEntries]
  );

  const cartQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    cartEntries.forEach((e) => {
      map[e.item.id] = e.quantity;
    });
    return map;
  }, [cartEntries]);

  const currentStageLabels = PAGE_ROUTE_MAP[activePage].stageNames;

  return (
    <div className="relative min-h-screen bg-[#07170F] text-[#F4F7F0]">
      {/* Fixed Full-Viewport Multi-Page 3D VFX World */}
      <Global3DBackground
        activePage={activePage}
        pageScrollProgress={pageScrollProgress}
        reducedMotion={reducedMotion}
      />

      {/* Top Bar Contract: Single 64px row [Uploaded Logo] — [5 Nav links] — [Order Bag CTA] */}
      <header className="fixed top-0 inset-x-0 z-30 h-16 bg-[#051A0D]/95 border-b border-[#84CC16]/20">
        <div className="max-w-7xl mx-auto h-full px-5 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center shrink-0 cursor-pointer overflow-hidden rounded-lg border border-[#84CC16]/30 bg-[#03210B]"
            aria-label="Green Chili Home"
          >
            <img
              src="/assets/aistudio/Analysis_output_1_7813f308.png"
              alt="Green Chili"
              referrerPolicy="no-referrer"
              className="h-10 w-auto object-contain scale-[1.05]"
            />
          </button>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#C2D6C9]"
          >
            {DESKTOP_NAV_PAGES.map((page) => {
              const isActive = activePage === page.id;
              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => navigateTo(page.id)}
                  className={`inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
                    isActive
                      ? 'text-[#A3E635] border-b border-[#A3E635]'
                      : 'hover:text-[#A3E635]'
                  }`}
                >
                  <span>
                    {page.id === 'orders' && totalCount > 0
                      ? `Orders (${totalCount})`
                      : page.label}
                  </span>
                  <span lang="ur" className="font-urdu-inline text-[13px] text-[#EAB308]">
                    {PAGE_URDU_LABELS[page.id]}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-xs font-semibold hover:bg-[#A3E635] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="tabular-nums inline-flex items-center gap-1.5">
                {totalCount > 0 ? (
                  `Order Bag (${totalCount})`
                ) : (
                  <>
                    <span>Order Bag ·</span>
                    <span lang="ur" className="font-urdu-inline text-[13px]">
                      آرڈر بیگ
                    </span>
                  </>
                )}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 bg-[#082214] text-[#F4F7F0] hover:border-[#84CC16] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="lg:hidden bg-[#061C0F]/98 border-b border-[#84CC16]/25 px-5 py-3 grid grid-cols-2 gap-1.5 shadow-2xl"
          >
            {ALL_PAGES.map((page) => {
              const isActive = activePage === page.id;
              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => navigateTo(page.id)}
                  className={`w-full flex items-center justify-between gap-2 text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#84CC16]/15 text-[#A3E635]'
                      : 'text-[#C2D6C9] hover:bg-white/5 hover:text-[#F4F7F0]'
                  }`}
                >
                  <span>{page.label}</span>
                  <span lang="ur" className="font-urdu-inline text-xs text-[#EAB308]">
                    {PAGE_URDU_LABELS[page.id]}
                  </span>
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Active Page Content Floating Over Live 3D VFX */}
      <main className="relative z-10">
        {activePage === 'home' && (
          <HomePage
            activeStage={activeStage}
            entries={cartEntries}
            onAddToCart={handleAddToCart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            cartQuantities={cartQuantities}
            onNavigate={navigateTo}
          />
        )}
        {activePage === 'menu' && (
          <MenuPage
            onAddToCart={handleAddToCart}
            onUpdateQty={handleUpdateQty}
            cartQuantities={cartQuantities}
            onNavigate={navigateTo}
          />
        )}
        {activePage === 'health' && (
          <HealthBenefitsPage
            onAddToCart={handleAddToCart}
            cartQuantities={cartQuantities}
            onNavigate={navigateTo}
          />
        )}
        {activePage === 'orders' && (
          <OrdersPage
            entries={cartEntries}
            onAddToCart={handleAddToCart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onNavigate={navigateTo}
          />
        )}
        {activePage === 'story' && <StoryPage onNavigate={navigateTo} />}
        {activePage === 'branches' && <BranchesPage onNavigate={navigateTo} />}
        {activePage === 'reserve' && <ReservePage />}
        {activePage === 'contact' && <ContactPage onNavigate={navigateTo} />}
        {activePage === 'privacy' && <PrivacyPage onNavigate={navigateTo} />}
      </main>

      <SiteFooter onNavigate={navigateTo} />

      {/* Compact Bottom-Right 3D Stage & Sizzle Audio Control (never blocks center menu cards) */}
      <div className="fixed bottom-4 right-4 z-20 flex flex-col items-end max-w-[92vw]">
        {!dockCollapsed && (
          <div className="mb-2 flex flex-wrap items-center justify-end gap-2 px-3 py-2 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#0A1D13]/95 border border-[#84CC16]/30 shadow-2xl">
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#06130C] border border-white/10">
              {currentStageLabels.map((label, idx) => {
                const stageNum = idx + 1;
                const active = activeStage === stageNum;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => jumpToStageFraction(stageNum)}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#84CC16] text-[#07170F] font-semibold'
                        : 'text-[#C2D6C9] hover:text-[#F4F7F0] hover:bg-[#133322]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleToggleAudio}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isAudioOn
                  ? 'bg-[#84CC16] text-[#07170F] border-[#84CC16] font-semibold'
                  : 'bg-[#122B1D] text-[#E2EFE6] border-white/10 hover:border-[#84CC16]/50'
              }`}
              aria-label="Toggle kitchen sizzle audio"
            >
              {isAudioOn ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span>{isAudioOn ? 'Sizzle On' : 'Sizzle Audio'}</span>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {dockCollapsed && (
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xl ${
                isAudioOn
                  ? 'bg-[#84CC16] text-[#07170F] border-[#84CC16] font-semibold'
                  : 'bg-[#081C12]/92 text-[#C2D6C9] border-[#84CC16]/25 hover:border-[#A3E635]'
              }`}
              aria-label="Toggle kitchen sizzle audio"
            >
              {isAudioOn ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-[#A3E635]" />
              )}
              <span className="hidden sm:inline">{isAudioOn ? 'Sizzle On' : 'Audio'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setDockCollapsed((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#081C12]/92 border border-[#84CC16]/25 text-xs font-medium text-[#C2D6C9] hover:text-[#F4F7F0] hover:border-[#A3E635] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xl"
            aria-expanded={!dockCollapsed}
          >
            {dockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>3D Stages</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>Hide</span>
              </>
            )}
          </button>
        </div>
      </div>

      <OrderDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        entries={cartEntries}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenOrdersPage={() => navigateTo('orders')}
      />
    </div>
  );
}
