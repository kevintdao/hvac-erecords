describe('Password Set Page' , () => {
    
    beforeEach(() => {
        cy.login('company');
        cy.visit('http://localhost:3000/password-set/Mjd/b52v3v-061466a133652000b0b09055871ec51d'); 
    })

    it('should diplay red border around invalid inputs', () => {
        cy.get('input#password').clear();
        cy.get('input#confirm_password').clear();

        cy.get("input#password").click();

        cy.get('input#password').should('have.class', 'border-red-400');
        cy.get('input#confirm_password').should('have.class', 'border-red-400');
    })

    it('should display successful message when password is set', () => {
        cy.get('input#password').type("password");
        cy.get('input#confirm_password').type("password");

        cy.get('input#password-button').click();
        cy.get('#alert-title').should('contain', 'Successful');
      })


})