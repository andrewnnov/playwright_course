import { test } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Navigation } from "../page-objects/Navigation";
import { Checkout } from "../page-objects/Checkout";
import { LoginPage } from "../page-objects/LoginPage";
import { RegisterPage } from "../page-objects/RegisterPage";
import { DeliveryDetails } from "../page-objects/DeliveryDetails";
import { deliveryDetails as userAddress } from "../data/deliveryDetails";

test.only("New user full end-to-end test journey", async ({ page }) => {
  const productPage = new ProductsPage(page);
  await productPage.visit();
  await productPage.sortByCheapest();
  await productPage.addProductToBasket(0);
  await productPage.addProductToBasket(1);
  await productPage.addProductToBasket(2);

  const navigation = new Navigation(page);
  await navigation.goToCheckOut();

  const checkout = new Checkout(page);
  await checkout.removeCheapestProduct();
  await checkout.continueToCheckout();

  const login = new LoginPage(page);
  await login.moveToSignup();

  const registerPage = new RegisterPage(page);
  const email = uuidv4() + "@gmail.com";
  const password = uuidv4();
  await registerPage.signUpAsNewUser(email, password);

  const deliveryDetails = new DeliveryDetails(page);
  await deliveryDetails.fillDetails(userAddress);

  await deliveryDetails.saveDetails();
  await deliveryDetails.continueToPayment();
});
