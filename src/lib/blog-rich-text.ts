/** Termos destacados com <strong> no corpo dos artigos — foco cassino BR / Porto Alegre */
export const SEO_BOLD_PHRASES = [
  "cassino regulado",
  "cassinos regulados",
  "Porto Alegre",
  "Rio Grande do Sul",
  "jogo responsável",
  "emprego formal",
  "resort integrado",
  "resorts integrados",
  "regulação de cassinos",
  "regulação no Brasil",
  "Brasil",
  "turismo",
  "arrecadação",
  "moderação",
  "investimento estrangeiro",
  "Las Vegas",
  "Singapura",
  "tributação",
  "domínio premium",
  "cassinoportoalegre.com",
];

export function applyBoldPhrases(text: string): string {
  let result = text;
  for (const phrase of SEO_BOLD_PHRASES) {
    const re = new RegExp(`(?<!\\*)\\b(${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b(?!\\*)`, "i");
    if (!re.test(result)) continue;
    result = result.replace(re, "**$1**");
  }
  return result;
}

export function stripRichMarkup(text: string): string {
  return text
    .replace(/\[\[([^\]|]+)\|gov:[^\]]+\]\]/g, "$1")
    .replace(/\[\[([^\]|]+)\|https?:\/\/[^\]]+\]\]/g, "$1")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
}
