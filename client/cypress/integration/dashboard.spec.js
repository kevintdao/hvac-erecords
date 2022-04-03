describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/dashboard');
  })

  it('should be at the home page', () => {
    cy.get('h2').should('contain', 'Dashboard');
  })
})