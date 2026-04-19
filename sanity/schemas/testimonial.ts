import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonio",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre del cliente",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "trade",
      title: "Negocio / zona",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Testimonio",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "trade" },
  },
});
