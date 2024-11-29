describe('Verificar mi aplicación', () => {

  let numero = Math.floor(Math.random() * 1000000) + 1;

  /*
  it('Verificar inicio de sesión con credenciales INCORRECTAS', () => {
    cy.visit('/').then(() => {
      cy.contains('DuocUC');
      cy.get('#userName').invoke('val', '');
      cy.get('#userName').type('cuenta-inexistente');
      cy.wait(2000);
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.wait(2000);
      cy.contains('Ingresar').click();
      cy.intercept('/login').as('route').then(() => {
        cy.contains('Ingresar');
        cy.wait(3000);
      });
    });
  });

  it('Verificar inicio de sesión con credenciales CORRECTAS', () => {
    cy.visit('/').then(() => {
      cy.contains('DuocUC');
      cy.get('#userName').invoke('val', '');
      cy.get('#userName').type('atorres');
      cy.wait(2000);
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.wait(2000);
      cy.contains('Ingresar').click();
      cy.intercept('/login').as('route').then(() => {
        cy.contains('Bienvenido(a)');
        cy.wait(3000);
        cy.get('#botonSalir').click();
      });
    });
  });
  */
  /*
  it('crear publicacion en el foro', () => {
    cy.visit('/').then(() => {
      cy.viewport('iphone-xr');
      cy.contains('DuocUC');
      cy.get('#userName').invoke('val', '');
      cy.get('#userName').type('atorres');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/login').as('route').then(() => {
        cy.contains('Bienvenido(a)');
        cy.get('#botonForo').click();
        cy.wait(3000);
        cy.get('ion-header').invoke('css', 'z-index', '-1');
        cy.wait(3000);
        cy.get('[data-cy="input-titulo"]').scrollIntoView();
        cy.get('#titulo1').invoke('val', '');
        cy.get('#titulo1').type(`Contenido de prueba ${numero}`);
        cy.wait(3000);
        cy.get('#contenido_foro').invoke('val', '');
        cy.get('#contenido_foro').type(`Contenido de prueba ${numero}`);
        cy.wait(3000);
        cy.contains('Guardar').click();
        cy.wait(3000);
        cy.get('ion-header').invoke('css', 'z-index', '1');
        cy.get('#botonSalir').click();
      });
    });
  });
  */
  it('validar mis datos', () => {
    cy.visit('/').then(() => {
      cy.viewport('iphone-xr');
      cy.contains('DuocUC');
      cy.get('#userName').invoke('val', '');
      cy.get('#userName').type('atorres');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/login').as('route').then(() => {
        cy.contains('Bienvenido(a)');
        cy.get('#botonMisDatos').click();
        cy.get('#prueba')
      });
    });
  });

});
