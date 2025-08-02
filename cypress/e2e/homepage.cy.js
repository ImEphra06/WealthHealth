describe('Home Page must', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  beforeEach(() => {
    const mockData = [
      {
        firstname: "John",
        lastname: "Doe",
        startdate: "2023-01-01",
        department: "Engineering",
        birthdate: "1990-05-15",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipcode: "10001"
      }
    ]
    localStorage.setItem("employeeList", JSON.stringify(mockData))
  })

  it('be reachable', () => {
    cy.url().should('include', '/')
  })

  it('show Wealth Health Logo', () => {
    cy.get('.card-img-top').should('have.attr', 'alt', 'logo wealth health')
  })

  it('navigate to Create Employee Page', () => {
    cy.get('[href="/create"]').click()
    cy.get('.p-3').should('contain.text', 'Create Employee')
  })

  it('navigate to List Employees Page', () => {
    cy.get('[href="/list"]').click()
    cy.contains('Employee List').should('be.visible') // cible un titre fiable
  })

  it('navigate back to Home Page', () => {
    cy.visit('http://localhost:3000/list')
    cy.get('.d-inline-block').click()
    cy.get('.card-title').should('contain.text', 'HRnet')
  })

})
