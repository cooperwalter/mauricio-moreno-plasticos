export const WHATSAPP_PHONE = "525548210917";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
