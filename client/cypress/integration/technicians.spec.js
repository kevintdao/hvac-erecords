describe('Technician index page', () => {
    after(() => {
      cy.logout();
    })

    beforeEach(() => {
      cy.login('company');
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
    after(() => {
      cy.logout();
    })

    beforeEach(() => {
      cy.login('company');
      cy.intercept('GET', '**/api/technicians', { fixture: 'all_technicians.json' }).as('getAllTechnicians');
      cy.intercept('GET', '**/api/technicians/*', { fixture: 'technician.json' }).as('getTechnician');
      cy.visit('http://localhost:3000/technicians/1');
      cy.wait('@getTechnician');
    })
  
    it('should display the technician details', () => {
      cy.get('dd#first_name').should('contain', 'Andrew');
      cy.get('dd#phone_number').should('contain', '+13193844357');
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
      after(() => {
        cy.logout();
      })

      beforeEach(() => {
        cy.login('company');
        cy.intercept('GET', '**/api/technicians', { fixture: 'all_technicians.json' }).as('getAllTechnicians');
        cy.intercept('GET', '**/api/technicians/*', { fixture: 'technician.json' }).as('getTechnician');
        cy.intercept('POST', '**/api/technicians', { fixture: 'technician.json' }).as('createTechnician');
        cy.visit('http://localhost:3000/technicians/create');

        cy.get('input#first_name').type("Ryan");
        cy.get('input#last_name').type("Jones");
        cy.get('input#phone_number').type("(319) 356-0001");
        cy.get('input#license_number').type("3");
        cy.get('input#email').type("ry-jones@test.com");
    })

    it('should diplay red border around invalid inputs', () => {
        cy.get('input#first_name').clear();
        cy.get('input#last_name').clear();
        cy.get('input#phone_number').clear();
        cy.get('input#license_number').clear();
        cy.get('input#email').clear();

        cy.get('button#create-button').click();

        cy.get('input#first_name').should('have.class', 'border-red-400');
        cy.get('input#last_name').should('have.class', 'border-red-400');
        cy.get('input#phone_number').should('have.class', 'border-red-400');
        cy.get('input#license_number').should('have.class', 'border-red-400');
        cy.get('input#email').should('have.class', 'border-red-400');
    })

    it('should display successful message when technician is created', () => {
        cy.get('button#create-button').click();
        cy.wait('@createTechnician');

        cy.get('#alert-title').should('contain', 'Successful');
    })

    it('should display error message when there is an error', () => {
        cy.intercept('POST', '**/api/technicians', { 
          statusCode: 404,
          body: {
            email: "Error message"
          }
        }).as('createTechnicianError');

        cy.get('button#create-button').click();
        cy.wait('@createTechnicianError');

        cy.get('#alert-title').should('contain', 'Error');
    })
})

describe('Technician edit page', () => {
      after(() => {
        cy.logout();
      })

      beforeEach(() => {
        cy.login('company');
        cy.intercept('GET', '**/api/technicians/*', { fixture: 'technician.json' }).as('getTechnician');
        cy.intercept('PUT', '**/api/technicians/*', { fixture: 'updated_technician.json' }).as('updateTechnician');
        cy.visit('http://localhost:3000/technicians/edit/1');
        cy.wait('@getTechnician');
    })
  
    it('should pre-filled the inputs with the current information', () => {
        cy.get('input#first_name').should('have.value', 'Andrew');
        cy.get('input#last_name').should('have.value', 'Murley');
        cy.get('input#phone_number').should('have.value', '(319) 384-4357');
        cy.get('input#license_number').should('have.value', '4');
    })
  
    it('should display successful message when technician is updated', () => {
        cy.get('input#first_name').clear().type("Ryan");
        cy.get('input#last_name').clear().type("Murley");
        cy.get('input#phone_number').clear().type("(319) 356-0001");
        cy.get('input#license_number').clear().type("4");
        cy.get('button#create-button').click();
        cy.wait('@updateTechnician');
    
        cy.get('#alert-title').should('contain', 'Successful');
    })
  
    it('should display error message when there is an error', () => {
        cy.intercept('PUT', '**/api/technicians/1', { 
          statusCode: 404,
          body: {
            email: "Error message"
          }
        }).as('updateTechnicianError');
    
        cy.get('button#create-button').click();
        cy.wait('@updateTechnicianError');
    
        cy.get('#alert-title').should('contain', 'Error');
    })
})

describe('Permission/Not logged in error', () => {
  it('should display error on index page', () => {
    cy.intercept('GET', '**/api/technicians', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('getAllTechniciansError');
    cy.visit('http://localhost:3000/technicians');
    cy.wait('@getAllTechniciansError');
    cy.get('#message').should('contain', 'Error message');
  })

  it('should display error on details page', () => {
    cy.intercept('GET', '**/api/technicians/*', { 
      statusCode: 404,
      body: {
        detail: "Error message"
      }
    }).as('getTechnicianError');
    cy.visit('http://localhost:3000/technicians/1');
    cy.wait('@getTechnicianError');
    cy.get('#message').should('contain', 'Error message');
  })

  it('should display error on edit page', () => {
    cy.intercept('GET', '**/api/technicians/*', { 
      statusCode: 404,
      body: {
        detail: "Error message"
      }
    }).as('getTechnicianError');
    cy.visit('http://localhost:3000/technicians/edit/1');
    cy.wait('@getTechnicianError');
    cy.get('#message').should('contain', 'Error message');
  })
})
  