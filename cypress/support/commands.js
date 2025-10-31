import LoginPage from "../pages/LoginPage.js";

// Este es el Custom Command 'cy.login()'
Cypress.Commands.add("login", (username, password) => {
  const loginPage = new LoginPage();

    
  loginPage.login(username, password);

  
  cy.log(`Login exitoso para ${username}`);
});