describe('Register page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  })

  it('should be at the register page', () => {
    cy.get('h2').should('contain', 'Register');
  })
})