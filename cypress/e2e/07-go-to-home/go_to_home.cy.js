/// <reference types="cypress" />
import users from "../../fixtures/users.json";
import devices from "../../fixtures/devices.json";
import ProductsPage from "../../pages/ProductsPage.js";
import CartPage from "../../pages/CartPage.js";
import CheckoutPage from "../../pages/CheckoutPage.js";
import CheckoutOverviewPage from "../../pages/CheckoutOverviewPage.js";
import CompletePage from "../../pages/CompletePage.js";

describe("Pruebas de volver a home - multi dispositivo", () => {
  const urlHome = Cypress.env("urlHome");
  let productsPage;
  let cartPage;
  let checkoutPage;
  let checkoutOverviewPage;
  let completePage;

  beforeEach(() => {
    productsPage = new ProductsPage();
    cartPage = new CartPage();
    checkoutPage = new CheckoutPage();
    checkoutOverviewPage = new CheckoutOverviewPage();
    completePage = new CompletePage();
  });

  devices.forEach(({ name, width, height }) => {
    describe(`Pruebas en ${name}`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        cy.login(users.standard.username, users.standard.password);
        productsPage.verifyPageLoaded();
      });

      afterEach(function () {
          // Genera un nombre de archivo descriptivo para la carpeta 07-go-to-home
          const screenshotName = `${name} - ${this.currentTest.title}`;
          cy.screenshot(screenshotName);
      });

      it(`Volver a home desde carrito usando Continue Shopping en ${name}`, () => {
        const productName = "Sauce Labs Backpack";

        productsPage
          .addProductToCart(productName)
          .goToCart();

        cartPage
          .verifyPageLoaded()
          .clickContinueShopping();

        productsPage.verifyPageLoaded();
        cy.url().should("eq", urlHome);
      });

      it(`Volver a home desde checkout overview usando Cancel en ${name}`, () => {
        const productName = "Sauce Labs Backpack";

        productsPage
          .addProductToCart(productName)
          .goToCart();

        cartPage
          .verifyPageLoaded()
          .clickCheckout();

        checkoutPage
          .verifyPageLoaded()
          .submitCheckoutForm("Juan", "Pérez", "12345");

        checkoutOverviewPage
          .verifyPageLoaded()
          .clickCancel();

        productsPage.verifyPageLoaded();
        cy.url().should("eq", urlHome);
      });

      it(`Volver a home desde página de completado usando Back Home en ${name}`, () => {
        const productName = "Sauce Labs Backpack";

        productsPage
          .addProductToCart(productName)
          .goToCart();

        cartPage
          .verifyPageLoaded()
          .clickCheckout();

        checkoutPage
          .verifyPageLoaded()
          .submitCheckoutForm("Juan", "Pérez", "12345");

        checkoutOverviewPage
          .verifyPageLoaded()
          .clickFinish();

        completePage
          .verifyPageLoaded()
          .clickBackHome();

        productsPage.verifyPageLoaded();
        cy.url().should("eq", urlHome);
      });
    });
  });
});

