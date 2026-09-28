"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, getTotalPrice } =
    useCartStore();
  const [customerName, setCustomerName] = useState("");
  const [customerCity, setCustomerCity] = useState("");

  if (!isOpen) return null;

  const total = getTotalPrice();

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let text = "*ORDEN DE COMPRA - TRIESTE FARMA*\n";
    text += "──────────────────────────\n";
    if (customerName.trim()) text += `*Cliente:* ${customerName.trim()}\n`;
    if (customerCity.trim()) text += `*Ciudad/Zona:* ${customerCity.trim()}\n`;
    text += "──────────────────────────\n";
    text += "*Fórmulas Solicitadas:*\n";

    items.forEach((item) => {
      const line = item.price * item.qty;
      text += `• ${item.qty}x ${item.name} (Gs. ${line.toLocaleString("es-PY")})\n`;
    });

    text += "──────────────────────────\n";
    text += `*TOTAL ESTIMADO:* Gs. ${total.toLocaleString("es-PY")}\n\n`;
    text += "¡Hola Trieste Farma! Quisiera coordinar la disponibilidad, método de pago y envío de este pedido.";

    const url = `https://wa.me/595981000000?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-forest-deep/40 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface shadow-2xl flex flex-col border-l border-border-warm animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 bg-surface-ivory border-b border-border-warm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-forest-deep text-[22px]">
                shopping_bag
              </span>
              <h2 className="font-headline-sm text-headline-sm text-forest-deep">
                Tu Carrito Clínico
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1 rounded-full text-text-secondary hover:text-forest-deep hover:bg-surface-container transition-colors cursor-pointer"
              aria-label="Cerrar carrito"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-text-secondary">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 text-forest-deep">
                  <span className="material-symbols-outlined text-[32px]">
                    production_quantity_limits
                  </span>
                </div>
                <p className="font-title-sm text-title-sm text-forest-deep mb-1">
                  Tu carrito está vacío
                </p>
                <p className="font-body-sm text-body-sm text-text-secondary max-w-xs mb-6">
                  Explora nuestro catálogo botánico para potenciar tu vitalidad y rendimiento celular.
                </p>
                <Link
                  href="/catalogo"
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-forest-deep text-surface-ivory rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all"
                >
                  Ver Catálogo
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-surface-ivory border border-border-warm flex gap-4 items-center shadow-xs"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-contain rounded-lg bg-surface-pure p-1 shrink-0 border border-border-warm/60"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-title-sm text-title-sm text-forest-deep truncate">
                      {item.name}
                    </h4>
                    {item.formulation && (
                      <p className="text-[11px] text-text-secondary line-clamp-1">
                        {item.formulation}
                      </p>
                    )}
                    <p className="font-title-sm text-forest-deep font-semibold mt-1">
                      Gs. {(item.price * item.qty).toLocaleString("es-PY")}
                    </p>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center gap-1 bg-surface rounded-lg border border-border-warm px-1.5 py-1">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center text-forest-deep hover:bg-surface-container rounded cursor-pointer"
                      title="Disminuir"
                    >
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <span className="w-6 text-center font-label-sm font-semibold text-forest-deep">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center text-forest-deep hover:bg-surface-container rounded cursor-pointer"
                      title="Aumentar"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-text-secondary hover:text-error transition-colors p-1"
                    title="Eliminar del carrito"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-surface-ivory border-t border-border-warm flex flex-col gap-4">
              {/* Quick Customer Inputs */}
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Tu Nombre (Opcional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-surface-pure border border-border-warm rounded-lg px-3 py-2 text-body-sm font-body-sm text-text-primary placeholder:text-outline-variant focus:outline-none focus:border-forest-deep transition-colors"
                />
                <input
                  type="text"
                  placeholder="Tu Ciudad / Barrio (Opcional)"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="w-full bg-surface-pure border border-border-warm rounded-lg px-3 py-2 text-body-sm font-body-sm text-text-primary placeholder:text-outline-variant focus:outline-none focus:border-forest-deep transition-colors"
                />
              </div>

              {/* Totals */}
              <div className="flex items-center justify-between pt-2 border-t border-border-warm/60">
                <span className="font-label-uppercase text-label-uppercase text-text-secondary font-semibold">
                  Total Estimado
                </span>
                <span className="font-headline-sm text-headline-sm text-forest-deep font-bold">
                  Gs. {total.toLocaleString("es-PY")}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleWhatsAppCheckout}
                  type="button"
                  className="w-full py-3 px-4 bg-forest-deep text-surface-ivory rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-[20px] text-accent-gold-light group-hover:scale-110 transition-transform">
                    chat
                  </span>
                  <span>Pedir vía WhatsApp Directo</span>
                </button>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-2.5 px-4 bg-surface-container border border-border-warm text-forest-deep hover:bg-surface-container-high rounded-lg font-label-md text-label-md text-center transition-all shadow-xs"
                >
                  Finalizar con Envío y Facturación
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
