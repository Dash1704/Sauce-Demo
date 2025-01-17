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
    //click checkout button
    //assert url inclusion

    //enter details
    //click contune

    //page includes overview
    //page includes price total

    //click finish
    //see thankyou message
    //basket icon has zero numbers in it
  })
})