import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

import {
  BlogContent,
  BlogDomainMention,
  BlogKeywordTags,
  BlogTableOfContents,
  RelatedPosts,
} from "@/components/blog-content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getBlogPost, getRelatedPosts } from "@/lib/blog-posts";
import { getBlogPostHeadMeta } from "@/lib/seo";
import { FORM_URL } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return { post, related: getRelatedPosts(post) };
  },
  head: ({ loaderData }) => getBlogPostHeadMeta(loaderData!.post),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post, related } = Route.useLoaderData();

  return (
    <div className="min-h-screen">
      <SiteHeader variant="inner" />
      <main className="container mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Breadcrumbs
          items={[
            { label: "Início", to: "/" },
            { label: "Blog", to: "/blog" },
            { label: post.title, current: true },
          ]}
        />

        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-10"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao blog
        </Link>

        <article itemScope itemType="https://schema.org/BlogPosting">
          <header>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
              <time dateTime={post.date} itemProp="datePublished" className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.date + "T12:00:00").toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} de leitura
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-4" itemProp="headline">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6" itemProp="description">
              {post.excerpt}
            </p>
            <BlogKeywordTags keywords={post.keywords} />
          </header>

          <BlogTableOfContents sections={post.sections} />
          <BlogContent post={post} sections={post.sections} />
          <BlogDomainMention />
        </article>

        <RelatedPosts post={post} related={related} />

        <section aria-label="Oferta de domínio" className="mt-16 rounded-xl border border-gold/40 bg-card/60 p-8 text-center">
          <h2 className="font-serif text-2xl mb-3">Domínio premium à venda</h2>
          <p className="text-muted-foreground mb-6">
            Adquira <strong>cassinocamposdojordao.com.br</strong> e <strong>.com</strong> — posicionamento
            digital para entretenimento regulado em Campos do Jordão.
          </p>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition"
          >
            Enviar Oferta
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
