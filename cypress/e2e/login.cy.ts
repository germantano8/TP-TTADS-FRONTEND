describe('Login', () => {
  it('should login', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('#email').type('admin@admin.com')
    cy.get('#password').type('admin')
    cy.get('.MuiButtonBase-root').click()
  })
})
