import { CdmxMap } from "./cdmx-map";
import type { Zone } from "@/lib/types";

type Props = {
  zones: Zone[];
};

export function Zones({ zones }: Props) {
  return (
    <section
      id="entregas"
      className="px-6 sm:px-14 py-16 bg-panel border-b border-rule"
    >
      <div className="mb-10 max-w-[680px]">
        <div className="font-mono text-[11px] text-muted tracking-[2px] mb-2">
          03 — ENTREGAS
        </div>
        <h2 className="font-display text-[40px] sm:text-[56px] m-0 font-normal tracking-[-1.5px] text-ink">
          Llegamos a toda la CDMX.
        </h2>
        <p className="font-sans text-base leading-[1.6] text-muted mt-4">
          Flota propia. Mismo día para Zona Centro si pides antes de las 2pm. Pago
          contra entrega en efectivo o transferencia.
        </p>
      </div>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-start">
        <div className="flex flex-col">
          {zones.map((z) => (
            <div
              key={z.name}
              className="grid grid-cols-[12px_1fr_auto] gap-5 py-[22px] border-t border-rule items-start"
            >
              <div
                className="w-3 h-3 mt-1.5"
                style={{ background: z.color }}
              />
              <div>
                <div className="font-display text-[22px] text-ink tracking-[-0.3px]">
                  {z.name}
                </div>
                <div className="font-sans text-[13px] text-muted mt-1">
                  {z.areas.join(" · ")}
                </div>
              </div>
              <div className="text-right font-sans text-[13px]">
                <div className="text-ink font-semibold">{z.speed}</div>
                <div className="text-muted mt-1">{z.cost}</div>
              </div>
            </div>
          ))}
          <div className="border-t border-rule" />
        </div>

        <div
          className="relative bg-bg border border-rule overflow-hidden"
          style={{ aspectRatio: "1 / 1.1" }}
        >
          <CdmxMap zones={zones} />
          <div className="pointer-events-none absolute top-3 left-3 font-mono text-[10px] text-muted tracking-[1px] bg-bg/85 px-1.5 py-0.5">
            MAPA · CDMX
          </div>
          <div className="pointer-events-none absolute bottom-3 left-3 right-3 font-sans text-[11px] text-muted bg-bg/85 px-1.5 py-0.5">
            Dirección de bodega por confirmar
          </div>
        </div>
      </div>
    </section>
  );
}
