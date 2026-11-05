import type { ReactNode } from "react";

export function generateStaticParams() {
  return [{ lang: "id" }, { lang: "en" }];
}

export default async function LangRootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  await params;
  return <>{children}</>;
}
