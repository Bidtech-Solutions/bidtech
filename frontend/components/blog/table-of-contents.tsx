"use client";

import { useEffect, useState } from "react";
import { HeadingItem } from "./block-renderer";
import { ListOrdered, ChevronDown } from "lucide-react";

interface TableOfContentsProps {
  headings: HeadingItem[];
  variant?: "mobile" | "desktop" | "all";
}

export function TableOfContents({ headings, variant = "all" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 140;

      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollY;
          if (scrollY >= top - offset) {
            setActiveId(headings[i].id);
            return;
          }
        }
      }

      if (headings[0]) {
        setActiveId(headings[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  if (!headings || headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
      setIsOpenMobile(false);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const showMobile = variant === "mobile" || variant === "all";
  const showDesktop = variant === "desktop" || variant === "all";

  return (
    <>
      {/* Mobile Drawer / Collapsible Box */}
      {showMobile && (
        <div className="lg:hidden mb-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-2xs">
          <button
            type="button"
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="w-full flex items-center justify-between font-bold text-sm text-slate-800"
          >
            <div className="flex items-center gap-2">
              <ListOrdered className="size-4 text-[#45a02e]" />
              <span>Daftar Isi Artikel ({headings.length})</span>
            </div>
            <ChevronDown
              className={`size-4 text-slate-500 transition-transform duration-200 ${
                isOpenMobile ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpenMobile && (
            <nav className="mt-3 pt-3 border-t border-slate-200/80 space-y-1.5 text-xs">
              {headings.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`block py-1.5 px-2 rounded-lg transition-colors ${
                    item.level === 3 ? "pl-4 text-slate-600" : "font-medium"
                  } ${
                    activeId === item.id
                      ? "bg-[#eaf7e7] text-[#388324] font-bold"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          )}
        </div>
      )}

      {/* Desktop Sticky Card */}
      {showDesktop && (
        <div className="hidden lg:block sticky top-28 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <div className="flex items-center gap-2 pb-3.5 mb-3 border-b border-slate-100">
            <ListOrdered className="size-4 text-[#45a02e]" />
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">Daftar Isi</h3>
          </div>

          <nav
            aria-label="Daftar Isi Artikel"
            className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs"
          >
            {headings.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`group flex items-start gap-2 py-1.5 px-2 rounded-lg transition-all ${
                    item.level === 3 ? "pl-5 text-slate-500" : "font-medium"
                  } ${
                    isActive
                      ? "bg-[#eaf7e7] text-[#388324] font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full mt-1.5 shrink-0 transition-colors ${
                      isActive ? "bg-[#45a02e]" : "bg-slate-300 group-hover:bg-slate-400"
                    }`}
                  />
                  <span className="leading-snug line-clamp-2">{item.text}</span>
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
