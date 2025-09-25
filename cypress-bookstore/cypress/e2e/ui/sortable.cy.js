// cypress/e2e/ui/sortable.cy.js
describe('Drag and Drop - Sortable (Vertical & Horizontal)', () => {
  before(() => {
    cy.visit('/'); // baseUrl = https://demoqa.com
    cy.contains('Interactions').click();
    cy.contains('Sortable').click();
  });

  it('Ordenar lista vertical', () => {
    // Seleciona a aba Vertical
    cy.get('#demo-tab-list').should('be.visible').click();

    // Espera os itens aparecerem
    cy.get('#demo-tabpane-list .list-group-item:visible')
      .should('have.length.greaterThan', 0)
      .then(($items) => {
        const texts = $items.toArray().map(el => el.innerText.trim());
        const sorted = [...texts].sort();

        // Arrasta cada item para a posição correta
        sorted.forEach((text, index) => {
          // Seleciona item a mover
          cy.contains('#demo-tabpane-list .list-group-item:visible', text)
            .should('be.visible')
            .then(($target) => {
              // Seleciona item de destino
              cy.get('#demo-tabpane-list .list-group-item:visible')
                .eq(index)
                .should('be.visible')
                .then(($drop) => {
                  cy.wrap($target).drag($drop, { force: true });
                });
            });
        });
      });

    // Valida que a lista vertical está em ordem crescente
    cy.get('#demo-tabpane-list .list-group-item:visible').then(($items) => {
      const finalOrder = $items.toArray().map(el => el.innerText.trim());
      const sortedOrder = [...finalOrder].sort();
      expect(finalOrder).to.deep.eq(sortedOrder);
    });
  });

  it('Ordenar lista horizontal', () => {
    // Seleciona a aba Horizontal
    cy.get('#demo-tab-grid').should('be.visible').click();

    // Espera os itens carregarem
    cy.get('#demo-tabpane-grid .list-group-item:visible')
      .should('have.length.greaterThan', 0)
      .then(($items) => {
        const texts = $items.toArray().map(el => el.innerText.trim());
        const sorted = [...texts].sort();

        // Arrasta cada item para a posição correta
        sorted.forEach((text, index) => {
          cy.contains('#demo-tabpane-grid .list-group-item:visible', text)
            .should('be.visible')
            .then(($target) => {
              cy.get('#demo-tabpane-grid .list-group-item:visible')
                .eq(index)
                .should('be.visible')
                .then(($drop) => {
                  cy.wrap($target).drag($drop, { force: true });
                });
            });
        });
      });

    // Valida que a lista horizontal está em ordem crescente
    cy.get('#demo-tabpane-grid .list-group-item:visible').then(($items) => {
      const finalOrder = $items.toArray().map(el => el.innerText.trim());
      const sortedOrder = [...finalOrder].sort();
      expect(finalOrder).to.deep.eq(sortedOrder);
    });
  });
});
