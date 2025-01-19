describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('https://saucedemo.com')
  })

  it('should allow user to login with first username', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');

    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html');
    cy.get('[data-test="open-menu"]').should('exist');
    cy.get('[data-test="shopping-cart-link"]').should('exist');    
  })

  it('should be able to login with last username', () => {
    cy.get('[data-test="username"]').type('visual_user');
    cy.get('[data-test="password"]').type('secret_sauce');

    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html');
    cy.get('[data-test="open-menu"]').should('exist');
    cy.get('[data-test="shopping-cart-link"]').should('exist');
  })

  it('should show an error for when a wrong password is used', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('HelloSunshine');

    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
  })

  it('should not be able to login after the user has signed out', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');

    cy.get('[data-test="login-button"]').click()

    cy.get('#react-burger-menu-btn').click()
    cy.get('[data-test="logout-sidebar-link"]').click()
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username is required')
  })
})
