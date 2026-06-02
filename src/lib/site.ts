export const SITE_URL =
  import.meta.env.VITE_SITE_URL ?? "https://cassinodesalinas.com.br";

export const SITE_NAME = "Cassino de Salinas — Domínio Premium à Venda";

export const CONTACT_EMAIL = "contato@cassinodesalinas.com.br";

export const FORM_URL = "https://forms.gle/aCxqHaa7pMHu83HH7";

/** Domínio principal do site (canônico) */
export const DOMAIN = "cassinodesalinas.com.br";

/** Domínio à venda */
export const DOMAINS_FOR_SALE = ["cassinodesalinas.com.br"] as const;

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
