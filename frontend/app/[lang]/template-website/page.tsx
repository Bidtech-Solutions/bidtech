import { TemplateWebsiteView } from "@/components/template-website/template-website-view";

export function generateStaticParams() {
  return [{ lang: "id" }, { lang: "en" }];
}

export default async function LangTemplateWebsitePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  await params;
  return <TemplateWebsiteView />;
}

