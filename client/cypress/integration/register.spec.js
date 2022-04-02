describe('Register page', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/register', [{
      username: "test@test.com",
      email: "test@test.com",
      password: "Testing123!"
    }]).as('register');
    cy.visit('http://localhost:3000/register');
  })

  it("should display success message when successfully register", () => {
    cy.get('input#email').type("test@test.com");
    cy.get('input#password').type("Testing123!");
    cy.get('input#password-confirm').type("Testing123!");
    cy.get('button#register-button').click();

    cy.wait('@register');

    cy.get('#alert-title').should('contain', 'Successful');
  })

  it("should display error message when registration failed", () => {
    cy.intercept('POST', '**/api/register', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('registerError');

    cy.get('input#email').type("test@test.com");
    cy.get('input#password').type("Testing123!");
    cy.get('input#password-confirm').type("Testing123!");
    cy.get('button#register-button').click();

    cy.wait('@registerError');

    cy.get('#alert-title').should('contain', 'Error');


  })
})