describe('Refrigerant page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('company');
    cy.intercept('GET', '**/api/units/*', { fixture: 'unit.json' }).as('getUnit');
    cy.intercept('GET', '**/api/units/*/refrigerant/', { fixture: 'refrigerant.json' }).as('getRefrigerant');
    cy.visit('http://localhost:3000/units/refrigerant/1');
    cy.wait('@getUnit')
    cy.wait('@getRefrigerant')
  })

  it('should display all the data', () => {
    cy.get('#report-serial_number').should('contain', 'Serial Number: AA000312341');
  })
})

describe('Authentication', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/units/*', {
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('getErrorRefrigerant');
    cy.visit('http://localhost:3000/units/refrigerant/1');
    cy.wait('@getErrorRefrigerant')
  })

  it('should redirect to login page when not logged in', () => {
    cy.get('#message').should('contain', 'Error message');
  })
})

describe('Permission/Not logged in error', () => {
  it('should display error', () => {
    cy.intercept('GET', '**/api/units/*', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('getRefrigerantError');
    cy.visit('http://localhost:3000/units/refrigerant/1');
    cy.wait('@getRefrigerantError');
    cy.get('#message').should('contain', 'Error message');
  })
})