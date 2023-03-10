// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (role) => {
  switch(role){
    case 'company':
      role = 1
      break
    case 'manager':
      role = 2
      break
    case 'inspector':
      role = 4
      break
    case 'technician':
      role = 3
      break
    default:
      break
  }
  cy.intercept('POST', '**/api/token', { fixture: 'token.json' }).as('login');
  cy.intercept('GET', '**/api/user', {
    body: {
      id: 1,
      email: "test@test.com",
      role: role
    }
  }).as('getUser');

  cy.visit('http://localhost:3000/login');

  cy.get('input#email').type("test@test.com");
  cy.get('input#password').type("Testing123!");
  cy.get('button#login-button').click();

  cy.wait(['@login', '@getUser']);
})

Cypress.Commands.add('logout', () => {
  cy.get('a#sign-out').click()
})