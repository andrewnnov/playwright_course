import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductPage";

test.only("New user full end-to-end test journey", async ({ page }) => {
  const productPage = new ProductsPage(page);
  await productPage.visit();
  await page.pause();
});
