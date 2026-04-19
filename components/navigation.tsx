"use client";

import { useEffect, useRef, useState } from "react";

const NAV = [
  ["inicio", "Inicio"],
  ["catalogo", "Catálogo"],
  ["entregas", "Entregas"],
  ["nosotros", "Nosotros"],
  ["contacto", "Contacto"],
] as const;

const IDS = NAV.map(([id]) => id);

export function Navigation() {
  const [active, setActive] = useState<string>("inicio");
  const activeRef = useRef<string>("inicio");

  useEffect(() => {
    const sections = IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = activeRef.current;
        let bestRatio = 0;
        for (const id of IDS) {
          const ratio = visibility.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestRatio > 0 && bestId !== activeRef.current) {
          activeRef.current = bestId;
          setActive(bestId);
        }
      },
      {
        rootMargin: "-100px 0px -40% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior:
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      block: "start",
    });
    history.replaceState(null, "", `#${id}`);
    activeRef.current = id;
    setActive(id);
  };

  return (
    <nav
      className="hidden md:flex gap-7 font-sans text-sm"
      aria-label="Secciones del sitio"
    >
      {NAV.map(([id, label]) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            aria-current={isActive ? "page" : undefined}
            className={`no-underline pb-1 border-b-2 transition-colors ${
              isActive
                ? "text-accent font-semibold border-accent"
                : "text-ink font-medium border-transparent hover:text-accent hover:border-accent"
            }`}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
