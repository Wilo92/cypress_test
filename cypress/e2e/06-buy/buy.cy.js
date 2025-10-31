/// <reference types="cypress" />
import users from "../../fixtures/users.json";
import checkoutData from "../../fixtures/checkout.json";
import devices from "../../fixtures/devices.json";
import ProductsPage from "../../pages/ProductsPage.js";
import CartPage from "../../pages/CartPage.js";
import CheckoutPage from "../../pages/CheckoutPage.js";
import CheckoutOverviewPage from "../../pages/CheckoutOverviewPage.js";
import CompletePage from "../../pages/CompletePage.js";

// Esta suite verifica todo el flujo de compra (E2E) sin incluir el logout.
describe("Pruebas de compra - multi dispositivo", () => {

    const urlHome = Cypress.env("urlHome");
    let productsPage;
    let cartPage;
    let checkoutPage;
    let checkoutOverviewPage;
    let completePage;

    // Inicializamos todas las Page Objects antes de cada test 
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
                // Preparación: Configura el viewport.
                cy.viewport(width, height);
                // Inicia sesión (comando ya limpio de aserciones).
                cy.login(users.standard.username, users.standard.password);
                // verifica si la página de inicio cargó bien.
                productsPage.verifyPageLoaded();
            });

            afterEach(function () {
                // Genera un nombre de archivo descriptivo para la carpeta 06-buy
                const screenshotName = `${name} - ${this.currentTest.title}`;
                cy.screenshot(screenshotName);
            });

            // Compra con un solo artículo 
            it(`Completar compra de un producto en ${name}`, () => {
                const productName = "Sauce Labs Backpack";
                const checkout = checkoutData.standardCheckout;

                //  Agregar producto y navegar al carrito.
                productsPage
                    .addProductToCart(productName)
                    .goToCart();

                // Verificar carrito, ver producto, y avanzar a checkout.
                cartPage
                    .verifyPageLoaded()
                    .verifyProductInCart(productName)
                    .clickCheckout();

                // Llenar el formulario de envío.
                checkoutPage
                    .verifyPageLoaded()
                    .submitCheckoutForm(
                        checkout.firstName,
                        checkout.lastName,
                        checkout.postalCode
                    );

                // Verificar Overview (producto, total), y finalizar compra.
                checkoutOverviewPage
                    .verifyPageLoaded()
                    .verifyProductInSummary(productName)
                    .verifyTotalCalculated()
                    .clickFinish();

                //Asegura que la página de confirmación de compra cargó.
                completePage
                    .verifyPageLoaded()
                    .verifyOrderComplete();
            });

            // Compra con múltiples artículos
            it(`Completar compra de múltiples productos en ${name}`, () => {
                const productNames = [
                    "Sauce Labs Backpack",
                    "Sauce Labs Bike Light"
                ];
                const checkout = checkoutData.standardCheckout;

                /// Agregar varios productos y navegar al carrito.
                productsPage
                    .addMultipleProductsToCart(productNames)
                    .goToCart();

                //  Verificar carrito (múltiples productos) y avanzar.
                cartPage
                    .verifyPageLoaded()
                    .verifyMultipleProductsInCart(productNames)
                    .clickCheckout();

                // Llenar el formulario de envío.
                checkoutPage
                    .verifyPageLoaded()
                    .submitCheckoutForm(
                        checkout.firstName,
                        checkout.lastName,
                        checkout.postalCode
                    );

                // Verificar Overview (total).
                checkoutOverviewPage
                    .verifyPageLoaded()
                    .verifyTotalCalculated();

                // Asegurar que todos los productos están listados en el resumen.
                productNames.forEach((productName) => {
                    checkoutOverviewPage.verifyProductInSummary(productName);
                });

                //  Finalizar compra.
                checkoutOverviewPage.clickFinish();

                ///asegura que la compra se completó con éxito.
                completePage
                    .verifyPageLoaded()
                    .verifyOrderComplete();
            });
        });
    });
});