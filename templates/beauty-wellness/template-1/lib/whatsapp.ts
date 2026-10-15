import { siteConfig } from "@/data/site";

export function createWhatsAppUrl(message?: string) {
  const defaultMessage = `Halo Admin ${siteConfig.brand.name}, saya ingin konsultasi mengenai paket membership dan fasilitas gym di ${siteConfig.brand.name}.`;
  const text = message && message.trim().length > 0 ? message.trim() : defaultMessage;

  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}