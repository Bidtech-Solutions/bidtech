import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { siteConfig } from "@/data/site";
import { getTrainerBySlug, trainers } from "@/data/trainers";
import { TrainerDetailClient } from "@/components/trainer/TrainerDetailClient";

type TrainerDetailPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return trainers.map((trainer) => ({ slug: trainer.slug }));
}

export function generateMetadata({ params }: TrainerDetailPageProps): Metadata {
  const trainer = getTrainerBySlug(params.slug);

  if (!trainer) {
    return { title: `Trainer | ${siteConfig.brand.name}` };
  }

  return {
    title: `${trainer.name} — ${trainer.role} | ${siteConfig.brand.name}`,
    description: trainer.bio[0] || "",
  };
}

export default function TrainerDetailPage({ params }: TrainerDetailPageProps) {
  const trainer = getTrainerBySlug(params.slug);

  if (!trainer) {
    notFound();
  }

  const otherTrainers = trainers.filter((t) => t.slug !== trainer.slug).slice(0, 3);

  return <TrainerDetailClient trainer={trainer} otherTrainers={otherTrainers} />;
}
