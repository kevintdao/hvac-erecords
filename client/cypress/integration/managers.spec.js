describe('Manager index page', () => {
    beforeEach(() => {
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
    beforeEach(() => {
      cy.intercept('GET', '**/api/managers', { fixture: 'all_managers.json' }).as('getAllManagers');
      cy.intercept('GET', '**/api/managers/*', { fixture: 'manager.json' }).as('getManager');
      cy.visit('http://localhost:3000/managers/1');
      cy.wait('@getManager');
    })
  
    it('should display the manager details', () => {
      cy.get('dd#name').should('contain', 'University of Iowa');
      cy.get('dd#phone_number').should('contain', '+11523543230');
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
    beforeEach(() => {
      cy.intercept('GET', '**/api/managers', { fixture: 'all_managers.json' }).as('getAllManagers');
      cy.intercept('GET', '**/api/managers/*', { fixture: 'manager.json' }).as('getManager');
      cy.intercept('POST', '**/api/managers', { fixture: 'manager.json' }).as('createManager');
      cy.visit('http://localhost:3000/managers/create');
  
      cy.get('input#name').type("Test");
      cy.get('input#phone').type("(223) 321 1231");
    })
  
    it('should diplay red border around invalid inputs', () => {
      cy.get('input#name').clear();
      cy.get('input#phone').clear();
  
      cy.get('button#create-button').click();
  
      cy.get('input#name').should('have.class', 'border-red-400');
      cy.get('input#phone').should('have.class', 'border-red-400');
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
    beforeEach(() => {
      cy.intercept('GET', '**/api/managers/*', { fixture: 'manager.json' }).as('getManager');
      cy.intercept('PUT', '**/api/managers/*', { fixture: 'updated_manager.json' }).as('updateManager');
      cy.visit('http://localhost:3000/managers/edit/1');
      cy.wait('@getManager');
    })
  
    it('should pre-filled the inputs with the current information', () => {
      cy.get('input#name').should('have.value', 'University of Iowa');
      cy.get('input#phone').should('have.value', '1 (152) 354-3230');
    })
  
    it('should display successful message when manager is updated', () => {
      cy.get('input#name').clear().type("University of Ohio");
      cy.get('input#phone').clear().type("115235432301");
  
      cy.get('button#create-button').click();
      cy.wait('@updateManager');
  
      cy.get('#alert-title').should('contain', 'Successful');
    })
  
    it('should display error message when there is an error', () => {
      cy.intercept('PUT', '**/api/managers/1', { statusCode: 404 }).as('updateManagerError');
  
      cy.get('button#create-button').click();
      cy.wait('@updateManagerError');
  
      cy.get('#alert-title').should('contain', 'Error');
    })
  })