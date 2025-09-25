# Cypress Bookstore

Este projeto é uma suíte de testes automatizados utilizando [Cypress](https://www.cypress.io/) para a aplicação Bookstore.

## Índice

- [Sobre](#sobre)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Sobre

O objetivo deste projeto é garantir a qualidade e o funcionamento correto das funcionalidades da aplicação Bookstore por meio de testes automatizados end-to-end.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão recomendada: >= 14)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/cypress-bookstore.git
cd cypress-bookstore
npm install
```

## Como usar

Para rodar os testes em modo interativo:

```bash
npx cypress open
```

Para rodar os testes em modo headless:

```bash
npx cypress run
```

## Estrutura do Projeto

```
cypress-bookstore/
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   └── support/
├── cypress.config.js
└── README.md
```

## Contribuição

Contribuições são bem-vindas! Abra uma issue ou envie um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).