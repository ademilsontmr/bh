import { Link } from "@tanstack/react-router";

type BreadcrumbItem =
  | { label: string; to: "/" }
  | { label: string; to: "/blog" }
  | { label: string; to: "/blog/$slug"; slug: string }
  | { label: string; current: true };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {"current" in item && item.current ? (
                <span aria-current="page" className="text-foreground">
                  {item.label}
                </span>
              ) : item.to === "/" ? (
                <Link to="/" className="hover:text-primary transition">
                  {item.label}
                </Link>
              ) : item.to === "/blog" ? (
                <Link to="/blog" className="hover:text-primary transition">
                  {item.label}
                </Link>
              ) : (
                <Link to="/blog/$slug" params={{ slug: item.slug }} className="hover:text-primary transition">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
      </ol>
    </nav>
  );
}
