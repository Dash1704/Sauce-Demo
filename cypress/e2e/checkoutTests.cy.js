describe('The checkout process tests', () => {
  beforeEach(() => {
    cy.visit('https://saucedemo.com')
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click()
    cy.get('.inventory_item').first().find('button').click();
    cy.get('.shopping_cart_badge').click()
  })

  it('should checkout successfully', () => {
    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('#first-name').type('Dash')
    cy.get('#last-name').type('Dash')
    cy.get('#postal-code').type('BR7 6JP')
    cy.get('[data-test="continue"]').click()

    cy.url().should('include', '/checkout-step-two.html')
    cy.get('.summary_info').should('contain', 'Payment Information')
    cy.get('.summary_info').should('contain', 'Free Pony Express Delivery!')
    cy.get('.summary_info').should('contain', 'Price Total')

    cy.get('[data-test="finish"]').click()
    cy.get('[data-test="checkout-complete-container"]').should('contain', 'Thank you for your order!')
    cy.get('[data-test="shopping-cart-link"]').should('be.empty');
  })
})