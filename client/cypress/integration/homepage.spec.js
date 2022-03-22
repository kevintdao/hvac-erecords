describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('should be at the register page', () => {
    cy.get('div').should('contain', 'Home');
  })
})