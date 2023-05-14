describe('Test servicios', () => {
  it('CRUD servicios', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('.email_input').type('darwin@gmail.com');
    cy.get('.password_input').type('123456');
    cy.get('.button_cy').click();
    cy.url().should('eq', 'http://localhost:4200/home')

    cy.get('.nv_cy').click();
    cy.get('.servicios_cy').click();
    cy.url().should('eq', 'http://localhost:4200/services')
/*
    cy.get('.crear_servicio_cy').click();
    cy.get('.nombres_cy').type('Prueba nombre');
    cy.get('.tipo_servicio_cy').select('Baile')
    cy.get('.proveedor_cy').type('prueba proovedor');
    cy.get('.compañia_cy').type('prueba compañia');
    cy.get('.numero_cy').type('123456');
    cy.get('.descripcion_cy').type('Prueba descripción');
    cy.get('.guardar_cy').click();
    */

/*

    cy.get('.detalles_cy').eq(5).click();
    cy.url().should('eq', 'http://localhost:4200/services/45')


    cy.get('.editar_cy').click();
    cy.get('.nombres_cy').type('*');
    cy.get('.proveedor_cy').type('*');
    cy.get('.compañia_cy').type('*');
    cy.get('.numero_cy').type('0');
    cy.get('.descripcion_cy').type('*');
    cy.get('.guardar_cy').click();
    cy.url().should('eq', 'http://localhost:4200/services/')
    cy.reload()
*/
/*
    cy.get('.detalles_cy').eq(5).click();
    cy.url().should('eq', 'http://localhost:4200/services/45')

    cy.get('.eliminar_cy').click();
    cy.get('.confirmar_eliminar_cy').click();
    cy.url().should('eq', 'http://localhost:4200/services')

/*

  })
})

