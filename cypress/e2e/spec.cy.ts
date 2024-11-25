describe('Verificar mi aplicación', () => {

  const numero = Math.floor(Math.random() * 1000000) + 1;
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
  })

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
        //cy.get('#wellcome_title').contains('Bien');
        //cy.get('#wellcome_user').contains('Ana Torres');
        // cy.window().then((win) => {
        //   win.logout();
        cy.get('#botonSalir').click();
        });
        //cy.contains(' Cerrar sesión ').click();
      });
    });
*/

    it('crear publicacion en el foro', () =>{
      cy.visit('/').then(() => {
        cy.contains('DuocUC');
        cy.get('#userName').invoke('val', '');
        cy.get('#userName').type('atorres');
        cy.get('#password').invoke('val', '');
        cy.get('#password').type('1234');
        cy.contains('Ingresar').click();
        cy.intercept('/login').as('route').then(() => {
          cy.contains('Bienvenido(a)');
          //cy.get('#wellcome_title').contains('Bien');
          //cy.get('#wellcome_user').contains('Ana Torres');
          // cy.window().then((win) => {
          //   win.logout();
          cy.get('#botonForo').click();
          cy.wait(1000);
         // cy.get('#titulo1').type(`Título de prueba ${numero}`);
         // cy.get('#titulo').type(`Texto de prueba', { force: true }`);




          cy.wait(3000);
          cy.get('#contenido_foro').invoke('val', '');
          cy.get('#contenido_foro').type(`Contenido de prueba ${numero}`);
          cy.wait(3000);
          cy.contains('Guardar').click();
          cy.wait(3000);
          cy.contains(`Título de prueba ${numero}`).should('exist');
          cy.get('#botonSalir').click();


          });
          //cy.contains(' Cerrar sesión ').click();
        });
    });

    
  })

  //         cy.get('#titulo').type(`Título de prueba ${numero}`);
//         cy.get('#contenido').type(`Contenido de prueba ${numero}`);
//         cy.contains('Guardar').click();
//         cy.wait(3000);
//         cy.contains('Aceptar').click();
//         cy.wait(3000);
//         cy.contains(`Título de prueba ${numero}`).should('exist');
//         cy.contains('Cerrar sesión').click();

