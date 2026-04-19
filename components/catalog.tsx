"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";
import type { Category, CategoryId, Product } from "@/lib/types";

type CategoryFilter = CategoryId | "all";

type Props = {
  products: Product[];
  categories: Category[];
  category: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
};

export function Catalog({
  products,
  categories,
  category,
  onCategoryChange,
}: Props) {
  const [active, setActive] = useState<Product | null>(null);

  const filtered =
    category === "all" ? products : products.filter((p) => p.cat === category);

  return (
    <>
      <section
        id="catalogo"
        className="px-6 sm:px-14 py-16 bg-bg border-b border-rule"
      >
        <div className="mb-8">
          <div className="font-mono text-[11px] text-muted tracking-[2px] mb-2">
            02 — CATÁLOGO
          </div>
          <h2 className="font-display text-[40px] sm:text-[56px] m-0 font-normal tracking-[-1.5px] text-ink">
            El catálogo
          </h2>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {[{ id: "all" as const, name: "Todos" }, ...categories].map((c) => {
            const isActive = category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onCategoryChange(c.id)}
                className={`px-[18px] py-2.5 font-sans text-[13px] font-medium cursor-pointer border ${
                  isActive
                    ? "bg-ink text-bg border-ink"
                    : "bg-transparent text-ink border-rule"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              p={p}
              onClick={() => setActive(p)}
              priority={i < 4}
            />
          ))}
        </div>
      </section>

      {active ? (
        <ProductModal product={active} onClose={() => setActive(null)} />
      ) : null}
    </>
  );
}

function ProductCard({
  p,
  onClick,
  priority,
}: {
  p: Product;
  onClick: () => void;
  priority: boolean;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={`Ver detalles de ${p.name}`}
      className="text-left bg-panel border border-rule cursor-pointer flex flex-col transition-all hover:border-accent hover:-translate-y-0.5 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      <div className="relative">
        <div className="relative w-full h-[200px] bg-white overflow-hidden">
          {p.photo ? (
            <Image
              src={p.photo}
              alt={p.name}
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[11px] text-muted">{p.name}</span>
            </div>
          )}
        </div>
        {p.badge ? (
          <div className="absolute top-3 left-3 bg-accent text-accent-fg px-2.5 py-1 text-[10px] font-mono font-bold tracking-[1px]">
            {p.badge.toUpperCase()}
          </div>
        ) : null}
      </div>
      <div className="p-[18px] flex-1 flex flex-col">
        <div className="font-mono text-[10px] text-muted tracking-[1px]">
          {p.sku}
        </div>
        <div className="font-display text-[20px] text-ink mt-1 leading-[1.15]">
          {p.name}
        </div>
        <div className="font-sans text-xs text-muted mt-1.5">{p.specs[0]}</div>
        <div className="flex-1" />
        <div className="mt-3.5 flex items-baseline justify-between gap-2">
          <div>
            <span className="font-display text-[28px] text-ink">${p.price}</span>
            <span className="font-sans text-xs text-muted ml-1">/paquete</span>
          </div>
          <div className="font-mono text-[10px] text-muted tracking-[0.5px] text-right max-w-[140px] leading-[1.3]">
            {p.unit}
          </div>
        </div>
      </div>
    </button>
  );
}

function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [qty, setQty] = useState(1);
  const total = qty * product.price;
  const titleId = `modal-title-${product.id}`;
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const msg = `Hola don Mauricio, quiero cotizar:\n• ${product.name} (${product.sku})\n• ${qty} ${qty === 1 ? "paquete" : "paquetes"} (${product.unit})\n• Total estimado: $${total.toFixed(2)} MXN`;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;

      if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-10"
      style={{ background: "rgba(20,15,10,0.55)" }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        className="bg-bg w-full max-w-[880px] max-h-[90vh] overflow-auto grid md:grid-cols-2 focus:outline-none"
      >
        <div className="relative bg-white min-h-[280px] md:min-h-[520px]">
          {product.photo ? (
            <Image
              src={product.photo}
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="(min-width: 768px) 440px, 100vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-muted">{product.name}</span>
            </div>
          )}
        </div>

        <div className="p-8 flex flex-col">
          <div className="flex justify-between items-start">
            <div className="font-mono text-[11px] text-muted tracking-[1.5px]">
              {product.sku} · {product.stock}
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              type="button"
              aria-label="Cerrar"
              className="bg-transparent border-none text-[22px] cursor-pointer text-muted leading-none p-0"
            >
              ×
            </button>
          </div>

          <h3
            id={titleId}
            className="font-display text-[36px] mt-2 mb-0 font-normal tracking-[-0.8px] text-ink leading-[1.05]"
          >
            {product.name}
          </h3>
          <div className="font-display text-[32px] text-accent mt-2">
            ${product.price}{" "}
            <span className="text-sm text-muted font-sans">/ paquete</span>
          </div>

          <ul className="font-sans text-sm text-muted mt-5 p-0 list-none leading-[1.7]">
            {product.specs.map((s, i) => (
              <li key={`${s}-${i}`}>· {s}</li>
            ))}
          </ul>

          <div className="mt-[22px] font-sans px-4 py-3.5 bg-panel border border-rule">
            <div className="text-[11px] text-muted tracking-[1px] mb-1 font-mono">
              PRESENTACIÓN
            </div>
            <div className="text-[15px] text-ink font-medium">{product.unit}</div>
          </div>

          <div className="mt-[18px] font-sans">
            <div className="text-xs text-muted mb-2">Cantidad de paquetes</div>
            <div className="flex items-center border border-rule w-fit">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                type="button"
                aria-label="Reducir cantidad"
                className="px-4 py-2.5 bg-transparent border-none cursor-pointer text-base text-ink"
              >
                −
              </button>
              <input
                type="number"
                value={qty}
                min={1}
                aria-label="Cantidad de paquetes"
                onChange={(e) =>
                  setQty(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-[70px] text-center border-none py-2.5 text-[15px] font-sans bg-transparent text-ink outline-none"
              />
              <button
                onClick={() => setQty(qty + 1)}
                type="button"
                aria-label="Aumentar cantidad"
                className="px-4 py-2.5 bg-transparent border-none cursor-pointer text-base text-ink"
              >
                +
              </button>
            </div>
            <div className="text-[13px] text-muted mt-2">
              Total estimado:{" "}
              <b className="text-ink">${total.toFixed(2)} MXN</b>
            </div>
          </div>

          <div className="flex-1 min-h-[20px]" />

          <a
            href={whatsappUrl(msg)}
            target="_blank"
            rel="noreferrer"
            className="bg-whatsapp text-white px-[22px] py-4 font-sans text-[15px] font-semibold no-underline flex items-center justify-center gap-2.5 mt-5"
          >
            <WhatsAppIcon size={18} /> Cotizar este pedido
          </a>
        </div>
      </div>
    </div>
  );
}
