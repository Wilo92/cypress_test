/// <reference types="cypress" />
import users from "../../fixtures/users.json";
import devices from "../../fixtures/devices.json";
import ProductsPage from "../../pages/ProductsPage.js";
import CartPage from "../../pages/CartPage.js";
import CheckoutPage from "../../pages/CheckoutPage.js";

describe("Pruebas de checkout - multi dispositivo", () => {
  let productsPage;
  let cartPage;
  let checkoutPage;

  beforeEach(() => {
    productsPage = new ProductsPage();
    cartPage = new CartPage();
    checkoutPage = new CheckoutPage();
  });

  devices.forEach(({ name, width, height }) => {
    describe(`Pruebas en ${name}`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        cy.login(users.standard.username, users.standard.password);
        productsPage.verifyPageLoaded();

        const productName = "Sauce Labs Backpack";
        productsPage
          .addProductToCart(productName)
          .goToCart();

        cartPage.verifyPageLoaded();
      });

      it(`Iniciar checkout desde carrito en ${name}`, () => {
        cartPage
          .clickCheckout();

        checkoutPage.verifyPageLoaded();
      });
    });
  });
});

