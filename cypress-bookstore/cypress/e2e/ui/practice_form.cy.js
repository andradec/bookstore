// cypress/e2e/ui/practice_form.cy.js

describe('Formulário DemoQA - Practice Form', () => {
  before(() => {
    cy.visit('/'); // abre https://demoqa.com (baseUrl no config)
  });

  it('Fluxo completo de preenchimento do formulário', () => {
    // 1. Acessar Forms
    cy.contains('Forms').click();

    // 2. Clicar em Practice Form
    cy.contains('Practice Form').click();

    // 3. Preencher campos do formulário
    cy.get('#firstName').type('João');
    cy.get('#lastName').type('Silva');
    cy.get('#userEmail').type('joao.silva@example.com');

    // Selecionar gênero (aleatório entre os 3)
    const genders = ['Male', 'Female', 'Other'];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    cy.contains(gender).click();

    cy.get('#userNumber').type('11987654321');

    // Data de nascimento
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select('January');
    cy.get('.react-datepicker__year-select').select('2000');
    cy.get('.react-datepicker__day--015').click(); // dia fixo só para exemplo

    // Subjects
    cy.get('#subjectsInput').type('Math{enter}');
    cy.get('#subjectsInput').type('English{enter}');

    // Hobbies (aleatório entre os 3)
    const hobbies = ['Sports', 'Reading', 'Music'];
    const hobby = hobbies[Math.floor(Math.random() * hobbies.length)];
    cy.contains(hobby).click();

    // Upload de arquivo
    cy.get('#uploadPicture').selectFile('cypress/fixtures/sample.txt');

    // Endereço
    cy.get('#currentAddress').type('Rua Cypress, 123 - São Paulo/SP');

    // Selecionar o State
    cy.get('#state').click();
    cy.get('.css-26l3qy-menu').contains('NCR').click();

    // Selecionar a City
    cy.get('#city').click();
    cy.get('.css-26l3qy-menu').contains('Delhi').click();

    // 4. Submeter formulário
    cy.get('#adplus-anchor').invoke('attr', 'style', 'display:none');
    cy.get('#submit').click();


    // 5. Garantir que o popup foi aberto
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-title').should('contain', 'Thanks for submitting the form');

    // 6. Fechar o popup
    cy.get('#closeLargeModal').click();

    // Garantir que popup fechou
    cy.get('.modal-content').should('not.exist');
  });
});
