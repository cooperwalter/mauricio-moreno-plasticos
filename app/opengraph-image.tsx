import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — CDMX`;

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f5ecdb",
          color: "#2a1f14",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            color: "#a8501f",
            marginBottom: 48,
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          Mayoreo · CDMX
        </div>
        <div
          style={{
            fontSize: 100,
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: -3,
            display: "flex",
          }}
        >
          Mauricio Moreno
        </div>
        <div
          style={{
            fontSize: 100,
            fontWeight: 400,
            lineHeight: 1,
            color: "#a8501f",
            fontStyle: "italic",
            letterSpacing: -3,
            marginTop: 6,
            display: "flex",
          }}
        >
          Plásticos
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 48,
            color: "#6b563a",
            maxWidth: 900,
            display: "flex",
          }}
        >
          Cubetas, ganchos, palanganas y más. Pide por WhatsApp.
        </div>
      </div>
    ),
    size,
  );
}
