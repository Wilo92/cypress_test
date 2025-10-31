/// <reference types="cypress" />
import users from "../../fixtures/users.json";
import devices from "../../fixtures/devices.json";
import ProductsPage from "../../pages/ProductsPage.js";
import CartPage from "../../pages/CartPage.js";

describe("Pruebas de ir al carrito - multi dispositivo", () => {
  const urlHome = Cypress.env("urlHome");
  let productsPage;
  let cartPage;

  beforeEach(() => {
    productsPage = new ProductsPage();
    cartPage = new CartPage();
  });

  devices.forEach(({ name, width, height }) => {
    describe(`Pruebas en ${name}`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        cy.login(users.standard.username, users.standard.password);
        productsPage.verifyPageLoaded();
      });

      afterEach(function () {
        // Genera un nombre de archivo descriptivo para la carpeta 03-go_to_cart
        const screenshotName = `${name} - ${this.currentTest.title}`;
        cy.screenshot(screenshotName);
      });

      it(`Agregar producto y navegar al carrito en ${name}`, () => {
        const productName = "Sauce Labs Backpack";

        productsPage
          .addProductToCart(productName)
          .goToCart();

        cartPage
          .verifyPageLoaded()
          .verifyProductInCart(productName);
      });

      it(`Agregar múltiples productos y verificar en carrito en ${name}`, () => {
        const productNames = [
          "Sauce Labs Backpack",
          "Sauce Labs Bike Light",
          "Sauce Labs Bolt T-Shirt"
        ];

        productsPage
          .addMultipleProductsToCart(productNames)
          .goToCart();

        cartPage
          .verifyPageLoaded()
          .verifyMultipleProductsInCart(productNames)
          .verifyCartItemsCount(productNames.length);
      });
    });
  });
});

