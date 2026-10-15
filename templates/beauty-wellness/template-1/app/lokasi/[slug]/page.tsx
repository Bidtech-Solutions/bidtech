import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { siteConfig } from "@/data/site";
import { 
  getAllLocationSlugs, 
  getLocationBySlug, 
  locationBranches 
} from "@/data/locations";
import { LocationDetailClient } from "@/components/location/LocationDetailClient";

type LocationDetailPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: LocationDetailPageProps): Metadata {
  const branch = getLocationBySlug(params.slug);

  if (!branch) {
    return { title: `Lokasi Cabang | ${siteConfig.brand.name}` };
  }

  return {
    title: `${branch.name} — ${branch.city} | ${siteConfig.brand.name}`,
    description: branch.description,
  };
}

export default function LocationDetailPage({ params }: LocationDetailPageProps) {
  const branch = getLocationBySlug(params.slug);

  if (!branch) {
    notFound();
  }

  const otherBranches = locationBranches
    .filter((b) => b.slug !== branch.slug)
    .slice(0, 3);

  return <LocationDetailClient branch={branch} otherBranches={otherBranches} />;
}
