describe('Test inicio de sesión', () => {
  it('Ingresar a la aplicación', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('.email_input').type('darwin@gmail.com');
    cy.get('.password_input').type('123456');
    cy.get('.button_cy').click();
    cy.url().should('eq', 'http://localhost:4200/home')
  })
})