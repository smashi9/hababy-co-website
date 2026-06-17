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
});

test.describe("authenticated admin access", () => {
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
});
