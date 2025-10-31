import BasePage from "./BasePage.js";

class LoginPage extends BasePage {
  constructor() {
    super();
    this.selectors = {
      usernameInput: "#user-name",
      passwordInput: "#password",
      loginButton: "#login-button",
      errorMessage: '[data-test="error"]',
    };
  }

  visitLogin() {
    this.visit('/');
    return this;
  }

  enterUsername(username) {
    this.typeInField(this.selectors.usernameInput, username);
    return this;
  }

  enterPassword(password) {
    this.typeInFieldSecurely(this.selectors.passwordInput, password);
    return this;
  }

  clickLoginButton() {
    this.clickElement(this.selectors.loginButton);
    return this;
  }

  login(username, password) {
    this.visitLogin();
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
    return this;
  }

  verifyError() {
    this.shouldBeVisible(this.selectors.errorMessage);
    return this;
  }

  verifySuccess(urlHome) {
    this.shouldUrlEqual(urlHome);
    return this;
  }
}


// Elimi el método verifySuccess, la asercion de url debe hacerse en el basePage.js, este archiv solo debe manejar la interacción con la página.
  // verifySuccess(urlHome) {
  //   this.shouldUrlEqual(urlHome);
  //   return this;
  // }


export default LoginPage;

