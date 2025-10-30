/// <reference types="cypress" />
import users from "../../fixtures/users.json";
import devices from "../../fixtures/devices.json";

describe("Pruebas de inicio de sesión - multi dispositivo", () => {
  const urlHome = Cypress.env("urlHome");

  devices.forEach(({ name, width, height }) => {
    describe(`Pruebas en ${name}`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
      });

      it(`Login usuario estándar en ${name}`, () => {
        cy.login(users.standard.username, users.standard.password);
        cy.url().should("eq", urlHome);
      });

      it(`Login usuario visual en ${name}`, () => {
        cy.login(users.visual.username, users.visual.password);
        cy.url().should("eq", urlHome);
        cy.screenshot();
      });
    });
  });
});
