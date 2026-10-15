import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMenuItemById, menuItems, formatRupiah } from "@/lib/restaurant-data";
import { getLocalizedMenuItem } from "@/lib/i18n-data";
import { MenuDetailView } from "@/components/pages/menu-detail-view";

interface DishDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return menuItems.map((dish) => ({
    id: dish.id,
  }));
}

export async function generateMetadata({
  params,
}: DishDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const rawItem = getMenuItemById(id);

  if (!rawItem) {
    return {
      title: "Hidangan Tidak Ditemukan | Deny Restaurant",
      description: "Hidangan yang dicari tidak ditemukan dalam daftar menu kami.",
    };
  }

  const item = getLocalizedMenuItem(rawItem, "id");

  return {
    title: `${item.name} — Detail Menu | Deny Restaurant`,
    description: `${item.description} Diracik segar di Deny Restaurant. Harga: ${formatRupiah(item.price)}. Waktu saji: ${item.prepTime}.`,
    openGraph: {
      title: `${item.name} | Deny Restaurant`,
      description: item.description,
      images: [
        {
          url: item.image,
          width: 1200,
          height: 800,
          alt: item.name,
        },
      ],
    },
  };
}

export default async function DishDetailPage({ params }: DishDetailPageProps) {
  const { id } = await params;
  const item = getMenuItemById(id);

  if (!item) {
    notFound();
  }

  return <MenuDetailView item={item} />;
}
