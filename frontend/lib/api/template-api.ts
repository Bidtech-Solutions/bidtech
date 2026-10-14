import {
  CarFront,
  Dumbbell,
  Users,
  UtensilsCrossed,
  ShoppingBasket,
  House,
  MirrorRound,
  University,
  Layout,
  type LucideIcon,
} from "lucide-react";
import { TEMPLATES, TEMPLATE_CATEGORIES, type TemplateItem } from "@/lib/data/template";

export interface ApiResponseCategory {
  name: string;
  count: number;
}

export interface ApiTemplatePricing {
  total: number;
  formatted_total: string;
  template_price: number;
  server_price: number;
  service_price: number;
  template_desc?: string;
  server_desc?: string;
  service_desc?: string;
}

export interface ApiTemplateResponseItem {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  description?: string;
  image: string;
  previewHref: string;
  demo_url?: string;
  tags: string[];
  views: number;
  pricing?: ApiTemplatePricing;
  is_active: boolean;
  checkout_url?: string;
}

export interface ExtendedTemplateItem extends TemplateItem {
  views?: number;
  pricing?: ApiTemplatePricing;
  checkout_url?: string;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Otomotif": CarFront,
  "Restaurant": UtensilsCrossed,
  "UMKM": ShoppingBasket,
  "Kecantikan": MirrorRound,
  "Gym": Dumbbell,
  "Komunitas": Users,
  "Konstruksi & Properti": House,
  "Properti": House,
  "Pendidikan": University,
};

export function getCategoryIcon(category: string): LucideIcon {
  return CATEGORY_ICONS[category] || Layout;
}

// Fallback ini hanya untuk dev lokal jika NEXT_PUBLIC_API_URL lupa di-set.
// Di production JANGAN andalkan fallback ini - selalu set NEXT_PUBLIC_API_URL
// (lihat .env.example) agar tidak salah menebak host/port backend.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1"
        ? `${window.location.protocol}//dashboard.${window.location.hostname}`
        : `${window.location.protocol}//${window.location.hostname}:8000`)
    : "http://localhost:8000");

/**
 * Fetch dynamic templates dari Laravel Backend API
 * Memiliki mekanisme fallback otomatis ke data lokal jika backend sedang offline
 */
export async function fetchTemplates(): Promise<{
  templates: ExtendedTemplateItem[];
  categories: ApiResponseCategory[];
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/templates`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 60 },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }

    const json = await res.json();

    if (json.status === "success" && Array.isArray(json.data) && json.data.length > 0) {
      const mappedTemplates: ExtendedTemplateItem[] = json.data.map(
        (item: ApiTemplateResponseItem) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          subcategory: item.subcategory || item.description || "Website profesional siap pakai",
          image: item.image,
          previewHref: item.previewHref || item.demo_url || "#",
          tags: Array.isArray(item.tags) ? item.tags : [item.category, "Responsive"],
          icon: getCategoryIcon(item.category),
          views: item.views ?? 0,
          pricing: item.pricing,
          checkout_url: item.checkout_url,
        })
      );

      return {
        templates: mappedTemplates,
        categories: json.categories && Array.isArray(json.categories) ? json.categories : TEMPLATE_CATEGORIES,
      };
    }
  } catch (err) {
    console.warn("[TemplateApi] Fallback ke data template statis lokal:", err);
  }

  // Fallback aman ke data lokal
  return {
    templates: TEMPLATES,
    categories: TEMPLATE_CATEGORIES,
  };
}

/**
 * Catat penambahan view count saat pengunjung melihat atau membuka live demo template.
 * Mengirim data langsung ke endpoint backend Laravel secara asinkron tanpa memblokir navigasi pengguna.
 */
export async function recordTemplateView(templateId: number): Promise<void> {
  if (!templateId) return;

  // Anti-spam guard: debounce 2 detik untuk menghindari double click berlebihan
  if (typeof window !== "undefined") {
    try {
      const cooldownKey = `bidtech_view_cooldown_${templateId}`;
      const last = sessionStorage.getItem(cooldownKey);
      if (last && Date.now() - parseInt(last, 10) < 2000) {
        return;
      }
      sessionStorage.setItem(cooldownKey, Date.now().toString());
    } catch {
      // Fallback jika sessionStorage tidak dapat diakses
    }
  }

  try {
    const endpoint = `${API_BASE_URL}/api/templates/view/${templateId}`;
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      keepalive: true,
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("bidtech:template-viewed", { detail: { templateId, data } })
          );
        }
      })
      .catch((err) => {
        console.warn("[Bidtech] Gagal mencatat view template:", err);
      });
  } catch {
    // Non-blocking
  }
}

/**
 * Fetch data views terkini dari backend Laravel secara realtime
 */
export async function fetchRealtimeViews(): Promise<Record<number, number> | null> {
  try {
    const endpoint = `${API_BASE_URL}/api/templates/views/realtime`;
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (data.status === "success" && Array.isArray(data.templates)) {
      const map: Record<number, number> = {};
      data.templates.forEach((item: { id: number; views: number }) => {
        map[item.id] = Number(item.views || 0);
      });
      return map;
    }
  } catch (err) {
    console.warn("[Bidtech] Gagal mengambil realtime template views:", err);
  }
  return null;
}
