import { expect, test } from "@playwright/test";

test.describe("logged-out admin access", () => {
  test("/admin/orders redirects to /admin/login", async ({ page }) => {
    await page.goto("/admin/orders");
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { name: /Admin login/i })).toBeVisible();
  });

  test("/admin/login loads", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.getByRole("heading", { name: /Admin login/i })).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();
    await expect(page.getByLabel(/Password/i)).toBeVisible();
  });

  test("/admin/orders is not publicly visible without login", async ({ page }) => {
    await page.goto("/admin/orders");
    await expect(page.getByRole("heading", { name: /Incoming requests/i })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /Admin login/i })).toBeVisible();
  });

  test("/admin/orders/[id] redirects to /admin/login", async ({ page }) => {
    await page.goto("/admin/orders/00000000-0000-0000-0000-000000000000");
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { name: /Admin login/i })).toBeVisible();
  });

  test("/admin/inventory redirects to /admin/login", async ({ page }) => {
    await page.goto("/admin/inventory");
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { name: /Admin login/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Inventory visibility/i })).toHaveCount(0);
  });

  test("/admin/products redirects to /admin/login", async ({ page }) => {
    await page.goto("/admin/products");
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { name: /Admin login/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Product editing/i })).toHaveCount(0);
  });

  test("/admin/products/[productId] redirects to /admin/login", async ({ page }) => {
    await page.goto("/admin/products/00000000-0000-0000-0000-000000000000");
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { name: /Admin login/i })).toBeVisible();
  });

  test("/admin/settings redirects to /admin/login", async ({ page }) => {
    await page.goto("/admin/settings");
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { name: /Admin login/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Settings foundation/i })).toHaveCount(0);
  });
});

test.describe("authenticated admin access", () => {
  test.describe.configure({ mode: "serial" });

  const adminEmail = process.env.E2E_ADMIN_EMAIL;
  const adminPassword = process.env.E2E_ADMIN_PASSWORD;

  test.skip(!adminEmail || !adminPassword, "Set E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD to run authenticated admin e2e tests.");

  test("admin can log in, view orders, sign out, and is blocked again", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel(/Email/i).fill(adminEmail ?? "");
    await page.getByLabel(/Password/i).fill(adminPassword ?? "");
    await page.getByRole("button", { name: /^Sign in$/i }).click();

    await expect(page).toHaveURL(/\/admin\/orders/);
    await expect(page.getByRole("heading", { name: /Incoming requests/i })).toBeVisible();
    await expect(
      page.getByText(/No requests yet/i).or(page.getByRole("table"))
    ).toBeVisible();

    await page.getByRole("button", { name: /Sign out/i }).click();
    await expect(page).toHaveURL(/\/admin\/login/);

    await page.goto("/admin/orders");
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { name: /Admin login/i })).toBeVisible();
  });

  test("admin order detail shows WhatsApp handoff when an order exists", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel(/Email/i).fill(adminEmail ?? "");
    await page.getByLabel(/Password/i).fill(adminPassword ?? "");
    await page.getByRole("button", { name: /^Sign in$/i }).click();

    await expect(page).toHaveURL(/\/admin\/orders/);

    const firstOrderLink = page.locator("tbody a[href^='/admin/orders/']").first();

    if ((await firstOrderLink.count()) === 0) {
      test.skip(true, "No existing orders available for the non-mutating admin detail check.");
    }

    await firstOrderLink.click();
    await expect(page).toHaveURL(/\/admin\/orders\/[0-9a-f-]+/);
    await expect(page.getByRole("heading", { name: /Request/i })).toBeVisible();
    await expect(page.getByTestId("whatsapp-handoff")).toBeVisible();
    await expect(page.getByRole("heading", { name: /WhatsApp message draft/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Copy message/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /Internal notes/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Save internal notes/i })).toBeVisible();
    await expect(page.getByText(/not sent to the customer/i)).toBeVisible();
  });

  test("admin can view read-only inventory visibility", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel(/Email/i).fill(adminEmail ?? "");
    await page.getByLabel(/Password/i).fill(adminPassword ?? "");
    await page.getByRole("button", { name: /^Sign in$/i }).click();

    await expect(page).toHaveURL(/\/admin\/orders/);
    await page.getByRole("link", { name: /Inventory/i }).click();

    await expect(page).toHaveURL(/\/admin\/inventory/);
    await expect(page.getByRole("heading", { name: /Inventory visibility/i })).toBeVisible();
    await expect(page.getByText(/operational state only/i)).toBeVisible();
    await expect(
      page.getByRole("table").or(page.getByText(/No inventory units found/i))
    ).toBeVisible();
  });

  test("admin can view products and open a product edit page without mutating data", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel(/Email/i).fill(adminEmail ?? "");
    await page.getByLabel(/Password/i).fill(adminPassword ?? "");
    await page.getByRole("button", { name: /^Sign in$/i }).click();

    await expect(page).toHaveURL(/\/admin\/orders/);
    await page.getByRole("link", { name: /^Products$/i }).click();

    await expect(page).toHaveURL(/\/admin\/products/);
    await expect(page.getByRole("heading", { name: /Product editing/i })).toBeVisible();
    await expect(page.getByText("Copy and pricing", { exact: true })).toBeVisible();

    const firstEditLink = page.getByRole("link", { name: /^Edit$/i }).first();

    if ((await firstEditLink.count()) === 0) {
      test.skip(true, "No products available for the non-mutating product edit-page check.");
    }

    await firstEditLink.click();
    await expect(page).toHaveURL(/\/admin\/products\/[0-9a-f-]+/);
    await expect(page.getByRole("button", { name: /Save product/i })).toBeVisible();
    await expect(page.getByLabel(/Product name/i)).toBeVisible();
    await expect(page.getByLabel(/Daily price MAD/i)).toBeVisible();
  });

  test("admin can open an inventory edit page without mutating data", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel(/Email/i).fill(adminEmail ?? "");
    await page.getByLabel(/Password/i).fill(adminPassword ?? "");
    await page.getByRole("button", { name: /^Sign in$/i }).click();

    await expect(page).toHaveURL(/\/admin\/orders/);
    await page.goto("/admin/inventory");

    const firstEditLink = page.getByRole("link", { name: /^Edit$/i }).first();

    if ((await firstEditLink.count()) === 0) {
      test.skip(true, "No editable inventory rows available for the non-mutating edit-page check.");
    }

    await firstEditLink.click();
    await expect(page).toHaveURL(/\/admin\/inventory\/[0-9a-f-]+/);
    await expect(page.getByRole("heading", { name: /Inventory item/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Save inventory state/i })).toBeVisible();
    await expect(page.getByLabel(/Item status/i)).toBeVisible();
    await expect(page.getByLabel(/Cleaning status/i)).toBeVisible();
  });

  test("admin can view settings foundation without mutating data", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel(/Email/i).fill(adminEmail ?? "");
    await page.getByLabel(/Password/i).fill(adminPassword ?? "");
    await page.getByRole("button", { name: /^Sign in$/i }).click();

    await expect(page).toHaveURL(/\/admin\/orders/);
    await page.goto("/admin/settings");

    await expect(page).toHaveURL(/\/admin\/settings/);
    await expect(page.getByRole("heading", { name: /Settings foundation/i })).toBeVisible();
    await expect(page.getByLabel(/WhatsApp number/i)).toBeVisible();
    await expect(page.getByLabel(/EUR rate/i)).toBeVisible();
    await expect(page.getByLabel(/USD rate/i)).toBeVisible();
    await expect(page.getByLabel(/Public FX note/i)).toBeVisible();
    await expect(page.getByText(/not live-wired/i)).toBeVisible();
  });
});
