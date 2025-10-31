describe('Pruebas de Login y Logout - SauceDemo', () => {

  it('Inicia sesión correctamente y cierra sesión', () => {
  
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('contain', 'Products')
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
    cy.url().should('include', 'saucedemo.com')
    cy.get('#login-button').should('be.visible')
  })
})
