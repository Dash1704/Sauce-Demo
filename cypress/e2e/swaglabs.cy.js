describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('https://saucedemo.com')
  })

  it('should allow user to login with first username', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');

    cy.get('#login-button').click()

    cy.url().should('include', '/inventory.html');
    cy.get('#react-burger-menu-btn').should('exist');
    cy.get('.shopping_cart_link').should('exist');    
  })

  it('should be able to login with last username', () => {
    cy.get('#user-name').type('visual_user');
    cy.get('#password').type('secret_sauce');

    cy.get('#login-button').click()

    cy.url().should('include', '/inventory.html');
    cy.get('#react-burger-menu-btn').should('exist');
    cy.get('.shopping_cart_link').should('exist');
  })

  it('should show an error for when a wrong password is used', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('hello sunshine');

    cy.get('#login-button').click()

    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
  })
})

describe('Add to basket Tests', () => {
  beforeEach(() => {
    cy.visit('https://saucedemo.com')
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click()
  })

  it('should have nothing in basket originally', () => {
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include', '/cart.html')
    cy.get('.cart_item').should('not.exist');
  })
})