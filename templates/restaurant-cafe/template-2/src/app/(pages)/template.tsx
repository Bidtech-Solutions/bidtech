import { Navbar, Footer } from "@/components/sections";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

/**
 * Shared frame for the Categories / Dishes / Menu / Story pages.
 * Same navbar, smooth scroll and footer as the landing page.
 */
export default function PagesTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <Navbar />
      <SmoothScrollProvider>
        <main>{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </div>
  );
}
