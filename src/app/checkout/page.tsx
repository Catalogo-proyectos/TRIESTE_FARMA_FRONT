"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/store/cart";

export default function CheckoutPage() {
  const { items, updateQty, removeItem, getTotalPrice, clearCart } = useCartStore();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Asunción");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [shippingMethod, setShippingMethod] = useState<"express" | "interior" | "pickup">("express");
  const [paymentMethod, setPaymentMethod] = useState<"transfer" | "cash" | "card">("transfer");
  const [submitted, setSubmitted] = useState(false);

  const subtotal = getTotalPrice();

  const shippingCost =
    shippingMethod === "express" ? 25000 : shippingMethod === "interior" ? 35000 : 0;

  const total = subtotal + shippingCost;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || (shippingMethod !== "pickup" && !address.trim())) {
      alert("Por favor completa los campos requeridos marcados con *");
      return;
    }

    if (items.length === 0) {
      alert("Tu carrito está vacío. Agrega suplementos antes de continuar.");
      return;
    }

    let msg = `*ORDEN DE COMPRA - TRIESTE FARMA*\n`;
    msg += `──────────────────────────\n`;
    msg += `*Cliente:* ${fullName.trim()}\n`;
    msg += `*Teléfono/WA:* ${phone.trim()}\n`;
    msg += `*Ciudad/Zona:* ${city}\n`;
    if (shippingMethod !== "pickup") {
      msg += `*Dirección:* ${address.trim()}\n`;
    }
    msg += `*Modalidad:* ${
      shippingMethod === "express"
        ? "Delivery Express (Asunción / Central)"
        : shippingMethod === "interior"
        ? "Envío al Interior (Asegurado)"
        : "Retiro en Farmacia / Local"
    }\n`;
    msg += `*Pago Preferido:* ${
      paymentMethod === "transfer"
        ? "Transferencia / QR SIPAP"
        : paymentMethod === "cash"
        ? "Efectivo contra entrega"
        : "Tarjeta de Crédito / Débito (Link)"
    }\n`;
    if (notes.trim()) {
      msg += `*Notas:* ${notes.trim()}\n`;
    }
    msg += `──────────────────────────\n`;
    msg += `*Fórmulas Solicitadas:*\n`;

    items.forEach((item) => {
      const lineTotal = item.price * item.qty;
      msg += `• ${item.qty}x ${item.name} — Gs. ${lineTotal.toLocaleString("es-PY")}\n`;
    });

    msg += `──────────────────────────\n`;
    msg += `*Subtotal:* Gs. ${subtotal.toLocaleString("es-PY")}\n`;
    msg += `*Envío:* ${shippingCost > 0 ? `Gs. ${shippingCost.toLocaleString("es-PY")}` : "Gratis"}\n`;
    msg += `*TOTAL FINAL:* Gs. ${total.toLocaleString("es-PY")}\n\n`;
    msg += `¡Hola! Acabo de completar mis datos para la orden de compra. Por favor confirmen stock y datos de facturación para proceder.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/595981000000?text=${encoded}`, "_blank");
    setSubmitted(true);
  };

  return (
    <>
      <Header />

      <main className="w-full pt-24 bg-surface min-h-[calc(100vh-80px)] flex flex-col">
        {/* Progress Nav */}
        <div className="w-full bg-surface-ivory py-4 px-4 md:px-margin border-b border-border-warm">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/catalogo"
              className="flex items-center gap-2 text-text-secondary hover:text-forest-deep transition-colors font-body-sm text-body-sm group"
            >
              <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span>Continuar comprando</span>
            </Link>

            <nav
              aria-label="Progreso de compra"
              className="flex items-center gap-2 sm:gap-3 bg-surface-container-low px-4 py-2 rounded-full border border-border-warm shadow-xs"
            >
              <div className="flex items-center gap-1.5 text-surface-tint font-label-sm text-label-sm">
                <span
                  className="material-symbols-outlined text-[16px] text-surface-tint"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span className="font-medium">1. Carrito</span>
              </div>
              <span className="text-outline-variant font-label-sm text-label-sm">/</span>
              <div className="flex items-center gap-1.5 bg-forest-deep text-surface-ivory px-2.5 py-0.5 rounded-full font-label-sm text-label-sm shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold-light animate-pulse"></span>
                <span className="font-semibold">2. Entrega & Datos</span>
              </div>
              <span className="text-outline-variant font-label-sm text-label-sm">/</span>
              <div className="flex items-center gap-1.5 text-text-secondary font-label-sm text-label-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                <span>3. WhatsApp</span>
              </div>
            </nav>
          </div>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-6xl mx-auto px-4 md:px-margin py-8">
          {submitted ? (
            <div className="bg-surface-ivory rounded-2xl border border-border-warm p-8 text-center max-w-xl mx-auto shadow-md">
              <div className="w-16 h-16 rounded-full bg-primary-container text-accent-gold-light flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[32px]">check</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-forest-deep mb-2">
                ¡Orden Enviada a WhatsApp!
              </h2>
              <p className="font-body-md text-body-md text-text-secondary mb-6 leading-relaxed">
                Hemos generado el detalle completo de tu compra. Nuestro equipo farmacéutico te responderá a la brevedad para coordinar la entrega y el pago.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="px-6 py-2.5 bg-forest-deep text-surface-ivory rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all"
                >
                  Volver al Inicio
                </Link>
                <button
                  onClick={() => {
                    clearCart();
                    setSubmitted(false);
                  }}
                  className="px-6 py-2.5 bg-surface-container border border-border-warm text-forest-deep rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-all cursor-pointer"
                >
                  Limpiar Carrito
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Details */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* 1. Recipient Details */}
                <div className="bg-surface-ivory rounded-xl p-6 sm:p-8 border border-border-warm shadow-xs">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-accent-gold-light flex items-center justify-center font-label-sm text-label-sm font-bold">
                        01
                      </div>
                      <h2 className="font-headline-sm text-headline-sm text-forest-deep">
                        Contacto & Destinatario
                      </h2>
                    </div>
                    <span className="font-label-uppercase text-label-uppercase bg-surface-container text-text-secondary px-2.5 py-1 rounded border border-border-warm">
                      Requerido
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-uppercase text-[11px] text-text-secondary font-semibold">
                        Nombre y Apellido *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej: Dra. Valeria Morales"
                        className="w-full bg-surface-pure border border-border-warm rounded-lg px-4 py-2.5 font-body-md text-body-md text-text-primary placeholder:text-outline-variant focus:outline-none focus:border-forest-deep transition-colors shadow-xs"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-uppercase text-[11px] text-text-secondary font-semibold">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ej: 0981 123 456"
                        className="w-full bg-surface-pure border border-border-warm rounded-lg px-4 py-2.5 font-body-md text-body-md text-text-primary placeholder:text-outline-variant focus:outline-none focus:border-forest-deep transition-colors shadow-xs"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-uppercase text-[11px] text-text-secondary font-semibold">
                        Ciudad / Departamento *
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-surface-pure border border-border-warm rounded-lg px-4 py-2.5 font-body-md text-body-md text-text-primary focus:outline-none focus:border-forest-deep transition-colors shadow-xs cursor-pointer"
                      >
                        <option value="Asunción">Asunción</option>
                        <option value="San Lorenzo">San Lorenzo</option>
                        <option value="Fernando de la Mora">Fernando de la Mora</option>
                        <option value="Luque">Luque</option>
                        <option value="Lambaré">Lambaré</option>
                        <option value="Mariano Roque Alonso">Mariano Roque Alonso</option>
                        <option value="Ciudad del Este">Ciudad del Este</option>
                        <option value="Encarnación">Encarnación</option>
                        <option value="Interior del País">Otra Ciudad del Interior</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-uppercase text-[11px] text-text-secondary font-semibold">
                        Dirección de Entrega {shippingMethod !== "pickup" && "*"}
                      </label>
                      <input
                        type="text"
                        required={shippingMethod !== "pickup"}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Calle, número de casa, referencias"
                        className="w-full bg-surface-pure border border-border-warm rounded-lg px-4 py-2.5 font-body-md text-body-md text-text-primary placeholder:text-outline-variant focus:outline-none focus:border-forest-deep transition-colors shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 mt-4">
                    <label className="font-label-uppercase text-[11px] text-text-secondary font-semibold">
                      Indicaciones Especiales o Preferencias de Entrega
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ej: Dejar en portería, avisar antes de llegar..."
                      className="w-full bg-surface-pure border border-border-warm rounded-lg px-4 py-2 text-body-sm text-text-primary placeholder:text-outline-variant focus:outline-none focus:border-forest-deep transition-colors shadow-xs"
                    />
                  </div>
                </div>

                {/* 2. Shipping Options */}
                <div className="bg-surface-ivory rounded-xl p-6 sm:p-8 border border-border-warm shadow-xs">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-accent-gold-light flex items-center justify-center font-label-sm text-label-sm font-bold">
                      02
                    </div>
                    <h2 className="font-headline-sm text-headline-sm text-forest-deep">
                      Modalidad de Entrega
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <label
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        shippingMethod === "express"
                          ? "bg-surface-container border-forest-deep shadow-xs"
                          : "bg-surface-pure border-border-warm hover:bg-surface-container/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === "express"}
                          onChange={() => setShippingMethod("express")}
                          className="text-forest-deep focus:ring-forest-deep"
                        />
                        <div>
                          <p className="font-title-sm text-forest-deep font-semibold">
                            Delivery Express (Asunción & Gran Asunción)
                          </p>
                          <p className="text-body-sm text-text-secondary">
                            Entrega en el día o en menos de 24 horas hábiles
                          </p>
                        </div>
                      </div>
                      <span className="font-title-sm text-forest-deep font-bold">Gs. 25.000</span>
                    </label>

                    <label
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        shippingMethod === "interior"
                          ? "bg-surface-container border-forest-deep shadow-xs"
                          : "bg-surface-pure border-border-warm hover:bg-surface-container/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === "interior"}
                          onChange={() => setShippingMethod("interior")}
                          className="text-forest-deep focus:ring-forest-deep"
                        />
                        <div>
                          <p className="font-title-sm text-forest-deep font-semibold">
                            Envío al Interior por Encomienda
                          </p>
                          <p className="text-body-sm text-text-secondary">
                            Embalaje térmico con guía de seguimiento (24-48 hs)
                          </p>
                        </div>
                      </div>
                      <span className="font-title-sm text-forest-deep font-bold">Gs. 35.000</span>
                    </label>

                    <label
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        shippingMethod === "pickup"
                          ? "bg-surface-container border-forest-deep shadow-xs"
                          : "bg-surface-pure border-border-warm hover:bg-surface-container/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === "pickup"}
                          onChange={() => setShippingMethod("pickup")}
                          className="text-forest-deep focus:ring-forest-deep"
                        />
                        <div>
                          <p className="font-title-sm text-forest-deep font-semibold">
                            Retiro en Farmacia / Local
                          </p>
                          <p className="text-body-sm text-text-secondary">
                            Coordinación previa para entrega inmediata
                          </p>
                        </div>
                      </div>
                      <span className="font-label-uppercase text-accent-gold-dark font-bold">
                        GRATIS
                      </span>
                    </label>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="bg-surface-ivory rounded-xl p-6 sm:p-8 border border-border-warm shadow-xs">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-accent-gold-light flex items-center justify-center font-label-sm text-label-sm font-bold">
                      03
                    </div>
                    <h2 className="font-headline-sm text-headline-sm text-forest-deep">
                      Preferencia de Pago
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label
                      className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                        paymentMethod === "transfer"
                          ? "bg-surface-container border-forest-deep shadow-xs"
                          : "bg-surface-pure border-border-warm hover:bg-surface-container/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="material-symbols-outlined text-forest-deep text-[22px]">
                          account_balance
                        </span>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "transfer"}
                          onChange={() => setPaymentMethod("transfer")}
                        />
                      </div>
                      <div>
                        <p className="font-title-sm text-forest-deep font-semibold text-[14px]">
                          Transferencia / QR
                        </p>
                        <p className="text-[12px] text-text-secondary mt-0.5">
                          SIPAP inmediato
                        </p>
                      </div>
                    </label>

                    <label
                      className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                        paymentMethod === "cash"
                          ? "bg-surface-container border-forest-deep shadow-xs"
                          : "bg-surface-pure border-border-warm hover:bg-surface-container/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="material-symbols-outlined text-forest-deep text-[22px]">
                          payments
                        </span>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "cash"}
                          onChange={() => setPaymentMethod("cash")}
                        />
                      </div>
                      <div>
                        <p className="font-title-sm text-forest-deep font-semibold text-[14px]">
                          Efectivo
                        </p>
                        <p className="text-[12px] text-text-secondary mt-0.5">
                          Contra entrega en puerta
                        </p>
                      </div>
                    </label>

                    <label
                      className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                        paymentMethod === "card"
                          ? "bg-surface-container border-forest-deep shadow-xs"
                          : "bg-surface-pure border-border-warm hover:bg-surface-container/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="material-symbols-outlined text-forest-deep text-[22px]">
                          credit_card
                        </span>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                        />
                      </div>
                      <div>
                        <p className="font-title-sm text-forest-deep font-semibold text-[14px]">
                          Tarjeta POS
                        </p>
                        <p className="text-[12px] text-text-secondary mt-0.5">
                          POS inalámbrico o link
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-5 sticky top-28">
                <div className="bg-surface-ivory rounded-2xl border border-border-warm p-6 shadow-md">
                  <h3 className="font-headline-sm text-headline-sm text-forest-deep mb-4 pb-3 border-b border-border-warm flex items-center justify-between">
                    <span>Resumen de Fórmulas</span>
                    <span className="font-label-sm text-text-secondary font-normal">
                      {items.length} {items.length === 1 ? "ítem" : "ítems"}
                    </span>
                  </h3>

                  {/* Items list */}
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1 mb-4">
                    {items.length === 0 ? (
                      <p className="text-text-secondary text-body-sm py-4 text-center">
                        No hay productos en el carrito.
                      </p>
                    ) : (
                      items.map((it) => (
                        <div
                          key={it.id}
                          className="flex items-center justify-between py-2 border-b border-border-warm/60 gap-3"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-title-sm text-forest-deep text-[13px] font-semibold truncate">
                              {it.name}
                            </p>
                            <p className="text-[11px] text-text-secondary">
                              Cantidad: {it.qty} × Gs. {it.price.toLocaleString("es-PY")}
                            </p>
                          </div>
                          <span className="font-title-sm text-forest-deep font-bold text-[13px]">
                            Gs. {(it.price * it.qty).toLocaleString("es-PY")}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-2 py-3 border-t border-border-warm text-body-sm font-body-sm">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal de fórmulas:</span>
                      <span className="text-forest-deep font-semibold">
                        Gs. {subtotal.toLocaleString("es-PY")}
                      </span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Costo de envío:</span>
                      <span className="text-forest-deep font-semibold">
                        {shippingCost > 0 ? `Gs. ${shippingCost.toLocaleString("es-PY")}` : "Gratis"}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline pt-3 border-t border-border-warm text-forest-deep">
                      <span className="font-headline-sm text-headline-sm font-bold">
                        Total Estimado:
                      </span>
                      <span className="font-headline-sm text-headline-sm font-bold text-forest-deep">
                        Gs. {total.toLocaleString("es-PY")}
                      </span>
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <button
                    type="submit"
                    disabled={items.length === 0}
                    className="w-full mt-6 py-3.5 px-4 bg-forest-deep text-surface-ivory rounded-xl font-label-md text-label-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
                  >
                    <span className="material-symbols-outlined text-[20px] text-accent-gold-light group-hover:scale-110 transition-transform">
                      chat
                    </span>
                    <span>Confirmar Pedido y Abrir WhatsApp</span>
                  </button>

                  <div className="mt-4 pt-4 border-t border-border-warm/60 flex items-center justify-center gap-2 text-text-secondary text-[11px]">
                    <span className="material-symbols-outlined text-[16px] text-accent-gold-dark">
                      lock
                    </span>
                    <span>Atención y privacidad de datos garantizada</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
