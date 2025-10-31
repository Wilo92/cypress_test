/// <reference types="cypress" />
import users from "../../fixtures/users.json";
import checkoutData from "../../fixtures/checkout.json";
import devices from "../../fixtures/devices.json";
import ProductsPage from "../../pages/ProductsPage.js";
import CartPage from "../../pages/CartPage.js";
import CheckoutPage from "../../pages/CheckoutPage.js";
import CheckoutOverviewPage from "../../pages/CheckoutOverviewPage.js";
import CompletePage from "../../pages/CompletePage.js";

describe("Pruebas de compra - multi dispositivo", () => {
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

      it(`Completar compra de un producto en ${name}`, () => {
        const productName = "Sauce Labs Backpack";
        const checkout = checkoutData.standardCheckout;

        productsPage
          .addProductToCart(productName)
          .goToCart();

        cartPage
          .verifyPageLoaded()
          .verifyProductInCart(productName)
          .clickCheckout();

        checkoutPage
          .verifyPageLoaded()
          .submitCheckoutForm(
            checkout.firstName,
            checkout.lastName,
            checkout.postalCode
          );

        checkoutOverviewPage
          .verifyPageLoaded()
          .verifyProductInSummary(productName)
          .verifyTotalCalculated()
          .clickFinish();

        completePage
          .verifyPageLoaded()
          .verifyOrderComplete();
      });

      it(`Completar compra de múltiples productos en ${name}`, () => {
        const productNames = [
          "Sauce Labs Backpack",
          "Sauce Labs Bike Light"
        ];
        const checkout = checkoutData.standardCheckout;

        productsPage
          .addMultipleProductsToCart(productNames)
          .goToCart();

        cartPage
          .verifyPageLoaded()
          .verifyMultipleProductsInCart(productNames)
          .clickCheckout();

        checkoutPage
          .verifyPageLoaded()
          .submitCheckoutForm(
            checkout.firstName,
            checkout.lastName,
            checkout.postalCode
          );

        checkoutOverviewPage
          .verifyPageLoaded()
          .verifyTotalCalculated();

        productNames.forEach((productName) => {
          checkoutOverviewPage.verifyProductInSummary(productName);
        });

        checkoutOverviewPage.clickFinish();

        completePage
          .verifyPageLoaded()
          .verifyOrderComplete();
      });
    });
  });
});

