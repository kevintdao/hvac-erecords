describe('Register page', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/companies', [{
      city: "Iowa City",
      country: "US",
      name: "test",
      phone_number: "+3195555555",
      street: "123 Test dr",
      users: [
        {
          email: "test@test.com",
          password: "Testing123!"
        }
      ],
      zip_code: "52240"
    }]).as('register');
    cy.visit('http://localhost:3000/register');
  })

  it("should display success message when successfully register", () => {
    cy.get('input#email').type("test@test.com");
    cy.get('input#password').type("Testing123!");
    cy.get('input#password-confirm').type("Testing123!");
    cy.get('input#name').type("test");
    cy.get('input#phone_number').type("(319) 555-5555");
    cy.get('input#street').type("123 Test dr");
    cy.get('input#city').type("Iowa City");
    cy.get('input#zip_code').type("52240");
    cy.get('input#country').type("US");

    cy.get('button#register-button').click();

    cy.wait('@register');

    cy.get('#alert-title').should('contain', 'Successful');
  })

  it("should display error message when registration failed", () => {
    cy.intercept('POST', '**/api/companies', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('registerError');

    cy.get('input#email').type("test@test.com");
    cy.get('input#password').type("Testing123!");
    cy.get('input#password-confirm').type("Testing123!");
    cy.get('input#name').type("test");
    cy.get('input#phone_number').type("(319) 555-5555");
    cy.get('input#street').type("123 Test dr");
    cy.get('input#city').type("Iowa City");
    cy.get('input#zip_code').type("52240");
    cy.get('input#country').type("US");
    cy.get('button#register-button').click();

    cy.wait('@registerError');

    cy.get('#alert-title').should('contain', 'Error');
  })
})