"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/store/cart";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  badge?: string;
  description: string;
  formulation: string;
  image: string;
  clinicalDetails?: string;
  servingInfo?: string;
  flavor?: string;
}

const HERO_SLIDES = [
  {
    tagline: "CURADURÍA BOTÁNICA & CLÍNICA · NUEVA EDICIÓN",
    line1: "FÓRMULAS PURAS",
    line2: "RIGOR CLÍNICO",
    line3: "& Alma Botánica",
    description: "Suplementación de alta biodisponibilidad y bioactivos seleccionados bajo los más exigentes estándares de farmacopea. Trazabilidad analítica directa a tu dispensario personal.",
    caption: "01 · Dispensario Maestro",
  },
  {
    tagline: "OPTIMIZACIÓN DE ENERGÍA Y ATP CELULAR",
    line1: "POTENCIA PURA",
    line2: "CREATINA ALEMANA",
    line3: "& Bioenergía Mitocondrial",
    description: "Monohidrato micronizado 200 mesh certificado Creapure® para fuerza muscular, capacidad cognitiva y regeneración neuromuscular inmediata.",
    caption: "02 · Rendimiento & Creatina",
  },
  {
    tagline: "BIENESTAR SISTÉMICO Y ANTI-INFLAMATORIO",
    line1: "LONGEVIDAD ACTIVA",
    line2: "OMEGA-3 IFOS 5★",
    line3: "& Magnesio Quelado",
    description: "Péptidos bioactivos de colágeno, bisglicinato quelado puro y fosfolípidos esenciales diseñados para regeneración profunda del sueño y longevidad celular.",
    caption: "03 · Longevidad Celular",
  },
];

const CATEGORIES_DATA = [
  {
    title: "Proteínas",
    badge: "Formulación Celular",
    description: "Whey Protein Isolate, Hydrolyzed puro y blends de origen vegetal no desnaturalizados.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAi9oKqT5764TDVSai9_bckIfX9oKuTbHRlGS_uNmuEyRPdSWjLmQj5iyD6x3mAW65MuMhDPVdA1tFuxPK2H6to-ySNrk0HT-HmNQhqypICoqiZeHN0CnWDvEQ1nM68spLZkaKn2HSsoBb5dWYCSnbPi0Xy97EsA1tNiYb47pk0MBzckx_OsnKmTs73esAOVa5IZSAfgF1TTHuBTX7mBeJnQc86T8Z3-DhdaArV65NxtTLQqUh7iw5Llw",
    cat: "proteina",
  },
  {
    title: "Creatina & Rendimiento",
    badge: "Certificado Creapure®",
    description: "Monohidrato 200 mesh micronizado para optimización de ATP y neuroprotección celular.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvzAmFUCA0xGlf3MKGWGH0Mkow_NTO3sg3XD2rgzPjcRAyWx40jNr_2bPObQsnJDfe16eXbA1g_daMQShS8xBirfII9LFQ9bjv-wNbcGsnah3f6izcS_D0m1sFwqeZyISsGQVXOqDm9Zhd2lgXWUYdc3Lc40X09DBC5KPy10tGD_S4fHiQRN43gQwqxZTUOTh8M_8y4Kss0J76fkwy34B0-dqJ9fv3p2M3ppojZHUWDU07lHZuhD5xfA",
    cat: "creatina",
  },
  {
    title: "Pre-entreno & Enfoque",
    badge: "Energía Limpia",
    description: "Nootrópicos botánicos, L-Tirosina y adaptógenos sin taquicardia ni picos de cortisol.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn3r8_P1e6hLBMdMyi2RcFWNHywRFnP1KaiQyIjA2c2Ucwt3CWXAI1zpj-9iX50u1I8IE-wKaL5mrR6xVPeOGk5FpKZ3shMEwnFiRTZ03rKDI38IhAokR1eCZ7p1iJeYOZsxudL3T5R2igzfYxGyvcC0pDwQIhZpyU7ThdycUUcJt0FQm1mpNURtiTmLe8BEDLJBqapUx7YXAnpcrVLk3cADGMfEC8jWhh5P_5bZ8CteFj5L73z2zrdw",
    cat: "pre-entreno",
  },
  {
    title: "Aminoácidos & Recuperación",
    badge: "Grado Clínico",
    description: "EAA esenciales fermentados, L-Glutamina de pureza enteral y BCAAs 2:1:1 de rápida asimilación.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2UorEdHFfwXPKHUZSZ4s04HaZRCvQXSG2XYxfH-1qhBlzOpvTOSsCBXIsM6aWDFroCWtqzYcXLTJU82cEzyxgkVexWTpjzDegC67CDnzZn4Cf46whNYhWXcBIwUXBaflprGU8wq-DzPgOvgy_VpCnmLt3G-40-Y85Py5n1HGQvNMCGefZKyt1TyfbBEbbAW12wd5QpX2YMv-yV4-WM08dKMtVRjRqEBLFtf8QavQM0slYD7eeDzk7dg",
    cat: "aminoacidos",
  },
  {
    title: "Vitaminas & Minerales",
    badge: "Alta Biodisponibilidad",
    description: "Magnesio Quelado (Bisglicinato), Complejo B Metilado y D3+K2 en vehículo de aceite de oliva virgen.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE74vfhBOn3-QUnN7veZC6Xc7esiRpEP1dOb2DdcYOmLyZMGcVOzjmbKQM_VsKcAIrYAXk4Hnx-2fqDZmxmXPpabgjvY_1QbbELX3qPpbWJarslEeYSv9Uulhn0r9Pzi7TseZJgi8BGQ9DO1gZf9AtItL9nyp-WWuak14Ql6r3-rfaFKdPbVBkltvKxNPXsi8jAeHyBmNCm04SlZ8RxDBgjU1RqOocUYWV2nqbPgx4eMRFQfei4gJNCw",
    cat: "vitaminas",
  },
  {
    title: "Salud & Longevidad",
    badge: "IFOS™ 5 Estrellas",
    description: "Omega-3 libre de metales pesados, Péptidos Bioactivos de Colágeno y cepas probióticas microencapsuladas.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUBy8hy4crrmONBCXPPFnZu3AvuWasJQCUixbzUKpj52zKwpWxsbKSCE8myad-AbvrGui0I2hCLzfspsQVExAwbcbl5HFV1IMiV9XVcyid2L2dwIuTWZxn4FESTLUMYcrb9E68UtNbvEb0L1KDoFcCzghFNubd_NN0hZb0rt5xvpvv-bDBNQT8Km54msnUeLqLdUpG_2bhNAOEw7XZ00SFLc7MTDXmD2i_xyGnvqWGByviRuKWZLX5Uw",
    cat: "longevidad",
  },
];

const FEATURED_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Trieste Pure Isolate 900g",
    category: "PROTEÍNA AISLADA CFM",
    price: 380000,
    badge: "MÁS ELEGIDO",
    description: "Aislado al 92% libre de suero desnaturalizado con enzimas digestivas DigeZyme®.",
    formulation: "28g Proteína Aislada • 0% Azúcar",
    clinicalDetails: "Aislado de suero bovino Grass-Fed microfiltrado por flujo cruzado (CFM). Enriquecido con complejo enzimático DigeZyme® para asimilación estomacal sin distensión ni pesadez.",
    servingInfo: "30 Servicios",
    flavor: "Vainilla Bourbon Natural",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD81hV-Bw24Q64A5-AZlRHMA-NzXflhGSVUHthTaWY5bGCpOm464QY8D3oLqDNHA838bQ98cqLlG09Y3MtH3Q683NlJkKrNXFSWA_jTWloY4bVJRCHGFm9XWHqGVhlUgipz4rdaqcsSQhe75A83iPW2c9QavyZ0DowjXtbZGcJZaXxnD9h_e2h-zUVCeAypHwjpFPlJiBEp5s0wgFIsojTaDYu6wpWeiuSFZyol92kf0q3_Ic-2MluwLg",
  },
  {
    id: "p2",
    name: "Creapure® Micronized 300g",
    category: "MONOHIDRATO ALEMÁN",
    price: 240000,
    badge: "ESENCIAL",
    description: "Solubilidad ultra fina instantánea, sin degradación en creatinina garantizada.",
    formulation: "5g Creapure® • 100% Micronizada 200 Mesh",
    clinicalDetails: "Monohidrato alemán de pureza 99.9% evaluado por HPLC. Máxima resíntesis celular de ATP sin retención subcutánea ni molestias gástricas.",
    servingInfo: "60 Servicios",
    flavor: "Sin Sabor (Puro)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwEkq2k8sv3Ix7ILz40uIUpurUbaa0-QCuQJXtMkS7ggcAuswYulckF3fYfnRjYx78OZxFHkIavJcQdSdhS0ubMJ55bL9CkxyTO1HZhX0Bp6bfwiRQF8D-Eb-0gVBQWy56rgnZ--KRfv14IDfpUb7tly-IaFm3MlGuhg9gafhIWSUW8yq92o8CH95fffEn1LygB7zjarv246hwhMxOwppu6h3oTRZriLUNjeOWkbQBhfVZTYsxDS4GlA",
  },
  {
    id: "p5",
    name: "Magnesium Bisglycinate 120c",
    category: "ALTA BIODISPONIBILIDAD",
    price: 165000,
    badge: "BIENESTAR",
    description: "Complejo quelado puro con Vitamina B6 activa para relajación muscular nocturna.",
    formulation: "320mg Magnesio Quelado • Con Vitamina B6",
    clinicalDetails: "Doble quelación TRAACS® que atraviesa la barrera hematoencefálica vía receptores PEPT1. Agonista fisiológico de GABA para descanso profundo y reparación muscular.",
    servingInfo: "60 Días",
    flavor: "Cápsula Vcaps®",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBacrCMReABi6VJKDlJPVga00WHhyVUkClz5MJA0aZC5CKhalZXzHaQbPY9m6nX0VkpoNoJDratr4kQLIH7uHBfb2joZ0Pq4UJwNCKRbd70EFujC0GQcnHKd293OriQDGdsWy_1_gHxz9XADN0p516HE-vSMeVfhggmO9DoqqAaDHFX3z-d3GE4GjA6qGaIBeK5tAdhL2txDYNiRouWag-IAk63bykREuE8bWztmAjyV_5ly9ZPFkDU2A",
  },
  {
    id: "p3",
    name: "Clean Pre-Workout Focus",
    category: "NOOTRÓPICO & FLUJO VASCULAR",
    price: 290000,
    badge: "NOVEDAD",
    description: "Claridad mental y congestión celular sin taquicardia ni picos de ansiedad.",
    formulation: "6g L-Citrulina Malato • 300mg Alfa GPC",
    clinicalDetails: "Vasodilatación endotelial de flujo limpio sin sobreestimulación simpática. Proporciona bombeo muscular prolongado y agudeza cognitiva sin crash posterior.",
    servingInfo: "30 Servicios",
    flavor: "Cítricos & Yuzu",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKKvWjEBV71MkIl4guYNuEaco2KE2iGJrGNGRltaiTydZNjX-SRtm6fgOY0KYeqLf7msU0Hk8cIVEfsofDwTpGNSe9TEgBe8JGBHs8n7iQNl7_AfUUHNs3D9h6VA5WgkForZnOOjGvF7NfkxnHpcYf0LEHd1cq8ThpUzY2Jhn9Qbssll0x7AHmXLF_ugWKijKcwGEm9MX4jD7Yq4UeHzJ-ahayskAzE8b6aBQVIe2H10xcwNHR-L-vIQ",
  },
];

const GOAL_STACKS = {
  rendimiento: {
    title: "Protocolo de Rendimiento Deportivo & Potencia Celular",
    description: "Optimiza la resíntesis de ATP, amortigua la acidez láctica y asegura flujo vascular sostenido durante esfuerzos de alta intensidad.",
    stack: [
      { id: "p2", name: "Creapure® Micronized 300g", price: 240000, role: "Saturación de fosfocreatina miocárdica y muscular" },
      { id: "p3", name: "Clean Pre-Workout Focus", price: 290000, role: "Vasoexpansión limpia y neuro-enfoque sin crash" },
      { id: "p5", name: "Magnesium Bisglycinate Complex", price: 165000, role: "Balance electrolítico y prevención de espasmos" },
    ],
  },
  recuperacion: {
    title: "Protocolo de Reparación Tisular & Anabolismo Limpio",
    description: "Disminuye el daño muscular inducido por el ejercicio (EIMD) e inicia la señalización mTOR para una regeneración miofibrilar profunda.",
    stack: [
      { id: "p1", name: "Trieste Pure Isolate 900g", price: 380000, role: "Pico de aminoacidemia plasmática post-esfuerzo" },
      { id: "p4", name: "Aminoácidos EAA Fermentados", price: 210000, role: "Pool completo de aminoácidos esenciales sin degradación digestiva" },
      { id: "glutamina", name: "L-Glutamina de Grado USP", price: 140000, role: "Soporte de permeabilidad intestinal y glucógeno" },
    ],
  },
  vitalidad: {
    title: "Protocolo de Longevidad Celular & Bienestar Mitocondrial",
    description: "Regula la respuesta inflamatoria sistémica y provee cofactores biológicos indispensables para la síntesis de colágeno y vitalidad.",
    stack: [
      { id: "p7", name: "Omega-3 Ultra Puro IFOS 5★", price: 220000, role: "Índice EPA/DHA de alta concentración antiinflamatoria" },
      { id: "p5", name: "Magnesium Bisglycinate Complex", price: 165000, role: "Activación enzimática de más de 300 procesos celulares" },
      { id: "d3k2", name: "Vitamina D3 5000UI + K2 MK7", price: 150000, role: "Metabolismo óseo y optimización hormonal endógena" },
    ],
  },
  enfoque: {
    title: "Protocolo de Cognición Clara & Resiliencia al Estrés",
    description: "Estimula la síntesis de acetilcolina y dopamina mientras modula el cortisol diurno para jornadas laborales o académicas de alta demanda.",
    stack: [
      { id: "p3", name: "Clean Pre-Workout Focus", price: 290000, role: "Sinergia de L-Tirosina, Alpha-GPC y L-Teanina" },
      { id: "complejo-b", name: "Complejo B Metilado Coenzimado", price: 175000, role: "Donadores de metilo para neurotransmisores cerebrales" },
    ],
  },
  fuerza: {
    title: "Protocolo de Sobrecarga Progresiva & Hipertrofia",
    description: "Dirigido a maximizar la síntesis proteica miofibrilar y la capacidad de trabajo por serie en fases de volumen controlado.",
    stack: [
      { id: "p2", name: "Creapure® Micronized 300g", price: 240000, role: "Fuerza máxima y volumen celular hidratado" },
      { id: "p1", name: "Trieste Pure Isolate 900g", price: 380000, role: "Aporte de 27g de proteína CFM de ultra-rápida absorción" },
    ],
  },
};

const HOW_TO_BUY_STEPS = [
  {
    num: "01",
    title: "Explorá",
    desc: "Navegá por nuestras formulaciones verificadas con ficha técnica pública.",
    icon: "manage_search",
  },
  {
    num: "02",
    title: "Seleccioná",
    desc: "Agregá las unidades exactas a tu bandeja de pedido interactiva.",
    icon: "shopping_basket",
  },
  {
    num: "03",
    title: "Completá",
    desc: "Ingresá dirección de entrega y nombre sin necesidad de crear contraseñas.",
    icon: "pin_drop",
  },
  {
    num: "04",
    title: "Enviá",
    desc: "Generá el mensaje estructurado y envialo en 1 clic a nuestro WhatsApp oficial.",
    icon: "send",
  },
  {
    num: "05",
    title: "Confirmamos",
    desc: "Coordinamos método de pago y despachamos el pedido de inmediato.",
    icon: "task_alt",
  },
];

const FAQS = [
  {
    q: "¿Cuáles son los métodos de pago disponibles?",
    a: "Aceptamos transferencias bancarias directas (SIPAP), tarjetas de crédito/débito a través de links de pago seguros (Bancard / Pagopar) y pago en efectivo contra entrega para entregas en Asunción y Gran Asunción.",
  },
  {
    q: "¿Cómo y cuándo se coordinan los envíos?",
    a: "Los pedidos dentro del área metropolitana se entregan el mismo día o en un máximo de 24 hs hábiles. Para el interior del país, despachamos diariamente por encomienda exprés a la agencia o puerta que indiques.",
  },
  {
    q: "¿Puedo consultar a un profesional antes de comprar?",
    a: "Totalmente. Nuestro equipo está disponible en WhatsApp para revisar tus análisis clínicos recientes, dosis sugeridas, horarios óptimos de ingesta e interacciones con otros fármacos o alimentos.",
  },
  {
    q: "¿Cómo verifico la originalidad del lote?",
    a: "Todos los frascos poseen sello termocontraíble inviolable y número de lote visible. Podés solicitarnos el Certificado de Análisis (CoA) correspondiente al lote que recibís para corroborar pureza por cromatografía.",
  },
];

export default function HomePage() {
  const { addItem } = useCartStore();
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeGoal, setActiveGoal] = useState<keyof typeof GOAL_STACKS>("rendimiento");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentStack = GOAL_STACKS[activeGoal];

  const handleAddAllStack = () => {
    currentStack.stack.forEach((item) => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        formulation: item.role,
      });
    });
  };

  return (
    <>
      <Header />

      <main className="w-full bg-[#F7F4EE] min-h-screen flex flex-col">
        {/* 1. EXPANSIVE LUXURY HERO CONTAINER (STITCH AD52168DEDFE4C37A95FD50B5C5B9804) */}
        <section className="relative w-full">
          <div className="relative w-full min-h-[660px] md:min-h-[720px] lg:min-h-[780px] rounded-b-3xl md:rounded-b-[40px] overflow-hidden border-b border-[#0E382B]/10 shadow-[0_16px_50px_-12px_rgba(10,43,33,0.12)] bg-[#F5F2EC] flex flex-col justify-between pt-24 sm:pt-28 md:pt-32">
            {/* Background Hero Photography Composition */}
            <div className="absolute inset-0 z-0">
              <img
                alt="Fotografía editorial clínica Trieste Farma con frascos botánicos y luz natural"
                className="w-full h-full object-cover object-left md:object-center transition-opacity duration-700"
                src="/img/hero-botanical.png"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/90 via-[#FAF8F5]/60 to-transparent pointer-events-none"></div>
            </div>

            {/* Hero Editorial Content */}
            <div className="relative z-20 w-full px-6 sm:px-10 md:px-16 lg:px-20 py-8 md:py-12 flex flex-col justify-center items-start">
              <div className="w-full max-w-xl lg:max-w-2xl text-left flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-pure/90 backdrop-blur-xs border border-border-warm mb-5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-accent-gold-dark animate-pulse"></span>
                  <span className="font-label-uppercase text-[10px] md:text-[11px] text-forest-deep tracking-[0.2em] font-semibold">
                    {HERO_SLIDES[heroSlide].tagline}
                  </span>
                </div>

                <div className="space-y-1 mb-6">
                  <h2 className="font-body-md text-[28px] sm:text-[38px] md:text-[48px] lg:text-[54px] font-extrabold text-forest-deep uppercase tracking-tight leading-[1.05]">
                    {HERO_SLIDES[heroSlide].line1}
                  </h2>
                  <h1 className="font-body-md text-[32px] sm:text-[42px] md:text-[52px] lg:text-[60px] font-black text-forest-deep uppercase tracking-tight leading-[1.02]">
                    {HERO_SLIDES[heroSlide].line2}
                  </h1>
                  <p className="font-headline-lg text-[24px] sm:text-[34px] md:text-[42px] lg:text-[48px] italic font-normal text-forest-deep/90 leading-tight tracking-normal">
                    {HERO_SLIDES[heroSlide].line3}
                  </p>
                </div>

                <p className="font-body-md text-sm md:text-base text-text-secondary font-normal leading-relaxed max-w-md mb-8 text-left">
                  {HERO_SLIDES[heroSlide].description}
                </p>

                <div className="flex items-center gap-4 flex-wrap justify-start">
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-forest-deep hover:bg-primary-container text-[#FAF8F5] rounded-full font-label-md text-[13px] md:text-[14px] font-semibold tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] group"
                  >
                    <span className="tracking-widest">EXPLORAR COLECCIÓN</span>
                    <span className="material-symbols-outlined text-[18px] text-accent-gold-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      north_east
                    </span>
                  </Link>
                  <a
                    href="#recomendador"
                    className="hidden sm:inline-flex items-center gap-1.5 text-forest-deep hover:text-accent-gold-dark font-label-md text-[13px] font-medium transition-colors"
                  >
                    <span>Asesoramiento Farmacéutico</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Hero Slider Pagination Dots */}
            <div className="relative z-20 pb-6 md:pb-8 flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-3 bg-surface-pure/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#0E382B]/10 shadow-xs">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Slide ${idx + 1} - ${slide.caption}`}
                    onClick={() => setHeroSlide(idx)}
                    className="group flex items-center justify-center transition-all p-1 cursor-pointer"
                  >
                    <span
                      className={`transition-all rounded-full ${
                        heroSlide === idx
                          ? "w-3.5 h-3.5 bg-forest-deep ring-2 ring-forest-deep/20"
                          : "w-2.5 h-2.5 bg-forest-deep/30 group-hover:bg-forest-deep/60"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. QUICK BENEFITS STRIP */}
        <section className="w-full bg-forest-deep text-surface-ivory py-space-md shadow-md">
          <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
              <div className="flex items-center gap-space-sm p-space-xs">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0 border border-accent-gold-light/20">
                  <span className="material-symbols-outlined text-[20px] text-accent-gold-light">
                    verified
                  </span>
                </div>
                <div>
                  <h3 className="font-title-sm text-title-sm text-surface-pure font-semibold">
                    100% Verificados
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-primary-container">
                    Marcas certificadas internacionalmente
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-space-sm p-space-xs">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0 border border-accent-gold-light/20">
                  <span className="material-symbols-outlined text-[20px] text-accent-gold-light">
                    forum
                  </span>
                </div>
                <div>
                  <h3 className="font-title-sm text-title-sm text-surface-pure font-semibold">
                    Asesoría Profesional
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-primary-container">
                    Atención directa clínica vía WhatsApp
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-space-sm p-space-xs">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0 border border-accent-gold-light/20">
                  <span className="material-symbols-outlined text-[20px] text-accent-gold-light">
                    local_shipping
                  </span>
                </div>
                <div>
                  <h3 className="font-title-sm text-title-sm text-surface-pure font-semibold">
                    Envíos a Todo el País
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-primary-container">
                    Coordinación ágil con seguro de carga
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-space-sm p-space-xs">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0 border border-accent-gold-light/20">
                  <span className="material-symbols-outlined text-[20px] text-accent-gold-light">
                    quickreply
                  </span>
                </div>
                <div>
                  <h3 className="font-title-sm text-title-sm text-surface-pure font-semibold">
                    Compra Simple & Segura
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-primary-container">
                    Sin formularios eternos; confirmación directa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. MAIN CATEGORIES (EDITORIAL GRID) */}
        <section className="w-full px-margin-mobile md:px-margin py-space-xl" id="catalogo">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
              <div>
                <span className="font-label-uppercase text-label-uppercase text-accent-gold-dark tracking-widest block mb-space-xs font-semibold">
                  SELECCIÓN BOTÁNICA & CLÍNICA
                </span>
                <h2 className="font-headline-lg text-headline-lg text-forest-deep tracking-tight">
                  Explorá por Categoría
                </h2>
              </div>
              <p className="font-body-md text-body-md text-text-secondary max-w-md">
                Materias primas rigurosamente seleccionadas, evaluadas por pureza química y sin alérgenos ocultos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
              {CATEGORIES_DATA.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/catalogo?cat=${cat.cat}`}
                  className="group bg-surface-pure rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col border border-border-warm"
                >
                  <div className="relative w-full h-[200px] overflow-hidden bg-surface-container">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 px-space-sm py-0.5 rounded-full bg-surface-pure/90 backdrop-blur-xs text-forest-deep font-label-uppercase text-label-uppercase shadow-xs font-semibold">
                      {cat.badge}
                    </span>
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-pure/80 backdrop-blur-xs flex items-center justify-center text-forest-deep group-hover:bg-forest-deep group-hover:text-surface-ivory transition-colors">
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                        north_east
                      </span>
                    </div>
                  </div>
                  <div className="p-space-lg flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-forest-deep mb-space-xs group-hover:text-accent-gold-dark transition-colors">
                        {cat.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-text-secondary mb-space-sm">
                        {cat.description}
                      </p>
                    </div>
                    <span className="font-label-sm text-label-sm text-accent-gold-dark font-medium group-hover:underline">
                      Explorar categoría →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FEATURED PRODUCTS (SELECCIÓN TRIESTE) */}
        <section id="destacados" className="w-full px-margin-mobile md:px-margin py-space-xl bg-surface-container-low border-y border-border-warm">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
              <div>
                <span className="font-label-uppercase text-label-uppercase text-accent-gold-dark tracking-widest block mb-space-xs font-semibold">
                  CURADURÍA CLÍNICA
                </span>
                <h2 className="font-headline-lg text-headline-lg text-forest-deep tracking-tight">
                  Selección Trieste
                </h2>
              </div>
              <div className="flex items-center gap-space-xs mt-space-sm md:mt-0">
                <span className="font-label-sm text-label-sm text-text-secondary">
                  Mostrando 4 fórmulas indispensables
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
              {FEATURED_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-border-warm p-3 sm:p-3.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group"
                >
                  <div>
                    {/* Visual Container with Badge & Single Preview Button */}
                    <div className="relative aspect-square w-full rounded-xl bg-[#EFE9DF] overflow-hidden flex items-center justify-center p-3 mb-3.5">
                      {/* Top-left Badge: e.g. MÁS ELEGIDO */}
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

                      {/* Product Image (Clickable to PDP) */}
                      <Link href={`/productos/${prod.id}`} className="w-full h-full flex items-center justify-center">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </Link>
                    </div>

                    {/* Content Section */}
                    <div>
                      <span className="font-label-uppercase text-[10px] text-[#A68A56] font-semibold tracking-wider block mb-1 uppercase">
                        {prod.category}
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
                          formulation: prod.formulation,
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. INTERACTIVE RECOMMENDATION MATRIX / WIZARD */}
        <section id="recomendador" className="w-full px-margin-mobile md:px-margin py-space-xl">
          <div className="max-w-[1280px] mx-auto">
            <div className="bg-forest-deep text-surface-ivory rounded-2xl p-space-lg md:p-space-xl relative overflow-hidden shadow-xl border border-border-warm/20">
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-accent-gold-dark/15 blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl mb-space-lg">
                <span className="font-label-uppercase text-label-uppercase text-accent-gold-light tracking-widest block mb-space-xs font-semibold">
                  SISTEMA DE ASIGNACIÓN BIOLÓGICA
                </span>
                <h2 className="font-headline-lg text-headline-lg tracking-tight mb-space-sm text-surface-pure">
                  No todos los cuerpos necesitan lo mismo.
                </h2>
                <p className="font-body-md text-body-md text-on-primary-container">
                  Seleccioná tu objetivo prioritario para ver el stack de suplementación respaldado por literatura clínica que optimiza tus biomarcadores específicos.
                </p>
              </div>

              {/* Objective Tabs */}
              <div className="flex flex-wrap gap-space-xs mb-space-lg">
                {(
                  [
                    { key: "rendimiento", label: "Rendimiento Deportivo" },
                    { key: "recuperacion", label: "Recuperación Muscular" },
                    { key: "vitalidad", label: "Vitalidad & Longevidad" },
                    { key: "enfoque", label: "Enfoque & Cognición" },
                    { key: "fuerza", label: "Fuerza & Masa Magra" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveGoal(tab.key)}
                    className={`px-space-md py-space-xs rounded-full font-label-sm text-label-sm transition-all cursor-pointer ${
                      activeGoal === tab.key
                        ? "bg-accent-gold-dark text-surface-pure shadow-sm"
                        : "bg-primary-container text-on-primary-container hover:text-surface-ivory"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Recommendation Result */}
              <div className="bg-surface-ivory text-on-surface rounded-xl p-space-lg shadow-lg border border-border-warm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-md border-b border-border-warm pb-space-sm">
                  <div>
                    <span className="font-label-uppercase text-label-uppercase text-accent-gold-dark block font-semibold">
                      STACK SUGERIDO
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-forest-deep mt-0.5">
                      {currentStack.title}
                    </h3>
                  </div>
                  <button
                    onClick={handleAddAllStack}
                    className="px-space-md py-2 bg-forest-deep text-surface-ivory rounded-lg font-label-sm text-label-sm hover:bg-primary-container flex items-center gap-space-xs self-start md:self-auto cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[18px] text-accent-gold-light">
                      playlist_add
                    </span>
                    <span>Cargar Stack Completo</span>
                  </button>
                </div>

                <p className="font-body-sm text-body-sm text-text-secondary mb-space-md leading-relaxed">
                  {currentStack.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
                  {currentStack.stack.map((item) => (
                    <div
                      key={item.id}
                      className="p-space-sm bg-surface-container rounded-lg border border-border-warm flex flex-col justify-between"
                    >
                      <div>
                        <p className="font-title-sm text-title-sm text-forest-deep font-semibold">
                          {item.name}
                        </p>
                        <p className="font-body-sm text-body-sm text-text-secondary text-[12px] mt-1">
                          {item.role}
                        </p>
                      </div>
                      <div className="pt-space-sm mt-space-sm flex items-center justify-between border-t border-border-warm/60">
                        <span className="font-title-sm text-title-sm text-forest-deep font-bold">
                          Gs. {item.price.toLocaleString("es-PY")}
                        </span>
                        <button
                          onClick={() =>
                            addItem({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              formulation: item.role,
                            })
                          }
                          className="p-1 rounded bg-forest-deep text-surface-ivory hover:bg-primary-container cursor-pointer transition-colors shadow-xs"
                          title="Agregar al carrito"
                        >
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. HOW TO BUY (5 SIMPLE STEPS) */}
        <section className="w-full px-margin-mobile md:px-margin py-space-xl bg-surface-container-low border-y border-border-warm" id="como-comprar">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-space-xl">
              <span className="font-label-uppercase text-label-uppercase text-accent-gold-dark tracking-widest block mb-space-xs font-semibold">
                FLUJO TRANSPARENTE Y DIRECTO
              </span>
              <h2 className="font-headline-lg text-headline-lg text-forest-deep tracking-tight mb-space-xs">
                ¿Cómo Comprar en Trieste?
              </h2>
              <p className="font-body-md text-body-md text-text-secondary">
                Diseñado para que tu experiencia sea fluida, segura y sin fricciones técnicas innecesarias.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-space-md">
              {HOW_TO_BUY_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-surface-pure rounded-xl p-space-md shadow-xs flex flex-col justify-between border border-border-warm group hover:shadow-md transition-all"
                >
                  <div>
                    <span className="font-headline-md text-headline-md text-accent-gold-dark font-light block mb-space-xs">
                      {step.num}
                    </span>
                    <h3 className="font-title-sm text-title-sm text-forest-deep mb-space-xs font-semibold">
                      {step.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-text-secondary">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-space-md text-forest-deep">
                    <span className="material-symbols-outlined text-[24px]">
                      {step.icon}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. TRUST PILLARS */}
        <section className="w-full px-margin-mobile md:px-margin py-space-xl">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
              <div className="lg:col-span-5">
                <span className="font-label-uppercase text-label-uppercase text-accent-gold-dark tracking-widest block mb-space-xs font-semibold">
                  COMPROMISO CLÍNICO
                </span>
                <h2 className="font-headline-lg text-headline-lg text-forest-deep tracking-tight mb-space-md">
                  Comprá con total tranquilidad y respaldo farmacéutico.
                </h2>
                <p className="font-body-md text-body-md text-text-secondary mb-space-md leading-relaxed">
                  A diferencia de los canales de venta despersonalizados, en Trieste Farma cada lote pasa por trazabilidad de cadena de frío y ensayo analítico antes de ingresar al inventario de dispensación.
                </p>

                <div className="space-y-space-sm">
                  <div className="flex items-start gap-space-sm">
                    <span className="material-symbols-outlined text-forest-deep text-[22px] mt-0.5">
                      shield
                    </span>
                    <div>
                      <h4 className="font-title-sm text-title-sm text-forest-deep font-semibold">
                        Garantía de Autenticidad
                      </h4>
                      <p className="font-body-sm text-body-sm text-text-secondary">
                        Sello holográfico y código de lote verificable en cada envase.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-sm">
                    <span className="material-symbols-outlined text-forest-deep text-[22px] mt-0.5">
                      support_agent
                    </span>
                    <div>
                      <h4 className="font-title-sm text-title-sm text-forest-deep font-semibold">
                        Interlocutor Profesional
                      </h4>
                      <p className="font-body-sm text-body-sm text-text-secondary">
                        Quienes te responden son especialistas en suplementación, no bots.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-sm">
                    <span className="material-symbols-outlined text-forest-deep text-[22px] mt-0.5">
                      payments
                    </span>
                    <div>
                      <h4 className="font-title-sm text-title-sm text-forest-deep font-semibold">
                        Flexibilidad de Cobro
                      </h4>
                      <p className="font-body-sm text-body-sm text-text-secondary">
                        Transferencia bancaria, tarjetas vía link o pago en efectivo contra entrega.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-space-md">
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-md border border-border-warm">
                  <img
                    className="w-full h-full object-cover"
                    alt="Apothecary amber jar inspection in clean laboratory"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoQnR6jy0xgkenW-IHALhSLQjchail2e8JTawMB8amDYM9wqvYFic6JYz1yuzXcqeu-mTVtM1isQjXw_lLOpY2U5gSTe6GRSxPasEjqgSTlWDowHiEx86LZgAw56fYdXAgfKvb1Ij5hGR_sgmPEDkwnvmwsiGa8Q9hFk-JjxoF5Ln7EZ63JHq5p1qZjdnX4L6HR6KIWnU-U90T363Rl80IhmIgVEF9RVuO_OXkMMydaUKfgpHSyH8i0A"
                  />
                </div>
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-md mt-space-lg border border-border-warm">
                  <img
                    className="w-full h-full object-cover"
                    alt="Specialist measuring pure botanical supplements using precision balance"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTFTjl-kK8Aj2RLmKjuGa3K6qYofEtDtaiRvQcGl_cUwIjeDnCSmsUnTgbT4PoRYi3c7hG9bVVdKzxiKx2YvAUedO82qo-NL5Mhz6JM15UC7bo1EnKfPDEX5Y6xh6LRhcksEv0naO9Wl9Jk7OYAw1I8zVGZZjvtxybgi0V_a7BdBulP4VyXrzpMgt06LpUJ8cLtcnfoELxpXShDQbR3GxI5ck3vk-fbFKWJGnRO29uFyKFdOlfY5DdLg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. COMMERCIAL ACCORDION FAQ */}
        <section id="faq" className="w-full px-margin-mobile md:px-margin py-space-xl bg-surface-container-low border-t border-border-warm">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-space-lg">
              <span className="font-label-uppercase text-label-uppercase text-accent-gold-dark tracking-widest block mb-space-xs font-semibold">
                RESOLVÉ TUS DUDAS
              </span>
              <h2 className="font-headline-lg text-headline-lg text-forest-deep tracking-tight mb-space-xs">
                Preguntas Frecuentes
              </h2>
              <p className="font-body-md text-body-md text-text-secondary">
                Todo lo que necesitás saber antes de concretar tu orden.
              </p>
            </div>

            <div className="space-y-space-sm">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-surface-pure rounded-lg overflow-hidden shadow-xs border border-border-warm"
                >
                  <button
                    className="w-full px-space-md py-space-md flex items-center justify-between text-left hover:bg-surface-container transition-colors cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <span className="font-title-sm text-title-sm text-forest-deep font-semibold">
                      {faq.q}
                    </span>
                    <span
                      className={`material-symbols-outlined text-[20px] text-forest-deep transition-transform duration-200 ${
                        openFaq === idx ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-space-md pb-space-md pt-0 text-text-secondary font-body-sm text-body-sm leading-relaxed border-t border-border-warm/60 mt-2 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. DIRECT WHATSAPP ACTION BANNER */}
        <section className="w-full px-margin-mobile md:px-margin py-space-xl">
          <div className="max-w-[1280px] mx-auto">
            <div className="bg-forest-deep rounded-xl p-space-lg md:p-space-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-lg relative overflow-hidden">
              <div className="relative z-10 max-w-xl">
                <span className="font-label-uppercase text-label-uppercase text-accent-gold-light tracking-widest block mb-space-xs font-semibold">
                  ATENCIÓN EN TIEMPO REAL
                </span>
                <h2 className="font-headline-md text-headline-md text-surface-pure mb-space-xs">
                  ¿Preferís que un especialista arme tu pedido?
                </h2>
                <p className="font-body-md text-body-md text-on-primary-container">
                  Escribinos directamente contándonos tu rutina y tus objetivos. Te enviamos la propuesta personalizada con el carrito pre-cargado.
                </p>
              </div>
              <div className="relative z-10 shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-space-sm">
                <a
                  className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm bg-accent-gold-dark text-surface-pure hover:bg-opacity-90 rounded-lg font-label-md text-label-md transition-colors shadow-md"
                  href="https://wa.me/595981000000?text=Hola%20Trieste%20Farma,%20quisiera%20asesoramiento%20para%20elegir%20mis%20suplementos"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span>Hablar por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
