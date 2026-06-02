import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import type { BlogPost, BlogSection } from "@/lib/blog-posts";

type InlineLink = { pattern: RegExp; href: string; external?: boolean };

const MANUAL_LINK_RE = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;

const GLOBAL_INLINE_LINKS: InlineLink[] = [
  { pattern: /cassinocamposdojordao\.com\.br/gi, href: "/" },
  { pattern: /cassinocamposdojordao\.com(?!\.br)/gi, href: "/" },
];

const TOPIC_LINKS: Record<string, string> = {
  "jogo responsável": "/blog/moderacao-jogo-responsavel-cassinos",
  moderação: "/blog/moderacao-jogo-responsavel-cassinos",
  "emprego formal": "/blog/empregos-formais-hotelaria-lazer-brasil",
  "Las Vegas": "/blog/licoes-las-vegas-singapura-regulacao-brasil",
  Singapura: "/blog/licoes-las-vegas-singapura-regulacao-brasil",
  tributação: "/blog/tributacao-cassinos-regulados-financiamento-publico",
  "resort integrado": "/blog/resorts-integrados-serra-mantiqueira",
  "resorts integrados": "/blog/resorts-integrados-serra-mantiqueira",
  "Campos do Jordão": "/blog/campos-do-jordao-polo-entretenimento-regulado",
  "Serra da Mantiqueira": "/blog/resorts-integrados-serra-mantiqueira",
  regulação: "/blog/cassinos-brasil-emprego-renda",
  SEO: "/blog/dominio-premium-seo-entretenimento-campos-jordao",
  "domínio premium": "/blog/dominio-premium-seo-entretenimento-campos-jordao",
};

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function renderManualLink(label: string, target: string, key: string): ReactNode {
  if (target === "/") {
    return (
      <Link key={key} to="/" className="text-primary hover:underline">
        {label}
      </Link>
    );
  }
  return (
    <Link key={key} to="/blog/$slug" params={{ slug: target }} className="text-primary hover:underline">
      {label}
    </Link>
  );
}

function linkifyText(text: string, currentSlug: string): ReactNode[] {
  const manualParts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const manualRe = new RegExp(MANUAL_LINK_RE.source, "g");

  while ((match = manualRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      manualParts.push(...autoLinkify(text.slice(lastIndex, match.index), currentSlug, `${match.index}-pre`));
    }
    manualParts.push(renderManualLink(match[1], match[2], `manual-${match.index}`));
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    manualParts.push(...autoLinkify(text.slice(lastIndex), currentSlug, `${lastIndex}-tail`));
  }

  if (manualParts.length > 0) return manualParts;
  return autoLinkify(text, currentSlug, "full");
}

function autoLinkify(text: string, currentSlug: string, keyPrefix: string): ReactNode[] {
  type Segment = { start: number; end: number; href: string; label: string; external: boolean };
  const segments: Segment[] = [];

  for (const { pattern, href, external } of GLOBAL_INLINE_LINKS) {
    const re = new RegExp(pattern.source, pattern.flags);
    let match: RegExpExecArray | null;
    while ((match = re.exec(text)) !== null) {
      segments.push({
        start: match.index,
        end: match.index + match[0].length,
        href,
        label: match[0],
        external: external ?? false,
      });
    }
  }

  for (const [phrase, href] of Object.entries(TOPIC_LINKS)) {
    const slug = href.replace("/blog/", "");
    if (slug === currentSlug) continue;
    const re = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    let match: RegExpExecArray | null;
    while ((match = re.exec(text)) !== null) {
      segments.push({
        start: match.index,
        end: match.index + match[0].length,
        href,
        label: match[0],
        external: false,
      });
    }
  }

  segments.sort((a, b) => a.start - b.start || b.end - a.end);
  const used: Segment[] = [];
  for (const seg of segments) {
    if (used.some((u) => seg.start < u.end && seg.end > u.start)) continue;
    used.push(seg);
  }
  used.sort((a, b) => a.start - b.start);

  if (used.length === 0) return [text];

  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const seg of used) {
    if (seg.start > cursor) nodes.push(text.slice(cursor, seg.start));
    const key = `${keyPrefix}-${seg.start}`;
    if (seg.external) {
      nodes.push(
        <a key={key} href={seg.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          {seg.label}
        </a>,
      );
    } else if (seg.href.startsWith("/blog/")) {
      const slug = seg.href.replace("/blog/", "");
      nodes.push(
        <Link key={key} to="/blog/$slug" params={{ slug }} className="text-primary hover:underline">
          {seg.label}
        </Link>,
      );
    } else {
      nodes.push(
        <Link key={key} to="/" className="text-primary hover:underline">
          {seg.label}
        </Link>,
      );
    }
    cursor = seg.end;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function SectionRelatedLinks({ links }: { links: { label: string; slug: string }[] }) {
  return (
    <nav aria-label="Links relacionados nesta seção" className="mt-6 pt-5 border-t border-border/30">
      <h3 className="text-sm font-medium text-foreground mb-3">Links relacionados</h3>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.slug + link.label}>
            {link.slug === "/" ? (
              <Link to="/" className="text-primary hover:underline">
                → {link.label}
              </Link>
            ) : (
              <Link to="/blog/$slug" params={{ slug: link.slug }} className="text-primary hover:underline">
                → {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

type BlogContentProps = {
  post: BlogPost;
  sections: BlogSection[];
};

export function BlogTableOfContents({ sections }: { sections: BlogSection[] }) {
  const headings = sections.filter((s) => s.heading).map((s) => s.heading!);
  if (headings.length < 2) return null;

  return (
    <nav aria-label="Índice do artigo" className="mb-10 rounded-xl border border-border bg-card/40 p-6">
      <h2 className="font-serif text-lg text-foreground mb-4">Neste artigo</h2>
      <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
        {headings.map((h) => (
          <li key={h}>
            <a href={`#${slugifyHeading(h)}`} className="hover:text-primary transition">
              {h}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function BlogKeywordTags({ keywords }: { keywords: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2 mb-8" aria-label="Palavras-chave">
      {keywords.map((kw) => (
        <li key={kw}>
          <span className="px-3 py-1 rounded-full border border-gold/30 bg-background/60 text-xs text-foreground">
            {kw}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function BlogContent({ post, sections }: BlogContentProps) {
  return (
    <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-lg space-y-10">
      {sections.map((section, i) => (
        <section key={i} aria-labelledby={section.heading ? slugifyHeading(section.heading) : undefined}>
          {section.heading && (
            <h2
              id={slugifyHeading(section.heading)}
              className="font-serif text-2xl text-foreground scroll-mt-24 mb-4"
            >
              {section.heading}
            </h2>
          )}

          {section.listItems && section.listItems.length > 0 && (
            <ul className="list-disc list-inside space-y-2 mb-5 text-base marker:text-primary">
              {section.listItems.map((item, j) => (
                <li key={j}>{linkifyText(item, post.slug)}</li>
              ))}
            </ul>
          )}

          <div className="space-y-4">
            {section.paragraphs.map((p, j) => (
              <p key={j}>{linkifyText(p, post.slug)}</p>
            ))}
          </div>

          {section.orderedItems && section.orderedItems.length > 0 && (
            <ol className="list-decimal list-inside space-y-2 mt-5 text-base marker:text-primary">
              {section.orderedItems.map((item, j) => (
                <li key={j}>{linkifyText(item, post.slug)}</li>
              ))}
            </ol>
          )}

          {section.highlights && section.highlights.length > 0 && (
            <aside className="mt-6 rounded-lg border border-gold/20 bg-card/30 p-5">
              <h3 className="text-sm font-medium text-foreground mb-3">Pontos-chave</h3>
              <ul className="list-disc list-inside space-y-2 text-base">
                {section.highlights.map((item, j) => (
                  <li key={j}>{linkifyText(item, post.slug)}</li>
                ))}
              </ul>
            </aside>
          )}

          {section.relatedLinks && section.relatedLinks.length > 0 && (
            <SectionRelatedLinks links={section.relatedLinks} />
          )}
        </section>
      ))}
    </div>
  );
}

export function RelatedPosts({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  if (related.length === 0) return null;

  return (
    <aside aria-label="Artigos relacionados" className="mt-16 pt-10 border-t border-border/40">
      <h2 className="font-serif text-2xl text-foreground mb-6">Leia também</h2>
      <ul className="space-y-4">
        {related.map((r) => (
          <li key={r.slug}>
            <article className="rounded-lg border border-border bg-card/40 p-5 hover:border-gold/40 transition">
              <h3 className="font-serif text-lg mb-2">
                <Link to="/blog/$slug" params={{ slug: r.slug }} className="hover:text-primary transition">
                  {r.title}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.excerpt}</p>
            </article>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function BlogDomainMention() {
  return (
    <p className="text-sm text-muted-foreground mt-8 border-t border-border/30 pt-6">
      Sobre o domínio{" "}
      <Link to="/" className="text-primary hover:underline">
        cassinocamposdojordao.com.br
      </Link>
      : ativo digital premium à venda para projetos de entretenimento regulado e turismo em Campos do Jordão.{" "}
      <Link to="/" className="text-primary hover:underline">
        Saiba mais sobre a oferta
      </Link>
      .
    </p>
  );
}
