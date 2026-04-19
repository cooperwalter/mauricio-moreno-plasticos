import type { SchemaTypeDefinition } from "sanity";

import { categoryType } from "./category";
import { productType } from "./product";
import { zoneType } from "./zone";
import { testimonialType } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  categoryType,
  productType,
  zoneType,
  testimonialType,
];
