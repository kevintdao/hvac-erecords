describe('Service plans page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('technician');
    cy.intercept('GET', '**/api/units/*', { fixture: 'unit.json' }).as('getUnit');
    cy.intercept('GET', '**/api/plans/*', { fixture: 'plan.json' }).as('getPlan');
    cy.intercept('GET', '**/api/profiles/*', { fixture: 'profile.json' }).as('getProfile');
    cy.intercept('GET', '**/api/tasks/1', { fixture: 'task_numeric.json' }).as('getNumericTask');
    cy.intercept('GET', '**/api/tasks/2', { fixture: 'task_selection.json' }).as('getSelectionTask');
    cy.intercept('GET', '**/api/tasks/3', { fixture: 'task_text.json' }).as('getTextTask');
    cy.visit('http://localhost:3000/service-plans/1');
  })

  it('should display the unit info', () => {
    cy.wait(['@getUnit'])

    cy.get('dd#external_id').should('contain', '12345');
    cy.get('dd#model_number').should('contain', '12345');
    cy.get('dd#serial_number').should('contain', 'ABC123');
    cy.get('dd#category').should('contain', 'Duct free');
    cy.get('dd#manufacturer').should('contain', 'Test');
    cy.get('dd#production_date').should('contain', '2022-03-09');
    cy.get('dd#installation_date').should('contain', '2022-03-09');
  })

  it('should display the available/other plans', () => {
    cy.wait(['@getUnit'])

    cy.get('td#start-date-1').should('contain', '-');
    cy.get('td#end-date-1').should('contain', '-');
    cy.get('input#is-repeating-1').should('be.checked');

    cy.get('td#start-date-2').should('contain', '1970-01-01');
    cy.get('td#end-date-2').should('contain', '2050-01-01');
    cy.get('input#is-repeating-2').should('be.checked');
  })

  it('should nagivate to service-visits page for available plans', () => {
    cy.wait(['@getUnit'])

    cy.get('button#2').click();
    cy.url().should('include', '/service-visits/2');
    cy.wait(['@getPlan', '@getProfile', '@getNumericTask', '@getSelectionTask', '@getTextTask'])
  })

  it('should nagivate to service-visits page for other plans', () => {
    cy.wait(['@getUnit'])

    cy.get('button#1').click();
    cy.url().should('include', '/service-visits/1');
    cy.wait(['@getPlan', '@getProfile', '@getNumericTask', '@getSelectionTask', '@getTextTask'])
  })

  it('should navigate to unit records page when click the amintenance data button', () => {
    cy.wait(['@getUnit'])

    cy.intercept('GET', '**/api/units/*/records/', { fixture: 'record.json' }).as('getRecord');
    cy.get('#data').click();
    cy.wait('@getRecord')
    cy.url().should('include', '/units/records/1');
  })
})

describe('Permission/Not logged in error', () => {
  it('should display error', () => {
    cy.intercept('GET', '**/api/units/*', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('getUnitError');
    cy.visit('http://localhost:3000/service-plans/1');
    cy.wait('@getUnitError');
    cy.get('#message').should('contain', 'Error message');
  })
})