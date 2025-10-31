class BasePage {
  visit(url) {
    cy.visit(url);
    return this;
  }

  getElement(selector) {
    return cy.get(selector);
  }

  clickElement(selector) {
    cy.get(selector).click();
    return this;
  }

  typeInField(selector, text) {
    cy.get(selector).type(text);
    return this;
  }

  typeInFieldSecurely(selector, text) {
    cy.get(selector).type(text, { log: false });
    return this;
  }

  shouldBeVisible(selector) {
    cy.get(selector).should("be.visible");
    return this;
  }

  shouldContainText(selector, text) {
    cy.get(selector).should("contain", text);
    return this;
  }

  shouldUrlContain(text) {
    cy.url().should("contain", text);
    return this;
  }

  shouldUrlEqual(url) {
    cy.url().should("eq", url);
    return this;
  }

  waitFor(selector, timeout = 10000) {
    cy.get(selector, { timeout }).should("be.visible");
    return this;
  }
}

export default BasePage;

