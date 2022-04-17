describe('Maintenance company dashboard', () => {
  before(() => {
    cy.login('company');
  })

  after(() => {
    cy.logout();
  })

  it('should be at the dashboard', () => {
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
  before(() => {
    cy.login('manager');
  })

  after(() => {
    cy.logout();
  })

  it('should be at the dashboard', () => {
    cy.get('h2').should('contain', 'Dashboard');
    cy.get('h3').should('contain', 'Buildings');
    cy.get('h3').should('contain', 'Units');
  })
})