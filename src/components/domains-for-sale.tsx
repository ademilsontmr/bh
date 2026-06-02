import { DOMAINS_FOR_SALE } from "@/lib/site";

type DomainsForSalePanelProps = {
  compact?: boolean;
  heading?: string;
};

export function DomainsForSalePanel({
  compact = false,
  heading = "Domínios disponíveis",
}: DomainsForSalePanelProps) {
  return (
    <div
      className={
        compact
          ? "mt-8 max-w-sm mx-auto space-y-2"
          : "mt-14 max-w-lg mx-auto space-y-3"
      }
    >
      <p className="text-xs uppercase tracking-widest text-primary/80 text-center">
        {heading}
      </p>
      {DOMAINS_FOR_SALE.map((domain) => (
        <div
          key={domain}
          className="rounded-xl border border-gold/30 bg-card/60 backdrop-blur px-6 py-4 shadow-elegant hover:ring-gold-glow transition text-center"
        >
          <div
            className={
              compact
                ? "font-serif text-base md:text-lg text-foreground"
                : "font-serif text-lg md:text-xl text-foreground"
            }
          >
            {domain}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DomainsForSaleInline({ className }: { className?: string }) {
  return (
    <span className={className}>
      {DOMAINS_FOR_SALE.map((domain, i) => (
        <span key={domain}>
          {i > 0 && (i < DOMAINS_FOR_SALE.length - 1 ? ", " : " e ")}
          <strong className="text-foreground">{domain}</strong>
        </span>
      ))}
    </span>
  );
}
