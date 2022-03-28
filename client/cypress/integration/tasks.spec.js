describe('Task create page', () => {
    beforeEach(() => {
      //cy.intercept('GET', '**/api/tasks', { fixture: 'all_units.json' }).as('getAllUnits');
      //cy.intercept('GET', '**/api/tasks/*', { fixture: 'unit.json' }).as('getUnit');
      cy.intercept('POST', '**/api/tasks', { fixture: 'task.json' }).as('createTask');
      cy.visit('http://localhost:3000/tasks/create');
  
      cy.get('input#title').type("Task title");
      cy.get('textarea#description').type("Task description");
      cy.get('select#type').select("Numeric");
      cy.get('input#min').type("1");
      cy.get('input#max').type("10");
    })
  
    it('should diplay red border around invalid inputs', () => {
      cy.get('input#title').clear();
      cy.get('textarea#description').clear();
      cy.get('select#type').select("Numeric");
      cy.get('input#min').clear();
      cy.get('input#max').clear();
  
      cy.get('button#create-button').click();
  
      cy.get('input#title').should('have.class', 'border-red-400');
      cy.get('textarea#description').should('have.class', 'border-red-400');
      cy.get('input#min').should('have.class', 'border-red-400');
      cy.get('input#max').should('have.class', 'border-red-400');
    })
  
    it('should display successful message when task is created', () => {
      cy.get('button#create-button').click();
      cy.wait('@createTask');
  
      cy.get('#alert-title').should('contain', 'Successful');
    })
  
    it('should display error message when there is an error', () => {
      cy.intercept('POST', '**/api/tasks', { statusCode: 404 }).as('createTaskError');
  
      cy.get('button#create-button').click();
      cy.wait('@createTaskError');
  
      cy.get('#alert-title').should('contain', 'Error');
    })
  })