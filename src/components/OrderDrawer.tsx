import { useMemo, useState, type FormEvent } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import type { MenuItem } from '../data/restaurantData';
import { WHATSAPP_DISPLAY_NUMBER, buildWhatsAppOrderUrl } from '../utils/whatsapp';

export interface CartEntry {
  item: MenuItem;
  quantity: number;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entries: CartEntry[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenOrdersPage: () => void;
}

export default function OrderDrawer({
  isOpen,
  onClose,
  entries,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onOpenOrdersPage,
}: OrderDrawerProps) {
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [branch, setBranch] = useState('Clifton Block 4, Karachi');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    total: number;
    customerName: string;
    fulfillment: 'delivery' | 'pickup';
    branch: string;
    whatsappUrl: string;
  } | null>(null);

  const subtotal = useMemo(
    () => entries.reduce((sum, e) => sum + e.item.pricePkr * e.quantity, 0),
    [entries]
  );
  const deliveryFee = fulfillment === 'delivery' && subtotal > 0 && subtotal < 2500 ? 180 : 0;
  const total = subtotal + deliveryFee;

  const isReady =
    entries.length > 0 &&
    customerName.trim().length > 0 &&
    phone.trim().length > 0 &&
    (fulfillment === 'pickup' || address.trim().length > 0);

  const liveWhatsappUrl = useMemo(
    () =>
      buildWhatsAppOrderUrl({
        orderId: `GC-${Math.floor(1000 + (subtotal % 8999))}`,
        entries,
        subtotal,
        deliveryFee,
        total,
        customerName: customerName.trim() || 'Guest',
        phone: phone.trim() || 'Not provided',
        fulfillment,
        branch,
        address: address.trim(),
      }),
    [entries, subtotal, deliveryFee, total, customerName, phone, fulfillment, branch, address]
  );

  if (!isOpen) return null;

  const finalizeOrder = () => {
    const orderId = `GC-${Math.floor(1000 + Math.random() * 8999)}`;
    const whatsappUrl = buildWhatsAppOrderUrl({
      orderId,
      entries,
      subtotal,
      deliveryFee,
      total,
      customerName: customerName.trim(),
      phone: phone.trim(),
      fulfillment,
      branch,
      address: address.trim(),
    });
    setErrorMsg('');
    setConfirmedOrder({
      orderId,
      total,
      customerName: customerName.trim(),
      fulfillment,
      branch,
      whatsappUrl,
    });
    onClearCart();
  };

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || (fulfillment === 'delivery' && !address.trim())) {
      setErrorMsg('Please fill in your name, phone number, and delivery address.');
      return;
    }
    finalizeOrder();
  };

  const resetAndClose = () => {
    setConfirmedOrder(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#04100A]/75"
      role="dialog"
      aria-modal="true"
      aria-label="Your Green Chilli Order Bag"
    >
      <div className="w-full max-w-md h-full bg-[#F4F7F0] text-[#0B2418] flex flex-col shadow-2xl border-l border-[#0B2418]/15">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#0B2418]/10 flex items-center justify-between bg-[#EAF0E3]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#4D7C0F]" />
            <h2 className="text-lg font-semibold">Your Kitchen Order</h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="p-2 rounded-lg text-[#354E3F] hover:bg-[#0B2418]/10 hover:text-[#0B2418] transition-colors cursor-pointer"
            aria-label="Close order drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {confirmedOrder ? (
            <div className="p-6 rounded-xl bg-white border border-[#4D7C0F]/30 space-y-4">
              <div className="flex items-center gap-2.5 text-[#4D7C0F]">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider">Order Confirmed</p>
                  <h3 className="text-xl font-semibold text-[#0B2418]">
                    {confirmedOrder.orderId}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-[#3E5648] leading-relaxed">
                Thank you,{' '}
                <span className="font-semibold text-[#0B2418]">
                  {confirmedOrder.customerName}
                </span>
                . Your 100% red-chilli-free order for{' '}
                <span className="font-semibold">{confirmedOrder.branch}</span> is ready to send to
                WhatsApp <span className="font-mono">{WHATSAPP_DISPLAY_NUMBER}</span>.
              </p>
              <div className="pt-3 border-t border-[#0B2418]/10 flex items-center justify-between text-sm">
                <span className="text-[#4F6859]">
                  {confirmedOrder.fulfillment === 'delivery'
                    ? 'Cash on Delivery Total'
                    : 'Pickup Counter Total'}
                </span>
                <span className="font-mono font-semibold tabular-nums text-[#0B2418]">
                  Rs. {confirmedOrder.total.toLocaleString()}
                </span>
              </div>
              <a
                href={confirmedOrder.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#65A30D] text-[#07170F] text-sm font-semibold hover:bg-[#84CC16] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send to WhatsApp ({WHATSAPP_DISPLAY_NUMBER})</span>
              </a>
              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-2.5 rounded-lg bg-[#0B2418] text-[#F4F7F0] text-sm font-semibold hover:bg-[#19442E] transition-colors cursor-pointer"
              >
                Back to Kitchen
              </button>
            </div>
          ) : entries.length === 0 ? (
            <div className="py-14 text-center space-y-4">
              <p className="text-base font-semibold text-[#0B2418]">Your order bag is empty</p>
              <p className="text-sm text-[#4F6859]">
                Add a clay handi, Karachi nehari, green pizza, or loaded fries—or open the full
                Orders section to quick-attach items.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenOrdersPage();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0B2418] text-[#F4F7F0] text-xs font-semibold hover:bg-[#19442E] cursor-pointer"
              >
                <span>Open Full Orders Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenOrdersPage();
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#E1ECD7] text-[#0B2418] text-xs font-semibold hover:bg-[#D2E4C2] transition-colors cursor-pointer"
              >
                <span>Open Full Orders &amp; Attached Photo Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Itemized list with attached Dish Photos */}
              <div className="space-y-3">
                {entries.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white border border-[#0B2418]/10 flex items-center gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#0B2418]/10"
                    />
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0B2418] truncate">{item.name}</p>
                      <p className="text-xs text-[#4F6859] font-mono tabular-nums">
                        Rs. {(item.pricePkr * quantity).toLocaleString()} · {item.spice}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="w-7 h-7 rounded-md bg-[#E5ECE0] text-[#0B2418] flex items-center justify-center hover:bg-[#D4E2CA] cursor-pointer"
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
                        className="w-7 h-7 rounded-md bg-[#E5ECE0] text-[#0B2418] flex items-center justify-center hover:bg-[#D4E2CA] cursor-pointer"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="w-7 h-7 rounded-md text-[#6E5629] hover:bg-[#E5ECE0] flex items-center justify-center cursor-pointer"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fulfillment Mode */}
              <div className="space-y-3 pt-2 border-t border-[#0B2418]/10">
                <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-[#E5ECE0]">
                  <button
                    type="button"
                    onClick={() => setFulfillment('delivery')}
                    className={`py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      fulfillment === 'delivery'
                        ? 'bg-[#0B2418] text-[#F4F7F0]'
                        : 'text-[#354E3F] hover:text-[#0B2418]'
                    }`}
                  >
                    Home Delivery (COD)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillment('pickup')}
                    className={`py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      fulfillment === 'pickup'
                        ? 'bg-[#0B2418] text-[#F4F7F0]'
                        : 'text-[#354E3F] hover:text-[#0B2418]'
                    }`}
                  >
                    Self Pickup
                  </button>
                </div>

                {/* Totals */}
                <div className="p-4 rounded-xl bg-white border border-[#0B2418]/10 space-y-2 text-sm">
                  <div className="flex justify-between text-[#4F6859]">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#4F6859]">
                    <span>Delivery (Free over Rs. 2,500)</span>
                    <span className="font-mono tabular-nums">
                      {deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#0B2418]/10 flex justify-between font-semibold text-[#0B2418]">
                    <span>Total Payable</span>
                    <span className="font-mono tabular-nums">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Customer Form */}
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#354E3F] mb-1">
                      Kitchen Branch
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#0B2418]/15 text-sm text-[#0B2418] focus:outline-none focus:border-[#4D7C0F]"
                    >
                      <option>Clifton Block 4, Karachi</option>
                      <option>Gulberg III, Lahore</option>
                      <option>F-7 Markaz, Islamabad</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#354E3F] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Hamza Tariq"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#0B2418]/15 text-sm text-[#0B2418] focus:outline-none focus:border-[#4D7C0F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#354E3F] mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03XX-XXXXXXX"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#0B2418]/15 text-sm text-[#0B2418] focus:outline-none focus:border-[#4D7C0F]"
                    />
                  </div>
                  {fulfillment === 'delivery' && (
                    <div>
                      <label className="block text-xs font-medium text-[#354E3F] mb-1">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House, Street & Sector"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#0B2418]/15 text-sm text-[#0B2418] focus:outline-none focus:border-[#4D7C0F]"
                      />
                    </div>
                  )}

                  {errorMsg && (
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-xs font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                </form>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {!confirmedOrder && entries.length > 0 && (
          <div className="p-5 border-t border-[#0B2418]/10 bg-white">
            {isReady ? (
              <a
                href={liveWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={finalizeOrder}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#0B2418] text-[#F4F7F0] text-sm font-semibold hover:bg-[#19442E] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#A3E635]" />
                <span>Send on WhatsApp ({WHATSAPP_DISPLAY_NUMBER}) · Rs. {total.toLocaleString()}</span>
              </a>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3 rounded-lg bg-[#0B2418] text-[#F4F7F0] text-sm font-semibold hover:bg-[#19442E] transition-colors cursor-pointer"
              >
                Confirm &amp; Send on WhatsApp · Rs. {total.toLocaleString()}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
