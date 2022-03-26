describe('Technician index page', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/technicians', { fixture: 'all_technicians.json' }).as('getAllTechnicians');
      cy.intercept('GET', '**/api/technicians/*', { fixture: 'technician.json' }).as('getTechnician');
      cy.visit('http://localhost:3000/technicians');
    })
  
    it('should see all technicians when on the index page', () => {
      cy.wait('@getAllTechnicians');
      cy.get('td#first_name-1').should('contain', 'Andrew');
      cy.get('td#last_name-1').should('contain', 'Murley');
    })
  
    it('should navigate to technician info page when click on more info button', () => {
      cy.wait('@getAllTechnicians');
      cy.get('a[href="/technicians/1"]').click();
      cy.url().should('include', '/technicians/1');
    })
  
    it('should navigate to new technician page when click on new technician button', () => {
      cy.wait('@getAllTechnicians');
      cy.get('a[href="/technicians/create"]').click();
      cy.url().should('include', '/technicians/create');
    })
  
    it('should navigate to edit technician page when click on edit button', () => {
      cy.wait('@getAllTechnicians');
      cy.get('a[href="/technicians/edit/1"]').click();
      cy.url().should('include', '/technicians/edit/1');
    })
})

describe('Technician details page', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/technicians', { fixture: 'all_technicians.json' }).as('getAllTechnicians');
      cy.intercept('GET', '**/api/technicians/*', { fixture: 'technician.json' }).as('getTechnician');
      cy.visit('http://localhost:3000/technicians/1');
      cy.wait('@getTechnician');
    })
  
    it('should display the technician details', () => {
      cy.get('dd#first_name').should('contain', 'Andrew');
      cy.get('dd#phone_number').should('contain', '111-111-1111');
    })
  
    it('should navigate to edit technician page when click on edit button', () => {
      cy.get('a#edit').click();
      cy.url().should('include', '/technicians/edit/1');
    })
  
    it('should navigate to all technicians page when click on all technicians button', () => {
      cy.get('a#all-technicians').click();
      cy.wait('@getAllTechnicians');
      cy.url().should('include', '/technicians');
    })
})

describe('Technician create page', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/api/technicians', { fixture: 'all_technicians.json' }).as('getAllTechnicians');
        cy.intercept('GET', '**/api/technicians/*', { fixture: 'technician.json' }).as('getTechnician');
        cy.intercept('POST', '**/api/technicians', { fixture: 'technician.json' }).as('createTechnician');
        cy.visit('http://localhost:3000/technicians/create');

        cy.get('input#user_id').type("3");
        cy.get('input#company_id').type("3");
        cy.get('input#first_name').type("Ryan");
        cy.get('input#last_name').type("Jones");
        cy.get('input#phone_number').type("111-000-0001");
        cy.get('input#license_number').type("3");
    })

    it('should diplay red border around invalid inputs', () => {
        cy.get('input#first_name').clear();
        cy.get('input#phone_number').clear();

        cy.get('button#create-button').click();

        cy.get('input#first_name').should('have.class', 'border-red-400');
        cy.get('input#phone_number').should('have.class', 'border-red-400');
    })

    it('should display successful message when technician is created', () => {
        cy.get('button#create-button').click();
        cy.wait('@createTechnician');

        cy.get('#alert-title').should('contain', 'Successful');
    })

    it('should display error message when there is an error', () => {
        cy.intercept('POST', '**/api/technicians', { statusCode: 404 }).as('createTechnicianError');

        cy.get('button#create-button').click();
        cy.wait('@createTechnicianError');

        cy.get('#alert-title').should('contain', 'Error');
    })
})

describe('Technician edit page', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/technicians/*', { fixture: 'technician.json' }).as('getTechnician');
      cy.intercept('PUT', '**/api/technicians/*', { fixture: 'updated_technician.json' }).as('updateTechnician');
      cy.visit('http://localhost:3000/technicians/edit/1');
      cy.wait('@getTechnician');
    })
  
    it('should pre-filled the inputs with the current information', () => {
      cy.get('input#first_name').should('have.value', 'Andrew');
      cy.get('input#phone_number').should('have.value', '111-111-1111');
    })
  
    it('should display successful message when technician is updated', () => {
      cy.get('input#first_name').clear().type("Ryan");
      cy.get('input#phone_number').clear().type("101-111-1010");
  
      cy.get('button#create-button').click();
      cy.wait('@updateTechnician');
  
      cy.get('#alert-title').should('contain', 'Successful');
    })
  
    it('should display error message when there is an error', () => {
      cy.intercept('PUT', '**/api/technicians/1', { statusCode: 404 }).as('updateTechnicianError');
  
      cy.get('button#create-button').click();
      cy.wait('@updateTechnicianError');
  
      cy.get('#alert-title').should('contain', 'Error');
    })
})
