"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS } from "@/lib/data/navigation";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu automatically on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    // Ignore repeat clicks to the same route
    if (pathname === href) {
      e.preventDefault();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-space-800 bg-space-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            prefetch={true}
            onClick={(e) => handleLinkClick("/", e)}
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 rounded-lg p-1 shrink-0"
            aria-label="FlameLens Home"
            aria-current={pathname === "/" ? "page" : undefined}
          >
            <Logo size={34} />
          </Link>

          {/* Desktop Navigation Links (with prefetch & aria-current) */}
          <nav
            className="hidden xl:flex items-center gap-1 overflow-x-auto py-1 scrollbar-none"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  onClick={(e) => handleLinkClick(item.href, e)}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                    isActive
                      ? "text-ember-400 bg-space-900 border border-ember-500/30 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-space-900/60"
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-500`}
                >
                  {item.name}
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-ember-500/20 text-ember-400 font-bold border border-ember-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Medium screen condensed navigation */}
          <nav
            className="hidden md:flex xl:hidden items-center gap-1 overflow-x-auto py-1"
            aria-label="Main Navigation Condensed"
          >
            {NAV_LINKS.slice(0, 5).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  onClick={(e) => handleLinkClick(item.href, e)}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-2 py-1.5 rounded-lg text-xs font-medium ${
                    isActive
                      ? "text-ember-400 bg-space-900 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-space-900/60"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-xs px-2 py-1.5 text-slate-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 rounded"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle extra navigation links"
            >
              More &hellip;
            </button>
          </nav>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-space-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-space-800 bg-space-950 px-4 pt-2 pb-5 space-y-1 max-h-[80vh] overflow-y-auto">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                onClick={(e) => handleLinkClick(item.href, e)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "text-ember-400 bg-space-900 border border-ember-500/30 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-space-900/60"
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-500`}
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-ember-500/20 text-ember-400 font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

