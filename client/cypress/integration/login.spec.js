describe('Login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  })

  it('should be at the login page', () => {
    cy.get('h2').should('contain', 'Login');
  })
})