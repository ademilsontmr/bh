export const SITE_URL =
  import.meta.env.VITE_SITE_URL ?? "https://cassinoportoalegre.com";

export const SITE_NAME = "Cassino de Porto Alegre — Domínio Premium à Venda";

export const CONTACT_EMAIL = "contato@cassinoportoalegre.com";

export const FORM_URL = "https://forms.gle/aCxqHaa7pMHu83HH7";

/** Domínio principal do site (canônico) */
export const DOMAIN = "cassinoportoalegre.com";

/** Domínio à venda neste site */
export const DOMAINS_FOR_SALE = ["cassinoportoalegre.com"] as const;

/** Rede de domínios premium à venda (todos os sites do portfólio) */
export const NETWORK_DOMAINS_FOR_SALE = [
  "cassinoportoalegre.com",
  "cassinodegramado.com.br",
  "cassinocamposdojordao.com.br",
  "cassinocopacabana.com",
  "cassinodesaopaulo.com.br",
  "cassinodebrasilia.com.br",
  "cassinodesalinas.com.br",
  "cassinobh.com.br",
] as const;

export function normalizeDomain(domain: string): string {
  return domain
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

/** Domínios da rede, exceto o site atual */
export function getOtherNetworkDomains(
  currentDomain: string = DOMAIN,
): readonly string[] {
  const current = normalizeDomain(currentDomain);
  return NETWORK_DOMAINS_FOR_SALE.filter(
    (domain) => normalizeDomain(domain) !== current,
  );
}

/** Lista em português: "a, b e c" */
export function formatDomainsListPt(
  domains: readonly string[] = DOMAINS_FOR_SALE,
): string {
  if (domains.length === 0) return "";
  if (domains.length === 1) return domains[0];
  if (domains.length === 2) return `${domains[0]} e ${domains[1]}`;
  return `${domains.slice(0, -1).join(", ")} e ${domains[domains.length - 1]}`;
}

export const OG_IMAGE_PATH = "/og-image.png";

export const OG_IMAGE = `${SITE_URL}${OG_IMAGE_PATH}`;
