describe('Test usuarios', () => {
  it('CRUD usuarios', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('.email_input').type('darwin@gmail.com');
    cy.get('.password_input').type('123456');
    cy.get('.button_cy').click();
    cy.url().should('eq', 'http://localhost:4200/home')

    cy.get('.nv_cy').click();
    cy.get('.usuarios_cy').click();
    cy.url().should('eq', 'http://localhost:4200/users')

    cy.get('.crear_usuario_cy').click();
    cy.get('.nombres_cy').type('jose');
    cy.get('.apellido_cy').type('corredor');
    cy.get('.correo_cy').type('jose@gmail.com');
    cy.get('.contrasena_cy').type('123456');
    cy.get('.rol_cy').click();
    cy.get('.rol_select_cy').first().click();
    cy.get('.guardar_cy').click();
    cy.reload()



    cy.get('.detalles_cy').eq(1).click();
    cy.url().should('eq', 'http://localhost:4200/users/18')



    cy.get('.editar_cy').click();
    cy.get('.nombres_cy').type(' manuel');
    cy.get('.apellido_cy').type(' bociga');
    cy.get('.guardar_cy').click();
    cy.get('.nv_cy').click();
    cy.get('.usuarios_cy').click();
    cy.url().should('eq', 'http://localhost:4200/users')

    cy.get('.detalles_cy').eq(1).click();
    cy.url().should('eq', 'http://localhost:4200/users/18')

    cy.get('.eliminar_cy').click();
    cy.get('.confirmar_eliminar_cy').click();
    cy.get('.nv_cy').click();
    cy.get('.usuarios_cy').click();
    cy.url().should('eq', 'http://localhost:4200/users')


  })
})



