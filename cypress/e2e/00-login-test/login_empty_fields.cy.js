describe('Login con campos vacíos', () => {
  it('Debe mostrar un error si se intenta ingresar sin usuario ni contraseña', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#login-button').click()
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username is required')
  })
})
