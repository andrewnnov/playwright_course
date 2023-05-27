import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Navigation } from "../page-objects/Navigation";

test.only("New user full end-to-end test journey", async ({ page }) => {
  const productPage = new ProductsPage(page);
  await productPage.visit();
  await productPage.addProductToBasket(0);
  await productPage.addProductToBasket(1);
  await productPage.addProductToBasket(2);

  const navigation = new Navigation(page);
  await navigation.goToCheckOut();
});
