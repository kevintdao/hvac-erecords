describe('Task index page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('company');
    cy.intercept('GET', '**/api/tasks', { fixture: 'all_tasks.json' }).as('getAllTasks');
    cy.intercept('GET', '**/api/tasks/*', { fixture: 'task_numeric.json' }).as('getTasks');
    cy.visit('http://localhost:3000/tasks');
  })

  it('should see all tasks when on the index page', () => {
    cy.wait('@getAllTasks');
    cy.get('td#title-1').should('contain', 'Selection Task');
    cy.get('td#type-1').should('contain', 'Selection');

    cy.get('td#title-2').should('contain', 'Numeric Task');
    cy.get('td#type-2').should('contain', 'Numeric');
  })

  it('should navigate to task info page when click on more info button', () => {
    cy.wait('@getAllTasks');
    cy.get('a[href="/tasks/1"]').click();
    cy.url().should('include', '/tasks/1');
  })

  it('should navigate to new task page when click on new task button', () => {
    cy.wait('@getAllTasks');
    cy.get('a[href="/tasks/create"]').click();
    cy.url().should('include', '/tasks/create');
  })

  it('should navigate to edit task page when click on edit button', () => {
    cy.wait('@getAllTasks');
    cy.get('a[href="/tasks/edit/1"]').click();
    cy.url().should('include', '/tasks/edit/1');
  })
})

describe('Task details page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('company');
    cy.intercept('GET', '**/api/tasks', { fixture: 'all_tasks.json' }).as('getAllTasks');
  })

  it('should display the numeric task details', () => {
    cy.intercept('GET', '**/api/tasks/*', { fixture: 'task_numeric.json' }).as('getNumericTask');
    cy.visit('http://localhost:3000/tasks/1');
    cy.wait('@getNumericTask');

    cy.get('dd#title').should('contain', 'Numeric Task');
    cy.get('dd#description').should('contain', 'Description');
    cy.get('dd#type').should('contain', 'Numeric');
    cy.get('dd#min').should('contain', '1');
    cy.get('dd#max').should('contain', '10');
  })

  it('should display the selection task details', () => {
    cy.intercept('GET', '**/api/tasks/*', { fixture: 'task_selection.json' }).as('getSelectionTask');
    cy.visit('http://localhost:3000/tasks/1');
    cy.wait('@getSelectionTask');
    
    cy.get('dd#title').should('contain', 'Selection Task');
    cy.get('dd#description').should('contain', 'Description');
    cy.get('dd#type').should('contain', 'Selection');
    cy.get('dd#choice1').should('contain', 'Choice 1');
    cy.get('dd#choice2').should('contain', 'Choice 2');
  })

  it('should display the text task details', () => {
    cy.intercept('GET', '**/api/tasks/*', { fixture: 'task_text.json' }).as('getTextTask');
    cy.visit('http://localhost:3000/tasks/1');
    cy.wait('@getTextTask');
    
    cy.get('dd#title').should('contain', 'Text Task');
    cy.get('dd#description').should('contain', 'Description');
    cy.get('dd#type').should('contain', 'Text');
  })

  it('should navigate to edit task page when click on edit button', () => {
    cy.intercept('GET', '**/api/tasks/*', { fixture: 'task_numeric.json' }).as('getNumericTask');
    cy.visit('http://localhost:3000/tasks/1');
    cy.wait('@getNumericTask');

    cy.get('a#edit').click();
    cy.url().should('include', '/tasks/edit/1');
  })

  it('should navigate to all tasks page when click on all tasks button', () => {
    cy.intercept('GET', '**/api/tasks/*', { fixture: 'task_numeric.json' }).as('getNumericTask');
    cy.visit('http://localhost:3000/tasks/1');
    cy.wait('@getNumericTask');

    cy.get('a#all-tasks').click();
    cy.wait('@getAllTasks');
    cy.url().should('include', '/tasks');
  })
})

describe('Task create page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('company');
    cy.intercept('POST', '**/api/tasks', { fixture: 'task_numeric.json' }).as('createTask');
    cy.visit('http://localhost:3000/tasks/create');

    cy.get('input#title').type("Numeric Task");
    cy.get('textarea#description').type("Description");
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

    cy.get('select#type').select("Selection");
    cy.get('button#create-button').click();

    cy.get('input#1').should('have.class', 'border-red-400');
    cy.get('input#2').should('have.class', 'border-red-400');
  })

  it('should display successful message when task is created', () => {
    cy.get('button#create-button').click();
    cy.wait('@createTask');

    cy.get('#alert-title').should('contain', 'Successful');
  })

  it('should display error message when there is an error', () => {
    cy.intercept('POST', '**/api/tasks', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('createTaskError');

    cy.get('button#create-button').click();
    cy.wait('@createTaskError');

    cy.get('#alert-title').should('contain', 'Error');
  })

  it('should display different inputs based on the task type', () => {
    cy.get('select#type').select("Selection");

    cy.get('input#1').should('be.visible')
    cy.get('input#2').should('be.visible')

    cy.get('input#1').type("Choice 1");
    cy.get('input#2').type("Choice 2");

    cy.get('button#create-button').click();
  })
})

describe('Task edit page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('company');
    cy.intercept('GET', '**/api/tasks/*', { fixture: 'task_numeric.json' }).as('getTask');
    cy.intercept('PUT', '**/api/tasks/*', { fixture: 'updated_task.json' }).as('updateTask');
    cy.visit('http://localhost:3000/tasks/edit/1');
    cy.wait('@getTask');
  })

  it('should pre-filled the inputs with the current information', () => {
    cy.get('input#title').should('have.value', 'Numeric Task');
    cy.get('textarea#description').should('have.value', 'Description');
    cy.get('select#type').should('have.value', 'Numeric');
    cy.get('input#min').should('have.value', '1');
    cy.get('input#max').should('have.value', '10');
  })

  it('should display successful message when task is updated', () => {
    cy.get('input#title').clear().type("Selection Task");
    cy.get('textarea#description').clear().type('Description');
    cy.get('select#type').select('Selection');
    cy.get('input#1').clear().type('Choice 1');
    cy.get('input#2').clear().type('Choice 2');

    cy.get('button#create-button').click();
    cy.wait('@updateTask');

    cy.get('#alert-title').should('contain', 'Successful');
  })

  it('should display error message when there is an error', () => {
    cy.intercept('PUT', '**/api/tasks/1', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('updateTaskError');

    cy.get('button#create-button').click();
    cy.wait('@updateTaskError');

    cy.get('#alert-title').should('contain', 'Error');
  })
})