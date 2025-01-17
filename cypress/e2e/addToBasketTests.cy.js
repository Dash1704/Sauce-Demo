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

  it('the icon should update with an item in the basket', () => {
    cy.get('.inventory_item').first().find('button').click();
    cy.get('.shopping_cart_badge').should('contain', '1');

    cy.get('.inventory_item').last().find('button').click();
    cy.get('.shopping_cart_badge').should('contain', '2');

    cy.get('.inventory_item').contains('Sauce Labs Fleece Jacket')
    .parents('.inventory_item')
    .find('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
    cy.get('.shopping_cart_badge').should('contain', '3');
  })

  it('should show an item clicked in the checkout page', () => {
    cy.get('.inventory_item').first().find('button').click();
    cy.get('.shopping_cart_badge').click()
    cy.url().should('include', '/cart.html')
    cy.get('.cart_item').should('exist');
  })
})
