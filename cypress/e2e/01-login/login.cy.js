/// <reference types="cypress" />
import users from "../../fixtures/users.json";
import devices from "../../fixtures/devices.json";

describe("Pruebas de inicio de sesión - multi dispositivo", () => {

    //la URL base venía de 'Cypress.env("urlHome")',resultaba 'undefined'.con 'Cypress.config().baseUrl', es para la url principal de la aplicación.


    const urlBase = Cypress.config().baseUrl;
    //  URL de inventario usando la URL base, Esta es la URL a que debe de ir despues de login exitoso un login exitoso.

    const urlInventory = urlBase + "inventory.html";

    devices.forEach(({ name, width, height }) => {
        describe(`Pruebas en ${name}`, () => {
            beforeEach(() => {
                cy.viewport(width, height);
            });

            ////LINEA PARA TOMAR CAPTURA DE PANTALLA A TODAS LA PRUEBAS PASEN O NO PASEN

            afterEach(function () {
                const screenshotName = `${name} - ${this.currentTest.title}`;
                cy.screenshot(screenshotName);
            });
            

            it(`Login usuario estándar en ${name}`, () => {
                cy.login(users.standard.username, users.standard.password);
                cy.url().should("eq", urlInventory);
            });

            it(`Login usuario visual en ${name}`, () => {
                cy.login(users.visual.username, users.visual.password);
                cy.url().should("eq", urlInventory);
                cy.screenshot();
            });
        });
    });
});