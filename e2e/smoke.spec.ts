import { test, expect } from "@playwright/test";

test("homepage renders, catalog filters, modal opens with correct WhatsApp link, Escape closes it", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Mauricio Moreno Pl.sticos/i);

  await expect(
    page.getByRole("heading", { name: /Cubetas,\s*ganchos y palanganas/i }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "El catálogo" }),
  ).toBeVisible();

  const allProducts = page.locator('[aria-label^="Ver detalles de"]');
  await expect(allProducts).toHaveCount(14);

  await page.getByRole("button", { name: "Cubetas", exact: true }).click();
  await expect(allProducts).toHaveCount(2);
  await expect(page.getByRole("button", { name: /Cubeta #8/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Cubeta #10/i })).toBeVisible();

  await page.getByRole("button", { name: /Cubeta #8/i }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Cubeta #8");
  await expect(dialog).toContainText("$8");

  const whatsappLink = dialog.getByRole("link", { name: /Cotizar este pedido/i });
  const href = await whatsappLink.getAttribute("href");
  expect(href).toContain("https://wa.me/525611253045");
  expect(href).toContain("Cubeta%20%238");
  expect(href).toContain("CB-008");

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();

  const floating = page.getByRole("link", {
    name: /Escribir a Mauricio por WhatsApp/i,
  });
  await expect(floating).toHaveAttribute("href", /wa\.me\/525611253045/);
});
