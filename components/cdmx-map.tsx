"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { Zone } from "@/lib/types";

type Props = {
  zones: Zone[];
};

const DEFAULT_FILL = "#d9c9a8";

function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/^la /, "")
    .replace(/ de morelos$/, "")
    .trim();
}

export function CdmxMap({ zones }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let leafletMap: import("leaflet").Map | null = null;

    (async () => {
      const L = (await import("leaflet")).default;
      const res = await fetch("/cdmx-alcaldias.geojson");
      if (cancelled || !containerRef.current) return;
      const geojson = await res.json();

      const zoneByAlcaldia = new Map<string, Zone>();
      for (const z of zones) {
        for (const area of z.areas) zoneByAlcaldia.set(normalize(area), z);
      }

      leafletMap = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      }).setView([19.37, -99.15], 10);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "© OpenStreetMap · © CARTO",
          subdomains: "abcd",
          maxZoom: 18,
        },
      ).addTo(leafletMap);

      type Feature = {
        type: "Feature";
        properties: { name: string };
        geometry: unknown;
      };

      const layer = L.geoJSON(geojson, {
        style: (feature) => {
          const name = (feature as Feature | undefined)?.properties?.name ?? "";
          const zone = zoneByAlcaldia.get(normalize(name));
          return {
            color: "#2a1f14",
            weight: 1,
            opacity: 0.7,
            fillColor: zone?.color ?? DEFAULT_FILL,
            fillOpacity: zone ? 0.55 : 0.18,
          };
        },
        onEachFeature: (feature, featureLayer) => {
          const name = (feature as Feature | undefined)?.properties?.name ?? "";
          const zone = zoneByAlcaldia.get(normalize(name));
          const tooltip = zone
            ? `<b>${name}</b><br/>${zone.name} · ${zone.speed}`
            : `<b>${name}</b><br/>Fuera de zona`;
          featureLayer.bindTooltip(tooltip, { sticky: true });
          featureLayer.on("mouseover", (e) => {
            e.target.setStyle({ weight: 2, fillOpacity: 0.75 });
          });
          featureLayer.on("mouseout", (e) => {
            layer.resetStyle(e.target);
          });
        },
      }).addTo(leafletMap);

      leafletMap.fitBounds(layer.getBounds(), { padding: [12, 12] });
    })();

    return () => {
      cancelled = true;
      leafletMap?.remove();
    };
  }, [zones]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      role="img"
      aria-label="Mapa de alcaldías de la Ciudad de México con zonas de entrega"
    />
  );
}
