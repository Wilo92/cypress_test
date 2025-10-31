import LoginPage from "../pages/LoginPage.js";

Cypress.Commands.add("login", (username, password) => {
  const loginPage = new LoginPage();
  const urlHome = Cypress.env("urlHome");

  loginPage.login(username, password);

  cy.url().should("eq", urlHome).then(() => {
    cy.log(`Login exitoso para ${username}`);
  });
});
