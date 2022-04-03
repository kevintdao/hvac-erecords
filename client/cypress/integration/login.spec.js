describe('Login page', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/token', { fixture: 'token.json' }).as('login');
    cy.intercept('GET', '**/api/user', [{
      id: 1,
      email: "test@test.com",
      role: "Maintenance Company"
    }]).as('getUser');
    cy.visit('http://localhost:3000/login');
  })

  it('should login with the correct information', () => {
    cy.get('input#email').type("test@test.com");
    cy.get('input#password').type("Testing123!");
    cy.get('button#login-button').click();

    cy.wait('@login');
    cy.wait('@getUser');

    cy.url().should('include', '/');
  })

  it('should display error when login information is incorrect', () => {
    cy.intercept('POST', '**/api/token', { 
      statusCode: 404,
      body: {
        detail: "Error"
      }
    }).as('loginError');
    cy.get('input#email').type("test@test.com");
    cy.get('input#password').type("Testing123@");
    cy.get('button#login-button').click();

    cy.wait('@loginError');

    cy.get('#alert-title').should('contain', 'Error');
  })

  it('should save token to localStorage', () => {
    cy.get('input#email').type("test@test.com");
    cy.get('input#password').type("Testing123!");
    cy.get('button#login-button').click();

    cy.wait('@login');
    cy.wait('@getUser');

    cy.window().its("localStorage").invoke("getItem", "access_token").should("contain", "asdf");
    cy.window().its("localStorage").invoke("getItem", "refresh_token").should("contain", "asdf");
  })
})