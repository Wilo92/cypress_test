Cypress.Commands.add("login", (username, password) => {
  const urlHome = Cypress.env("urlHome");

  cy.visit(Cypress.env("urlPagina"));
  cy.url().should("contain", "saucedemo");

  cy.get("#user-name").type(username);
  cy.get("#password").type(password, { log: false });
  cy.get("#login-button").click();

  // Si el login falla, captura pantalla y marca error
  cy.url().then((url) => {
    if (url !== urlHome) {
      cy.screenshot(`login_error_${username}`);
      throw new Error(`Inicio de sesión falló para ${username}`);
    } else {
      cy.log(`Login exitoso para ${username}`);
    }
  });
});
