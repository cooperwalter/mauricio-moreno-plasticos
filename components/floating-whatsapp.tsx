"use client";

import { useState } from "react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = {
  message?: string;
};

export function FloatingWhatsApp({
  message = "Hola don Mauricio, quiero hacer un pedido.",
}: Props) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir a Mauricio por WhatsApp"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-whatsapp text-white rounded-full no-underline font-semibold text-sm"
      style={{
        padding: hover ? "14px 22px" : "14px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.12)",
        transition: "padding 0.18s ease",
      }}
    >
      <WhatsAppIcon size={24} />
      {hover ? <span className="whitespace-nowrap">Escribir a Mauricio</span> : null}
    </a>
  );
}
