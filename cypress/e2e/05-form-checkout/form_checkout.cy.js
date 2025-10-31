/// <reference types="cypress" />
import users from "../../fixtures/users.json";
import checkoutData from "../../fixtures/checkout.json";
import devices from "../../fixtures/devices.json";
import ProductsPage from "../../pages/ProductsPage.js";
import CartPage from "../../pages/CartPage.js";
import CheckoutPage from "../../pages/CheckoutPage.js";
import CheckoutOverviewPage from "../../pages/CheckoutOverviewPage.js";

// Este archivo prueba la funcionalidad del formulario de Checkout (paso 1 de la compra).
describe("Pruebas de formulario de checkout - multi dispositivo", () => {

  // si esta variable de entorno ('urlHome') 
  const urlHome = Cypress.env("urlHome");
  let productsPage;
  let cartPage;
  let checkoutPage;
  let checkoutOverviewPage;

  // Inicializamos las Page Objects antes de cada bloque de pruebas.
  beforeEach(() => {
    productsPage = new ProductsPage();
    cartPage = new CartPage();
    checkoutPage = new CheckoutPage();
    checkoutOverviewPage = new CheckoutOverviewPage();
  });

  // Bucle para ejecutar el mismo set de pruebas en múltiples dispositivos (viewport).
  devices.forEach(({ name, width, height }) => {
    describe(`Pruebas en ${name}`, () => {
      beforeEach(() => {
        // Configura el tamaño de la pantalla para simular el dispositivo.
        cy.viewport(width, height);
        // Ejecuta el comando personalizado para login.
        cy.login(users.standard.username, users.standard.password);
        // Verifica que la página de productos cargó correctamente después del login.
        productsPage.verifyPageLoaded();

        // --- Preparación para llegar al formulario de Checkout (Setup) ---
        const productName = "Sauce Labs Backpack";

        // Agrega un producto al carrito y navega al carrito.
        productsPage
          .addProductToCart(productName)
          .goToCart();

        // Verifica el carrito y haz clic en Checkout.
        cartPage
          .verifyPageLoaded()
          .clickCheckout();

        // Verifica que estamos en la página del formulario 
        checkoutPage.verifyPageLoaded();
      });

      // Llenar el formulario y avanzar ---
      it(`Completar formulario de checkout en ${name}`, () => {
        const checkout = checkoutData.standardCheckout;

        // Llenar los campos (nombre, apellido, código postal)
        checkoutPage
          .fillCheckoutForm(
            checkout.firstName,
            checkout.lastName,
            checkout.postalCode
          )
          // Presionar el botón para continuar
          .clickContinue();

        // Verificar que la navegación nos llevó a la página de Overview.
        checkoutOverviewPage.verifyPageLoaded();
      });

      // Enviar sin datos y validar el error ---
      it(`Validar error con campos vacíos en ${name}`, () => {
        // Intentar continuar sin llenar ningún campo (campos vacíos)
        checkoutPage
          .clickContinue()
          // Verificar que el mensaje de error aparece en pantalla.
          .verifyError();
      });
    });
  });
});