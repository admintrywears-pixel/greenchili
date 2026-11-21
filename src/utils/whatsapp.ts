import type { CartEntry } from '../components/OrderDrawer';

export const WHATSAPP_DISPLAY_NUMBER = '+92 318 5519151';
export const WHATSAPP_RAW_NUMBER = '923185519151';

export interface WhatsAppOrderPayload {
  orderId: string;
  entries: CartEntry[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  phone: string;
  fulfillment: 'delivery' | 'pickup';
  branch: string;
  address?: string;
  notes?: string;
}

export function buildWhatsAppOrderText(payload: WhatsAppOrderPayload): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const itemLines = payload.entries.map((e, index) => {
    const lineTotal = (e.item.pricePkr * e.quantity).toLocaleString();
    const imgUrl = origin ? `${origin}${e.item.image}` : e.item.image;
    return `${index + 1}. ${e.quantity}x ${e.item.name} (${e.item.spice}) — Rs. ${lineTotal}\n   Photo: ${imgUrl}`;
  });

  const lines = [
    `*GREEN CHILI™ — NEW KITCHEN ORDER*`,
    `Order Ref: *${payload.orderId}*`,
    `Mode: ${payload.fulfillment === 'delivery' ? 'Home Delivery (COD)' : 'Self Pickup'}`,
    `Branch: ${payload.branch}`,
    ``,
    `*Attached Dishes (${payload.entries.reduce((s, e) => s + e.quantity, 0)} items):*`,
    ...itemLines,
    ``,
    `Subtotal: Rs. ${payload.subtotal.toLocaleString()}`,
    `Delivery Fee: ${payload.deliveryFee === 0 ? 'Free' : `Rs. ${payload.deliveryFee}`}`,
    `*Total Payable: Rs. ${payload.total.toLocaleString()}*`,
    ``,
    `*Customer Details:*`,
    `Name: ${payload.customerName}`,
    `Phone: ${payload.phone}`,
  ];

  if (payload.fulfillment === 'delivery' && payload.address) {
    lines.push(`Address: ${payload.address}`);
  }
  if (payload.notes?.trim()) {
    lines.push(`Notes: ${payload.notes.trim()}`);
  }
  lines.push('', '100% Red-Chilli-Free Kitchen · Sent via Green Chili Web');
  return lines.join('\n');
}

export function buildWhatsAppOrderUrl(payload: WhatsAppOrderPayload): string {
  const text = buildWhatsAppOrderText(payload);
  return `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppContactUrl(params: {
  name: string;
  phone: string;
  topic: string;
  branch: string;
  message: string;
}): string {
  const lines = [
    `*GREEN CHILI™ — WEBSITE INQUIRY*`,
    `Topic: ${params.topic}`,
    `Branch: ${params.branch}`,
    `Name: ${params.name}`,
    `Phone: ${params.phone}`,
    ``,
    `Message:`,
    params.message,
  ];
  return `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}
