import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_12px_rgba(0,0,0,0.03)] border-t border-border-warm">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-lg pb-space-lg">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-space-md pr-space-lg">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-full bg-primary-container border border-accent-gold-dark/40 flex items-center justify-center text-accent-gold-light shadow-sm">
                <span className="material-symbols-outlined text-[18px]">spa</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-forest-deep">
                TRIESTE FARMA
              </span>
            </div>
            <p className="font-body-md text-body-md text-text-secondary max-w-md">
              Formulaciones botánicas de grado clínico para una longevidad activa y bienestar consciente. Pureza certificada, trazabilidad de lote y asesoramiento profesional en cada paso.
            </p>
            <div className="flex items-center gap-space-xs text-accent-gold-dark font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Certificados de Análisis (CoA) de acceso público</span>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-label-uppercase text-label-uppercase text-forest-deep font-semibold">
              Catálogo Esencial
            </h4>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-text-secondary">
              <li className="hover:text-forest-deep transition-colors">
                <Link href="/catalogo?cat=longevidad">Longevidad & Celular</Link>
              </li>
              <li className="hover:text-forest-deep transition-colors">
                <Link href="/catalogo?cat=adaptogenos">Adaptógenos & Estrés</Link>
              </li>
              <li className="hover:text-forest-deep transition-colors">
                <Link href="/catalogo?cat=metabolismo">Salud Metabólica & Sueño</Link>
              </li>
              <li className="hover:text-forest-deep transition-colors">
                <Link href="/catalogo?cat=proteina">Proteínas & Fuerza</Link>
              </li>
            </ul>
          </div>

          {/* Guides & Assistance */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-label-uppercase text-label-uppercase text-forest-deep font-semibold">
              Guías & Ayuda
            </h4>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-text-secondary">
              <li className="hover:text-forest-deep transition-colors">
                <Link href="/#recomendador">Cuestionario de Bienestar</Link>
              </li>
              <li className="hover:text-forest-deep transition-colors">
                <Link href="/#filosofia">Monografías de Ingredientes</Link>
              </li>
              <li className="hover:text-forest-deep transition-colors">
                <Link href="/checkout">Métodos de Envío y Pagos</Link>
              </li>
              <li className="hover:text-forest-deep transition-colors">
                <Link href="/#faq">Preguntas Frecuentes</Link>
              </li>
            </ul>
          </div>

          {/* Pharmaceutical Attention */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-label-uppercase text-label-uppercase text-forest-deep font-semibold">
              Atención Farmacéutica
            </h4>
            <p className="font-body-sm text-body-sm text-text-secondary">
              Lunes a Viernes de 8:00 a 19:00 hs.
              <br />
              Sábados de 8:00 a 13:00 hs.
            </p>
            <a
              className="inline-flex items-center gap-space-xs font-label-md text-label-md text-forest-deep hover:text-accent-gold-dark transition-colors"
              href="https://wa.me/595981000000?text=Hola%20Trieste%20Farma,%20quisiera%20consultar%20sobre%20un%20producto."
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>WhatsApp: +595 981 000-000</span>
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-space-md border-t border-border-warm flex flex-col md:flex-row items-center justify-between gap-space-sm text-label-sm text-label-sm text-text-secondary">
          <p className="font-body-sm text-body-sm text-center md:text-left text-outline">
            Descargo de responsabilidad: Los suplementos dietarios no intentan diagnosticar, tratar, curar ni prevenir ninguna patología médica. Consulte a su médico o nutricionista de confianza ante cualquier duda clínica.
          </p>
          <p className="whitespace-nowrap">
            © {new Date().getFullYear()} Trieste Farma. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
