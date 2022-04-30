describe('Private routes', () => {
  it('should redirect to login page when not logged in', () => {
    cy.visit('http://localhost:3000/dashboard');
    
    cy.get('#message').should('contain', 'You must be logged in to access this page');
  })

  it('should display message when user doesnt have permission to access the page', () => {
    cy.intercept('GET', '**/api/tasks', { fixture: 'all_tasks.json' }).as('getAllTasks');
    cy.intercept('GET', '**/api/tasks/*', { fixture: 'task_numeric.json' }).as('getTasks');
    cy.login('manager');
    cy.visit('http://localhost:3000/tasks');

    cy.get('#message').should('contain', "You don't have access to this page");
  })
})