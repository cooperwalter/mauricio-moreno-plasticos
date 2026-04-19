import Image from "next/image";
import type { Testimonial } from "@/lib/types";

type Props = {
  testimonials: Testimonial[];
  portrait?: string;
};

export function Nosotros({ testimonials, portrait = "/products/mauricio.png" }: Props) {
  return (
    <section
      id="nosotros"
      className="px-6 sm:px-14 py-16 bg-bg border-b border-rule"
    >
      <div className="mb-10">
        <div className="font-mono text-[11px] text-muted tracking-[2px] mb-2">
          04 — NOSOTROS
        </div>
        <h2 className="font-display text-[40px] sm:text-[56px] m-0 font-normal tracking-[-1.5px] text-ink max-w-[820px]">
          Mauricio Moreno, surtiendo a CDMX desde{" "}
          <em className="text-accent font-display-italic italic">2022</em>.
        </h2>
      </div>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-start mb-14">
        <div className="relative w-full h-[360px] overflow-hidden bg-[#eadfca]">
          <Image
            src={portrait}
            alt="Don Mauricio en bodega"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        <div className="font-sans text-[17px] leading-[1.7] text-muted">
          <p className="mt-0">
            Empecé vendiendo cubetas en el mercado de Jamaica en 2022. Hoy manejo
            una bodega con más de 400 productos y una flotilla que recorre la
            ciudad de lunes a sábado.
          </p>
          <p>
            Mis clientes son taqueros, tianguistas, talleres, tamaleros y
            pequeños changarros. Conozco el negocio porque empecé igual que
            ustedes.
          </p>
          <p className="font-display-italic italic text-[20px] text-ink mt-5">
            — &quot;Si lo vendo, lo entrego. Sin pretextos.&quot;
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-panel p-7 border border-rule"
          >
            <div className="font-display text-[32px] text-accent leading-[0.5] mb-3.5">
              &ldquo;
            </div>
            <div className="font-sans text-[15px] leading-[1.55] text-ink">
              {t.text}
            </div>
            <div className="mt-4.5 font-sans text-[13px]">
              <div className="font-semibold text-ink">{t.name}</div>
              <div className="text-muted text-xs">{t.trade}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
