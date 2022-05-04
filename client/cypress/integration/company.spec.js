describe('Company Users index page', () => {
    after(() => {
        cy.logout();
    })

    beforeEach(() => {
        cy.login('company');
        cy.intercept('GET', '**/api/company-users', { fixture: 'all_company_users.json' }).as('getAllCompanyUsers');
        cy.intercept('GET', '**/api/company-users/*', { fixture: 'company_user.json' }).as('getCompanyUser');
        cy.visit('http://localhost:3000/company-users');
    })
  
    it('should see all company users when on the index page', () => {
        cy.wait('@getAllCompanyUsers');
        cy.get('td#name-1').should('contain', 'Iowa');
        cy.get('td#phone_number-1').should('contain', '+15232432342');
    })
  
    it('should navigate to company user info page when click on more info button', () => {
        cy.wait('@getAllCompanyUsers');
        cy.get('a[href="/company-users/1"]').click();
        cy.url().should('include', '/company-users/1');
    })
  
    it('should navigate to new company user page when click on new company user button', () => {
        cy.wait('@getAllCompanyUsers');
        cy.get('a[href="/company-users/create"]').click();
        cy.url().should('include', '/company-users/create');
    })
  
    it('should navigate to edit company user page when click on edit button', () => {
        cy.wait('@getAllCompanyUsers');
        cy.get('a[href="/company-users/edit/1"]').click();
        cy.url().should('include', '/company-users/edit/1');
    })
}) 
  
describe('Company User details page', () => {
    after(() => {
        cy.logout();
    })

    beforeEach(() => {
        cy.login('company');
        cy.intercept('GET', '**/api/company-users', { fixture: 'all_company_users.json' }).as('getAllCompanyUsers');
        cy.intercept('GET', '**/api/company-users/*', { fixture: 'company_user.json' }).as('getCompanyUser');
        cy.visit('http://localhost:3000/company-users/1');
        cy.wait('@getCompanyUser');
    })
  
    it('should display the company user details', () => {
        cy.get('dd#name').should('contain', 'Iowa');
        cy.get('dd#phone_number').should('contain', '+12523543230');
    })
  
    it('should navigate to edit company user page when click on edit button', () => {
        cy.get('a#edit').click();
        cy.url().should('include', '/company-users/edit/1');
    })
  
    it('should navigate to all company users page when click on all company users button', () => {
        cy.get('a#all-company-users').click();
        cy.wait('@getAllCompanyUsers');
        cy.url().should('include', '/company-users');
    })
})
  
describe('Company User create page', () => {
    after(() => {
        cy.logout();
    })

    beforeEach(() => {
        cy.login('company');
        cy.intercept('GET', '**/api/company-users', { fixture: 'all_company_users.json' }).as('getAllCompanyUsers');
        cy.intercept('GET', '**/api/company-users/*', { fixture: 'company_user.json' }).as('getCompanyUser');
        cy.intercept('POST', '**/api/company-users', { fixture: 'company_user.json' }).as('createCompanyUser');
        cy.visit('http://localhost:3000/company-users/create');

        cy.get('input#name').type("Test");
        cy.get('input#phone_number').type("(223) 321 1231");
        cy.get('input#email').type("Test@test.com");
    })
  
    it('should diplay red border around invalid inputs', () => {
        cy.get('input#name').clear();
        cy.get('input#phone_number').clear();
        cy.get('input#email').clear();

        cy.get('button#create-button').click();

        cy.get('input#name').should('have.class', 'border-red-400');
        cy.get('input#phone_number').should('have.class', 'border-red-400');
        cy.get('input#email').should('have.class', 'border-red-400');
    })

    it('should display successful message when company user is created', () => {
        cy.get('button#create-button').click();
        cy.wait('@createCompanyUser');

        cy.get('#alert-title').should('contain', 'Successful');
    })

    it('should display error message when there is an error', () => {
        cy.intercept('POST', '**/api/company-users', { statusCode: 404 }).as('createCompanyUserError');

        cy.get('button#create-button').click();
        cy.wait('@createCompanyUserError');

        cy.get('#alert-title').should('contain', 'Error');
    })
})

describe('Company User edit page', () => {
    after(() => {
        cy.logout();
    })

    beforeEach(() => {
        cy.login('company');
        cy.intercept('GET', '**/api/company-users/*', { fixture: 'company_user.json' }).as('getCompanyUser');
        cy.intercept('PUT', '**/api/company-users/*', { fixture: 'updated_company_user.json' }).as('updateCompanyUser');
        cy.visit('http://localhost:3000/company-users/edit/1');
        cy.wait('@getCompanyUser');
    })
  
    it('should pre-filled the inputs with the current information', () => {
        cy.get('input#name').should('have.value', 'Iowa');
        cy.get('input#phone_number').should('have.value', '(252) 354-3230');
        cy.get('input#email').should('have.value', 'uiowa@test.com');
    })
  
    it('should display successful message when company user is updated', () => {
        cy.get('input#name').clear().type("University of Ohio");
        cy.get('input#phone_number').clear().type("(752) 354-3230");
        cy.get('input#email').clear().type("ohio@testemail.edu");
        
        cy.get('button#create-button').click();
        cy.wait('@updateCompanyUser');

        cy.get('#alert-title').should('contain', 'Successful');
    })
  
    it('should display error message when there is an error', () => {
        cy.intercept('PUT', '**/api/company-users/1', { 
        statusCode: 404,
        body: {
            email: "Error message"
        }
        }).as('updateCompanyUserError');

        cy.get('button#create-button').click();
        cy.wait('@updateCompanyUserError');

        cy.get('#alert-title').should('contain', 'Error');
    })
})

describe('Permission/Not logged in error', () => {
    it('should display error on index page', () => {
        cy.intercept('GET', '**/api/company-users', { 
            statusCode: 404,
            body: {
            email: "Error message"
            }
    }).as('getAllCompanyUsersError');
        cy.visit('http://localhost:3000/company-users');
        cy.wait('@getAllCompanyUsersError');
        cy.get('#message').should('contain', 'Error message');
    })

    it('should display error on details page', () => {
        cy.intercept('GET', '**/api/company-users/*', { 
            statusCode: 404,
            body: {
            detail: "Error message"
            }
    }).as('getCompanyUserError');
        cy.visit('http://localhost:3000/company-users/1');
        cy.wait('@getCompanyUserError');
        cy.get('#message').should('contain', 'Error message');
    })

    it('should display error on edit page', () => {
        cy.intercept('GET', '**/api/company-users/*', { 
            statusCode: 404,
            body: {
            detail: "Error message"
            }
    }).as('getCompanyUserError');
        cy.visit('http://localhost:3000/company-users/edit/1');
        cy.wait('@getCompanyUserError');
        cy.get('#message').should('contain', 'Error message');
    })
})
