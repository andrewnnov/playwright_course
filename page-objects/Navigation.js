import { expect } from "@playwright/test";

export class Navigation {
  constructor(page) {
    this.page = page;
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkoutLink = page.getByRole("link", { name: "Checkout" });
  }

  getBacketCount = async () => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  };

  goToCheckOut = async () => {
    await this.checkoutLink.waitFor();
    await this.checkoutLink.click();
    await this.page.waitForURL("/basket");
  };
}
