// cypress/e2e/ui/browser_windows.cy.js

describe('Teste de nova janela - DemoQA', () => {
  before(() => {
    cy.visit('/'); // baseUrl: https://demoqa.com
  });

  it('Abrir nova janela e validar mensagem', () => {
    // 1. Acessar Alerts, Frame & Windows
    cy.contains('Alerts, Frame & Windows').click();

    // 2. Clicar no submenu Browser Windows
    cy.contains('Browser Windows').click();

    // 3. Interceptar o comportamento do window.open
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen'); // "espiona" o window.open
    });

    // 4. Clicar no botão New Window
    cy.get('#windowButton').click();

    // 5. Capturar a URL aberta
    cy.get('@windowOpen').should('be.called').then((stub) => {
      const url = stub.getCall(0).args[0];
      cy.visit(url); // abre na mesma aba
    });

    // 6. Validar mensagem "This is a sample page"
    cy.contains('This is a sample page').should('be.visible');

    // 7. "Fechar" a nova aba → no Cypress, significa voltar para página anterior
    cy.go('back');
    cy.url().should('include', '/browser-windows');
  });
});
