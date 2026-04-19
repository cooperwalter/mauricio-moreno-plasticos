import { defineField, defineType } from "sanity";

export const zoneType = defineType({
  name: "zone",
  title: "Zona de entrega",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "speed",
      title: "Tiempo de entrega",
      type: "string",
      description: 'Ej. "Mismo día", "24 horas"',
    }),
    defineField({
      name: "cost",
      title: "Costo",
      type: "string",
      description: 'Ej. "Gratis desde $800", "Desde $180"',
    }),
    defineField({
      name: "areas",
      title: "Alcaldías / municipios",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "color",
      title: "Color (hex)",
      type: "string",
      description: "Color del marcador. Ej. #1b7a3a",
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "speed" },
  },
});
