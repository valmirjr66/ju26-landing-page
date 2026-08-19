import { expect, test } from "@playwright/test";

test("warms up the application", async ({ page }) => {
  test.setTimeout(180_000);

  await page.goto("/", { timeout: 150_000 });
  await expect(page.getByTestId("support-form")).toBeVisible({
    timeout: 150_000,
  });
});
