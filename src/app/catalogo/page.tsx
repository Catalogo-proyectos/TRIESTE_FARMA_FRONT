"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/store/cart";

interface CatalogProduct {
  id: string;
  name: string;
  category: "proteina" | "creatina" | "pre-entreno" | "aminoacidos" | "vitaminas" | "longevidad" | "adaptogenos";
  categoryLabel: string;
  badge: string;
  badgeSub?: string;
  specTop: string;
  specBottom: string;
  servingInfo: string;
  flavor: string;
  price: number;
  description: string;
  clinicalDetails: string;
  image: string;
}

const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: "p1",
    name: "IsoPure Ultra Whey CFM Isolate",
    category: "proteina",
    categoryLabel: "Proteínas",
    badge: "CFM BOTANICAL",
    badgeSub: "Pureza 94% Proteica",
    specTop: "28g Proteína Aislada",
    specBottom: "0g Azúcar • 0.2g Grasa",
    servingInfo: "Envase 900g (30 Serv.)",
    flavor: "Vainilla Bourbon Natural",
    price: 360000,
    description: "Aislado de suero mediante microfiltración por flujo cruzado a baja temperatura sin desnaturalización de inmunoglobulinas.",
    clinicalDetails: "Aislado de suero bovino alimentado a pasto (Grass-Fed). Enriquecido con enzimas digestivas DigeZyme® para biodisponibilidad gástrica inmediata sin distensión abdominal.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsjxt-8a2YwR8ueZAmtUBGC49teI8zM53_YoVVi_tflVWj23gVhNwZthMd-TRSC54sdp1IDYc1f4Nxi90UP6Dsu68BcUD93fPUkxk4Nt3FUt2iBEwC1A5old6mivYoennu7dg77HAJOBnAxcW7NS57MC18nRMDSq4WOZEP2log9r1lh-iz-E45zAGmyF6lyv9LIhR3FIGp9kBm5DWABd4xg8BCxFgaFRS_oj7OBwDEttB_KmL7OHGrMZ36xg4HytZOd88",
  },
  {
    id: "p2",
    name: "Creatine Monohydrate Micronized Creapure®",
    category: "creatina",
    categoryLabel: "Creatina Pura",
    badge: "CREAPURE® ALEMANIA",
    badgeSub: "Certificado HPLC 99.9%",
    specTop: "5g Creapure® / servicio",
    specBottom: "100% Micronizada Mesh 200",
    servingInfo: "Polvo 500g (100 Serv.)",
    flavor: "Sin Sabor (Puro)",
    price: 240000,
    description: "Patente Creapure® de origen alemán. Potencia anaeróbica, resíntesis de fosfocreatina y soporte neuroprotector.",
    clinicalDetails: "Monohidrato ultra purificado libre de subproductos como diciandiamida (DCD) y dihidrotriazina (DHT). Acelera la tasa de resíntesis de ATP.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_JgqGrp5S7-Zevc8JXKwwwinWF3YDIb8qjKPbKpVqJfZMJeK3tLzi_GrRYaeW8TmB_eivUVbIyt-4DNQ23PAQtUxZqQuTuRffLo8k6t_AVjNgYQMGODswYs30SUTv-t6UKIPqxSXcEFphMJjtx24FtmMkaDGei6goQdSemslpYoCWPdVf1rI06IDVc8KWCxU9K_8Pl9p-b9P_zZhfD49OxgrsaKSFOV4xjPl76KgP132H7nOwuMTh1g",
  },
  {
    id: "p3",
    name: "NeuroNitric Pump & Focus Formula",
    category: "pre-entreno",
    categoryLabel: "Pre-Entrenos",
    badge: "TRIESTE CLINICAL",
    badgeSub: "Sin Choque Adrenérgico",
    specTop: "6g L-Citrulina Malato 2:1",
    specBottom: "300mg Alfa GPC Cognitivo",
    servingInfo: "Polvo 420g (30 Serv.)",
    flavor: "Cítricos & Yuzu",
    price: 310000,
    description: "Vasodilatación endotelial limpia combinada con nootrópicos para concentración milimétrica sin taquicardia.",
    clinicalDetails: "Aumento selectivo de óxido nítrico endotelial sin sobreestimulación del sistema simpático central. Proporciona bombeo vascular prolongado y agudeza mental.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_2bZLTvccdAXDWuNwEbN36FsWNdXdyM691zNBRnczXmIZqh0cRJoMWT58iyfjR_6fW9csQGqL4sLm56KpRZNQ4ZeaQC0GRQlWGwe4h_fQ8HVCpNBH7_3HpO2s2gCo0bMu8JCcCqhxd3yRU9fopFzfgtgN89khQVwXT_YW2hHoq5v5c7Fr9HjxDt4dAgP1sujxNOvqeMnp57c53lAdi1KMRn0bPvS3CiBaui-h6VPHgbC132nuCtgwTQ",
  },
  {
    id: "p4",
    name: "EAA Essential Amino Acids Complex",
    category: "aminoacidos",
    categoryLabel: "Aminoácidos",
    badge: "FERMENTACIÓN VEGANA",
    badgeSub: "9 Aminoácidos Esenciales",
    specTop: "8.5g EAA Totales",
    specBottom: "Ratio Clínico de Leucina",
    servingInfo: "Polvo 360g (30 Serv.)",
    flavor: "Manzana Verde & Té Blanco",
    price: 220000,
    description: "Espectro completo de aminoácidos esenciales fermentados vegetalmente para señalización mTOR intraentreno.",
    clinicalDetails: "Estimula la síntesis de proteína muscular (MPS) sin requerir digestión gástrica previa. Ideal para entrenamientos en ayunas o sesiones de alta duración.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsjxt-8a2YwR8ueZAmtUBGC49teI8zM53_YoVVi_tflVWj23gVhNwZthMd-TRSC54sdp1IDYc1f4Nxi90UP6Dsu68BcUD93fPUkxk4Nt3FUt2iBEwC1A5old6mivYoennu7dg77HAJOBnAxcW7NS57MC18nRMDSq4WOZEP2log9r1lh-iz-E45zAGmyF6lyv9LIhR3FIGp9kBm5DWABd4xg8BCxFgaFRS_oj7OBwDEttB_KmL7OHGrMZ36xg4HytZOd88",
  },
  {
    id: "p5",
    name: "Magnesio Quelado Bisglicinato & L-Treonato",
    category: "vitaminas",
    categoryLabel: "Minerales",
    badge: "QUELACIÓN TRAACS®",
    badgeSub: "Cruce Hematoencefálico",
    specTop: "320mg Magnesio Elemental",
    specBottom: "Con Vitamina B6 Bioactiva",
    servingInfo: "120 Cápsulas Vegetales",
    flavor: "Cápsula Vcaps®",
    price: 195000,
    description: "Sinergia mineral de máxima penetración al sistema nervioso central para sueño profundo y modulación de GABA.",
    clinicalDetails: "Forma unida a dos moléculas de glicina que no compite con otros iones metálicos y evita por completo efectos laxantes indeseados.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCALEd1DjzheKmjXLPAbCeYnq3z75F_T_GwDxWCFOwPnaEkOgiixbrh66AySrHgj0ec_ECQraAhtcqDof7NHRjg5QJquUJaxCLL8aSARcPaka9IXhW4tln-L1GXM3PzGMi5SIBUqNQzUmDEBBGRqxUDopkp5vlxaKLfdyhRuCl7j44UHFHSa_LnJOczAiGY_w_b_fSaLqmTsYt6w0Zsz4XsZXuhYdVrI8aS765_z0FC2cY4fY0t6cJRFA",
  },
  {
    id: "p6",
    name: "NMN Liposomal 500mg + Resveratrol",
    category: "longevidad",
    categoryLabel: "Longevidad",
    badge: "BIOLOGÍA CELULAR",
    badgeSub: "Precursor Directo NAD+",
    specTop: "500mg β-NMN Ultra Puro",
    specBottom: "100mg Trans-Resveratrol 98%",
    servingInfo: "60 Cápsulas Liposomales",
    flavor: "Liberación Retardada",
    price: 430000,
    description: "Tecnología de fosfolípidos que protege la molécula en el tracto digestivo para activar sirtuinas y reparación de ADN.",
    clinicalDetails: "El mononucleótido de nicotinamida restaura los niveles juveniles de NAD+ celular para mitigar la senescencia y optimizar la respiración mitocondrial.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_JgqGrp5S7-Zevc8JXKwwwinWF3YDIb8qjKPbKpVqJfZMJeK3tLzi_GrRYaeW8TmB_eivUVbIyt-4DNQ23PAQtUxZqQuTuRffLo8k6t_AVjNgYQMGODswYs30SUTv-t6UKIPqxSXcEFphMJjtx24FtmMkaDGei6goQdSemslpYoCWPdVf1rI06IDVc8KWCxU9K_8Pl9p-b9P_zZhfD49OxgrsaKSFOV4xjPl76KgP132H7nOwuMTh1g",
  },
  {
    id: "p7",
    name: "Omega-3 TG Triglicéridos 1200mg",
    category: "longevidad",
    categoryLabel: "Longevidad",
    badge: "SELLO IFOS 5 ESTRELLAS",
    badgeSub: "TOTOX < 5 (Cero Oxidación)",
    specTop: "800mg EPA / 400mg DHA",
    specBottom: "Destilación Molecular Fría",
    servingInfo: "90 Cápsulas Blandas",
    flavor: "Aroma Natural a Limón",
    price: 250000,
    description: "Aceite de pescado silvestre en formato de triglicéridos reesterificados naturales para absorción 70% superior a los etil-ésteres.",
    clinicalDetails: "Cardioprotección, reducción de triglicéridos en sangre y modulación de citocinas inflamatorias mediante ratio clínico óptimo de ácidos grasos esenciales.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCALEd1DjzheKmjXLPAbCeYnq3z75F_T_GwDxWCFOwPnaEkOgiixbrh66AySrHgj0ec_ECQraAhtcqDof7NHRjg5QJquUJaxCLL8aSARcPaka9IXhW4tln-L1GXM3PzGMi5SIBUqNQzUmDEBBGRqxUDopkp5vlxaKLfdyhRuCl7j44UHFHSa_LnJOczAiGY_w_b_fSaLqmTsYt6w0Zsz4XsZXuhYdVrI8aS765_z0FC2cY4fY0t6cJRFA",
  },
  {
    id: "p8",
    name: "Complejo Botánico Ashwagandha KSM-66 & Rhodiola",
    category: "adaptogenos",
    categoryLabel: "Adaptógenos",
    badge: "EXTRACTO BOTÁNICO",
    badgeSub: "Eje HPA & Cortisol",
    specTop: "600mg KSM-66® Titulada",
    specBottom: "3% Rosavinas • 1% Salidrósidos",
    servingInfo: "60 Cápsulas Vegetales",
    flavor: "Cápsula Vcaps®",
    price: 180000,
    description: "Sinergia adaptogénica para regular la respuesta fisiológica al estrés crónico, fatiga suprarrenal y ansiedad diurna.",
    clinicalDetails: "Modula la secreción de cortisol por la glándula suprarrenal y equilibra los neurotransmisores serotonina y dopamina ante demandas físicas y cognitivas intensas.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_2bZLTvccdAXDWuNwEbN36FsWNdXdyM691zNBRnczXmIZqh0cRJoMWT58iyfjR_6fW9csQGqL4sLm56KpRZNQ4ZeaQC0GRQlWGwe4h_fQ8HVCpNBH7_3HpO2s2gCo0bMu8JCcCqhxd3yRU9fopFzfgtgN89khQVwXT_YW2hHoq5v5c7Fr9HjxDt4dAgP1sujxNOvqeMnp57c53lAdi1KMRn0bPvS3CiBaui-h6VPHgbC132nuCtgwTQ",
  },
];

const CATEGORIES = [
  { key: "all", label: "Todos los Suplementos" },
  { key: "proteina", label: "Proteínas" },
  { key: "creatina", label: "Creatina Pura" },
  { key: "pre-entreno", label: "Pre-Entrenos Clínicos" },
  { key: "aminoacidos", label: "Aminoácidos" },
  { key: "vitaminas", label: "Minerales & Quelados" },
  { key: "longevidad", label: "Longevidad & Celular" },
  { key: "adaptogenos", label: "Adaptógenos & Estrés" },
];

export default function CatalogoPage() {
  const { addItem } = useCartStore();
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((item) => {
      const matchesCat = selectedCat === "all" || item.category === selectedCat;
      const matchesQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specTop.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });
  }, [selectedCat, searchQuery, sortBy]);

  return (
    <>
      <Header />

      <main className="w-full pt-24 bg-surface min-h-[calc(100vh-80px)] flex flex-col">
        {/* Top Header & Breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin pt-4 pb-8 w-full">
          <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
            <nav aria-label="Ruta de navegación" className="flex items-center gap-space-xs text-body-sm font-body-sm text-text-secondary">
              <Link href="/" className="hover:text-forest-deep transition-colors">
                Inicio
              </Link>
              <span className="text-outline-variant font-light">/</span>
              <span className="text-forest-deep font-medium">Catálogo & Guía de Suplementación</span>
            </nav>
            <div className="flex items-center gap-space-sm">
              <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-surface-container text-label-uppercase font-label-uppercase text-accent-gold-dark shadow-xs border border-border-warm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold-dark"></span>
                Lotes Trazables 2025
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-surface-container text-label-uppercase font-label-uppercase text-text-secondary border border-border-warm">
                Envíos Asegurados a Todo el País
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-end mb-space-lg">
            <div className="lg:col-span-8 flex flex-col gap-space-xs">
              <p className="font-label-uppercase text-label-uppercase tracking-widest text-accent-gold-dark font-semibold">
                Fórmulas Clínicas & Botánica Adaptogénica
              </p>
              <h1 className="font-headline-lg text-headline-lg text-forest-deep tracking-tight">
                Catálogo de Alta Biodisponibilidad
              </h1>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className="font-body-md text-body-md text-text-secondary">
                Selección rigurosa de principios activos, fuentes hidrolizadas y micronutrientes quelados con dosificación real basada en evidencia biomédica.
              </p>
            </div>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por fórmula, activo o nutriente..."
                className="w-full bg-surface-pure border border-border-warm rounded-lg pl-10 pr-4 py-2.5 text-body-sm font-body-sm text-text-primary placeholder:text-outline-variant focus:outline-none focus:border-forest-deep transition-colors shadow-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-label-sm font-label-sm text-text-secondary whitespace-nowrap">
                Ordenar por:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-surface-pure border border-border-warm rounded-lg px-3 py-2 text-label-sm font-label-sm text-forest-deep focus:outline-none focus:border-forest-deep shadow-xs cursor-pointer"
              >
                <option value="featured">Recomendados / Clínico</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills Bar */}
          <div className="w-full pb-space-xs mb-space-lg overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-space-xs py-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCat(cat.key)}
                  className={`shrink-0 px-space-md py-space-xs rounded-lg font-label-sm text-label-sm transition-all duration-200 cursor-pointer ${
                    selectedCat === cat.key
                      ? "bg-forest-deep text-surface-ivory shadow-sm"
                      : "bg-surface-container text-text-secondary hover:text-forest-deep hover:bg-surface-container-high border border-border-warm"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-md">
            {filteredProducts.map((prod) => (
              <article
                key={prod.id}
                className="group flex flex-col bg-white rounded-2xl p-3 sm:p-3.5 shadow-xs hover:shadow-md transition-all duration-300 border border-border-warm justify-between"
              >
                <div>
                  {/* Visual Box */}
                  <div className="relative aspect-square w-full rounded-xl bg-[#EFE9DF] overflow-hidden flex items-center justify-center p-3 mb-3.5">
                    {/* Badge */}
                    {prod.badge && (
                      <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-[4px] bg-forest-deep text-[#2DD4BF] font-label-uppercase text-[9px] font-bold tracking-wider shadow-xs">
                        {prod.badge}
                      </span>
                    )}

                    {/* Single Preview Button on bottom-right of image */}
                    <Link
                      href={`/productos/${prod.id}`}
                      aria-label={`Ver detalles de ${prod.name}`}
                      className="absolute bottom-2.5 right-2.5 z-10 w-7 h-7 rounded-md bg-white text-forest-deep flex items-center justify-center shadow-xs border border-[#E5DFD5] hover:bg-forest-deep hover:text-white transition-all cursor-pointer"
                      title="Ver ficha detallada"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                    </Link>

                    {/* Product Image */}
                    <Link href={`/productos/${prod.id}`} className="w-full h-full flex items-center justify-center">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  </div>

                  {/* Body Content */}
                  <div>
                    <span className="font-label-uppercase text-[10px] text-[#A68A56] font-semibold tracking-wider block mb-1 uppercase">
                      {prod.categoryLabel || prod.category}
                    </span>
                    <Link href={`/productos/${prod.id}`}>
                      <h3 className="font-title-sm text-[16px] text-forest-deep font-bold leading-snug line-clamp-1 hover:text-accent-gold-dark transition-colors">
                        {prod.name}
                      </h3>
                    </Link>
                    <p className="font-body-sm text-[12px] text-[#78716C] mt-1 line-clamp-2 leading-relaxed min-h-[34px]">
                      {prod.description}
                    </p>
                  </div>
                </div>

                {/* Bottom: Divider, Price + Servings, Full-Width Add to Cart */}
                <div className="pt-1">
                  <div className="w-full border-t border-[#EFECE6] my-3" />

                  <div className="flex items-baseline justify-between mb-3 px-0.5">
                    <span className="font-headline-sm text-[18px] text-forest-deep font-bold">
                      Gs. {prod.price.toLocaleString("es-PY")}
                    </span>
                    <span className="font-body-sm text-[11px] text-[#8C867A] font-normal">
                      {prod.servingInfo || "30 Servicios"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        id: prod.id,
                        name: prod.name,
                        price: prod.price,
                        image: prod.image,
                        formulation: prod.specTop,
                        category: prod.category,
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
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-16 text-center text-text-secondary">
              <span className="material-symbols-outlined text-[48px] text-text-secondary/50 mb-2">
                manage_search
              </span>
              <p className="font-title-sm text-forest-deep">No se encontraron suplementos</p>
              <p className="font-body-sm text-text-secondary mt-1">
                Intenta con otro término de búsqueda o selecciona otra categoría.
              </p>
            </div>
          )}
        </div>

        {/* EDUCATIONAL GUIDE SECTION: GUÍA BOTÁNICA Y CIENTÍFICA TRIESTE */}
        <section className="w-full bg-surface-container-low py-space-xl relative overflow-hidden border-t border-border-warm">
          <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
              <div className="flex flex-col gap-space-xs max-w-2xl">
                <span className="font-label-uppercase text-label-uppercase text-accent-gold-dark tracking-widest flex items-center gap-2 font-semibold">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  Divulgación Biomédica Trieste
                </span>
                <h2 className="font-headline-lg text-headline-lg text-forest-deep">
                  Guía de Fundamentación & Uso Clínico
                </h2>
                <p className="font-body-md text-body-md text-text-secondary">
                  Comprender el mecanismo biológico detrás de cada suplemento es el primer paso para una dosificación estratégica y resultados sostenibles.
                </p>
              </div>
              <div className="shrink-0">
                <a
                  className="inline-flex items-center gap-2 px-space-md py-space-sm rounded-lg bg-surface-pure hover:bg-surface text-forest-deep font-label-sm text-label-sm shadow-xs border border-border-warm transition-colors"
                  href="https://wa.me/595981000000?text=Hola%20Trieste%20Farma,%20quisiera%20solicitar%20un%20protocolo%20a%20medida."
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px] text-accent-gold-dark">
                    clinical_notes
                  </span>
                  <span>Solicitar Protocolo a Medida</span>
                </a>
              </div>
            </div>

            {/* Educational Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mb-space-lg">
              {/* Guide 1: Proteína Isolate vs Concentrada */}
              <div className="bg-surface-pure rounded-xl p-space-lg shadow-xs border border-border-warm flex flex-col justify-between group hover:shadow-md transition-all">
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-space-sm py-0.5 rounded bg-surface-container text-label-uppercase font-label-uppercase text-accent-gold-dark font-semibold">
                      Macronutrientes & Asimilación
                    </span>
                    <span className="font-label-uppercase text-text-secondary text-[11px]">
                      01 / CINÉTICA DE ABSORCIÓN
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-forest-deep">
                    Proteína de Suero: ¿Cuándo elegir Isolate (WPI) vs. Concentrada (WPC)?
                  </h3>
                  <p className="font-body-md text-body-md text-text-secondary">
                    La diferencia central no radica en la calidad de los aminoácidos (ambas tienen perfil biológico completo con alto tenor de leucina), sino en el procesamiento de filtración:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm my-space-xs">
                    <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1 border border-border-warm/60">
                      <span className="font-title-sm text-title-sm text-forest-deep font-semibold">
                        WPI (Aislada CFM)
                      </span>
                      <p className="font-body-sm text-body-sm text-text-secondary">
                        Microfiltrada a baja temperatura. Remueve casi el 100% de la lactosa y lípidos. Absorción ultrarrápida (45-60 min) óptima para estómagos reactivos o protocolos de déficit calórico estricto.
                      </p>
                    </div>
                    <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1 border border-border-warm/60">
                      <span className="font-title-sm text-title-sm text-forest-deep font-semibold">
                        WPC (Concentrada)
                      </span>
                      <p className="font-body-sm text-body-sm text-text-secondary">
                        Conserva fracciones bioactivas intactas como inmunoglobulinas, albúmina sérica y lactoferrina que estimulan la función inmunitaria y la flora intestinal. Digestión más saciante.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-space-sm flex items-center justify-between text-body-sm font-body-sm text-forest-deep border-t border-border-warm/60 mt-3">
                  <span className="text-text-secondary font-label-sm">Regla práctica Trieste:</span>
                  <span className="font-medium text-accent-gold-dark text-right">
                    WPI post-entreno o intolerancia; WPC para desayuno o merienda funcional.
                  </span>
                </div>
              </div>

              {/* Guide 2: Creatina Monohidrato */}
              <div className="bg-surface-pure rounded-xl p-space-lg shadow-xs border border-border-warm flex flex-col justify-between group hover:shadow-md transition-all">
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-space-sm py-0.5 rounded bg-surface-container text-label-uppercase font-label-uppercase text-accent-gold-dark font-semibold">
                      Energética Celular
                    </span>
                    <span className="font-label-uppercase text-text-secondary text-[11px]">
                      02 / PROTOCOLOS DE SATURACIÓN
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-forest-deep">
                    Creatina Monohidrato: Mitos de retención, fase de carga y uso diario
                  </h3>
                  <p className="font-body-md text-body-md text-text-secondary">
                    Es la molécula con mayor literatura de grado 1A en el mundo del rendimiento humano y la salud cerebral:
                  </p>
                  <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-text-secondary my-space-xs">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[18px] text-accent-gold-dark shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>
                        <strong>No genera retención subcutánea:</strong> La hidratación ocurre dentro de la célula miocítica (intracelular), favoreciendo el anabolismo y la turgencia celular.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[18px] text-accent-gold-dark shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>
                        <strong>Fase de carga opcional:</strong> Ingerir 3 a 5 gramos diarios de forma continua alcanza la saturación muscular plena en 3 a 4 semanas sin molestias gástricas.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[18px] text-accent-gold-dark shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>
                        <strong>Efecto acumulativo:</strong> El momento del día es irrelevante respecto a la consistencia. Tomar incluso los días de descanso para mantener reservas de ATP estables.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="pt-space-sm flex items-center justify-between text-body-sm font-body-sm text-forest-deep border-t border-border-warm/60 mt-3">
                  <span className="text-text-secondary font-label-sm">Certificación recomendada:</span>
                  <span className="font-medium text-accent-gold-dark text-right">
                    Sello Creapure® para garantizar ausencia de dicyandiamida (DCD).
                  </span>
                </div>
              </div>

              {/* Guide 3: Magnesio Bisglicinato */}
              <div className="bg-surface-pure rounded-xl p-space-lg shadow-xs border border-border-warm flex flex-col justify-between group hover:shadow-md transition-all">
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-space-sm py-0.5 rounded bg-surface-container text-label-uppercase font-label-uppercase text-accent-gold-dark font-semibold">
                      Minerales Quelados
                    </span>
                    <span className="font-label-uppercase text-text-secondary text-[11px]">
                      03 / BIODISPONIBILIDAD GI
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-forest-deep">
                    Magnesio: Por qué la forma quelada (Bisglicinato) optimiza la absorción
                  </h3>
                  <p className="font-body-md text-body-md text-text-secondary">
                    El óxido o sulfato de magnesio tienen una absorción inferior al 4% y provocan efecto laxante osmótico severo.
                  </p>
                  <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-2 my-space-xs border border-border-warm/60">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-forest-deep">
                        science
                      </span>
                      <span className="font-title-sm text-title-sm text-forest-deep font-semibold">
                        El enlace quelado con dos moléculas de Glicina:
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-text-secondary">
                      Permite al magnesio atravesar el intestino delgado utilizando los canales de transporte de dipéptidos (PEPT1) en vez de las vías iónicas saturables. Cruza la barrera hematoencefálica con facilidad y la glicina actúa en paralelo como neurotransmisor inhibitorio que promueve relajación motora previa al sueño.
                    </p>
                  </div>
                </div>
                <div className="pt-space-sm flex items-center justify-between text-body-sm font-body-sm text-forest-deep border-t border-border-warm/60 mt-3">
                  <span className="text-text-secondary font-label-sm">Dosis clínica habitual:</span>
                  <span className="font-medium text-accent-gold-dark text-right">
                    200 a 400 mg de magnesio elemental, 60 minutos antes de dormir.
                  </span>
                </div>
              </div>

              {/* Guide 4: Pre-entrenos Limpios */}
              <div className="bg-surface-pure rounded-xl p-space-lg shadow-xs border border-border-warm flex flex-col justify-between group hover:shadow-md transition-all">
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-space-sm py-0.5 rounded bg-surface-container text-label-uppercase font-label-uppercase text-accent-gold-dark font-semibold">
                      Rendimiento Sustentable
                    </span>
                    <span className="font-label-uppercase text-text-secondary text-[11px]">
                      04 / SALUD ENDOTELIAL
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-forest-deep">
                    Pre-entrenos limpios: Óxido nítrico y nootrópicos sin picos de cortisol
                  </h3>
                  <p className="font-body-md text-body-md text-text-secondary">
                    Los productos tradicionales saturan con dosis tóxicas de cafeína anhidra (&gt;400mg) y colorantes sintéticos, induciendo vasoconstricción periférica y taquicardia refleja.
                  </p>
                  <div className="flex flex-col gap-2 font-body-sm text-body-sm text-text-secondary my-space-xs">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[18px] text-accent-gold-dark shrink-0 mt-0.5">
                        hub
                      </span>
                      <span>
                        <strong>L-Citrulina Malato (2:1):</strong> Precursor directo de la arginina plasmática que eleva el óxido nítrico endotelial para una mayor perfusión muscular y aclaramiento de lactato.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[18px] text-accent-gold-dark shrink-0 mt-0.5">
                        psychology
                      </span>
                      <span>
                        <strong>Alfa-GPC & L-Tirosina:</strong> Donantes de colina y dopamina que agudizan el enfoque visual y la contracción neuromuscular sin causar temblor adrenérgico ni caída brusca de energía post-entrenamiento.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-space-sm flex items-center justify-between text-body-sm font-body-sm text-forest-deep border-t border-border-warm/60 mt-3">
                  <span className="text-text-secondary font-label-sm">Compromiso Trieste:</span>
                  <span className="font-medium text-accent-gold-dark text-right">
                    Fórmulas sin estimulantes desmedidos y transparentes en dosis activa.
                  </span>
                </div>
              </div>
            </div>

            {/* Legal & Medical Clinical Disclaimer */}
            <div className="p-space-md rounded-xl bg-surface-container text-text-secondary flex flex-col sm:flex-row items-center sm:items-start gap-space-md border border-border-warm">
              <span className="material-symbols-outlined text-[28px] text-accent-gold-dark shrink-0">
                verified_user
              </span>
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <h4 className="font-label-uppercase text-label-uppercase text-forest-deep font-semibold">
                  Aviso Sanitario y Resguardo Ético
                </h4>
                <p className="font-body-sm text-body-sm text-outline">
                  Material exclusivamente informativo, educativo y orientativo comercial para Paraguay y la región. Las formulaciones expuestas no tienen por objeto diagnosticar, tratar, mitigar ni curar patologías específicas sin supervisión facultativa. La dosificación debe adecuarse a su historial clínico, edad, peso y contexto metabólico. Trieste Farma recomienda consultar con su médico o nutricionista matriculado antes de iniciar cualquier protocolo suplementario.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
