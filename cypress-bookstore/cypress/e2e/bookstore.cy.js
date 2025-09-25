// cypress/e2e/api/bookstore.cy.js

describe('Fluxo completo API Bookstore - DemoQA Swagger', () => {
  let userId;
  let username = `user_${Date.now()}`;
  let password = 'Password@123';
  let token;
  let books;

  it('Criar usuário', () => {
    cy.request('POST', '/Account/v1/User', {
      userName: username,
      password: password
    }).then((res) => {
      expect(res.status).to.eq(201);
      userId = res.body.userID;
    });
  });

  it('Gerar token', () => {
    cy.request('POST', '/Account/v1/GenerateToken', {
      userName: username,
      password: password
    }).then((res) => {
      expect(res.status).to.eq(200);
      token = res.body.token;
    });
  });

  it('Autorizar usuário', () => {
    cy.request('POST', '/Account/v1/Authorized', {
      userName: username,
      password: password
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.eq(true);
    });
  });

  it('Listar livros', () => {
    cy.request('GET', '/BookStore/v1/Books').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.books).to.have.length.greaterThan(0);
      books = res.body.books;
    });
  });

  it('Alugar dois livros', () => {
    const bookIds = books.slice(0, 2).map(b => ({ isbn: b.isbn }));
    cy.request({
      method: 'POST',
      url: '/BookStore/v1/Books',
      headers: { Authorization: `Bearer ${token}` },
      body: {
        userId: userId,
        collectionOfIsbns: bookIds
      }
    }).then((res) => {
      expect(res.status).to.eq(201);
    });
  });

  it('Listar detalhes do usuário', () => {
    cy.request({
      method: 'GET',
      url: `/Account/v1/User/${userId}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.username).to.eq(username);
      expect(res.body.books).to.have.length(2);
    });
  });
});
