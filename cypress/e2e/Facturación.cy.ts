describe('Test Facturación', () => {
  it('Facturas', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('.email_input').type('darwin@gmail.com');
    cy.get('.password_input').type('123456');
    cy.get('.button_cy').click();
    cy.url().should('eq', 'http://localhost:4200/home')

    cy.get('.nv_cy').click();
    cy.get('.reservaciones_cy').click();
    cy.url().should('eq', 'http://localhost:4200/reservations')

    cy.get('.detalles_cy').click();
    cy.url().should('eq', 'http://localhost:4200/reservations/1')

    cy.get('.check_cy').click();
    cy.get('.ckeck_confirmar_cy').click();

    cy.url().should('eq', 'http://localhost:4200/reservations')


  })
})