import { expect } from "@playwright/test";

export class DeliveryDetails {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
    this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
    this.streetInput = page.locator('[data-qa="delivery-address-street"]');
    this.postCodeInput = page.locator('[data-qa="delivery-postcode"]');
    this.cityInput = page.locator('[data-qa="delivery-city"]');
    this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
    this.saveAddressButton = page.getByRole("button", {
      name: "Save address for next time",
    });
    this.savedAddressContainer = page.locator(
      '[data-qa="saved-address-container"]'
    );
    this.saveAddressFirstName = page.locator(
      '[data-qa="saved-address-firstName"]'
    );
    this.saveAddressLastName = page.locator(
      '[data-qa="saved-address-lastName"]'
    );
    this.saveAddressStreet = page.locator('[data-qa="saved-address-street"]');
    this.saveAddressPostCode = page.locator(
      '[data-qa="saved-address-postcode"]'
    );
    this.saveAddressCity = page.locator('[data-qa="saved-address-city"]');
    this.saveAddressCountry = page.locator('[data-qa="saved-address-country"]');
    this.continueToPaymentButton = page.getByRole("button", {
      name: "Continue to payment",
    });
  }

  fillDetails = async (userAddress) => {
    await this.firstNameInput.waitFor();
    await this.firstNameInput.fill(userAddress.firstName);

    await this.lastNameInput.waitFor();
    await this.lastNameInput.fill(userAddress.lastName);

    await this.streetInput.waitFor();
    await this.streetInput.fill(userAddress.street);

    await this.postCodeInput.waitFor();
    await this.postCodeInput.fill(userAddress.postcode);

    await this.cityInput.waitFor();
    await this.cityInput.fill(userAddress.city);

    await this.countryDropdown.waitFor();
    await this.countryDropdown.selectOption(userAddress.country);
  };

  saveDetails = async () => {
    const addressCountBeforeSaving = await this.savedAddressContainer.count();
    await this.saveAddressButton.waitFor();
    await this.saveAddressButton.click();
    await expect(this.savedAddressContainer).toHaveCount(
      addressCountBeforeSaving + 1
    );

    await this.saveAddressFirstName.first().waitFor();
    expect(await this.saveAddressFirstName.first().innerText()).toBe(
      await this.firstNameInput.inputValue()
    );

    await this.saveAddressLastName.first().waitFor();
    expect(await this.saveAddressLastName.first().innerText()).toBe(
      await this.lastNameInput.inputValue()
    );

    await this.saveAddressStreet.first().waitFor();
    expect(await this.saveAddressStreet.first().innerText()).toBe(
      await this.streetInput.inputValue()
    );

    await this.saveAddressPostCode.first().waitFor();
    expect(await this.saveAddressPostCode.first().innerText()).toBe(
      await this.postCodeInput.inputValue()
    );

    await this.saveAddressCity.first().waitFor();
    expect(await this.saveAddressCity.first().innerText()).toBe(
      await this.cityInput.inputValue()
    );

    await this.saveAddressCountry.first().waitFor();
    expect(await this.saveAddressCountry.first().innerText()).toBe(
      await this.countryDropdown.inputValue()
    );

    //await this.page.pause();
  };

  continueToPayment = async () => {
    await this.continueToPaymentButton.waitFor();
    await this.continueToPaymentButton.click();
    await this.page.waitForURL(/\/payment/, { timeout: 3000 });
    await this.page.pause();
  };
}
