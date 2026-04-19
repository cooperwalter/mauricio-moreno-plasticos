export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://mauricio-moreno-plasticos.vercel.app";

export const SITE_NAME = "Mauricio Moreno Plásticos";

export const SITE_DESCRIPTION =
  "Cubetas, ganchos, palanganas, cestos y coladores al mayoreo. Entrega el mismo día en Zona Centro CDMX. Pide por WhatsApp.";

export const BUSINESS_PHONE_E164 = "+525611253045";
export const BUSINESS_PHONE_DISPLAY = "56 1125 3045";

export const BUSINESS_HOURS = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "18:00" },
];
