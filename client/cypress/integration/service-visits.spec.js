describe('Service visit page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/units/*', { fixture: 'unit.json' }).as('getUnit');
    cy.intercept('GET', '**/api/plans/*', { fixture: 'plan.json' }).as('getPlan');
    cy.intercept('GET', '**/api/profiles/*', { fixture: 'profile.json' }).as('getProfile');
    cy.intercept('GET', '**/api/tasks/1', { fixture: 'task_numeric.json' }).as('getNumericTask');
    cy.intercept('GET', '**/api/tasks/2', { fixture: 'task_selection.json' }).as('getSelectionTask');
    cy.intercept('GET', '**/api/tasks/3', { fixture: 'task_text.json' }).as('getTextTask');
    cy.visit('http://localhost:3000/service-visits/1');
  })

  it('should display all the tasks for the plan', () => {
    cy.wait(['@getPlan', '@getProfile', '@getNumericTask', '@getSelectionTask', '@getTextTask'])

    cy.get('#task-1').should('be.visible');
    cy.get('#task-2-1').should('be.visible');
    cy.get('#task-2-2').should('be.visible');
    cy.get('#task-3').should('be.visible');
  })

  it('should diplay red border around invalid inputs', () => {
    cy.get('#task-1').clear();
    cy.get('#task-3').clear();

    cy.get('button#submit-button').click();

    cy.get('#task-1').should('have.class', 'border-red-400');
    cy.get('#task-2-1').should('have.class', 'border-red-400');
    cy.get('#task-2-2').should('have.class', 'border-red-400');
    cy.get('#task-3').should('have.class', 'border-red-400');
  })

  it('should display successful message when task is created', () => {
    cy.intercept('POST', '**/api/visits', { 
      body: {
        id: 1
      }
    }).as('createVisit');
    cy.intercept('POST', '**/api/completions', { fixture: 'task_completions.json' }).as('createCompletion');

    cy.window().then(win => win.localStorage.setItem('/service-visits/1', JSON.stringify({ start_time: "2021-01-13T19:57:01.500944804Z" })))

    cy.get('input#task-1').type("1");
    cy.get('input#task-2-1').click();
    cy.get('textarea#task-3').type("good condition");

    cy.get('button#submit-button').click();
    cy.wait(['@createVisit', '@createCompletion'])

    cy.get('#alert-title').should('contain', 'Successful');
  })

  it('should display error message when there is an error', () => {
    cy.intercept('POST', '**/api/visits', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('createVisitError');

    cy.window().then(win => win.localStorage.setItem('/service-visits/1', JSON.stringify({ start_time: "2021-01-13T19:57:01.500944804Z" })))

    cy.get('input#task-1').type("1");
    cy.get('input#task-2-1').click();
    cy.get('textarea#task-3').type("good condition");

    cy.get('button#submit-button').click();
    cy.wait(['@createVisitError'])

    cy.get('#alert-title').should('contain', 'Error');
  })
})