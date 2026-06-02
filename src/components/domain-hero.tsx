import { Mail, Sparkles } from "lucide-react";

import { DOMAIN, FORM_URL } from "@/lib/site";

type DomainHeroProps = {
  /** Versão compacta para cards em artigos do blog */
  compact?: boolean;
};

export function DomainHero({ compact = false }: DomainHeroProps) {
  const titleClassName = compact
    ? "font-serif text-2xl md:text-3xl leading-tight"
    : "font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl mx-auto";

  return (
    <section
      id={compact ? undefined : "top"}
      className={
        compact
          ? "relative overflow-hidden rounded-xl text-center px-6 py-10 md:py-12"
          : "relative overflow-hidden"
      }
      aria-label={compact ? "Oferta do domínio cassinocopacabana.com" : undefined}
    >
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, oklch(0.82 0.14 85 / 25%), transparent 60%)",
        }}
      />
      <div
        className={
          compact
            ? "max-w-2xl mx-auto"
            : "container mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 text-center"
        }
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-card/50 text-xs uppercase tracking-[0.2em] text-primary mb-6 md:mb-8">
          <Sparkles className="h-3.5 w-3.5" /> Ativo Digital Premium
        </div>
        {compact ? (
          <p className={titleClassName}>
            Domínio Premium à Venda:{" "}
            <span className="text-gradient-gold italic block sm:inline mt-1 sm:mt-0">{DOMAIN}</span>
          </p>
        ) : (
          <h1 className={titleClassName}>
            Domínio Premium à Venda:{" "}
            <span className="text-gradient-gold italic block sm:inline mt-1 sm:mt-0">{DOMAIN}</span>
          </h1>
        )}
        <p
          className={
            compact
              ? "mt-4 text-sm md:text-base text-muted-foreground leading-relaxed"
              : "mt-7 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          }
        >
          Adquira um domínio estratégico, memorável e com forte potencial de marca para projetos relacionados a
          turismo, entretenimento, hotelaria, eventos e negócios digitais — em um momento em que o governo federal
          está quase regulamentando cassinos no Brasil, como já ocorre em diversos países.
        </p>

        <div className={compact ? "mt-6 flex justify-center" : "mt-10 flex justify-center"}>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3 md:px-7 md:py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition text-sm md:text-base"
          >
            <Mail className="h-4 w-4" /> Enviar Oferta
          </a>
        </div>

        <div id={compact ? undefined : "dominio"} className={compact ? "mt-8 max-w-sm mx-auto" : "mt-14 max-w-md mx-auto"}>
          <div className="rounded-xl border border-gold/30 bg-card/60 backdrop-blur px-6 py-5 shadow-elegant hover:ring-gold-glow transition text-center">
            <div className="text-xs uppercase tracking-widest text-primary/80 mb-1">Domínio</div>
            <div className={compact ? "font-serif text-lg md:text-xl text-foreground" : "font-serif text-xl md:text-2xl text-foreground"}>
              {DOMAIN}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
