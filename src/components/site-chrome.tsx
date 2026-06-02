import { Link } from "@tanstack/react-router";
import { Crown } from "lucide-react";

import { DOMAIN_BR, FORM_URL } from "@/lib/site";

type SiteHeaderProps = {
  variant?: "home" | "inner";
};

export function SiteHeader({ variant = "home" }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/40">
      <div className="container mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Crown className="h-5 w-5 text-primary" />
          <span className="font-serif text-lg tracking-tight">
            Cassino<span className="text-gradient-gold"> Campos do Jordão</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground" aria-label="Navegação principal">
          {variant === "home" ? (
            <>
              <a href="#valor" className="hover:text-primary transition">Vantagens</a>
              <a href="#aplicacoes" className="hover:text-primary transition">Aplicações</a>
              <Link to="/blog" className="hover:text-primary transition">Blog</Link>
              <a href="#faq" className="hover:text-primary transition">FAQ</a>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-primary transition">Início</Link>
              <Link to="/blog" className="hover:text-primary transition">Blog</Link>
              <a href="/#dominios" className="hover:text-primary transition">Domínios</a>
            </>
          )}
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

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-10 mt-10">
      <div className="container mx-auto max-w-6xl px-6 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-primary" />
          <span>© {new Date().getFullYear()} {DOMAIN_BR} — Domínio Premium à Venda</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-5" aria-label="Links do rodapé">
          <Link to="/blog" className="hover:text-primary transition">Blog</Link>
          <a href="/#dominios" className="hover:text-primary transition">Domínios</a>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            Contato
          </a>
          <a href="/#faq" className="hover:text-primary transition">FAQ</a>
        </nav>
      </div>
    </footer>
  );
}
