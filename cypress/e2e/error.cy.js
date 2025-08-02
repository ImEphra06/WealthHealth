describe('Error Page must', () => {

  it('navigate to Error Page -> modal', () => {
    cy.visit('http://localhost:3000/error')
    cy.get('.message').should('contain.text', "Error ! Requested page doesn't exist")
    cy.get('.modal-button').click()
  })

})