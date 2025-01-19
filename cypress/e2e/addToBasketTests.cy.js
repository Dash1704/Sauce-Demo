describe('Add to basket Tests', () => {
  beforeEach(() => {
    cy.visit('https://saucedemo.com')
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click()
  })

  it('should have nothing in basket originally', () => {
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include', '/cart.html')
    cy.get('[data-test="inventory-item"]').should('not.exist');
  })

  it('the icon should update with an item in the basket', () => {
    cy.get('[data-test="inventory-item"]').first().find('button').click();
    cy.get('[data-test="shopping-cart-badge"]').should('contain', '1');

    cy.get('[data-test="inventory-item"]').last().find('button').click();
    cy.get('[data-test="shopping-cart-badge"]').should('contain', '2');

    cy.get('[data-test="inventory-item"]').contains('Sauce Labs Fleece Jacket')
    .parents('[data-test="inventory-item"]')
    .find('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('contain', '3');
  })

  it('should show an item clicked in the checkout page', () => {
    cy.get('[data-test="inventory-item"]').first().find('button').click();
    cy.get('[data-test="shopping-cart-badge"]').click()
    cy.url().should('include', '/cart.html')
    cy.get('[data-test="inventory-item"]').should('exist');
  })

  it('should show multiple items in the checkout page', () => {
    cy.get('[data-test="inventory-item"]').first().find('button').click();
    cy.get('[data-test="inventory-item"]').last().find('button').click();
    cy.get('[data-test="shopping-cart-badge"]').click()
    cy.url().should('include', '/cart.html')
    cy.get('[data-test="cart-list"]').find('[data-test="inventory-item"]').should('have.length', 2);
  })

  it('should remove an item from the checkout page successfully', () => {
    cy.get('[data-test="inventory-item"]').first().find('button').click();
    cy.get('[data-test="inventory-item"]').last().find('button').click();
    cy.get('[data-test="shopping-cart-badge"]').click()
    cy.get('[data-test="inventory-item"]').first().find('button').click()
    cy.get('[data-test="cart-list"]').find('[data-test="inventory-item"]').should('have.length', 1)
  })
})

