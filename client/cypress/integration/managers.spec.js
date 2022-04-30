describe('Manager index page', () => {
    after(() => {
      cy.logout();
    })

    beforeEach(() => {
      cy.login('company');
      cy.intercept('GET', '**/api/managers', { fixture: 'all_managers.json' }).as('getAllManagers');
      cy.intercept('GET', '**/api/managers/*', { fixture: 'manager.json' }).as('getManager');
      cy.visit('http://localhost:3000/managers');
    })
  
    it('should see all managers when on the index page', () => {
      cy.wait('@getAllManagers');
      cy.get('td#name-1').should('contain', 'Scott Community College');
      cy.get('td#phone_number-1').should('contain', '+15232432342');
    })
  
    it('should navigate to manager info page when click on more info button', () => {
      cy.wait('@getAllManagers');
      cy.get('a[href="/managers/1"]').click();
      cy.url().should('include', '/managers/1');
    })
  
    it('should navigate to new manager page when click on new manager button', () => {
      cy.wait('@getAllManagers');
      cy.get('a[href="/managers/create"]').click();
      cy.url().should('include', '/managers/create');
    })
  
    it('should navigate to edit manager page when click on edit button', () => {
      cy.wait('@getAllManagers');
      cy.get('a[href="/managers/edit/1"]').click();
      cy.url().should('include', '/managers/edit/1');
    })
  }) 
  
  describe('Manager details page', () => {
      after(() => {
        cy.logout();
      })

      beforeEach(() => {
      cy.login('company');
      cy.intercept('GET', '**/api/managers', { fixture: 'all_managers.json' }).as('getAllManagers');
      cy.intercept('GET', '**/api/managers/*', { fixture: 'manager.json' }).as('getManager');
      cy.visit('http://localhost:3000/managers/1');
      cy.wait('@getManager');
    })
  
    it('should display the manager details', () => {
      cy.get('dd#name').should('contain', 'University of Iowa');
      cy.get('dd#phone_number').should('contain', '+12523543230');
    })
  
    it('should navigate to edit manager page when click on edit button', () => {
      cy.get('a#edit').click();
      cy.url().should('include', '/managers/edit/1');
    })
  
    it('should navigate to all managers page when click on all managers button', () => {
      cy.get('a#all-managers').click();
      cy.wait('@getAllManagers');
      cy.url().should('include', '/managers');
    })
  })
  
  describe('Manager create page', () => {
    after(() => {
      cy.logout();
    })

    beforeEach(() => {
      cy.login('company');
      cy.intercept('GET', '**/api/managers', { fixture: 'all_managers.json' }).as('getAllManagers');
      cy.intercept('GET', '**/api/managers/*', { fixture: 'manager.json' }).as('getManager');
      cy.intercept('POST', '**/api/managers', { fixture: 'manager.json' }).as('createManager');
      cy.visit('http://localhost:3000/managers/create');
  
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
  
    it('should display successful message when manager is created', () => {
      cy.get('button#create-button').click();
      cy.wait('@createManager');
  
      cy.get('#alert-title').should('contain', 'Successful');
    })
  
    it('should display error message when there is an error', () => {
      cy.intercept('POST', '**/api/managers', { statusCode: 404 }).as('createManagerError');
  
      cy.get('button#create-button').click();
      cy.wait('@createManagerError');
  
      cy.get('#alert-title').should('contain', 'Error');
    })
  })
  
  describe('Manager edit page', () => {
    after(() => {
      cy.logout();
    })

    beforeEach(() => {
      cy.login('company');
      cy.intercept('GET', '**/api/managers/*', { fixture: 'manager.json' }).as('getManager');
      cy.intercept('PUT', '**/api/managers/*', { fixture: 'updated_manager.json' }).as('updateManager');
      cy.visit('http://localhost:3000/managers/edit/1');
      cy.wait('@getManager');
    })
  
    it('should pre-filled the inputs with the current information', () => {
      cy.get('input#name').should('have.value', 'University of Iowa');
      cy.get('input#phone_number').should('have.value', '(252) 354-3230');
      cy.get('input#email').should('have.value', 'uiowa@test.com');
    })
  
    it('should display successful message when manager is updated', () => {
      cy.get('input#name').clear().type("University of Ohio");
      cy.get('input#phone_number').clear().type("(752) 354-3230");
      cy.get('input#email').clear().type("ohio@testemail.edu");
      
      cy.get('button#create-button').click();
      cy.wait('@updateManager');
  
      cy.get('#alert-title').should('contain', 'Successful');
    })
  
    it('should display error message when there is an error', () => {
      cy.intercept('PUT', '**/api/managers/1', { 
        statusCode: 404,
        body: {
          email: "Error message"
        }
      }).as('updateManagerError');
  
      cy.get('button#create-button').click();
      cy.wait('@updateManagerError');
  
      cy.get('#alert-title').should('contain', 'Error');
    })
  })

describe('Permission/Not logged in error', () => {
  it('should display error on index page', () => {
    cy.intercept('GET', '**/api/managers', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('getAllManagersError');
    cy.visit('http://localhost:3000/managers');
    cy.wait('@getAllManagersError');
    cy.get('#message').should('contain', 'Error message');
  })

  it('should display error on details page', () => {
    cy.intercept('GET', '**/api/managers/*', { 
      statusCode: 404,
      body: {
        detail: "Error message"
      }
    }).as('getManagerError');
    cy.visit('http://localhost:3000/managers/1');
    cy.wait('@getManagerError');
    cy.get('#message').should('contain', 'Error message');
  })

  it('should display error on edit page', () => {
    cy.intercept('GET', '**/api/managers/*', { 
      statusCode: 404,
      body: {
        detail: "Error message"
      }
    }).as('getManagerError');
    cy.visit('http://localhost:3000/managers/edit/1');
    cy.wait('@getManagerError');
    cy.get('#message').should('contain', 'Error message');
  })
})
  