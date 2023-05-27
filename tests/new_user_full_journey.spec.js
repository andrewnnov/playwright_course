import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";

test.only("New user full end-to-end test journey", async ({ page }) => {
  const productPage = new ProductsPage(page);
  await productPage.visit();
  await productPage.addProductToBasket(0);
  await productPage.addProductToBasket(1);
  await productPage.addProductToBasket(2);
  await page.pause();
});
