import { Link } from "@tanstack/react-router";

import { SITE_URL } from "@/lib/site";

type BreadcrumbItem =
  | { label: string; to: "/" }
  | { label: string; to: "/blog" }
  | { label: string; to: "/blog/$slug"; slug: string }
  | { label: string; current: true };

function breadcrumbItemUrl(item: BreadcrumbItem): string | undefined {
  if ("current" in item) return undefined;
  if (item.to === "/") return SITE_URL;
  if (item.to === "/blog") return `${SITE_URL}/blog`;
  return `${SITE_URL}/blog/${item.slug}`;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol
        className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, i) => {
          const position = i + 1;
          const url = breadcrumbItemUrl(item);

          return (
            <li
              key={i}
              className="flex items-center gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(position)} />
              {i > 0 && <span aria-hidden="true">/</span>}
              {"current" in item && item.current ? (
                <span aria-current="page" className="text-foreground" itemProp="name">
                  {item.label}
                </span>
              ) : item.to === "/" ? (
                <Link to="/" className="hover:text-primary transition" itemProp="item">
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : item.to === "/blog" ? (
                <Link to="/blog" className="hover:text-primary transition" itemProp="item">
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <Link
                  to="/blog/$slug"
                  params={{ slug: item.slug }}
                  className="hover:text-primary transition"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              {url && <link itemProp="item" href={url} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
