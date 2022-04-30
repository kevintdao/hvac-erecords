describe('Profile index page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('company');
    cy.intercept('GET', '**/api/profiles', { fixture: 'all_profiles.json' }).as('getAllProfiles');
    cy.intercept('GET', '**/api/profiles/*', { fixture: 'profile.json' }).as('getProfile');
    cy.intercept('GET', '**/api/tasks', { fixture: 'all_tasks.json' }).as('getAllTasks');
    cy.intercept('GET', '**/api/tasks/*', { fixture: 'task_numeric.json' }).as('getNumericTask');
    cy.visit('http://localhost:3000/profiles');
  })

  it('should see all profiles when on the index page', () => {
    cy.wait('@getAllProfiles');
    cy.get('td#title-1').should('contain', 'Profile 1');
    cy.get('td#num-tasks-1').should('contain', '1');

    cy.get('td#title-2').should('contain', 'Profile 2');
    cy.get('td#num-tasks-2').should('contain', '1');
  })

  it('should navigate to profile info page when click on more info button', () => {
    cy.wait('@getAllProfiles');
    cy.get('a[href="/profiles/1"]').click();
    cy.url().should('include', '/profiles/1');
  })

  it('should navigate to new profile page when click on new profile button', () => {
    cy.wait('@getAllProfiles');
    cy.get('a[href="/profiles/create"]').click();
    cy.wait('@getAllTasks');
    cy.url().should('include', '/profiles/create');
  })

  it('should navigate to edit profile page when click on edit button', () => {
    cy.wait('@getAllProfiles');
    cy.get('a[href="/profiles/edit/1"]').click();
    cy.url().should('include', '/profiles/edit/1');
  })
})

describe('Profile details page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('company');
    cy.intercept('GET', '**/api/profiles', { fixture: 'all_profiles.json' }).as('getAllProfiles');
    cy.intercept('GET', '**/api/tasks', { fixture: 'all_tasks.json' }).as('getAllTasks');
    cy.intercept('GET', '**/api/tasks/*', { fixture: 'task_numeric.json' }).as('getNumericTask');
  })

  it('should navigate to edit profile page when click on edit button', () => {
    cy.intercept('GET', '**/api/profiles/*', { fixture: 'profile.json' }).as('getProfile');
    cy.visit('http://localhost:3000/profiles/1');
    cy.wait(['@getProfile', '@getNumericTask'])

    cy.get('a#edit').click();
    cy.url().should('include', '/profiles/edit/1');
  })

  it('should navigate to all tasks page when click on all tasks button', () => {
    cy.intercept('GET', '**/api/profiles/*', { fixture: 'profile.json' }).as('getProfile');
    cy.visit('http://localhost:3000/profiles/1');
    cy.wait(['@getProfile', '@getNumericTask'])

    cy.get('a#all-profiles').click();
    cy.wait('@getAllProfiles');
    cy.url().should('include', '/profiles');
  })
})

describe('Profile create page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('company');
    cy.intercept('POST', '**/api/profiles', { fixture: 'profile.json' }).as('createProfile');
    cy.intercept('GET', '**/api/tasks', { fixture: 'all_tasks.json' }).as('getAllTasks');
    cy.intercept('GET', '**/api/tasks/*', { fixture: 'task_numeric.json' }).as('getNumericTask');
    cy.visit('http://localhost:3000/profiles/create');

    cy.get('input#title').type("Profile 1");
    cy.get('textarea#description').type("Desc 1");
    cy.get('select[id="tasks.t0"]').select(1);
  })

  it('should diplay red border around invalid inputs', () => {
    cy.get('input#title').clear();
    cy.get('textarea#description').clear();
    cy.get('select[id="tasks.t0"]').select(1);

    cy.get('button#create-button').click();

    cy.get('input#title').should('have.class', 'border-red-400');
    cy.get('textarea#description').should('have.class', 'border-red-400');

    cy.get('button#create-button').click();
  })

  it('should add a task', () => {
    cy.get('button#add-task').click();

    cy.get('select[id="tasks.t1"]').should('be.visible');
  })

  it('should delete a task', () => {
    cy.get('button#add-task').click();
    cy.get('select[id="tasks.t1"]').should('be.visible');
    
    cy.get('button#delete0').click();
  })

  it('should display successful message when task is created', () => {
    cy.get('button#create-button').click();
    cy.wait('@createProfile');

    cy.get('#alert-title').should('contain', 'Successful');
  })

  it('should display error message when there is an error', () => {
    cy.intercept('POST', '**/api/profiles', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('createProfileError');

    cy.get('button#create-button').click();
    cy.wait('@createProfileError');

    cy.get('#alert-title').should('contain', 'Error');
  })
})

describe('Profile edit page', () => {
  after(() => {
    cy.logout();
  })

  beforeEach(() => {
    cy.login('company');
    cy.intercept('GET', '**/api/profiles/*', { fixture: 'profile.json' }).as('getProfile');
    cy.intercept('PUT', '**/api/profiles/*', { fixture: 'updated_profile.json' }).as('updateProfile');
    cy.intercept('GET', '**/api/tasks', { fixture: 'all_tasks.json' }).as('getAllTasks');
    cy.intercept('GET', '**/api/tasks/*', { fixture: 'task_numeric.json' }).as('getNumericTask');
    cy.visit('http://localhost:3000/profiles/edit/1');
    cy.wait('@getProfile');
  })

  it('should pre-filled the inputs with the current information', () => {
    cy.get('input#title').should('have.value', 'Profile 1');
    cy.get('textarea#description').should('have.value', 'Desc 1');
  })

  it('should display successful message when task is updated', () => {
    cy.get('input#title').clear().type("Profile 2");
    cy.get('textarea#description').clear().type('Desc 2');

    cy.get('button#create-button').click();
    cy.wait('@updateProfile');

    cy.get('#alert-title').should('contain', 'Successful');
  })

  it('should display error message when there is an error', () => {
    cy.intercept('PUT', '**/api/profiles/1', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('updateProfileError');

    cy.get('button#create-button').click();
    cy.wait('@updateProfileError');

    cy.get('#alert-title').should('contain', 'Error');
  })
})

describe('Permission/Not logged in error', () => {
  it('should display error on index page', () => {
    cy.intercept('GET', '**/api/profiles', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('getAllProfilesError');
    cy.visit('http://localhost:3000/profiles');
    cy.wait('@getAllProfilesError');
    cy.get('#message').should('contain', 'Error message');
  })

  it('should display error on details page', () => {
    cy.intercept('GET', '**/api/profiles/*', { 
      statusCode: 404,
      body: {
        detail: "Error message"
      }
    }).as('getProfileError');
    cy.visit('http://localhost:3000/profiles/1');
    cy.wait('@getProfileError');
    cy.get('#message').should('contain', 'Error message');
  })

  it('should display error on edit page', () => {
    cy.intercept('GET', '**/api/profiles/*', { 
      statusCode: 404,
      body: {
        detail: "Error message"
      }
    }).as('getProfileError');
    cy.visit('http://localhost:3000/profiles/edit/1');
    cy.wait('@getProfileError');
    cy.get('#message').should('contain', 'Error message');
  })
})
  