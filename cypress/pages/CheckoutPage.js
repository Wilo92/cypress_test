import BasePage from "./BasePage.js";

class CheckoutPage extends BasePage {
  constructor() {
    super();
    this.selectors = {
      firstNameInput: '#first-name',
      lastNameInput: '#last-name',
      postalCodeInput: '#postal-code',
      continueButton: '#continue',
      cancelButton: '#cancel',
      errorMessage: '[data-test="error"]',
    };
  }

  // verificar que la url contenga checkout-step-one y que el campo de nombre sea visible
  verifyPageLoaded() {
    this.shouldUrlContain("checkout-step-one");
    this.shouldBeVisible(this.selectors.firstNameInput);
    return this;
  }

  enterFirstName(firstName) {
    this.typeInField(this.selectors.firstNameInput, firstName);
    return this;
  }

  enterLastName(lastName) {
    this.typeInField(this.selectors.lastNameInput, lastName);
    return this;
  }

  enterPostalCode(postalCode) {
    this.typeInField(this.selectors.postalCodeInput, postalCode);
    return this;
  }

  fillCheckoutForm(firstName, lastName, postalCode) {
    this.enterFirstName(firstName);
    this.enterLastName(lastName);
    this.enterPostalCode(postalCode);
    return this;
  }

  clickContinue() {
    this.clickElement(this.selectors.continueButton);
    return this;
  }

  clickCancel() {
    this.clickElement(this.selectors.cancelButton);
    return this;
  }

  verifyError() {
    this.shouldBeVisible(this.selectors.errorMessage);
    return this;
  }

  submitCheckoutForm(firstName, lastName, postalCode) {
    this.fillCheckoutForm(firstName, lastName, postalCode);
    this.clickContinue();
    return this;
  }
}

export default CheckoutPage;

