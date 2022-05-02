describe('Building index page', () => {
    after(() => {
      cy.logout();
    })

    beforeEach(() => {
      cy.login('manager');
      cy.intercept('GET', '**/api/buildings', { fixture: 'all_buildings.json' }).as('getAllBuildings');
      cy.intercept('GET', '**/api/buildings/*', { fixture: 'building.json' }).as('getBuilding');
      cy.visit('http://localhost:3000/buildings');
    })
  
    it('should see all buildings when on the index page', () => {
      cy.wait('@getAllBuildings');
      cy.get('td#site_name-1').should('contain', 'Iowa');
    })
  
    it('should navigate to building info page when click on more info button', () => {
      cy.wait('@getAllBuildings');
      cy.get('a[href="/buildings/1"]').click();
      cy.url().should('include', '/buildings/1');
    })
  
    it('should navigate to new building page when click on new building button', () => {
      cy.intercept('GET', '**/api/managers', { fixture: 'all_managers.json' }).as('getAllManagers');
      cy.wait('@getAllBuildings');
      cy.get('a[href="/buildings/create"]').click();
      cy.wait('@getAllManagers');
      cy.url().should('include', '/buildings/create');
    })
  
    it('should navigate to edit building page when click on edit button', () => {
      cy.intercept('GET', '**/api/managers', { fixture: 'all_managers.json' }).as('getAllManagers');
      cy.wait('@getAllBuildings');
      cy.get('a[href="/buildings/edit/1"]').click();
      cy.wait('@getAllManagers');
      cy.url().should('include', '/buildings/edit/1');
    })
})

describe('Building details page', () => {
    after(() => {
      cy.logout();
    })

    beforeEach(() => {
      cy.login('manager');
      cy.intercept('GET', '**/api/buildings', { fixture: 'all_buildings.json' }).as('getAllBuildings');
      cy.intercept('GET', '**/api/buildings/*', { fixture: 'building.json' }).as('getBuilding');
      cy.visit('http://localhost:3000/buildings/1');
      cy.wait('@getBuilding');
    })
  
    it('should display the building details', () => {
      cy.get('dd#zip_code').should('contain', '52240');
    })
  
    it('should navigate to edit building page when click on edit button', () => {
      cy.intercept('GET', '**/api/managers', { fixture: 'all_managers.json' }).as('getAllManagers');
      cy.get('a#edit').click();
      cy.wait('@getAllManagers');
      cy.url().should('include', '/buildings/edit/1');
    })
  
    it('should navigate to all buildings page when click on all buildings button', () => {
      cy.get('a#all-buildings').click();
      cy.wait('@getAllBuildings');
      cy.url().should('include', '/buildings');
    })
})

describe('Building create page', () => {
    after(() => {
      cy.logout();
    })

    beforeEach(() => {
        cy.login('manager');
        cy.intercept('GET', '**/api/buildings', { fixture: 'all_buildings.json' }).as('getAllBuildings');
        cy.intercept('GET', '**/api/buildings/*', { fixture: 'building.json' }).as('getBuilding');
        cy.intercept('POST', '**/api/buildings', { fixture: 'building.json' }).as('createBuilding');
        cy.intercept('GET', '**/api/managers', { fixture: 'all_managers.json' }).as('getAllManagers');
        cy.visit('http://localhost:3000/buildings/create');

        cy.wait('@getAllManagers');

        cy.get('input#site_name').type("Wisconsin");
        cy.get('input#street').type("963 Street");
        cy.get('input#city').type("Madison");
        cy.get('input#zip_code').type("12345");
        cy.get('input#country').type("United States");
    })

    it('should diplay red border around invalid inputs', () => {
        cy.get('input#site_name').clear();
        cy.get('input#street').clear();
        cy.get('input#city').clear();
        cy.get('input#zip_code').clear();
        cy.get('input#country').clear();

        cy.get('button#create-button').click();

        cy.get('input#site_name').should('have.class', 'border-red-400');
        cy.get('input#street').should('have.class', 'border-red-400');
        cy.get('input#city').should('have.class', 'border-red-400');
        cy.get('input#zip_code').should('have.class', 'border-red-400');
        cy.get('input#country').should('have.class', 'border-red-400');
    })

    it('should display successful message when building is created', () => {
        cy.get('button#create-button').click();
        cy.wait('@createBuilding');

        cy.get('#alert-title').should('contain', 'Successful');
    })

    it('should display error message when there is an error', () => {
        cy.intercept('POST', '**/api/buildings', { 
          statusCode: 404,
          body: {
            email: "Error message"
          }
        }).as('createBuildingError');

        cy.get('button#create-button').click();
        cy.wait('@createBuildingError');

        cy.get('#alert-title').should('contain', 'Error');
    })
})

describe('Building edit page', () => {
    after(() => {
      cy.logout();
    })

    beforeEach(() => {
        cy.login('manager');
        cy.intercept('GET', '**/api/buildings/*', { fixture: 'building.json' }).as('getBuilding');
        cy.intercept('PUT', '**/api/buildings/*', { fixture: 'updated_building.json' }).as('updateBuilding');
        cy.intercept('GET', '**/api/managers', { fixture: 'all_managers.json' }).as('getAllManagers');
        cy.visit('http://localhost:3000/buildings/edit/1');
        cy.wait(['@getBuilding', '@getAllManagers']);
    })
  
    it('should pre-filled the inputs with the current information', () => {
        cy.get('input#site_name').should('have.value', 'Iowa');
        cy.get('input#street').should('have.value', '123 Street');
        cy.get('input#city').should('have.value', 'Iowa City');
        cy.get('input#zip_code').should('have.value', '52240');
        cy.get('input#country').should('have.value', 'United States');
    })
  
    it('should display successful message when building is updated', () => {
        cy.get('input#site_name').clear().type("Other");
        cy.get('input#street').clear().type("753 Street");
        cy.get('input#city').clear().type("City");
        cy.get('input#zip_code').clear().type("65432");
    
        cy.get('button#create-button').click();
        cy.wait('@updateBuilding');
    
        cy.get('#alert-title').should('contain', 'Successful');
    })
  
    it('should display error message when there is an error', () => {
        cy.intercept('PUT', '**/api/buildings/1', { 
          statusCode: 404,
          body: {
            email: "Error message"
          }
        }).as('updateBuildingError');
    
        cy.get('button#create-button').click();
        cy.wait('@updateBuildingError');
    
        cy.get('#alert-title').should('contain', 'Error');
    })
})

describe('Permission/Not logged in error', () => {
  it('should display error on index page', () => {
    cy.intercept('GET', '**/api/buildings', { 
      statusCode: 404,
      body: {
        email: "Error message"
      }
    }).as('getAllBuildingsError');
    cy.visit('http://localhost:3000/buildings');
    cy.wait('@getAllBuildingsError');
    cy.get('#message').should('contain', 'Error message');
  })

  it('should display error on details page', () => {
    cy.intercept('GET', '**/api/buildings/*', { 
      statusCode: 404,
      body: {
        detail: "Error message"
      }
    }).as('getBuildingError');
    cy.visit('http://localhost:3000/buildings/1');
    cy.wait('@getBuildingError');
    cy.get('#message').should('contain', 'Error message');
  })

  it('should display error on edit page', () => {
    cy.intercept('GET', '**/api/buildings/*', { 
      statusCode: 404,
      body: {
        detail: "Error message"
      }
    }).as('getBuildingError');
    cy.visit('http://localhost:3000/buildings/edit/1');
    cy.wait('@getBuildingError');
    cy.get('#message').should('contain', 'Error message');
  })
})
