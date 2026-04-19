import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Categoría",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID (slug, sin espacios)",
      type: "string",
      description: "Ej. cubetas · Se usa en el filtro del catálogo",
      validation: (r) => r.required().regex(/^[a-z-]+$/, { name: "lowercase-slug" }),
    }),
    defineField({
      name: "name",
      title: "Nombre visible",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Icono (un carácter)",
      type: "string",
      description: "Un solo símbolo. Ej. ● ✽ ⏏ ◡ ▨ ◉",
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "desc",
      title: "Descripción corta",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      description: "Número para ordenar las categorías en el sitio",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "desc", media: "icon" },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});
