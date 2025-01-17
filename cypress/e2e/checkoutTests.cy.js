describe('The checkout process tests', () => {
  beforeEach(() => {
    cy.visit('https://saucedemo.com')
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click()
    cy.get('.inventory_item').first().find('button').click();
    cy.get('.shopping_cart_badge').click()
    cy.get('[data-test="checkout"]').click()
  })

  it('should checkout successfully', () => {
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('#first-name').type('Dash')
    cy.get('#last-name').type('Boyles')
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

  it('should not allow you to complete checkout if postcode is left blank', () => {
    cy.get('#first-name').type('Dash')
    cy.get('#last-name').type('Boyles')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="checkout-info-container"]').should('contain', 'Error: Postal Code is required')
  })

  it('should not allow you to complete checkout if first name is left blank', () => {
    cy.get('#last-name').type('Boyles')
    cy.get('#postal-code').type('BR7 6JP')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="checkout-info-container"]').should('contain', 'Error: First Name is required')
  })

  it('should not allow you to complete checkout if last name is left blank', () => {
    cy.get('#first-name').type('Dash')
    cy.get('#postal-code').type('BR7 6JP')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="checkout-info-container"]').should('contain', 'Error: Last Name is required')
  })

  it('should allow you to correct an error', () => {
    cy.get('#first-name').type('Dash')
    cy.get('#postal-code').type('BR7 6JP')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="checkout-info-container"]').should('contain', 'Error: Last Name is required')
    cy.get('#last-name').type('Boyles')
    cy.get('[data-test="continue"]').click()
    cy.url().should('include', '/checkout-step-two.html')
  })
})