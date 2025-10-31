/// <reference types="cypress" />
import users from "../../fixtures/users.json";
import devices from "../../fixtures/devices.json";
import ProductsPage from "../../pages/ProductsPage.js";
import LoginPage from "../../pages/LoginPage.js";

describe("Pruebas de logout - multi dispositivo", () => {
  const urlHome = Cypress.env("urlHome");
  const urlLogin = Cypress.env("urlPagina");
  let productsPage;
  let loginPage;

  beforeEach(() => {
    productsPage = new ProductsPage();
    loginPage = new LoginPage();
  });

  devices.forEach(({ name, width, height }) => {
    describe(`Pruebas en ${name}`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        cy.login(users.standard.username, users.standard.password);
        productsPage.verifyPageLoaded();
      });

      it(`Cerrar sesión desde menú en ${name}`, () => {
        productsPage.logout();

        loginPage.shouldUrlEqual(urlLogin);
      });
    });
  });
});

