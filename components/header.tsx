import { WhatsAppIcon } from "./whatsapp-icon";
import { Navigation } from "./navigation";
import { whatsappUrl } from "@/lib/whatsapp";

export function Header() {
  return (
    <div
      className="flex items-center justify-between px-10 py-[22px] bg-bg sticky top-0 z-20 border-b border-rule"
      style={{ backdropFilter: "saturate(1.2)" }}
    >
      <a href="#inicio" className="flex items-center gap-[14px] no-underline text-ink">
        <div className="w-11 h-11 bg-accent text-accent-fg flex items-center justify-center font-display text-xl leading-none tracking-[-0.5px]">
          MM
        </div>
        <div className="leading-[1.05]">
          <div className="font-display text-[19px] text-ink tracking-[-0.3px]">
            Mauricio Moreno <span className="italic text-accent">Plásticos</span>
          </div>
          <div className="font-mono text-[10px] text-muted tracking-[1.5px] mt-0.5">
            CDMX · DESDE 2022
          </div>
        </div>
      </a>

      <Navigation />

      <a
        href={whatsappUrl("Hola, me gustaría cotizar productos.")}
        target="_blank"
        rel="noreferrer"
        className="hidden sm:flex items-center gap-2.5 bg-whatsapp text-white px-5 py-3 font-sans text-sm font-semibold no-underline"
      >
        <WhatsAppIcon size={18} />
        <span className="hidden md:inline">Pedir por WhatsApp</span>
      </a>
    </div>
  );
}
