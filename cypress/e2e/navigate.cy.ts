describe('openStore', () => {
  it('should open mcdonalds', () => {
    cy.visit('http://localhost:3000')

    cy.get('#filter').type('McDonalds')

    cy.get(
      '[href="/restaurant/62d9f70f21adc6799e6ca8b1"] > .MuiPaper-root'
    ).click()

    cy.get('.MuiBox-root > h1').click()
  })
})
