import { expect, test } from "@playwright/test";

test.describe("public smoke routes", () => {
  test("homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Hababy & Co/);
    await expect(page.getByRole("heading", { name: /Baby gear rental in Rabat/i })).toBeVisible();
  });

  test("/products loads", async ({ page }) => {
    await page.goto("/products");
    await expect(page.getByRole("heading", { name: /Browse the first Hababy & Co rental catalogue/i })).toBeVisible();
  });

  test("/products/travel-cot loads", async ({ page }) => {
    await page.goto("/products/travel-cot");
    await expect(page.getByRole("heading", { name: /Travel cot/i })).toBeVisible();
  });

  test("/request loads", async ({ page }) => {
    await page.goto("/request");
    await expect(page.getByRole("heading", { name: /Send a request for available Hababy & Co gear/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Send request for review/i })).toBeVisible();
  });

  test("/request?product=travel-cot loads", async ({ page }) => {
    await page.goto("/request?product=travel-cot");
    await expect(page.getByRole("heading", { name: /Send a request for available Hababy & Co gear/i })).toBeVisible();
    await expect(page.locator("select[name='selectedProductSlug']")).toHaveValue("travel-cot");
  });

  test("/supabase-test loads", async ({ page }) => {
    await page.goto("/supabase-test");
    await expect(page.getByRole("heading", { name: /Supabase Product Test/i })).toBeVisible();
    await expect(page.getByText(/Products found:/i)).toBeVisible();
  });
});
