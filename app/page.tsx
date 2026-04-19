import { Ribbon } from "@/components/ribbon";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CatalogShelf } from "@/components/catalog-shelf";
import { Zones } from "@/components/zones";
import { Nosotros } from "@/components/nosotros";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import {
  getCategories,
  getProducts,
  getTestimonials,
  getZones,
} from "@/sanity/queries";

export const revalidate = 60;

export default async function Home() {
  const [categories, products, zones, testimonials] = await Promise.all([
    getCategories(),
    getProducts(),
    getZones(),
    getTestimonials(),
  ]);

  const heroProduct =
    products.find((p) => p.sku === "CB-008") ??
    products.find((p) => p.cat === "cubetas") ??
    products[0];

  return (
    <main className="bg-bg text-ink min-h-screen">
      <Ribbon />
      <Header />
      <Hero heroProduct={heroProduct} productCount={products.length} />
      <CatalogShelf categories={categories} products={products} />
      <Zones zones={zones} />
      <Nosotros testimonials={testimonials} />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
