// cypress/e2e/ui/progress_bar.cy.js

describe('Teste Progress Bar - DemoQA', () => {
  before(() => {
    cy.visit('/'); // baseUrl: https://demoqa.com
  });

  it('Controlar e validar progress bar', () => {
    // 1. Acessar Widgets
    cy.contains('Widgets').click();

    // 2. Clicar no submenu Progress Bar
    cy.contains('Progress Bar').click();

    // 3. Clicar em Start
    cy.get('#startStopButton').click();

    // 4. Esperar alguns segundos e parar antes dos 25%
    cy.wait(1000); // ~1s (geralmente fica entre 15% e 20%)
    cy.get('#startStopButton').click(); // pausa

    // 5. Validar que o valor é <= 25%
    cy.get('.progress-bar')
      .invoke('attr', 'aria-valuenow')
      .then((valor) => {
        expect(Number(valor)).to.be.at.most(25);
      });

    // 6. Recomeçar (Start novamente)
    cy.get('#startStopButton').click();

    // 7. Esperar até chegar a 100%
    cy.get('.progress-bar', { timeout: 15000 })
      .should('have.attr', 'aria-valuenow', '100');

    // 8. Resetar
    cy.get('#resetButton').should('be.visible').click();

    // 9. Validar que voltou para 0
    cy.get('.progress-bar')
      .invoke('attr', 'aria-valuenow')
      .should('eq', '0');
  });
});
    