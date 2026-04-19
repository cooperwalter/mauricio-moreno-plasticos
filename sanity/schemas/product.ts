import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      description: "Código interno. Ej. CB-008",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Precio (MXN por paquete/bulto)",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "unit",
      title: "Presentación",
      type: "string",
      description: 'Ej. "Paquete con 50 piezas" o "Bulto con 40 paquetes"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "stock",
      title: "Disponibilidad",
      type: "string",
      initialValue: "en bodega",
    }),
    defineField({
      name: "badge",
      title: "Etiqueta destacada (opcional)",
      type: "string",
      description: 'Ej. "Más vendido", "Más resistente"',
    }),
    defineField({
      name: "specs",
      title: "Especificaciones (bullets)",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "colors",
      title: "Colores",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["Surtido"],
    }),
    defineField({
      name: "photo",
      title: "Foto del producto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Orden dentro de la categoría",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "sku", media: "photo" },
  },
});
