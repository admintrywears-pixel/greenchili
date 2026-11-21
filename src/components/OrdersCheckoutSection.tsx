import { useMemo, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import type { CartEntry } from './OrderDrawer';
import { MENU_ITEMS, type MenuItem } from '../data/restaurantData';
import { DISH_URDU_MAP } from '../data/urduContent';
import {
  WHATSAPP_DISPLAY_NUMBER,
  buildWhatsAppOrderText,
  buildWhatsAppOrderUrl,
} from '../utils/whatsapp';

interface OrdersCheckoutSectionProps {
  entries: CartEntry[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

const QUICK_ATTACH_IDS = [
  'gc-handi-chicken',
  'kc-sabz-nehari',
  'kc-roll-paratha',
  'pz-green-tikka',
  'fr-loaded-hari-mirch',
  'gc-pudina-chutney',
  'gc-chilli-hotsauce',
  'gc-mint-margarita',
];

export default function OrdersCheckoutSection({
  entries,
  onAddToCart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: OrdersCheckoutSectionProps) {
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [branch, setBranch] = useState('Clifton Block 4, Karachi');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const [confirmedReceipt, setConfirmedReceipt] = useState<{
    orderId: string;
    whatsappUrl: string;
    whatsappText: string;
    total: number;
    customerName: string;
    itemsSnapshot: CartEntry[];
  } | null>(null);

  const subtotal = useMemo(
    () => entries.reduce((sum, e) => sum + e.item.pricePkr * e.quantity, 0),
    [entries]
  );
  const deliveryFee = fulfillment === 'delivery' && subtotal > 0 && subtotal < 2500 ? 180 : 0;
  const total = subtotal + deliveryFee;

  const quickAttachItems = useMemo(
    () =>
      QUICK_ATTACH_IDS.map((id) => MENU_ITEMS.find((m) => m.id === id)).filter(
        (m): m is MenuItem => Boolean(m)
      ),
    []
  );

  const isFormComplete =
    entries.length > 0 &&
    customerName.trim().length > 0 &&
    phone.trim().length > 0 &&
    (fulfillment === 'pickup' || address.trim().length > 0);

  const draftOrderId = useMemo(() => `GC-${Math.floor(1000 + (subtotal % 8999))}`, [subtotal]);

  const livePayload = useMemo(
    () => ({
      orderId: draftOrderId,
      entries,
      subtotal,
      deliveryFee,
      total,
      customerName: customerName.trim() || 'Guest',
      phone: phone.trim() || 'Not provided',
      fulfillment,
      branch,
      address: address.trim(),
      notes: notes.trim(),
    }),
    [draftOrderId, entries, subtotal, deliveryFee, total, customerName, phone, fulfillment, branch, address, notes]
  );

  const liveWhatsappUrl = useMemo(() => buildWhatsAppOrderUrl(livePayload), [livePayload]);

  const handleConfirmSnapshot = () => {
    if (!isFormComplete) return;
    const finalOrderId = `GC-${Math.floor(1000 + Math.random() * 8999)}`;
    const payload = {
      ...livePayload,
      orderId: finalOrderId,
      customerName: customerName.trim(),
      phone: phone.trim(),
    };
    setErrorMsg('');
    setConfirmedReceipt({
      orderId: finalOrderId,
      whatsappUrl: buildWhatsAppOrderUrl(payload),
      whatsappText: buildWhatsAppOrderText(payload),
      total,
      customerName: payload.customerName,
      itemsSnapshot: [...entries],
    });
    onClearCart();
  };

  const handleValidationSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (entries.length === 0) {
      setErrorMsg('Please attach at least one dish to your order tray first.');
      return;
    }
    if (!customerName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your full name and mobile/WhatsApp number.');
      return;
    }
    if (fulfillment === 'delivery' && !address.trim()) {
      setErrorMsg('Please enter your delivery address.');
      return;
    }
    handleConfirmSnapshot();
  };

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard fallback unavailable
    }
  };

  return (
    <section id="orders-section" className="relative z-10 py-16 sm:py-24 text-[#F4F7F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl space-y-3 mb-10">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A3E635]">
            Direct Kitchen Orders · WhatsApp {WHATSAPP_DISPLAY_NUMBER}
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight text-[#F4F7F0]"
            style={{ textWrap: 'balance' }}
          >
            Your Selected Dishes &amp; Photos Auto-Attach Straight to WhatsApp.
          </h2>
          <p lang="ur" className="font-urdu text-xl text-[#EAB308]">
            آپ کی منتخب ڈشز اور تصاویر خودکار طور پر واٹس ایپ آرڈر کے ساتھ منسلک ہوتی ہیں
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-[#C2D6C9]">
            Any dish you add from the menu automatically appears here with its photo thumbnail and
            quantity. Enter your contact details and dispatch directly to our kitchen WhatsApp{' '}
            <span className="font-mono text-[#EAB308]">{WHATSAPP_DISPLAY_NUMBER}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Auto-Attached Dishes + Photo Visuals + Quick-Add Tray */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl bg-[#071A10]/90 border border-[#84CC16]/25 p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#A3E635]" />
                  <div>
                    <h3 className="text-xl font-semibold text-[#F4F7F0]">
                      Attached Order Dishes ({entries.reduce((s, e) => s + e.quantity, 0)})
                    </h3>
                    <p className="text-xs text-[#9BB7A6]">
                      Synced automatically from your Menu selections
                    </p>
                  </div>
                </div>
                {entries.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-xs text-[#9BB7A6] hover:text-[#A3E635] underline cursor-pointer"
                  >
                    Clear Tray
                  </button>
                )}
              </div>

              {entries.length === 0 ? (
                <div className="py-8 text-center space-y-2 rounded-2xl bg-[#05140C]/80 border border-white/10 px-4">
                  <p className="text-sm font-semibold text-[#F4F7F0]">
                    No dishes attached to this order yet
                  </p>
                  <p className="text-xs text-[#9BB7A6]">
                    Tap any signature dish below to attach it (with its photo) to your WhatsApp
                    order form immediately.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {entries.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#0A2215]/95 border border-[#84CC16]/20 flex items-center gap-3.5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm object-cover shrink-0 border border-[#84CC16]/30"
                      />
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <p className="text-sm font-semibold text-[#F4F7F0] truncate">
                          {item.name}
                        </p>
                        {DISH_URDU_MAP[item.id] && (
                          <p lang="ur" className="font-urdu-body text-xs text-[#EAB308] truncate">
                            {DISH_URDU_MAP[item.id].name}
                          </p>
                        )}
                        <p className="text-xs text-[#9BB7A6]">
                          {item.spice} ·{' '}
                          <span className="font-mono text-[#EAB308] tabular-nums">
                            Rs. {(item.pricePkr * quantity).toLocaleString()}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-7 h-7 rounded-md bg-[#123120] text-[#F4F7F0] flex items-center justify-center hover:bg-[#1B472E] cursor-pointer"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-medium tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-7 h-7 rounded-md bg-[#123120] text-[#F4F7F0] flex items-center justify-center hover:bg-[#1B472E] cursor-pointer"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="w-7 h-7 rounded-md text-[#9BB7A6] hover:text-[#F4F7F0] hover:bg-[#123120] flex items-center justify-center cursor-pointer"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Totals strip */}
              <div className="p-4 rounded-xl bg-[#05140C] border border-white/10 space-y-1.5 text-sm">
                <div className="flex justify-between text-[#9BB7A6]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#9BB7A6]">
                  <span>Delivery (Free over Rs. 2,500)</span>
                  <span className="font-mono tabular-nums">
                    {deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between font-semibold text-[#F4F7F0]">
                  <span>Total Payable</span>
                  <span className="font-mono text-[#A3E635] tabular-nums">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick-Attach Popular Dishes Tray */}
            <div className="rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-tl-xl rounded-br-xl bg-[#071A10]/86 border border-white/15 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A3E635]">
                  Quick-Attach Dishes to Order Form
                </p>
                <span className="text-xs text-[#9BB7A6]">1-Tap Photo Attach</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickAttachItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onAddToCart(item)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B2215]/90 border border-white/10 hover:border-[#84CC16]/60 text-left transition-colors cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#F4F7F0] truncate">{item.name}</p>
                      <p className="text-[11px] font-mono text-[#EAB308] tabular-nums">
                        Rs. {item.pricePkr.toLocaleString()}
                      </p>
                    </div>
                    <Plus className="w-4 h-4 text-[#A3E635] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Form with Auto-Attached Dish Photos + Direct WhatsApp Dispatch */}
          <div className="lg:col-span-6 rounded-tr-[3.25rem] rounded-bl-[3.25rem] rounded-tl-xl rounded-br-xl bg-[#081C12]/92 border border-[#84CC16]/30 p-7 sm:p-9 shadow-2xl space-y-6">
            {confirmedReceipt ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-[#A3E635]">
                  <CheckCircle2 className="w-7 h-7 shrink-0" />
                  <div>
                    <p className="text-xs font-mono uppercase">Order Ready for WhatsApp</p>
                    <h3 className="text-2xl font-semibold text-[#F4F7F0]">
                      {confirmedReceipt.orderId}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#C2D6C9] leading-relaxed">
                  Thank you,{' '}
                  <span className="font-semibold text-[#F4F7F0]">
                    {confirmedReceipt.customerName}
                  </span>
                  . Your order (Rs. {confirmedReceipt.total.toLocaleString()}) with attached dish
                  photos is ready. Click below to deliver it straight to Green Chili Kitchen
                  WhatsApp <span className="font-mono text-[#EAB308]">{WHATSAPP_DISPLAY_NUMBER}</span>.
                </p>

                {/* Attached dish image strip on confirmed receipt */}
                <div className="flex flex-wrap gap-2">
                  {confirmedReceipt.itemsSnapshot.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 p-1.5 pr-3 rounded-lg bg-[#05140C] border border-[#84CC16]/25"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded object-cover"
                      />
                      <span className="text-xs text-[#F4F7F0]">
                        {quantity}x {item.name.split(' ').slice(0, 3).join(' ')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={confirmedReceipt.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-sm font-semibold hover:bg-[#A3E635] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp ({WHATSAPP_DISPLAY_NUMBER})</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyText(confirmedReceipt.whatsappText)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg border border-white/15 bg-[#06150D] text-xs font-medium text-[#F4F7F0] hover:border-[#84CC16] cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#A3E635]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Order Text'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setConfirmedReceipt(null)}
                  className="text-xs text-[#9BB7A6] hover:text-[#A3E635] underline cursor-pointer"
                >
                  Place Another Kitchen Order
                </button>
              </div>
            ) : (
              <form onSubmit={handleValidationSubmit} className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#A3E635]">
                    WhatsApp Order Checkout
                  </p>
                  <h3 className="text-2xl font-semibold text-[#F4F7F0]">
                    Complete Details &amp; Send to {WHATSAPP_DISPLAY_NUMBER}
                  </h3>
                </div>

                {/* Auto-Attached Dish Photos Preview Strip inside the Form! */}
                {entries.length > 0 && (
                  <div className="p-3 rounded-xl bg-[#05140C] border border-[#84CC16]/25 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#A3E635] font-medium">
                        Auto-Attached Dish Photos ({entries.length})
                      </span>
                      <span className="text-[#9BB7A6] font-mono">Included in WhatsApp Order</span>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {entries.map(({ item, quantity }) => (
                        <div
                          key={item.id}
                          className="relative shrink-0 rounded-lg overflow-hidden border border-[#84CC16]/35"
                          title={`${quantity}x ${item.name}`}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-cover"
                          />
                          <span className="absolute bottom-0 right-0 px-1 text-[10px] font-mono font-semibold bg-[#04100A]/90 text-[#A3E635]">
                            {quantity}x
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fulfillment mode */}
                <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#05140C] border border-white/10">
                  <button
                    type="button"
                    onClick={() => setFulfillment('delivery')}
                    className={`py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      fulfillment === 'delivery'
                        ? 'bg-[#84CC16] text-[#07170F]'
                        : 'text-[#C2D6C9] hover:text-[#F4F7F0]'
                    }`}
                  >
                    Home Delivery (COD)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillment('pickup')}
                    className={`py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      fulfillment === 'pickup'
                        ? 'bg-[#84CC16] text-[#07170F]'
                        : 'text-[#C2D6C9] hover:text-[#F4F7F0]'
                    }`}
                  >
                    Self Pickup
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Bilal Ahmed"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#05140C] border border-white/15 text-sm text-[#F4F7F0] placeholder:text-[#6B8776] focus:outline-none focus:border-[#84CC16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                      WhatsApp / Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03XX-XXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#05140C] border border-white/15 text-sm text-[#F4F7F0] placeholder:text-[#6B8776] focus:outline-none focus:border-[#84CC16]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                    Nearest Green Chili Kitchen
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#05140C] border border-white/15 text-sm text-[#F4F7F0] focus:outline-none focus:border-[#84CC16]"
                  >
                    <option>Clifton Block 4, Karachi</option>
                    <option>Gulberg III, Lahore</option>
                    <option>F-7 Markaz, Islamabad</option>
                  </select>
                </div>

                {fulfillment === 'delivery' && (
                  <div>
                    <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                      Complete Delivery Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House / Flat, Street, Phase / Sector"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#05140C] border border-white/15 text-sm text-[#F4F7F0] placeholder:text-[#6B8776] focus:outline-none focus:border-[#84CC16]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-[#B7CEBF] mb-1">
                    Spice / Kitchen Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Extra pudina chutney, light hari mirch"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#05140C] border border-white/15 text-sm text-[#F4F7F0] placeholder:text-[#6B8776] focus:outline-none focus:border-[#84CC16]"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {isFormComplete ? (
                  <a
                    href={liveWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleConfirmSnapshot}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-sm font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      Send Order Direct on WhatsApp ({WHATSAPP_DISPLAY_NUMBER}) · Rs.{' '}
                      {total.toLocaleString()}
                    </span>
                  </a>
                ) : (
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#84CC16] text-[#07170F] text-sm font-semibold hover:bg-[#A3E635] transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      Confirm &amp; Send on WhatsApp ({WHATSAPP_DISPLAY_NUMBER})
                    </span>
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
