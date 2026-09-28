"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ALL_PRODUCTS, Product } from "@/data/products";
import { useCartStore } from "@/store/cart";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { addItem } = useCartStore();

  const product = ALL_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"clinical" | "usage" | "nutrition" | "coa">("clinical");
  const [addedToast, setAddedToast] = useState(false);

  const relatedProducts = ALL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        formulation: product.specTop,
        category: product.category,
      });
    }
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Trieste Farma! Quisiera consultar sobre la fórmula ${product.name} (Gs. ${product.price.toLocaleString("es-PY")}). ¿Tienen disponibilidad inmediata para envío?`
  );

  return (
    <>
      <Header />

      <main className="w-full pt-24 bg-surface min-h-screen flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="w-full border-b border-border-warm bg-surface-ivory py-3 px-4 sm:px-8 lg:px-12">
          <div className="max-w-[1280px] mx-auto flex items-center justify-between text-body-sm font-body-sm text-text-secondary">
            <nav className="flex items-center gap-2">
              <Link href="/" className="hover:text-forest-deep transition-colors">
                Inicio
              </Link>
              <span className="text-outline-variant">/</span>
              <Link href="/catalogo" className="hover:text-forest-deep transition-colors">
                Catálogo
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-forest-deep font-medium truncate max-w-[200px] sm:max-w-md">
                {product.name}
              </span>
            </nav>

            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1 text-forest-deep hover:text-accent-gold-dark font-label-sm text-label-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Volver</span>
            </Link>
          </div>
        </div>

        {/* Main Product Container */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 w-full flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* LEFT COLUMN: Large Visual & Gallery */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {/* Main Image Stage */}
              <div className="relative aspect-square w-full rounded-2xl bg-surface-container-low/70 border border-border-warm p-8 flex items-center justify-center overflow-hidden shadow-xs">
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 font-label-uppercase text-[11px] px-3 py-1 rounded-full bg-forest-deep text-surface-ivory font-semibold tracking-wider shadow-xs">
                    {product.badge}
                  </span>
                )}

                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-pure/95 border border-border-warm text-[11px] font-mono text-accent-gold-dark font-medium shadow-xs">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>{product.coaLot.split("•")[0].trim()}</span>
                </div>

                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Thumbnails Gallery */}
              {product.gallery.length > 1 && (
                <div className="flex items-center gap-3">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-xl bg-surface-container-low p-2 border transition-all cursor-pointer overflow-hidden ${
                        selectedImage === img
                          ? "border-forest-deep ring-2 ring-forest-deep/20 shadow-xs"
                          : "border-border-warm hover:border-text-secondary"
                      }`}
                    >
                      <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Clinical Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-surface-ivory border border-border-warm text-center flex flex-col items-center">
                  <span className="material-symbols-outlined text-forest-deep text-[22px] mb-1">
                    biotech
                  </span>
                  <p className="font-label-uppercase text-[10px] text-forest-deep font-semibold">
                    Pureza HPLC
                  </p>
                  <p className="text-[11px] text-text-secondary mt-0.5">Lote Certificado</p>
                </div>

                <div className="p-3 rounded-xl bg-surface-ivory border border-border-warm text-center flex flex-col items-center">
                  <span className="material-symbols-outlined text-forest-deep text-[22px] mb-1">
                    ac_unit
                  </span>
                  <p className="font-label-uppercase text-[10px] text-forest-deep font-semibold">
                    Cadena de Frío
                  </p>
                  <p className="text-[11px] text-text-secondary mt-0.5">Embalaje Térmico</p>
                </div>

                <div className="p-3 rounded-xl bg-surface-ivory border border-border-warm text-center flex flex-col items-center">
                  <span className="material-symbols-outlined text-forest-deep text-[22px] mb-1">
                    verified_user
                  </span>
                  <p className="font-label-uppercase text-[10px] text-forest-deep font-semibold">
                    Farmacopea
                  </p>
                  <p className="text-[11px] text-text-secondary mt-0.5">Estándar ISO 17025</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Buy Box & Product Details */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div>
                <span className="font-label-uppercase text-[11px] text-accent-gold-dark font-semibold tracking-widest block mb-1.5">
                  {product.categoryLabel.toUpperCase()} • FARMACOPEA CLÍNICA
                </span>
                <h1 className="font-headline-lg text-[32px] sm:text-[40px] text-forest-deep font-normal leading-tight tracking-tight">
                  {product.name}
                </h1>
                <p className="font-body-md text-body-md text-text-secondary mt-3 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price & Serving Strip */}
              <div className="p-4 rounded-xl bg-surface-ivory border border-border-warm flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-label-uppercase text-[10px] text-text-secondary block">
                    Precio Oficial
                  </span>
                  <span className="font-headline-md text-[28px] text-forest-deep font-bold">
                    Gs. {product.price.toLocaleString("es-PY")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-surface-container border border-border-warm text-left">
                    <span className="font-label-uppercase text-[9px] text-text-secondary block">
                      Presentación
                    </span>
                    <span className="font-title-sm text-forest-deep font-semibold text-[13px]">
                      {product.servingInfo}
                    </span>
                  </div>

                  <div className="px-3 py-1.5 rounded-lg bg-surface-container border border-border-warm text-left">
                    <span className="font-label-uppercase text-[9px] text-text-secondary block">
                      Sabor / Formato
                    </span>
                    <span className="font-title-sm text-forest-deep font-semibold text-[13px]">
                      {product.flavor}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Benefits List */}
              <div className="space-y-2">
                <h4 className="font-label-uppercase text-[11px] text-forest-deep font-semibold tracking-wider">
                  Aspectos Clave de la Formulación:
                </h4>
                <ul className="space-y-1.5">
                  {product.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-body-sm text-text-secondary">
                      <span className="material-symbols-outlined text-[17px] text-accent-gold-dark shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="pt-2 border-t border-border-warm flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity */}
                <div className="inline-flex items-center justify-between bg-surface-ivory border border-border-warm rounded-xl px-3 py-2 w-full sm:w-36">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-forest-deep hover:bg-surface-container transition-colors cursor-pointer"
                    aria-label="Restar una unidad"
                  >
                    <span className="material-symbols-outlined text-[18px]">remove</span>
                  </button>
                  <span className="font-headline-sm text-forest-deep font-bold text-[18px]">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-forest-deep hover:bg-surface-container transition-colors cursor-pointer"
                    aria-label="Sumar una unidad"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>

                {/* Add to Cart Primary Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-forest-deep text-surface-ivory hover:bg-primary-container font-label-md text-label-md font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px] text-accent-gold-light">
                    shopping_bag
                  </span>
                  <span>Agregar al Carrito • Gs. {(product.price * qty).toLocaleString("es-PY")}</span>
                </button>
              </div>

              {/* Secondary Action: Direct WhatsApp */}
              <a
                href={`https://wa.me/595981000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl border border-border-warm bg-surface-pure hover:bg-surface-container text-forest-deep font-label-md text-label-md transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span className="material-symbols-outlined text-[20px] text-accent-gold-dark">
                  chat
                </span>
                <span>Consultar o Pedir por WhatsApp</span>
              </a>

              {addedToast && (
                <div className="p-3 rounded-lg bg-primary-container text-accent-gold-light text-center font-label-sm text-label-sm animate-in fade-in duration-200">
                  ¡Producto agregado al carrito con éxito!
                </div>
              )}

              {/* Shipping Guarantee Box */}
              <div className="p-4 rounded-xl bg-surface-container text-text-secondary text-[12px] space-y-1.5 border border-border-warm">
                <div className="flex items-center gap-2 text-forest-deep font-semibold">
                  <span className="material-symbols-outlined text-[18px] text-accent-gold-dark">
                    local_shipping
                  </span>
                  <span>Logística y Entrega Segura</span>
                </div>
                <p>• <strong>Asunción y Gran Asunción:</strong> Entrega el mismo día o en 24hs hábiles.</p>
                <p>• <strong>Interior del País:</strong> Encomienda asegurada a terminal o puerta con guía de rastreo.</p>
                <p>• <strong>Medios de Pago:</strong> Transferencia bancaria directa / SIPAP o efectivo contra entrega.</p>
              </div>

              {/* Technical Specifications Tabs */}
              <div className="pt-4 border-t border-border-warm">
                <div className="flex border-b border-border-warm overflow-x-auto no-scrollbar gap-2 mb-4">
                  {[
                    { key: "clinical", label: "Fundamento Clínico", icon: "science" },
                    { key: "usage", label: "Modo de Uso", icon: "schedule" },
                    { key: "nutrition", label: "Composición", icon: "list_alt" },
                    { key: "coa", label: "Certificado (CoA)", icon: "verified" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`pb-2.5 px-3 font-label-sm text-label-sm whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                        activeTab === tab.key
                          ? "border-forest-deep text-forest-deep font-semibold"
                          : "border-transparent text-text-secondary hover:text-forest-deep"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab 1: Clinical */}
                {activeTab === "clinical" && (
                  <div className="p-4 rounded-xl bg-surface-ivory border border-border-warm text-body-sm text-text-secondary leading-relaxed animate-in fade-in duration-150">
                    <h5 className="font-title-sm text-forest-deep font-semibold mb-2">
                      Mecanismo Farmacológico & Asimilación
                    </h5>
                    <p>{product.clinicalDetails}</p>
                  </div>
                )}

                {/* Tab 2: Usage */}
                {activeTab === "usage" && (
                  <div className="p-4 rounded-xl bg-surface-ivory border border-border-warm text-body-sm text-text-secondary leading-relaxed animate-in fade-in duration-150">
                    <h5 className="font-title-sm text-forest-deep font-semibold mb-2">
                      Protocolo Clínico y Horarios Sugeridos
                    </h5>
                    <p>{product.usage}</p>
                  </div>
                )}

                {/* Tab 3: Nutrition */}
                {activeTab === "nutrition" && (
                  <div className="p-4 rounded-xl bg-surface-ivory border border-border-warm text-body-sm animate-in fade-in duration-150">
                    <h5 className="font-title-sm text-forest-deep font-semibold mb-3">
                      Perfil Nutricional de Farmacopea
                    </h5>
                    <div className="space-y-1 font-mono text-[12px]">
                      {product.nutritionTable.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between py-1.5 border-b border-border-warm/60 last:border-0"
                        >
                          <span className="text-text-secondary">{item.label}</span>
                          <span className="text-forest-deep font-semibold">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 4: CoA */}
                {activeTab === "coa" && (
                  <div className="p-4 rounded-xl bg-surface-ivory border border-border-warm text-body-sm text-text-secondary animate-in fade-in duration-150">
                    <div className="flex items-center gap-2 text-forest-deep font-semibold mb-2">
                      <span className="material-symbols-outlined text-accent-gold-dark text-[20px]">
                        verified
                      </span>
                      <h5>Trazabilidad Analítica del Lote</h5>
                    </div>
                    <p className="font-mono text-[13px] text-forest-deep font-bold mb-2">
                      {product.coaLot}
                    </p>
                    <p className="text-[12px] leading-relaxed">
                      Este lote ha superado todos los controles de pureza por cromatografía líquida de alta resolución (HPLC), con recuento de microorganismos patógenos negativo y ausencia detectable de metales pesados contaminantes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related / Sinergias Recomendadas Section */}
          <div className="mt-20 pt-10 border-t border-border-warm">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="font-label-uppercase text-[11px] text-accent-gold-dark font-semibold tracking-wider">
                  Sinergia Sugerida
                </span>
                <h3 className="font-headline-md text-headline-md text-forest-deep mt-1">
                  Fórmulas Complementarias
                </h3>
              </div>
              <Link
                href="/catalogo"
                className="font-label-sm text-forest-deep hover:text-accent-gold-dark transition-colors"
              >
                Ver catálogo completo →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="group flex flex-col bg-white rounded-2xl p-3 sm:p-3.5 shadow-xs hover:shadow-md transition-all duration-300 border border-border-warm justify-between"
                >
                  <div>
                    {/* Visual Box */}
                    <div className="relative aspect-square w-full rounded-xl bg-[#EFE9DF] overflow-hidden flex items-center justify-center p-3 mb-3.5">
                      {rel.badge && (
                        <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-[4px] bg-forest-deep text-[#2DD4BF] font-label-uppercase text-[9px] font-bold tracking-wider shadow-xs">
                          {rel.badge}
                        </span>
                      )}

                      <Link
                        href={`/productos/${rel.id}`}
                        aria-label={`Ver detalles de ${rel.name}`}
                        className="absolute bottom-2.5 right-2.5 z-10 w-7 h-7 rounded-md bg-white text-forest-deep flex items-center justify-center shadow-xs border border-[#E5DFD5] hover:bg-forest-deep hover:text-white transition-all cursor-pointer"
                        title="Ver ficha detallada"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                      </Link>

                      <Link href={`/productos/${rel.id}`} className="w-full h-full flex items-center justify-center">
                        <img
                          src={rel.image}
                          alt={rel.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    </div>

                    <div>
                      <span className="font-label-uppercase text-[10px] text-[#A68A56] font-semibold tracking-wider block mb-1 uppercase">
                        {rel.categoryLabel}
                      </span>
                      <Link href={`/productos/${rel.id}`}>
                        <h3 className="font-title-sm text-[16px] text-forest-deep font-bold leading-snug line-clamp-1 hover:text-accent-gold-dark transition-colors">
                          {rel.name}
                        </h3>
                      </Link>
                      <p className="font-body-sm text-[12px] text-[#78716C] mt-1 line-clamp-2 leading-relaxed min-h-[34px]">
                        {rel.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-1">
                    <div className="w-full border-t border-[#EFECE6] my-3" />

                    <div className="flex items-baseline justify-between mb-3 px-0.5">
                      <span className="font-headline-sm text-[18px] text-forest-deep font-bold">
                        Gs. {rel.price.toLocaleString("es-PY")}
                      </span>
                      <span className="font-body-sm text-[11px] text-[#8C867A] font-normal">
                        {rel.servingInfo || "30 Servicios"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        addItem({
                          id: rel.id,
                          name: rel.name,
                          price: rel.price,
                          image: rel.image,
                          formulation: rel.specTop,
                          category: rel.category,
                        })
                      }
                      className="w-full py-2.5 px-4 rounded-xl bg-forest-deep text-white hover:bg-[#062018] active:scale-[0.99] font-label-md text-[13px] font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[17px] text-[#E5C378]">
                        shopping_cart
                      </span>
                      <span>Agregar al Carrito</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
