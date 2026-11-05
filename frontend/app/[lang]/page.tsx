import { HomeView } from "@/components/home/home-view";

export function generateStaticParams() {
  return [{ lang: "id" }, { lang: "en" }];
}

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  await params;
  return <HomeView />;
}

