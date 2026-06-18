import { expect, test } from "@playwright/test";

test.describe("gated admin inventory mutation", () => {
  test.describe.configure({ mode: "serial" });

  const adminEmail = process.env.E2E_ADMIN_EMAIL;
  const adminPassword = process.env.E2E_ADMIN_PASSWORD;
  const allowMutatingTests = process.env.E2E_ALLOW_MUTATING_TESTS === "true";
  const inventoryItemId = process.env.E2E_INVENTORY_ITEM_ID;

  test.skip(
    !adminEmail || !adminPassword || !allowMutatingTests || !inventoryItemId,
    "Set E2E_ADMIN_EMAIL, E2E_ADMIN_PASSWORD, E2E_ALLOW_MUTATING_TESTS=true, and E2E_INVENTORY_ITEM_ID to run gated inventory mutation tests."
  );

  test("admin can update inventory notes only when explicitly allowed", async ({ page }) => {
    const note = `E2E inventory edit test ${new Date().toISOString()}`;

    await page.goto("/admin/login");
    await page.getByLabel(/Email/i).fill(adminEmail ?? "");
    await page.getByLabel(/Password/i).fill(adminPassword ?? "");
    await page.getByRole("button", { name: /^Sign in$/i }).click();

    await expect(page).toHaveURL(/\/admin\/orders/);
    await page.goto(`/admin/inventory/${inventoryItemId}`);

    await expect(page.getByRole("heading", { name: /Inventory item/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Save inventory state/i })).toBeVisible();

    await page.getByLabel(/Notes/i).fill(note);
    await page.getByRole("button", { name: /Save inventory state/i }).click();

    await expect(page.getByRole("heading", { name: /Inventory item saved/i })).toBeVisible();
    await expect(page.getByText(/Inventory item updated/i)).toBeVisible();

    await page.reload();
    await expect(page.getByLabel(/Notes/i)).toHaveValue(note);
  });
});
