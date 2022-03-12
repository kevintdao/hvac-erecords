describe('Unit index page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/units', { fixture: 'all_units.json' }).as('getAllUnits');
    cy.intercept('GET', '**/api/units/*', { fixture: 'unit.json' }).as('getUnit');
    cy.visit('http://localhost:3000/units');
  })
  
  it('should display a message when there is no unit', () => {
    cy.intercept('GET', '**/api/units', []).as('getAllUnits');
    cy.wait('@getAllUnits');
    cy.get('p').should('contain', 'No existing units');
  })

  it('should see all units when on the index page', () => {
    cy.wait('@getAllUnits');
    cy.get('td#ex-id-1').should('contain', '123456');
    cy.get('td#model-1').should('contain', 'model 1');
    cy.get('td#serial-1').should('contain', 'serial 1');
    cy.get('td#category-1').should('contain', 'Heating and cooling split system');
    cy.get('td#manufacturer-1').should('contain', 'manu 1');
  })
}) 