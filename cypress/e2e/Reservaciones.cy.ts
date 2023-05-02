describe('Test Reservaciones', () => {
  it('Reservaciones', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('.email_input').type('darwin@gmail.com');
    cy.get('.password_input').type('123456');
    cy.get('.button_cy').click();
    cy.url().should('eq', 'http://localhost:4200/home')

    cy.get('.nv_cy').click();
    cy.get('.reservaciones_cy').click();
    cy.url().should('eq', 'http://localhost:4200/reservations')

    cy.get('.crear_reservacion_cy').click();
    cy.get('.nombres_cy').type('Prueba nombre');
    cy.get('.tipo_salon_cy').select('interior');
    cy.get('.adultos_cy').type('10');
    cy.get('.niños_cy').type('5');
    cy.get('.inicio_cy').type('2023-10-10');
    cy.get('.final_cy').type('2023-10-11');
    cy.get('.hora_inicio_cy').type('16:00:00');
    cy.get('.hora_final_cy').type('02:00:00');
    cy.get('.tipo_evento_cy').select('boda');
    cy.get('.adelanto_cy').type('100000');
    cy.get('.valor_hora_cy').type('30000');

    cy.get('.servicios_cy').click();
    cy.get('.agregar_servicio_cy').click();
    cy.get('.seleccionar_servicio_cy').first().click();
    cy.get('.descripcion_servicio_cy').type('Prueba descripción');
    cy.get('.precio_servicio_cy').type('100000');
    cy.get('.confirmar_servicio_cy').first().click();
    cy.get('.reservaciones_cy').click();

    cy.get('.guardar_cy').click();
    cy.url().should('eq', 'http://localhost:4200/reservations')

/*

    cy.get('.detalles_cy').eq(5).click();
    cy.url().should('eq', 'http://localhost:4200/services/9')


    cy.get('.editar_cy').click();
    cy.get('.nombres_cy').type('*');
    cy.get('.proveedor_cy').type('*');
    cy.get('.compañia_cy').type('*');
    cy.get('.numero_cy').type('0');
    cy.get('.descripcion_cy').type('*');
    cy.get('.guardar_cy').click();
    cy.url().should('eq', 'http://localhost:4200/services')


    cy.get('.detalles_cy').eq(5).click();
    cy.url().should('eq', 'http://localhost:4200/services/9')

    cy.get('.eliminar_cy').click();
    cy.get('.confirmar_eliminar_cy').click();
    cy.url().should('eq', 'http://localhost:4200/services')

*/

  })
})