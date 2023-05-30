import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountInput = page.getByPlaceholder("Discount code");
    this.activateDiscountButton = page.locator(
      '[data-qa="submit-discount-button"]'
    );
    this.totalValue = page.locator('[data-qa="total-value"]');
    this.discountedValue = page.locator(
      '[data-qa="total-with-discount-value"]'
    );
    this.dicsountActivMessage = page.locator(
      '[data-qa="discount-active-message"]'
    );
    this.creditCardOwnerInput = page.getByPlaceholder("Credit card owner");
    this.creditCardNumberInput = page.getByPlaceholder("Credit card number");
    this.creditCardValidUntilInput = page.getByPlaceholder("Valid until");
    this.creditCardCVCInput = page.getByPlaceholder("Credit card CVC");
    this.payButton = page.locator('[data-qa="pay-button"]');
  }

  activateDiscount = async () => {
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText();
    await this.discountInput.waitFor();

    await this.discountInput.fill(code);
    await expect(this.discountInput).toHaveValue(code);

    //option 2 slow typing
    // await this.discountInput.focus();
    // await this.page.keyboard.type(code, { delay: 1000 });
    // expect(await this.discountInput.inputValue()).toBe(code);

    expect(await this.discountedValue.isVisible()).toBe(false);
    expect(await this.dicsountActivMessage.isVisible()).toBe(false);
    await this.activateDiscountButton.waitFor();
    await this.activateDiscountButton.click();
    await this.dicsountActivMessage.waitFor();
    await this.discountedValue.waitFor();

    const discountValueText = await this.discountedValue.innerText();
    const discountedValueOnlyStringNumber = discountValueText.replace("$", "");
    const discountedValueNumber = parseInt(discountedValueOnlyStringNumber, 10);

    const totalValueText = await this.totalValue.innerText();
    const totalValueOnlyStringNumber = totalValueText.replace("$", "");
    const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10);
    expect(discountedValueNumber).toBeLessThan(totalValueNumber);
  };

  fillPaymentDetails = async (paymentDetails) => {
    await this.creditCardOwnerInput.waitFor();
    await this.creditCardOwnerInput.fill(paymentDetails.owner);

    await this.creditCardNumberInput.waitFor();
    await this.creditCardNumberInput.fill(paymentDetails.number);

    await this.creditCardValidUntilInput.waitFor();
    await this.creditCardValidUntilInput.fill(paymentDetails.validUntil);

    await this.creditCardCVCInput.waitFor();
    await this.creditCardCVCInput.fill(paymentDetails.cvc);
  };

  completePayment = async () => {
    await this.payButton.waitFor();
    await this.payButton.click();
    await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
  };
}
