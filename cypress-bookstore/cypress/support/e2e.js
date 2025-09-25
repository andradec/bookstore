// cypress/support/e2e.js
import "@4tw/cypress-drag-drop";

// Ignorar erros não tratados no frontend (se precisar)
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// Comando para criar usuário
Cypress.Commands.add('createUser', (username, password) => {
  return cy.request('POST', '/Account/v1/User', {
    userName: username,
    password: password
  });
});

// Comando para gerar token
Cypress.Commands.add('generateToken', (username, password) => {
  return cy.request('POST', '/Account/v1/GenerateToken', {
    userName: username,
    password: password
  });
});

// Comando para autorizar usuário
Cypress.Commands.add('authorizeUser', (username, password) => {
  return cy.request('POST', '/Account/v1/Authorized', {
    userName: username,
    password: password
  });
});

// Comando para listar livros
Cypress.Commands.add('getBooks', () => {
  return cy.request('GET', '/BookStore/v1/Books');
});

// Comando para alugar livros
Cypress.Commands.add('rentBooks', (userId, token, bookIds) => {
  return cy.request({
    method: 'POST',
    url: '/BookStore/v1/Books',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: {
      userId: userId,
      collectionOfIsbns: bookIds
    }
  });
});

// Comando para buscar detalhes do usuário
Cypress.Commands.add('getUserDetails', (userId, token) => {
  return cy.request({
    method: 'GET',
    url: `/Account/v1/User/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
});
