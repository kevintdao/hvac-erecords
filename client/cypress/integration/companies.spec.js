describe('Company index page', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/companies', { fixture: 'all_companies.json' }).as('getAllCompanies');
      cy.intercept('GET', '**/api/companies/*', { fixture: 'company.json' }).as('getCompany');
      cy.visit('http://localhost:3000/companies');
    })

    it('should see all companies when on the index page', () => {
      cy.wait('@getAllCompanies');
      cy.get('td#name-1').should('contain', "University of Iowa");
      cy.get('td#city-1').should('contain', "Iowa City");
      cy.get('td#zip_code-1').should('contain', "52240");
    })

    it('should navigate to company info page when click on more info button', () => {
      cy.wait('@getAllCompanies');
      cy.get('a[href="/companies/1"]').click();
      cy.url().should('include', '/companies/1');
    })

    it('should navigate to new company page when click on new company button', () => {
      cy.wait('@getAllCompanies');
      cy.get('a[href="/companies/create"]').click();
      cy.url().should('include', '/companies/create');
    })

    it('should navigate to edit company page when click on edit button', () => {
      cy.wait('@getAllCompanies');
      cy.get('a[href="/companies/edit/1"]').click();
      cy.url().should('include', '/companies/edit/1');
    })
})

describe('Company details page', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/api/companies', { fixture: 'all_companies.json' }).as('getAllCompanies');
        cy.intercept('GET', '**/api/companies/*', { fixture: 'company.json' }).as('getCompany');
        cy.visit('http://localhost:3000/companies/1');
        cy.wait('@getCompany');
    })

    it('should display the company details', () => {
        cy.get('td#name').should('contain', "University of Iowa");
        cy.get('td#street').should('contain', "123 Street");
        cy.get('td#city').should('contain', "Iowa City");
        cy.get('td#zip_code').should('contain', "52240");
        cy.get('td#country').should('contain', "United States");
        cy.get('td#phone_number').should('contain', "100-100-1000");
    })

    it('should navigate to edit company page when click on edit button', () => {
        cy.get('a#edit').click();
        cy.url().should('include', '/companies/edit/1');
    })

    it('should navigate to all companies page when click on all companies button', () => {
        cy.get('a#all-companies').click();
        cy.wait('@getAllCompanies');
        cy.url().should('include', '/companies');
    })
})

describe('Company create page', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/api/companies', { fixture: 'all_companies.json' }).as('getAllCompanies');
        cy.intercept('GET', '**/api/companies/*', { fixture: 'company.json' }).as('getCompany');
        cy.intercept('POST', '**/api/companies', { fixture: 'company.json' }).as('createCompany');
        cy.visit('http://localhost:3000/companies/create');
    
        cy.get('input#name').type("University of Iowa");
        cy.get('input#street').type("123 Street");
        cy.get('input#city').type("Iowa City");
        cy.get('input#zip_code').type("52240");
        cy.get('input#country').type("United States");
        cy.get('input#phone_number').type("100-100-1000");
    })
  
    it('should diplay red border around invalid inputs', () => {
        cy.get('input#name').clear();
        cy.get('input#street').clear();
        cy.get('input#city').clear();
        cy.get('input#zip_code').clear();
        cy.get('input#country').clear();
        cy.get('input#phone_number').clear();
    
        cy.get('button#create-button').click();
    
        cy.get('input#name').should('have.class', 'border-red-400');
        cy.get('input#street').should('have.class', 'border-red-400');
        cy.get('input#city').should('have.class', 'border-red-400');
        cy.get('input#zip_code').should('have.class', 'border-red-400');
        cy.get('input#country').should('have.class', 'border-red-400');
        cy.get('input#phone_number').should('have.class', 'border-red-400');
    })
  
    it('should display successful message when company is created', () => {
        cy.get('button#create-button').click();
        cy.wait('@createCompany');
    
        cy.get('#alert-title').should('contain', 'Successful');
    })
  
    it('should display error message when there is an error', () => {
        cy.intercept('POST', '**/api/companies', { statusCode: 404 }).as('createCompanyError');
    
        cy.get('button#create-button').click();
        cy.wait('@createCompanyError');
    
        cy.get('#alert-title').should('contain', 'Error');
    })
})

describe('Company edit page', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/api/companies/*', { fixture: 'company.json' }).as('getCompany');
        cy.intercept('PUT', '**/api/companies/*', { fixture: 'updated_company.json' }).as('updateCompany');
        cy.visit('http://localhost:3000/companies/edit/1');
        cy.wait('@getCompany');
    })
    it('should pre-filled the inputs with the current information', () => {
        cy.get('input#name').should('have.value', "University of Iowa");
        cy.get('input#street').should('have.value', "123 Street");
        cy.get('input#city').should('have.value', "Iowa City");
        cy.get('input#zip_code').should('have.value', "52240");
        cy.get('input#country').should('have.value', "United States");
        cy.get('input#phone_number').should('have.value', "100-100-1000");
    })

    it('should display successful message when company is updated', () => {
        cy.get('input#name').clear().type("University of Iowa");
        cy.get('input#street').clear().type("456 Road");
        cy.get('input#city').clear().type("Iowa City");
        cy.get('input#zip_code').clear().type("52245");
        cy.get('input#country').clear().type("United States");
        cy.get('input#phone_number').clear().type("100-100-1000");

        cy.get('button#create-button').click();
        cy.wait('@updateCompany');

        cy.get('#alert-title').should('contain', 'Successful');
    })

    it('should display error message when there is an error', () => {
        cy.intercept('PUT', '**/api/companies/1', { statusCode: 404 }).as('updateCompanyError');

        cy.get('button#create-button').click();
        cy.wait('@updateCompanyError');

        cy.get('#alert-title').should('contain', 'Error');
    })
})
