import BasePage from "./BasePage.js";

class CheckoutOverviewPage extends BasePage {
  constructor() {
    super();
    this.selectors = {
      summaryContainer: ".summary_info",
      itemName: ".inventory_item_name",
      itemPrice: ".inventory_item_price",
      paymentInfo: ".summary_value_label",
      subtotalLabel: ".summary_subtotal_label",
      taxLabel: ".summary_tax_label",
      totalLabel: ".summary_total_label",
      finishButton: '#finish',
      cancelButton: '#cancel',
    };
  }

  verifyPageLoaded() {
    this.shouldUrlContain("checkout-step-two");
    this.shouldBeVisible(this.selectors.summaryContainer);
    return this;
  }

  verifyProductInSummary(productName) {
    cy.get(this.selectors.itemName).should("contain", productName);
    return this;
  }

  getProductPrice(productName) {
    return cy
      .get(this.selectors.itemName)
      .contains(productName)
      .parents(".cart_item")
      .find(this.selectors.itemPrice)
      .invoke("text")
      .then((text) => parseFloat(text.replace("$", "").trim()));
  }

  getSubtotal() {
    return cy
      .get(this.selectors.subtotalLabel)
      .invoke("text")
      .then((text) => parseFloat(text.split("$")[1]));
  }

  getTax() {
    return cy
      .get(this.selectors.taxLabel)
      .invoke("text")
      .then((text) => parseFloat(text.split("$")[1]));
  }

  getTotal() {
    return cy
      .get(this.selectors.totalLabel)
      .invoke("text")
      .then((text) => parseFloat(text.split("$")[1]));
  }

  verifyTotalCalculated() {
    this.getSubtotal().then((subtotal) => {
      this.getTax().then((tax) => {
        this.getTotal().then((total) => {
          const calculatedTotal = subtotal + tax;
          expect(total).to.be.closeTo(calculatedTotal, 0.01);
        });
      });
    });
    return this;
  }

  clickFinish() {
    this.clickElement(this.selectors.finishButton);
    return this;
  }

  clickCancel() {
    this.clickElement(this.selectors.cancelButton);
    return this;
  }
}

export default CheckoutOverviewPage;

