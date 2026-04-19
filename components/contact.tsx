"use client";

import { useState } from "react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";

const FIELDS = [
  { key: "name", label: "Tu nombre", multi: false },
  { key: "negocio", label: "Tu negocio", multi: false },
  { key: "mensaje", label: "¿Qué necesitas?", multi: true },
] as const;

export function Contact() {
  const [form, setForm] = useState({ name: "", negocio: "", mensaje: "" });
  const msg = `Hola don Mauricio, soy ${form.name || "[nombre]"} de ${
    form.negocio || "[negocio]"
  }. ${form.mensaje || "Quiero cotizar un pedido."}`;

  return (
    <section
      id="contacto"
      className="px-6 sm:px-14 py-20 bg-dark text-dark-fg"
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div>
          <div className="font-mono text-[11px] tracking-[2px] mb-2.5" style={{ color: "rgba(255,255,255,0.55)" }}>
            05 — CONTACTO
          </div>
          <h2 className="font-display text-[48px] sm:text-[72px] m-0 font-normal tracking-[-2px] leading-[0.95]">
            Escríbele a
            <br />
            don Mauricio.
          </h2>
          <p
            className="font-sans text-[17px] leading-[1.6] mt-6 max-w-[460px]"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            La forma más rápida es WhatsApp. Responde personalmente en horario de
            bodega y te manda fotos y precios al momento.
          </p>

          <div className="mt-9 font-sans text-[15px] leading-[2]">
            <div>📱 WhatsApp · <b>56 1125 3045</b></div>
            <div>📍 Dirección por confirmar</div>
            <div>🕐 Lun–Sáb · 8:00 am – 6:00 pm</div>
          </div>
        </div>

        <div
          className="p-8"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div
            className="font-mono text-[11px] tracking-[2px] mb-5"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            ARMA TU MENSAJE
          </div>

          {FIELDS.map((f) => (
            <div key={f.key} className="mb-[18px]">
              <div
                className="font-sans text-xs mb-1.5"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {f.label}
              </div>
              {f.multi ? (
                <textarea
                  value={form[f.key]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                  }
                  rows={3}
                  placeholder="Ej. 50 cubetas de 19L color blanco para entregar en Coyoacán"
                  className="w-full bg-transparent border-none text-white font-sans text-[15px] py-2 outline-none resize-y"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.25)",
                  }}
                />
              ) : (
                <input
                  value={form[f.key]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                  }
                  className="w-full bg-transparent border-none text-white font-sans text-[15px] py-2 outline-none"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.25)",
                  }}
                />
              )}
            </div>
          ))}

          <a
            href={whatsappUrl(msg)}
            target="_blank"
            rel="noreferrer"
            className="bg-whatsapp text-white px-[22px] py-4 font-sans text-[15px] font-semibold no-underline flex items-center justify-center gap-2.5 mt-3.5"
          >
            <WhatsAppIcon size={18} /> Enviar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
