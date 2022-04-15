describe('Maintenance company dashboard', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/token', { fixture: 'token.json' }).as('login');
    cy.intercept('GET', '**/api/user', {
      body: {
        id: 1,
        email: "test@test.com",
        role: "Company"
      }
    }).as('getUser');

    cy.visit('http://localhost:3000/login');
    cy.get('#email').type('company@gmail.com');
    cy.get('#password').type('Asdf1234!');
    cy.get('#login-button').click();
  })

  it('should be at the dashboard', () => {
    cy.wait(['@login', '@getUser']);
    cy.get('h2').should('contain', 'Dashboard');
    cy.get('h3').should('contain', 'Building Managers');
    cy.get('h3').should('contain', 'Buildings');
    cy.get('h3').should('contain', 'Units');
    cy.get('h3').should('contain', 'Technicians');
    cy.get('h3').should('contain', 'Maintenance Tasks');
    cy.get('h3').should('contain', 'Maintenance Tasks');
  })
})

describe('Building owner dashboard', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/token', { fixture: 'token.json' }).as('login');
    cy.intercept('GET', '**/api/user', {
      body: {
        id: 1,
        email: "test@test.com",
        role: "Manager"
      }
    }).as('getUser');

    cy.visit('http://localhost:3000/login');
    cy.get('#email').type('manager@gmail.com');
    cy.get('#password').type('Asdf1234!');
    cy.get('#login-button').click();
  })

  it('should be at the dashboard', () => {
    cy.wait(['@login', '@getUser']);
    cy.get('h2').should('contain', 'Dashboard');
    cy.get('h3').should('contain', 'Buildings');
    cy.get('h3').should('contain', 'Units');
  })
})