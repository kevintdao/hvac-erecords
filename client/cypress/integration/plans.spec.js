describe('Plan table', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/units', { fixture: 'all_units.json' }).as('getAllUnits');
    cy.intercept('GET', '**/api/units/*', { fixture: 'unit.json' }).as('getUnit');
    cy.intercept('GET', '**/api/profiles', { fixture: 'all_profiles.json' }).as('getAllProfiles');
    cy.intercept('GET', '**/api/profiles/*', { fixture: 'profile.json' }).as('getProfile');

    cy.visit('http://localhost:3000/units/1');
  })

  it('should display the all assigned plan of the unit', () => {
    cy.wait(['@getUnit', '@getAllProfiles', '@getProfile'])

    cy.get('td#unit-1').should('contain', '1');
    cy.get('td#title-1').should('contain', 'Profile 1');
    cy.get('td#start-date-1').should('contain', '1970-01-01');
    cy.get('td#end-date-1').should('contain', '1970-01-01');
  })
})

describe('Adding plan', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/units', { fixture: 'all_units.json' }).as('getAllUnits');
    cy.intercept('GET', '**/api/units/*', { fixture: 'unit.json' }).as('getUnit');
    cy.intercept('GET', '**/api/profiles', { fixture: 'all_profiles.json' }).as('getAllProfiles');
    cy.intercept('GET', '**/api/profiles/*', { fixture: 'profile.json' }).as('getProfile');
    cy.intercept('POST', '**/api/plans', { fixture: 'plan.json' }).as('createPlan');

    cy.visit('http://localhost:3000/units/1');
  })

  it('should show the date range when "Is Planned" checkbox is checked', () => {
    cy.get('input#is-planned').check();

    cy.get('input#start-date').should('be.visible');
    cy.get('input#end-date').should('be.visible');
  })

  it('should diplay red border around invalid inputs', () => {
    cy.get('input#is-planned').check();

    cy.get('input#start-date').should('be.visible');
    cy.get('input#end-date').should('be.visible');

    cy.get('button#assign-button').click();

    cy.get('input#start-date').should('have.class', 'border-red-400');
    cy.get('input#start-date').should('have.class', 'border-red-400');
  })

  it('should display successful message when unit is created', () => {
    cy.get('button#assign-button').click();
    cy.wait('@createPlan');

    cy.get('#alert-title').should('contain', 'Successful');
  })

  it('should display error message when there is an error', () => {
    cy.intercept('POST', '**/api/plans', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('createPlanError');

    cy.get('button#assign-button').click();
    cy.wait('@createPlanError');

    cy.get('#alert-title').should('contain', 'Error');
  })
})

describe('Updating plan', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/plans/*', { fixture: 'plan.json' }).as('getPlan');
    cy.intercept('PUT', '**/api/plans/*', { fixture: 'updated_plan.json' }).as('updatePlan');
    cy.intercept('GET', '**/api/units', { fixture: 'all_units.json' }).as('getAllUnits');
    cy.intercept('GET', '**/api/units/*', { fixture: 'unit.json' }).as('getUnit');
    cy.intercept('GET', '**/api/profiles', { fixture: 'all_profiles.json' }).as('getAllProfiles');
    cy.intercept('GET', '**/api/profiles/*', { fixture: 'profile.json' }).as('getProfile');
    cy.visit('http://localhost:3000/plans/edit/1');
  })

  it('should pre-filled the inputs with the current information', () => {
    cy.wait(['@getPlan', '@getAllProfiles']);
    cy.get('input#is-planned').should('not.be.checked',);
    cy.get('input#is-repeating').should('be.checked',);
  })

  it('should display successful message when unit is created', () => {
    cy.get('button#assign-button').click();
    cy.wait('@updatePlan');

    cy.get('#alert-title').should('contain', 'Successful');
  })

  it('should display error message when there is an error', () => {
    cy.intercept('PUT', '**/api/plans/1', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('updatePlanError');

    cy.get('button#assign-button').click();
    cy.wait('@updatePlanError');

    cy.get('#alert-title').should('contain', 'Error');
  })
})