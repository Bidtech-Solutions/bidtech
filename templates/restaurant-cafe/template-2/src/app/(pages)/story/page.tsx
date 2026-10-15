import type { Metadata } from "next";
import { StoryView } from "@/components/pages/story-view";

export const metadata: Metadata = {
  title: "Our Story | Deny Restaurant",
  description:
    "From a single wood-fired oven to a full kitchen: the story, values and people behind Deny Restaurant.",
};

export default function StoryPage() {
  return <StoryView />;
}
