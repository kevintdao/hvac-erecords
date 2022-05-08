describe('Help page', () => {
  it('should display not logged in help page', () => {
    cy.visit('http://localhost:3000/help');
  })

  it('should display company help page', () => {
    cy.login('company');
    cy.visit('http://localhost:3000/help');
    cy.logout();
  })

  it('should display technician help page', () => {
    cy.login('technician');
    cy.visit('http://localhost:3000/help');
    cy.logout();
  })

  it('should display building manager help page', () => {
    cy.login('manager');
    cy.visit('http://localhost:3000/help');
    cy.logout();
  })
})