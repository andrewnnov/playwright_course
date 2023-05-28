export class DeliveryDetails {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
    this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
    this.streetInput = page.locator('[data-qa="delivery-address-street"]');
    this.postCodeInput = page.locator('[data-qa="delivery-postcode"]');
    this.cityInput = page.locator('[data-qa="delivery-city"]');
    this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
  }

  fillDetails = async () => {
    await this.firstNameInput.waitFor();
    await this.firstNameInput.fill("Tester");

    await this.lastNameInput.waitFor();
    await this.lastNameInput.fill("MC Tester");

    await this.streetInput.waitFor();
    await this.streetInput.fill("Street");

    await this.postCodeInput.waitFor();
    await this.postCodeInput.fill("90210");

    await this.cityInput.waitFor();
    await this.cityInput.fill("Beverly");

    await this.countryDropdown.waitFor();
    await this.countryDropdown.selectOption("United States of America");

    await this.page.pause();
  };
}
