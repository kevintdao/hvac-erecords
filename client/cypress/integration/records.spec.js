describe('Record page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('company');
    cy.intercept('GET', '**/api/units/*/records/', { fixture: 'record.json' }).as('getRecord');
    cy.visit('http://localhost:3000/units/records/1');
    cy.wait('@getRecord')
  })

  it('should display all the data', () => {
    cy.get('#visit-2').should('contain', 'Visit 1');
    cy.get('#visit-2-start').should('contain', 'Start time: 4/18/2022, 4:46:29 PM UTC');
    cy.get('#visit-2-end').should('contain', 'End time: 4/18/2022, 4:47:39 PM UTC');
    cy.get('#plan-2-title').should('contain', 'Title: Routine Maintenance for AC Units');
    cy.get('#plan-2-desc').should('contain', 'Description: this is a list of tasks for maintenance of an air conditioner');
    cy.get('#tech-2-fname').should('contain', 'First name: Bob');
    cy.get('#tech-2-lname').should('contain', 'Last name: Smith');
    cy.get('#tech-2-company').should('contain', 'Affiliation: HVAC Company #1');
    cy.get('#tech-2-license').should('contain', 'License number: 131251003');
  })
})

describe('Authentication', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/units/*/records/', {
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('getErrorRecord');
    cy.visit('http://localhost:3000/units/records/1');
    cy.wait('@getErrorRecord')
  })

  it('should redirect to login page when not logged in', () => {
    cy.get('#message').should('contain', 'Error message');
  })
})

describe('Permission/Not logged in error', () => {
  it('should display error', () => {
    cy.intercept('GET', '**/api/units/*/records', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('getRecordsError');
    cy.visit('http://localhost:3000/units/records/1');
    cy.wait('@getRecordsError');
    cy.get('#message').should('contain', 'Error message');
  })
})