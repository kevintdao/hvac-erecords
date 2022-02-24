describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('should output a message when the email is empty', () => {
    cy.get('button#login-button').click();
    cy.get('span#email-help').should('have.text' ,"Cannot be empty!");
  })

  it('should output a message when the password is empty', () => {
    cy.get('button#login-button').click();
    cy.get('span#pass-help').should('have.text', "Cannot be empty!");
  })

  it('should remove the message when the fields are filled out', () => {
    cy.get('button#login-button').click();
    cy.get('span#email-help').should('have.text', "Cannot be empty!");
    cy.get('span#pass-help').should('have.text', "Cannot be empty!");

    cy.get('input#email').type('test@test.com');
    cy.get('span#email-help').should("not.have.text");

    cy.get('input#password').type('123456');
    cy.get('span#pass-help').should("not.have.text");
  })
})