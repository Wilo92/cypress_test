/// <reference types="cypress" />
import users from "../../fixtures/users.json";
import checkoutData from "../../fixtures/checkout.json";
import devices from "../../fixtures/devices.json";
import ProductsPage from "../../pages/ProductsPage.js";
import CartPage from "../../pages/CartPage.js";
import CheckoutPage from "../../pages/CheckoutPage.js";
import CheckoutOverviewPage from "../../pages/CheckoutOverviewPage.js";
import CompletePage from "../../pages/CompletePage.js";
import LoginPage from "../../pages/LoginPage.js";

describe("Flujo E2E completo - multi dispositivo", () => {

    //el test fallaba porque no sabía con qué URL exacta comparar después del logout.por eso siempre decia indefined porque no encontraba la url
    
  const urlLogin = Cypress.config().baseUrl;
  let productsPage;
  let cartPage;
  let checkoutPage;
  let checkoutOverviewPage;
  let completePage;
  let loginPage;

  beforeEach(() => {
    productsPage = new ProductsPage();
    cartPage = new CartPage();
    checkoutPage = new CheckoutPage();
    checkoutOverviewPage = new CheckoutOverviewPage();
    completePage = new CompletePage();
    loginPage = new LoginPage();
  });

  devices.forEach(({ name, width, height }) => {
    describe(`Flujo completo en ${name}`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
      });

      it(`Ejecutar flujo completo: login -> seleccionar producto -> carrito -> checkout -> formulario -> comprar -> logout en ${name}`, () => {
        const productNames = [
          "Sauce Labs Backpack",
          "Sauce Labs Bike Light"
        ];
        const checkout = checkoutData.standardCheckout;

        // login usuario estándar
        cy.login(users.standard.username, users.standard.password);

        // verificar que la página de productos se cargue correctamente, agregar múltiples productos al carrito y navegar al carrito
        productsPage
          .verifyPageLoaded()
          .addMultipleProductsToCart(productNames)
          .goToCart();

        // verificar que la página de carrito se cargue correctamente, verificar que los productos se agregaron correctamente y hacer click en el botón de checkout
        cartPage
          .verifyPageLoaded()
          .verifyMultipleProductsInCart(productNames)
          .clickCheckout();

        // verificar que la página de checkout se cargue correctamente, completar el formulario de checkout y hacer click en el botón de continuar
        checkoutPage
          .verifyPageLoaded()
          .submitCheckoutForm(
            checkout.firstName,
            checkout.lastName,
            checkout.postalCode
          );

        // verificar que la página de overview se cargue correctamente, verificar que el total se calculó correctamente y hacer click en el botón de finish
        checkoutOverviewPage
          .verifyPageLoaded()
          .verifyTotalCalculated();

        // verificar que los productos se agregaron correctamente a la orden
        productNames.forEach((productName) => {
          checkoutOverviewPage.verifyProductInSummary(productName);
        });

        // hacer click en el botón de finish
        checkoutOverviewPage.clickFinish();

        // verificar que la página de complete se cargue correctamente, verificar que la orden se completó correctamente y hacer click en el botón de volver a home
        completePage
          .verifyPageLoaded()
          .verifyOrderComplete()
          .clickBackHome();

        // verificar que la página de productos se cargue correctamente y hacer logout
        productsPage
          .verifyPageLoaded()
          .logout();

        // verificar que la url de login sea la esperada
        loginPage.shouldUrlEqual(urlLogin);
      });
    });
  });
});

