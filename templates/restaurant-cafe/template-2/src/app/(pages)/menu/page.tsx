import { Suspense } from "react";
import type { Metadata } from "next";
import { MenuView } from "@/components/pages/menu-view";

export const metadata: Metadata = {
  title: "Menu | Deny Restaurant",
  description:
    "Browse the full Deny Restaurant menu. Wood-fired pizza, smash burgers, fresh pasta, starters, desserts and craft drinks.",
};

export default function MenuPage() {
  // MenuView reads the ?category= param, which needs a Suspense boundary.
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <MenuView />
    </Suspense>
  );
}
