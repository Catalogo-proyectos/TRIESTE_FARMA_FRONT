export function WhatsAppFloat() {
  return (
    <a
      aria-label="Hablar con un asesor por WhatsApp"
      className="fixed bottom-space-lg right-space-lg z-30 inline-flex items-center gap-space-xs px-space-md py-space-sm bg-forest-deep text-surface-ivory rounded-full shadow-[0_12px_32px_-4px_rgba(14,56,43,0.3)] hover:bg-primary-container transition-all group hover:scale-105"
      href="https://wa.me/595981000000?text=Hola%20Trieste%20Farma,%20quisiera%20asesoramiento%20personalizado."
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="material-symbols-outlined text-[20px] text-accent-gold-light group-hover:scale-110 transition-transform">
        support_agent
      </span>
      <span className="font-label-sm text-label-sm font-medium">
        ¿Dudas? Hablá con un asesor
      </span>
    </a>
  );
}
