"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart";

export function Header() {
  const pathname = usePathname();
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "INICIO" },
    { href: "/catalogo", label: "CATÁLOGO" },
    { href: "/#recomendador", label: "RECOMENDACIONES" },
    { href: "/#filosofia", label: "GUÍA CLÍNICA" },
    { href: "/#como-comprar", label: "CÓMO COMPRAR" },
    { href: "/#faq", label: "CONTACTO" },
  ];

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 sm:px-8 md:px-12 lg:px-16 pointer-events-none transition-all">
      <header className="pointer-events-auto w-full max-w-[1400px] bg-white/95 backdrop-blur-md border-b border-x border-[#E5DFD3]/90 shadow-[0_12px_36px_-8px_rgba(10,43,33,0.10)] rounded-t-none rounded-b-2xl md:rounded-b-[28px] px-5 sm:px-8 md:px-10 py-3 sm:py-3.5 flex items-center justify-between gap-4 md:gap-6 transition-all">
        {/* Brand Logo - Far Left */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 group">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-smUGatlX6gcRtizy9kztinUgWg13h3y5uQLMIx8pGuQRiQq0oxaxBM0Upv2wHBdN_PyQGf9ohAOb0igwqVENW5lSKtdkIoSokOAa8JYMn4rcnVXrLx4fRFDjlAPxbb27YKax_bZKt6WckYg7CfLY99USwgsscdsrp6yxPqbDdtadSRFLPNVNVsQOJW_RdFdhFCo1KJFEDES4jCD0omiR8qSi-8IYwEPR2DqjAhw4a1oBFCLED0aCVW6Zi1CVAtTrtTE"
            alt="Trieste Farma"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shadow-xs ring-1 ring-accent-gold-dark/30 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col text-left">
            <span className="font-body-md text-[16px] sm:text-[18px] font-bold tracking-tight text-forest-deep leading-tight">
              TRIESTE FARMA
            </span>
            <span className="font-label-uppercase text-[8px] sm:text-[9.5px] tracking-[0.2em] text-accent-gold-dark font-semibold leading-none mt-0.5">
              BOTANICAL APOTHECARY
            </span>
          </div>
        </Link>

        {/* Center Nav Links - Clean uppercase styling */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 font-label-uppercase text-[11px] xl:text-[11.5px] tracking-[0.14em] font-semibold text-text-secondary">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors whitespace-nowrap py-1 ${
                  isActive
                    ? "text-forest-deep font-bold underline decoration-accent-gold-dark decoration-2 underline-offset-8"
                    : "hover:text-forest-deep"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls - Far Right matching the reference layout */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Filled Pill CTA Button (Asesoría Clínica / I AM A PATIENT style) */}
          <a
            href="https://wa.me/595981000000?text=Hola%20Trieste%20Farma,%20quisiera%20asesoramiento%20cl%C3%ADnico%20sobre%20suplementos."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-4 md:px-5 py-2 bg-forest-deep text-surface-ivory hover:bg-primary-container rounded-full font-label-uppercase text-[11px] md:text-[11.5px] tracking-wider font-bold transition-all shadow-xs hover:shadow-sm"
          >
            ASESORÍA CLÍNICA
          </a>

          {/* Outlined Pill Button (Catálogo / I AM A HCP style) */}
          <Link
            href="/catalogo"
            className="hidden md:inline-flex items-center justify-center px-4 md:px-5 py-2 border border-forest-deep/80 hover:bg-forest-deep hover:text-white text-forest-deep rounded-full font-label-uppercase text-[11px] md:text-[11.5px] tracking-wider font-bold transition-all"
          >
            CATÁLOGO
          </Link>

          {/* Circular User Profile / Help Button */}
          <a
            href="#filosofia"
            aria-label="Perfil y Guía"
            title="Guía y Protocolos"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border-warm hover:border-forest-deep text-forest-deep hover:bg-surface-container flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
          </a>

          {/* Circular Cart Button with Badge */}
          <button
            aria-label="Ver carrito de compras"
            onClick={toggleCart}
            type="button"
            title="Ver carrito de compras"
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-forest-deep/20 hover:border-forest-deep bg-surface-pure hover:bg-forest-deep hover:text-surface-ivory text-forest-deep flex items-center justify-center transition-all cursor-pointer shadow-xs group/cart"
          >
            <span className="material-symbols-outlined text-[19px]">shopping_bag</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-gold-dark text-surface-pure text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center shadow-xs animate-in zoom-in-50">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-label="Abrir menú de navegación"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full border border-border-warm hover:border-forest-deep text-forest-deep flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile Dropdown Menu if toggled */}
        {mobileMenuOpen && (
          <div className="absolute top-[calc(100%+12px)] inset-x-2 sm:inset-x-6 bg-white/98 backdrop-blur-xl border border-[#E5DFD3] rounded-3xl p-6 shadow-2xl flex flex-col gap-4 lg:hidden pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-3 font-label-uppercase text-xs font-semibold text-text-secondary tracking-widest">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-xl hover:bg-surface-container hover:text-forest-deep transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-3 border-t border-border-warm flex flex-col gap-2.5">
              <a
                href="https://wa.me/595981000000?text=Hola%20Trieste%20Farma,%20quisiera%20asesoramiento%20cl%C3%ADnico%20sobre%20suplementos."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-forest-deep text-surface-ivory rounded-full text-xs font-bold uppercase tracking-wider"
              >
                ASESORÍA CLÍNICA
              </a>
              <Link
                href="/catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 border border-forest-deep text-forest-deep rounded-full text-xs font-bold uppercase tracking-wider"
              >
                CATÁLOGO COMPLETO
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
