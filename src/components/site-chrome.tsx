import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Crown, ExternalLink } from "lucide-react";

import { DOMAIN, FORM_URL, getOtherNetworkDomains } from "@/lib/site";

const NAV_ITEMS = [
  { label: "Vantagens", sectionId: "valor" },
  { label: "Regulação", sectionId: "regulamentacao" },
  { label: "Aplicações", sectionId: "aplicacoes" },
] as const;

function useSectionHref(sectionId: string) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/40">
      <div className="container mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" hash="top" className="flex items-center gap-2 group">
          <Crown className="h-5 w-5 text-primary" />
          <span className="font-serif text-lg tracking-tight">
            Cassino<span className="text-gradient-gold"> de Belo Horizonte</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground" aria-label="Navegação principal">
          {NAV_ITEMS.slice(0, 3).map(({ label, sectionId }) => (
            <NavSectionLink key={sectionId} sectionId={sectionId}>
              {label}
            </NavSectionLink>
          ))}
          <Link to="/blog" className="hover:text-primary transition">
            Blog
          </Link>
          <NavSectionLink sectionId="faq">FAQ</NavSectionLink>
        </nav>
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-gradient-gold text-primary-foreground px-4 py-2 rounded-md font-medium shadow-gold hover:opacity-90 transition"
        >
          Enviar Oferta
        </a>
      </div>
    </header>
  );
}

function NavSectionLink({
  sectionId,
  children,
}: {
  sectionId: string;
  children: ReactNode;
}) {
  const href = useSectionHref(sectionId);
  return (
    <a href={href} className="hover:text-primary transition">
      {children}
    </a>
  );
}

export function NetworkDomainsSection() {
  const otherDomains = getOtherNetworkDomains();

  if (otherDomains.length === 0) return null;

  return (
    <section
      aria-labelledby="network-domains-heading"
      className="border-t border-border/40 bg-card/20 py-10 mt-10"
    >
      <div className="container mx-auto max-w-6xl px-6">
        <h2
          id="network-domains-heading"
          className="font-serif text-xl md:text-2xl text-center mb-2"
        >
          Outros domínios premium à venda
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Estes sites também estão disponíveis para aquisição
        </p>
        <ul className="flex flex-wrap justify-center gap-3 list-none p-0 m-0">
          {otherDomains.map((domain) => (
            <li key={domain}>
              <a
                href={`https://${domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/50 px-4 py-2 text-sm text-muted-foreground hover:border-gold/50 hover:text-primary transition"
              >
                {domain}
                <ExternalLink
                  className="h-3.5 w-3.5 shrink-0 opacity-60"
                  aria-hidden
                />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <>
      <NetworkDomainsSection />
      <footer className="border-t border-border/40 py-10">
        <div className="container mx-auto max-w-6xl px-6 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-primary" aria-hidden />
            <span>
              © {new Date().getFullYear()} {DOMAIN} — Domínio Premium à Venda
            </span>
          </div>
          <nav
            className="flex flex-wrap justify-center gap-5"
            aria-label="Links do rodapé"
          >
            <Link to="/blog" className="hover:text-primary transition">
              Blog
            </Link>
            <a href="/#dominio" className="hover:text-primary transition">
              Domínio
            </a>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              Contato
            </a>
            <a href="/#faq" className="hover:text-primary transition">
              FAQ
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
