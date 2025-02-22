describe('The checkout process tests', () => {
  beforeEach(() => {
    cy.visit('https://saucedemo.com')
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="inventory-item"]').first().find('button').click();
    cy.get('[data-test="shopping-cart-badge"]').click()
    cy.get('[data-test="checkout"]').click()
  })

  it('should checkout successfully', () => {
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('[data-test="firstName"]').type('Dash')
    cy.get('[data-test="lastName').type('Boyles')
    cy.get('[data-test="postalCode').type('BR7 6JP')
    cy.get('[data-test="continue"]').click()

    cy.url().should('include', '/checkout-step-two.html')
    cy.get('[data-test="payment-info-label"]').should('contain', 'Payment Information')
    cy.get('[data-test="shipping-info-value"]').should('contain', 'Free Pony Express Delivery!')
    cy.get('[data-test="total-info-label"]').should('contain', 'Price Total')

    cy.get('[data-test="finish"]').click()
    cy.get('[data-test="checkout-complete-container"]').should('contain', 'Thank you for your order!')
    cy.get('[data-test="shopping-cart-link"]').should('be.empty');
  })

  it('should not allow you to complete checkout if postcode is left blank', () => {
    cy.get('[data-test="firstName"]').type('Dash')
    cy.get('[data-test="lastName').type('Boyles')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="checkout-info-container"]').should('contain', 'Error: Postal Code is required')
  })

  it('should not allow you to complete checkout if first name is left blank', () => {
    cy.get('[data-test="lastName').type('Boyles')
    cy.get('[data-test="postalCode').type('BR7 6JP')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="checkout-info-container"]').should('contain', 'Error: First Name is required')
  })

  it('should not allow you to complete checkout if last name is left blank', () => {
    cy.get('[data-test="firstName"]').type('Dash')
    cy.get('[data-test="postalCode').type('BR7 6JP')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="checkout-info-container"]').should('contain', 'Error: Last Name is required')
  })

  it('should allow you to correct an error', () => {
    cy.get('[data-test="firstName"]').type('Dash')
    cy.get('[data-test="postalCode').type('BR7 6JP')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="checkout-info-container"]').should('contain', 'Error: Last Name is required')
    cy.get('[data-test="lastName').type('Boyles')
    cy.get('[data-test="continue"]').click()
    cy.url().should('include', '/checkout-step-two.html')
  })
})