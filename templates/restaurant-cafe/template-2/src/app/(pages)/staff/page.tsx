import type { Metadata } from "next";
import { StaffView } from "@/components/pages/staff-view";

export const metadata: Metadata = {
  title: "Our Staff & Chefs | Deny Restaurant",
  description:
    "Meet the passionate culinary team, pizzaiolos, pasta artisans, and hospitality crew behind Deny Restaurant.",
};

export default function StaffPage() {
  return <StaffView />;
}
