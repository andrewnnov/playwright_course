import { test, expect } from "@playwright/test";

test("Product page Add to Basket", async ({ page }) => {
  await page.goto("/");
  //await page.pause();

  const addTwoBasketButton = page.locator('[data-qa="product-button"]').first();
  const basketCounter = page.locator('[data-qa="header-basket-count"]');

  await addTwoBasketButton.waitFor();
  await expect(addTwoBasketButton).toHaveText("Add to Basket");
  await expect(basketCounter).toHaveText("0");
  await addTwoBasketButton.click();
  await expect(addTwoBasketButton).toHaveText("Remove from Basket");
  await expect(basketCounter).toHaveText("1");

  //await page.pause();

  const checkoutLink = page.getByRole("link", { name: "Checkout" });
  await checkoutLink.waitFor();
  await checkoutLink.click();

  await page.waitForURL("/basket");
});
