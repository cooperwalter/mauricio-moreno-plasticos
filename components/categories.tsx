"use client";

import type { Category, CategoryId } from "@/lib/types";

type Props = {
  categories: Category[];
  onSelect: (category: CategoryId | "all") => void;
};

export function Categories({ categories, onSelect }: Props) {
  const handleClick =
    (id: CategoryId | "all") => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onSelect(id);
      const target = document.getElementById("catalogo");
      if (target) {
        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
          block: "start",
        });
        history.replaceState(null, "", "#catalogo");
      }
    };

  return (
    <section className="px-6 sm:px-14 py-16 bg-bg border-b border-rule">
      <div className="flex flex-wrap gap-4 justify-between items-end mb-10">
        <div>
          <div className="font-mono text-[11px] text-muted tracking-[2px] mb-2">
            01 — CATEGORÍAS
          </div>
          <h2 className="font-display text-[40px] sm:text-[56px] m-0 font-normal tracking-[-1.5px] text-ink">
            ¿Qué estás buscando?
          </h2>
        </div>
        <a
          href="#catalogo"
          onClick={handleClick("all")}
          className="text-accent font-sans text-sm no-underline"
        >
          Ver todo →
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((c) => (
          <a
            key={c.id}
            href="#catalogo"
            onClick={handleClick(c.id)}
            className="group bg-panel px-5 py-6 border border-rule no-underline text-ink font-sans cursor-pointer transition-colors hover:border-accent"
          >
            <div className="font-display text-[42px] text-accent leading-none">
              {c.icon}
            </div>
            <div className="font-display text-[22px] mt-3">{c.name}</div>
            <div className="text-xs text-muted mt-1">{c.desc}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
