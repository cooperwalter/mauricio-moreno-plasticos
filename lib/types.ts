export type CategoryId =
  | "cubetas"
  | "batidores"
  | "ganchos"
  | "palanganas"
  | "cestos"
  | "coladores";

export type Category = {
  id: CategoryId;
  name: string;
  icon: string;
  desc: string;
};

export type Product = {
  id: string;
  cat: CategoryId;
  name: string;
  sku: string;
  price: number;
  unit: string;
  stock: string;
  badge?: string;
  specs: string[];
  colors: string[];
  photo?: string;
};

export type Zone = {
  name: string;
  speed: string;
  cost: string;
  areas: string[];
  color: string;
};

export type Testimonial = {
  id: string;
  name: string;
  trade: string;
  text: string;
};
