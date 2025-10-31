/// <reference types="cypress" />
import users from "../../fixtures/users.json";
import devices from "../../fixtures/devices.json";
import ProductsPage from "../../pages/ProductsPage.js";

describe("Pruebas de selección de productos - multi dispositivo", () => {
  const urlHome = Cypress.env("urlHome");
  let productsPage;

  beforeEach(() => {
    productsPage = new ProductsPage();
  });

  devices.forEach(({ name, width, height }) => {
    describe(`Pruebas en ${name}`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        cy.login(users.standard.username, users.standard.password); // login usuario estándar
        productsPage.verifyPageLoaded(); // verificar que las etiquetas de productos sean visibles
      });

      it(`Seleccionar un producto en ${name}`, () => {
        const productName = "Sauce Labs Backpack";

        productsPage
          .addProductToCart(productName) // agregar el producto al carrito
          .verifyProductAdded(productName); // verificar que el producto se agregó al carrito
      });

      it(`Seleccionar múltiples productos en ${name}`, () => {
        const productNames = [
          "Sauce Labs Backpack",
          "Sauce Labs Bike Light"
        ];

        productsPage
          .addMultipleProductsToCart(productNames);

        productNames.forEach((productName) => {
          productsPage.verifyProductAdded(productName);
        });

        productsPage.verifyCartBadgeCount(productNames.length.toString());
      });
    });
  });
});

