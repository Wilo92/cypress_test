import BasePage from "./BasePage.js";

class CompletePage extends BasePage {
  constructor() {
    super();
    this.selectors = {
      completeContainer: "#checkout_complete_container",
      completeHeader: ".complete-header",
      completeText: ".complete-text",
      backHomeButton: '[data-test="back-to-products"]',
      ponyExpressImage: ".pony_express",
    };
  }

  verifyPageLoaded() {
    this.shouldUrlContain("checkout-complete");
    this.shouldBeVisible(this.selectors.completeContainer);
    return this;
  }

  verifySuccessMessage() {
    this.shouldContainText(
      this.selectors.completeHeader,
      "Thank you for your order!"
    );
    return this;
  }

  verifyCompleteMessage() {
    this.shouldContainText(
      this.selectors.completeText,
      "Your order has been dispatched"
    );
    return this;
  }

  verifyOrderComplete() {
    this.verifySuccessMessage();
    this.verifyCompleteMessage();
    return this;
  }

  clickBackHome() {
    this.clickElement(this.selectors.backHomeButton);
    return this;
  }
}

export default CompletePage;

