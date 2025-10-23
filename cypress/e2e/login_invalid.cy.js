describe('Prueba de login con credenciales incorrectas', () => {
    it('Debe mostrar un mensaje de error al ingresar una contraseña incorrecta', () => {

        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('clave_invalida')
        cy.get('#login-button').click()
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Username and password do not match')
        cy.url().should('eq', 'https://www.saucedemo.com/')
    })
})
