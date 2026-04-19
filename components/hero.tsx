import Image from "next/image";
import { WhatsAppIcon } from "./whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

type Props = {
  heroProduct?: Product;
  productCount: number;
};

export function Hero({ heroProduct, productCount }: Props) {
  const stats: Array<[string, string]> = [
    [String(productCount), "productos estrella"],
    ["4", "años en CDMX"],
    ["Mismo día", "en zona centro"],
  ];

  return (
    <section
      id="inicio"
      className="grid md:grid-cols-[1.15fr_1fr] bg-bg border-b border-rule"
    >
      <div className="px-6 sm:px-14 pt-16 sm:pt-[88px] pb-16">
        <div className="font-mono text-[11px] font-semibold tracking-[2.5px] text-accent mb-6">
          SURTIMOS TIANGUIS · MAYOREO Y MENUDEO · CDMX
        </div>

        <h1 className="font-display text-[56px] sm:text-[72px] lg:text-[88px] leading-[0.95] m-0 tracking-[-2px] text-ink">
          Cubetas,
          <br />
          ganchos y{" "}
          <em className="text-accent font-display-italic italic">palanganas</em>
          <br />
          al mayoreo.
        </h1>

        <p className="font-sans text-[18px] leading-[1.55] text-muted mt-[30px] max-w-[480px]">
          4 años surtiendo a changarros, tianguis y pequeños negocios de la Ciudad
          de México. Entrega el mismo día en Zona Centro, sin mínimos absurdos.
        </p>

        <div className="flex flex-wrap gap-3.5 mt-9 font-sans">
          <a
            href={whatsappUrl("Hola don Mauricio, quiero cotizar.")}
            target="_blank"
            rel="noreferrer"
            className="bg-whatsapp text-white px-[26px] py-4 text-[15px] font-semibold no-underline flex items-center gap-2.5"
          >
            <WhatsAppIcon size={18} /> Cotizar por WhatsApp
          </a>
          <a
            href="#catalogo"
            className="border-[1.5px] border-ink px-[26px] py-4 text-[15px] font-medium text-ink no-underline"
          >
            Ver catálogo →
          </a>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 font-sans max-w-[560px]">
          {stats.map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-[32px] text-ink leading-none tracking-[-0.5px]">
                {n}
              </div>
              <div className="text-xs text-muted mt-1 tracking-[0.3px]">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative bg-panel min-h-[320px] md:min-h-[560px]">
        {heroProduct?.photo ? (
          <Image
            src={heroProduct.photo}
            alt="Estantería de cubetas en bodega"
            fill
            className="object-cover"
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ) : null}
        {heroProduct ? (
          <div
            className="absolute top-[70px] right-[40px] sm:right-[60px] bg-accent text-accent-fg px-[22px] py-[18px] text-[15px] max-w-[210px] font-sans leading-[1.4]"
            style={{
              transform: "rotate(3deg)",
              boxShadow: "4px 4px 0 rgba(0,0,0,0.12)",
            }}
          >
            <div className="text-[10px] tracking-[2px] mb-1.5 opacity-85">
              ESTA SEMANA
            </div>
            <div>{heroProduct.name}</div>
            <div className="font-display text-[32px] leading-none">
              ${heroProduct.price}
            </div>
            <div className="opacity-80 text-xs mt-1">{heroProduct.unit}</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
