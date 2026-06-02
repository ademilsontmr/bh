import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Crown,
  Globe,
  Hotel,
  Mail,
  MapPin,
  Send,
  Shield,
  Sparkles,
  TrendingUp,
  Trophy,
} from "lucide-react";

const DOMAIN_BR = "cassinocamposdojordao.com.br";
const DOMAIN_COM = "cassinocamposdojordao.com";

const faqItems = [
  {
    q: "O domínio está disponível para transferência?",
    a: "Sim. Os dois domínios estão ativos, em nome do proprietário atual e prontos para transferência imediata após a confirmação da negociação. A transferência é realizada de forma segura através dos registradores oficiais (Registro.br e ICANN).",
  },
  {
    q: "Os dois domínios estão inclusos na venda?",
    a: "Sim. A oferta padrão inclui as duas extensões: cassinocamposdojordao.com.br e cassinocamposdojordao.com. Adquirir ambas garante proteção completa da marca, evita concorrência futura e fortalece a presença digital do projeto.",
  },
  {
    q: "Como funciona o processo de negociação?",
    a: "O processo é simples e transparente: você envia uma proposta pelo formulário, recebemos seu contato, alinhamos valores e condições, formalizamos o acordo e iniciamos a transferência segura dos domínios.",
  },
  {
    q: "Posso enviar uma oferta personalizada?",
    a: "Com certeza. Aceitamos propostas e analisamos todas as ofertas sérias com atenção. Informe seu valor e condições no formulário e retornaremos rapidamente.",
  },
  {
    q: "Qual o prazo para transferência dos domínios?",
    a: "Após a confirmação do pagamento, a transferência costuma ser concluída em até 7 dias úteis, dependendo do registrador escolhido pelo comprador.",
  },
];

const valueCards = [
  { icon: Sparkles, title: "Nome memorável", text: "Fácil de lembrar, escrever e divulgar — ideal para construção de marca forte." },
  { icon: MapPin, title: "Associação com Campos do Jordão", text: "Conexão direta com um dos destinos turísticos mais valorizados do Brasil." },
  { icon: Crown, title: "Potencial para branding", text: "Permite criar uma identidade premium em diversos segmentos de alto valor." },
  { icon: Hotel, title: "Turismo e entretenimento", text: "Encaixe natural em hotelaria, eventos, lazer e experiências exclusivas." },
  { icon: Globe, title: "Versão .COM e .COM.BR", text: "Cobertura nacional e internacional com proteção total da marca." },
  { icon: Trophy, title: "Ativo digital escasso", text: "Combinações premium como esta são raras e tendem a se valorizar com o tempo." },
];

const useCases = [
  { icon: Globe, title: "Portal turístico", text: "Hub completo de informações sobre Campos do Jordão." },
  { icon: Hotel, title: "Guia de hotéis e pousadas", text: "Plataforma de reservas e curadoria de hospedagens." },
  { icon: Calendar, title: "Portal de eventos", text: "Agenda cultural, gastronômica e festivais da região." },
  { icon: Sparkles, title: "Blog de viagens", text: "Conteúdo premium sobre destinos de inverno e luxo." },
  { icon: Trophy, title: "Projeto de entretenimento", text: "Marca forte para shows, espetáculos e experiências." },
  { icon: Building2, title: "Agência de turismo", text: "Operadora especializada em pacotes premium para a serra." },
  { icon: Award, title: "Portal histórico e cultural", text: "Acervo digital sobre patrimônio e tradições locais." },
  { icon: TrendingUp, title: "Marketplace regional", text: "Comércio local de produtores, restaurantes e artesãos." },
];

const seoKeywords = ["Cassino", "Campos do Jordão", "Turismo", "Hotelaria", "Eventos", "Entretenimento"];

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Domínios Premium CassinoCamposdoJordao.com.br e .com",
  description:
    "Domínio premium à venda — CassinoCamposdoJordao.com.br e CassinoCamposdoJordao.com. Ativo digital exclusivo para projetos de turismo, hotelaria, eventos e entretenimento.",
  brand: { "@type": "Brand", name: "Cassino Campos do Jordão" },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "BRL",
    priceSpecification: { "@type": "PriceSpecification", priceCurrency: "BRL", price: "0", valueAddedTaxIncluded: true },
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Domínio Cassino Campos do Jordão à Venda | .COM e .COM.BR" },
      {
        name: "description",
        content:
          "Domínio premium CassinoCamposdoJordao.com.br à venda. Inclui versões .com e .com.br. Excelente oportunidade para branding, turismo e projetos digitais.",
      },
      {
        name: "keywords",
        content:
          "cassino campos do jordão, domínio premium à venda, comprar domínio, campos do jordão, turismo, hotelaria, eventos, entretenimento",
      },
      { property: "og:title", content: "Domínio Cassino Campos do Jordão à Venda | .COM e .COM.BR" },
      {
        property: "og:description",
        content:
          "Adquira um ativo digital exclusivo. Domínios .com e .com.br disponíveis para projetos de turismo, hotelaria e entretenimento em Campos do Jordão.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Domínio Cassino Campos do Jordão à Venda" },
      {
        name: "twitter:description",
        content: "Domínio premium .com e .com.br à venda. Oportunidade única para projetos digitais em Campos do Jordão.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(orgJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <DomainsStrip />
        <ValueSection />
        <SeoSection />
        <UseCasesSection />
        <DualDomainSection />
        <ContactSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/40">
      <div className="container mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <Crown className="h-5 w-5 text-primary" />
          <span className="font-serif text-lg tracking-tight">
            Cassino<span className="text-gradient-gold"> Campos do Jordão</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#valor" className="hover:text-primary transition">Vantagens</a>
          <a href="#aplicacoes" className="hover:text-primary transition">Aplicações</a>
          <a href="#faq" className="hover:text-primary transition">FAQ</a>
        </nav>
        <a
          href="mailto:contato@cassinocamposdojordao.com.br"
          className="text-sm bg-gradient-gold text-primary-foreground px-4 py-2 rounded-md font-medium shadow-gold hover:opacity-90 transition"
        >
          Solicitar Informações
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40"
           style={{ backgroundImage: "radial-gradient(circle at 50% 0%, oklch(0.82 0.14 85 / 25%), transparent 60%)" }} />
      <div className="container mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-card/50 text-xs uppercase tracking-[0.2em] text-primary mb-8">
          <Sparkles className="h-3.5 w-3.5" /> Ativo Digital Premium
        </div>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl mx-auto">
          Domínio Premium à Venda:{" "}
          <span className="text-gradient-gold italic">CassinoCamposdoJordao.com.br</span>
        </h1>
        <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Adquira um domínio estratégico, memorável e com forte potencial de marca para projetos relacionados a
          turismo, entretenimento, hotelaria, eventos e negócios digitais.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:contato@cassinocamposdojordao.com.br"
            className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-7 py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition"
          >
            <Mail className="h-4 w-4" /> Solicitar Informações
          </a>
          <a
            href="mailto:contato@cassinocamposdojordao.com.br"
            className="inline-flex items-center justify-center gap-2 border border-gold/60 text-foreground px-7 py-3.5 rounded-md font-semibold hover:bg-card/70 transition"
          >
            <Send className="h-4 w-4" /> Enviar Oferta
          </a>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {[DOMAIN_BR, DOMAIN_COM].map((d) => (
            <div
              key={d}
              className="group relative rounded-xl border border-gold/30 bg-card/60 backdrop-blur px-6 py-5 shadow-elegant hover:ring-gold-glow transition"
            >
              <div className="text-xs uppercase tracking-widest text-primary/80 mb-1">Domínio</div>
              <div className="font-serif text-xl md:text-2xl text-foreground">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DomainsStrip() {
  const items = [
    { icon: Shield, label: "Transferência Segura" },
    { icon: Award, label: "Marca Protegida" },
    { icon: TrendingUp, label: "Alto Potencial" },
    { icon: Globe, label: ".COM + .COM.BR" },
  ];
  return (
    <section className="border-y border-border/40 bg-card/30">
      <div className="container mx-auto max-w-6xl px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Icon className="h-4 w-4 text-primary" /> {label}
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14">
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.25em] text-primary mb-3">{eyebrow}</div>
      )}
      <h2 className="font-serif text-3xl md:text-5xl leading-tight">{title}</h2>
      {subtitle && <p className="mt-5 text-muted-foreground text-lg leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function ValueSection() {
  return (
    <section id="valor" className="py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Vantagens"
          title="Por que este domínio é uma oportunidade única?"
          subtitle="Uma combinação rara de relevância geográfica, força de marca e versatilidade comercial em um único ativo digital."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {valueCards.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-xl border border-border bg-card/60 p-7 hover:border-gold/50 hover:-translate-y-1 transition"
            >
              <div className="h-11 w-11 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold mb-5">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-xl mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeoSection() {
  return (
    <section className="py-24 bg-card/30 border-y border-border/40">
      <div className="container mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="SEO Estratégico"
          title="Potencial para Posicionamento Digital"
        />
        <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-lg space-y-5">
          <p>
            O domínio <strong className="text-foreground">CassinoCamposdoJordao.com.br</strong> reúne, em um único
            endereço, palavras-chave de alto interesse que tradicionalmente atraem audiências qualificadas em
            segmentos de turismo, hotelaria, eventos e entretenimento. A combinação entre um termo aspiracional
            e a referência direta a um dos destinos mais valorizados do Brasil cria um ativo com forte
            identidade e relevância semântica.
          </p>
          <p>
            Para projetos digitais que buscam construir autoridade ao longo do tempo, partir de um domínio com
            tamanha clareza temática representa uma base sólida. Aliado a uma estratégia editorial consistente,
            esse ativo pode sustentar portais informativos, plataformas de reservas, guias culturais e
            experiências de marca premium voltadas ao público que visita ou se interessa pela região.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {seoKeywords.map((k) => (
            <span
              key={k}
              className="px-4 py-2 rounded-full border border-gold/40 bg-background/60 text-sm text-foreground"
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section id="aplicacoes" className="py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Aplicações"
          title="Possibilidades de Utilização"
          subtitle="Um ativo versátil que se adapta a múltiplos modelos de negócio voltados à serra da Mantiqueira."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card/60 p-6 hover:border-gold/50 transition"
            >
              <Icon className="h-5 w-5 text-primary mb-4" />
              <h3 className="font-serif text-lg mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DualDomainSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-50"
           style={{ backgroundImage: "radial-gradient(ellipse at center, oklch(0.82 0.14 85 / 18%), transparent 65%)" }} />
      <div className="container mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-gold/40 bg-card/70 backdrop-blur p-10 md:p-16 text-center shadow-elegant">
          <Crown className="h-10 w-10 mx-auto text-primary mb-6" />
          <h2 className="font-serif text-3xl md:text-5xl">Venda dos Dois Domínios</h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Garanta proteção completa da marca e presença digital estratégica adquirindo as duas extensões.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {[DOMAIN_BR, DOMAIN_COM].map((d) => (
              <div
                key={d}
                className="rounded-xl border border-gold/40 bg-background/60 px-6 py-6 ring-gold-glow"
              >
                <CheckCircle2 className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="font-serif text-lg md:text-xl">{d}</div>
              </div>
            ))}
          </div>
          <a
            href="mailto:contato@cassinocamposdojordao.com.br"
            className="mt-10 inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-7 py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition"
          >
            <Mail className="h-4 w-4" /> Solicitar Proposta dos Dois
          </a>
        </div>
      </div>
    </section>
  );
}


function FaqSection() {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="Dúvidas Frequentes" title="Perguntas e Respostas" />
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-border bg-card/60 p-6 open:border-gold/50 transition"
            >
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-serif text-lg">
                {item.q}
                <span className="text-primary text-2xl leading-none transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-muted-foreground leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 py-10 mt-10">
      <div className="container mx-auto max-w-6xl px-6 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-primary" />
          <span>© {new Date().getFullYear()} CassinoCamposdoJordao — Domínio Premium à Venda</span>
        </div>
        <div className="flex gap-5">
          <a href="mailto:contato@cassinocamposdojordao.com.br" className="hover:text-primary transition">Contato</a>
          <a href="#faq" className="hover:text-primary transition">FAQ</a>
        </div>
      </div>
    </footer>
  );
}
