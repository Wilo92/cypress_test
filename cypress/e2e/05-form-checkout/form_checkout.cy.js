/// <reference types="cypress" />
import users from "../../fixtures/users.json";
import checkoutData from "../../fixtures/checkout.json";
import devices from "../../fixtures/devices.json";
import ProductsPage from "../../pages/ProductsPage.js";
import CartPage from "../../pages/CartPage.js";
import CheckoutPage from "../../pages/CheckoutPage.js";
import CheckoutOverviewPage from "../../pages/CheckoutOverviewPage.js";

describe("Pruebas de formulario de checkout - multi dispositivo", () => {
  const urlHome = Cypress.env("urlHome");
  let productsPage;
  let cartPage;
  let checkoutPage;
  let checkoutOverviewPage;

  beforeEach(() => {
    productsPage = new ProductsPage();
    cartPage = new CartPage();
    checkoutPage = new CheckoutPage();
    checkoutOverviewPage = new CheckoutOverviewPage();
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

        cartPage
          .verifyPageLoaded()
          .clickCheckout();

        checkoutPage.verifyPageLoaded();
      });

      it(`Completar formulario de checkout en ${name}`, () => {
        const checkout = checkoutData.standardCheckout;

        checkoutPage
          .fillCheckoutForm(
            checkout.firstName,
            checkout.lastName,
            checkout.postalCode
          )
          .clickContinue();

        checkoutOverviewPage.verifyPageLoaded();
      });

      it(`Validar error con campos vacíos en ${name}`, () => {
        checkoutPage
          .clickContinue()
          .verifyError();
      });
    });
  });
});

