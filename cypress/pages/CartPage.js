import BasePage from "./BasePage.js";

class CartPage extends BasePage {
  constructor() {
    super();
    this.selectors = {
      cartContainer: ".cart_list",
      cartItem: ".cart_item",
      itemName: ".inventory_item_name",
      itemPrice: ".inventory_item_price",
      removeButton: '[data-test*="remove"]',
      continueShoppingButton: '[data-test="continue-shopping"]',
      checkoutButton: '[data-test="checkout"]',
      quantityLabel: ".cart_quantity",
    };
  }

  verifyPageLoaded() {
    this.shouldBeVisible(this.selectors.cartContainer);
    this.shouldUrlContain("cart");
    return this;
  }

  // busca la etiqueta con la clase inventory_item_name y verifica que contenga el nombre del producto
  // <div class="inventory_item_name" data-test="inventory-item-name">Sauce Labs Backpack</div>
  verifyProductInCart(productName) {
    cy.get(this.selectors.itemName).should("contain", productName);
    return this;
  }

  verifyMultipleProductsInCart(productNames) {
    productNames.forEach((productName) => {
      this.verifyProductInCart(productName);
    });
    return this;
  }

  getProductQuantity(productName) {
    return this.getProductRow(productName)
      .find(this.selectors.quantityLabel)
      .invoke("text")
      .then((text) => parseInt(text.trim()));
  }

  getProductPrice(productName) {
    return this.getProductRow(productName)
      .find(this.selectors.itemPrice)
      .invoke("text")
      .then((text) => parseFloat(text.replace("$", "").trim()));
  }

  getProductRow(productName) {
    return cy
      .get(this.selectors.itemName)
      .contains(productName)
      .parents(this.selectors.cartItem);
  }

  removeProduct(productName) {
    this.getProductRow(productName)
      .find(this.selectors.removeButton)
      .click();
    return this;
  }

  clickContinueShopping() {
    this.clickElement(this.selectors.continueShoppingButton);
    return this;
  }

  clickCheckout() {
    this.clickElement(this.selectors.checkoutButton);
    return this;
  }

  // verificar que el número de productos en el carrito sea el esperado
  verifyCartItemsCount(expectedCount) {
    cy.get(this.selectors.cartItem).should("have.length", expectedCount);
    return this;
  }
}

export default CartPage;

