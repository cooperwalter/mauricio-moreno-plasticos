import type { Zone } from "@/lib/types";

type Props = {
  zones: Zone[];
};

export function Zones({ zones }: Props) {
  const mapPins = [
    { x: 50, y: 52, color: "#1b7a3a", label: "Centro" },
    { x: 52, y: 26, color: "#c89b2a", label: "Norte" },
    { x: 50, y: 80, color: "#c89b2a", label: "Sur" },
    { x: 26, y: 54, color: "#a8501f", label: "Poniente" },
    { x: 80, y: 60, color: "#6a5438", label: "Edo. Mex" },
  ];

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
          className="relative bg-bg border border-rule p-6"
          style={{ aspectRatio: "1 / 1.1" }}
        >
          <div
            className="absolute inset-6 opacity-50"
            style={{
              background: `repeating-linear-gradient(45deg, transparent 0 8px, var(--rule) 8px 9px)`,
            }}
          />
          <svg
            viewBox="0 0 100 110"
            className="absolute inset-6"
            style={{ width: "calc(100% - 48px)" }}
          >
            <path
              d="M50 8 L72 18 L82 38 L78 58 L82 74 L70 92 L52 98 L32 96 L18 82 L12 64 L14 42 L24 22 Z"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="0.4"
            />
            {mapPins.map((p) => (
              <g key={p.label}>
                <circle cx={p.x} cy={p.y} r="3" fill={p.color} />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="6"
                  fill="none"
                  stroke={p.color}
                  strokeOpacity="0.4"
                />
                <text
                  x={p.x}
                  y={p.y - 7}
                  textAnchor="middle"
                  fontSize="3.2"
                  fill="var(--ink)"
                  fontFamily="var(--font-inter), system-ui, sans-serif"
                >
                  {p.label}
                </text>
              </g>
            ))}
          </svg>
          <div className="absolute top-3 left-3 font-mono text-[10px] text-muted tracking-[1px]">
            MAPA · CDMX
          </div>
          <div className="absolute bottom-3 left-3 right-3 font-sans text-[11px] text-muted">
            Dirección de bodega por confirmar
          </div>
        </div>
      </div>
    </section>
  );
}
