import BasePage from "./BasePage.js";

class ProductsPage extends BasePage {
  constructor() {
    super();
    this.selectors = {
      productContainer: ".inventory_list",
      productItem: ".inventory_item",
      productName: ".inventory_item_name",
      addToCartButton: '[data-test*="add-to-cart"]',
      removeButton: '[data-test*="remove"]',
      cartBadge: ".shopping_cart_badge",
      cartLink: ".shopping_cart_link",
      sortDropdown: '[data-test="product_sort_container"]',
      burgerMenu: "#react-burger-menu-btn",
      logoutButton: "#logout_sidebar_link",
    };
  }

  // verificar que las etiquetas de productos sean visibles y que la url contenga "inventory"
  verifyPageLoaded() {
    this.shouldBeVisible(this.selectors.productContainer);
    this.shouldUrlContain("inventory");
    return this;
  }

  // obtener el producto por su nombre
  getProductByName(productName) {
    return cy
      .get(this.selectors.productName)
      .contains(productName)
      .parents(this.selectors.productItem);
  // <div class="inventory_item_name " data-test="inventory-item-name">Sauce Labs Backpack</div>
  }

  // hacer click en el botón de agregar al carrito para un producto específico
  addProductToCart(productName) {
    this.getProductByName(productName) // obtener el producto por su nombre
      .find(this.selectors.addToCartButton) // encontrar el botón de agregar al carrito
      .click(); // hacer click en el botón de agregar al carrito
    return this;
  }

  addMultipleProductsToCart(productNames) {
    // por cada producto en la lista, agregar el producto al carrito
    productNames.forEach((productName) => {
      this.addProductToCart(productName); // agregar el producto al carrito
    });
    return this;
  }

  // verificar que el botón de eliminar sea visible para un producto específico
  verifyProductAdded(productName) {
    this.getProductByName(productName)
      .find(this.selectors.removeButton)
      .should("be.visible");
    return this;
  }

  // buscar el carrito de compras y comprobar el número de productos
  getCartBadgeCount() {
    return cy.get(this.selectors.cartBadge).invoke("text");
  }

  verifyCartBadgeCount(expectedCount) {
    cy.get(this.selectors.cartBadge).should("contain", expectedCount);
    return this;
  }

  goToCart() {
    // buscar el link con la clase shopping_cart_link y hacer click en él
    this.clickElement(this.selectors.cartLink);
    return this;
  }

  sortProducts(sortOption) {
    cy.get(this.selectors.sortDropdown).select(sortOption);
    return this;
  }

  openMenu() {
    this.clickElement(this.selectors.burgerMenu);
    return this;
  }

  clickLogout() {
    this.clickElement(this.selectors.logoutButton);
    return this;
  }

  logout() {
    this.openMenu();
    cy.get(this.selectors.logoutButton).should("be.visible");
    this.clickLogout();
    return this;
  }
}

export default ProductsPage;

