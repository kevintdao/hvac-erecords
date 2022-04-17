describe('Unit index page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('company');
    cy.intercept('GET', '**/api/units', { fixture: 'all_units.json' }).as('getAllUnits');
    cy.intercept('GET', '**/api/units/*', { fixture: 'unit.json' }).as('getUnit');
    cy.visit('http://localhost:3000/units');
  })

  it('should see all units when on the index page', () => {
    cy.get('td#ex-id-1').should('contain', '123456');
    cy.get('td#model-1').should('contain', 'model 1');
    cy.get('td#serial-1').should('contain', 'serial 1');
    cy.get('td#category-1').should('contain', 'Heating and cooling split system');
    cy.get('td#manufacturer-1').should('contain', 'manu 1');
  })

  it('should navigate to unit info page when click on more info button', () => {
    cy.intercept('GET', '**/api/profiles', { fixture: 'all_profiles.json' }).as('getAllProfiles');
    cy.intercept('GET', '**/api/profiles/*', { fixture: 'profile.json' }).as('getProfile');
    cy.wait('@getAllUnits');
    cy.get('a[href="/units/1"]').click();
    cy.wait(['@getUnit', '@getAllProfiles'])
    cy.url().should('include', '/units/1');
  })

  it('should navigate to new unit page when click on new unit button', () => {
    cy.wait('@getAllUnits');
    cy.get('a[href="/units/create"]').click();
    cy.url().should('include', '/units/create');
  })

  it('should navigate to edit unit page when click on edit button', () => {
    cy.wait('@getAllUnits');
    cy.get('a[href="/units/edit/1"]').click();
    cy.url().should('include', '/units/edit/1');
  })
}) 

describe('Unit details page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('company');
    cy.intercept('GET', '**/api/units', { fixture: 'all_units.json' }).as('getAllUnits');
    cy.intercept('GET', '**/api/units/*', { fixture: 'unit.json' }).as('getUnit');
    cy.intercept('GET', '**/api/profiles', { fixture: 'all_profiles.json' }).as('getAllProfiles');
    cy.intercept('GET', '**/api/profiles/*', { fixture: 'profile.json' }).as('getProfile');

    cy.visit('http://localhost:3000/units/1');
  })

  it('should display the unit details', () => {
    cy.wait(['@getUnit', '@getAllProfiles', '@getProfile'])

    cy.get('dd#external_id').should('contain', '12345');
    cy.get('dd#model_number').should('contain', '12345');
    cy.get('dd#serial_number').should('contain', 'ABC123');
    cy.get('dd#category').should('contain', 'Duct free');
    cy.get('dd#manufacturer').should('contain', 'Test');
    cy.get('dd#production_date').should('contain', '2022-03-09');
    cy.get('dd#installation_date').should('contain', '2022-03-09');
  })

  it('should navigate to edit unit page when click on edit button', () => {
    cy.wait(['@getUnit', '@getAllProfiles', '@getProfile'])
    cy.get('a#edit').click();
    cy.url().should('include', '/units/edit/1');
  })

  it('should navigate to all units page when click on all units button', () => {
    cy.wait(['@getUnit', '@getAllProfiles', '@getProfile'])
    cy.get('a#all-units').click();
    cy.wait('@getAllUnits');
    cy.url().should('include', '/units');
  })

  it('should download the qr code', () => {
    const path = require('path');
    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.wait(['@getUnit', '@getAllProfiles', '@getProfile'])
    cy.get('a#qr-download').click();
    cy.readFile(path.join(downloadsFolder, 'unit-1.png')).should('exist');
  })
})

describe('Unit create page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('company');
    cy.intercept('GET', '**/api/units', { fixture: 'all_units.json' }).as('getAllUnits');
    cy.intercept('GET', '**/api/units/*', { fixture: 'unit.json' }).as('getUnit');
    cy.intercept('POST', '**/api/units', { fixture: 'unit.json' }).as('createUnit');
    cy.visit('http://localhost:3000/units/create');

    cy.get('input#external_id').type("12345");
    cy.get('input#model_number').type("12345");
    cy.get('input#serial_number').type("ABC123");
    cy.get('select#category').select("Duct free");
    cy.get('input#manufacturer').type("Test");
    cy.get('input#production_date').type("2022-03-09");
    cy.get('input#installation_date').type("2022-03-09");
  })

  it('should diplay red border around invalid inputs', () => {
    cy.get('input#model_number').clear();
    cy.get('input#serial_number').clear();
    cy.get('select#category').select("Duct free");
    cy.get('input#manufacturer').clear();
    cy.get('input#production_date').clear();
    cy.get('input#installation_date').clear();

    cy.get('button#create-button').click();

    cy.get('input#model_number').should('have.class', 'border-red-400');
    cy.get('input#serial_number').should('have.class', 'border-red-400');
    cy.get('input#manufacturer').should('have.class', 'border-red-400');
    cy.get('input#production_date').should('have.class', 'border-red-400');
    cy.get('input#installation_date').should('have.class', 'border-red-400');
  })

  it('should display successful message when unit is created', () => {
    cy.get('button#create-button').click();
    cy.wait('@createUnit');

    cy.get('#alert-title').should('contain', 'Successful');
  })

  it('should display error message when there is an error', () => {
    cy.intercept('POST', '**/api/units', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('createUnitError');

    cy.get('button#create-button').click();
    cy.wait('@createUnitError');

    cy.get('#alert-title').should('contain', 'Error');
  })
})

describe('Unit edit page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('company');
    cy.intercept('GET', '**/api/units/*', { fixture: 'unit.json' }).as('getUnit');
    cy.intercept('PUT', '**/api/units/*', { fixture: 'updated_unit.json' }).as('updateUnit');
    cy.visit('http://localhost:3000/units/edit/1');
    cy.wait('@getUnit');
  })

  it('should pre-filled the inputs with the current information', () => {
    cy.get('input#external_id').should('have.value', '12345');
    cy.get('input#model_number').should('have.value', '12345');
    cy.get('input#serial_number').should('have.value', 'ABC123');
    cy.get('select#category').should('have.value', 'Duct free');
    cy.get('input#manufacturer').should('have.value', 'Test');
    cy.get('input#production_date').should('have.value', '2022-03-09');
    cy.get('input#installation_date').should('have.value', '2022-03-09');
  })

  it('should display successful message when unit is updated', () => {
    cy.get('input#external_id').clear().type("asdf");
    cy.get('input#model_number').clear().type("123");
    cy.get('input#serial_number').clear().type("asdf");
    cy.get('select#category').select("Heating and cooling split system");
    cy.get('input#manufacturer').clear().type("manu");
    cy.get('input#production_date').clear().type("2022-03-10");
    cy.get('input#installation_date').clear().type("2022-03-10");

    cy.get('button#create-button').click();
    cy.wait('@updateUnit');

    cy.get('#alert-title').should('contain', 'Successful');
  })

  it('should display error message when there is an error', () => {
    cy.intercept('PUT', '**/api/units/1', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('updateUnitError');

    cy.get('button#create-button').click();
    cy.wait('@updateUnitError');

    cy.get('#alert-title').should('contain', 'Error');
  })
})