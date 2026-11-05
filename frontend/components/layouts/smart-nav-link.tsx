"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

import { getSectionHref, isHomePath, scrollToSection } from "@/lib/section-navigation";

type SmartNavLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  onNavigate?: () => void;
};

export function SmartNavLink({ children, className, href, onNavigate }: SmartNavLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHashLink = href.startsWith("#");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    if (!isHashLink) {
      return;
    }

    event.preventDefault();

    if (!isHomePath(pathname)) {
      router.push(getSectionHref(href, pathname));
      return;
    }

    scrollToSection(href);
  };

  return (
    <Link
      className={className}
      href={isHashLink && !isHomePath(pathname) ? getSectionHref(href, pathname) : href}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
