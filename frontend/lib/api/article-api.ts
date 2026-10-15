import { API_BASE_URL } from "./template-api";
import { BLOG_POSTS } from "@/lib/data/blog";

export interface PublicArticleSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  cover_display_url: string;
  cover_alt_text: string;
  author: {
    name: string;
    photo_url: string | null;
  };
  published_at: string;
  reading_minutes: number;
}

export interface BlockNoteInlineContent {
  type: string;
  text?: string;
  styles?: Record<string, boolean | string>;
  href?: string;
}

export interface BlockNoteBlock {
  id?: string;
  type: string;
  props?: {
    textColor?: string;
    backgroundColor?: string;
    textAlignment?: "left" | "center" | "right" | "justify";
    level?: number;
    url?: string;
    caption?: string;
    alt?: string;
    previewWidth?: number;
    [key: string]: any;
  };
  content?: BlockNoteInlineContent[] | any;
  children?: BlockNoteBlock[];
}

export interface PublicArticleDetail {
  id: number;
  title: string;
  slug: string;
  status: string;
  status_label: string;
  content: BlockNoteBlock[];
  cover_image_url: string | null;
  cover_display_url: string;
  cover_alt_text: string;
  cover_placeholder_url?: string;
  author: {
    name: string;
    photo_url: string | null;
  };
  published_at: string;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
  character_count: number;
  reading_minutes: number;
}

export interface ArticlesPaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

/**
 * Mengambil daftar artikel publik dari API backend Laravel
 * Menggunakan ISR revalidate standar 3600 detik (1 jam)
 */
export async function fetchPublicArticles(options: {
  search?: string;
  page?: number;
  perPage?: number;
} = {}): Promise<{
  articles: PublicArticleSummary[];
  meta: ArticlesPaginationMeta;
}> {
  const query = new URLSearchParams();
  if (options.search) query.set("search", options.search);
  if (options.page) query.set("page", String(options.page));
  if (options.perPage) query.set("per_page", String(options.perPage));

  const url = `${API_BASE_URL}/api/articles${query.toString() ? `?${query.toString()}` : ""}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 3600, tags: ["articles"] },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.status === "success" && Array.isArray(json.data)) {
        return {
          articles: json.data,
          meta: json.meta || {
            current_page: 1,
            last_page: 1,
            per_page: json.data.length,
            total: json.data.length,
          },
        };
      }
    }
  } catch (error) {
    console.warn("fetchPublicArticles fallback to local data:", error);
  }

  // Fallback lokal jika backend tidak terjangkau
  const fallbackList: PublicArticleSummary[] = BLOG_POSTS.map((p, idx) => ({
    id: idx + 1,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    cover_image_url: null,
    cover_display_url: "https://media.bidtech.co.id/bidtech/blog/placeholder.webp",
    cover_alt_text: p.title,
    author: {
      name: p.author.name,
      photo_url: null,
    },
    published_at: new Date().toISOString(),
    reading_minutes: parseInt(p.readTime) || 4,
  }));

  return {
    articles: fallbackList,
    meta: {
      current_page: 1,
      last_page: 1,
      per_page: fallbackList.length,
      total: fallbackList.length,
    },
  };
}

/**
 * Mengambil detail satu artikel publik berdasarkan slug dari API backend
 */
export async function fetchPublicArticleBySlug(slug: string): Promise<PublicArticleDetail | null> {
  const url = `${API_BASE_URL}/api/articles/${encodeURIComponent(slug)}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 3600, tags: [`article-${slug}`, "articles"] },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.status === "success" && json.data) {
        return json.data as PublicArticleDetail;
      }
    }
  } catch (error) {
    console.warn(`fetchPublicArticleBySlug(${slug}) fallback to local data:`, error);
  }

  // Fallback lokal jika artikel ada di data blog lokal
  const fallback = BLOG_POSTS.find((p) => p.slug === slug);
  if (fallback) {
    return {
      id: 999,
      title: fallback.title,
      slug: fallback.slug,
      status: "terbit",
      status_label: "Terbit",
      content: fallback.content.map((c) => ({
        type: "paragraph",
        content: [{ type: "text", text: c, styles: {} }],
        children: [],
      })),
      cover_image_url: null,
      cover_display_url: "https://media.bidtech.co.id/bidtech/blog/placeholder.webp",
      cover_alt_text: fallback.title,
      author: {
        name: fallback.author.name,
        photo_url: null,
      },
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      meta_title: fallback.title,
      meta_description: fallback.excerpt,
      character_count: fallback.content.join(" ").length,
      reading_minutes: parseInt(fallback.readTime) || 4,
    };
  }

  return null;
}
