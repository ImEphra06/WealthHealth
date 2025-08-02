describe('Create Employee Page must', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/create');
  });

  it('be reachable with the title', () => {
    cy.get('.p-3').should('contain.text', 'Create Employee')
  })

  it("I can't create employee if first name is less than 2 chars", () => {
    cy.get('.bg-transparent').click();
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(1) > .form-control").type("R");
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(2) > .form-control").type("JULIETTE");
    cy.get("#birthdatemin").type("1983-03-03");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(1) > .form-control").type("Rue Donzelle");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(2) > .form-control").type("Chateaufort");
    cy.get(":nth-child(1) > .form-select").select("Iowa");
    cy.get(":nth-child(2) > :nth-child(2) > .mb-3 > .form-control").type("12345");
    cy.get("#startdatemin").type("2005-03-03");
    cy.get(":nth-child(2) > .form-select").select("Sales");
    cy.get(".btn-success").click();

    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > .text-dark').contains(
      "must be 2 to 50 chars, letters only"
    );

  });

  it("I can't create employee if last name is less than 2 chars", () => {
    cy.get('.bg-transparent').click();
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(1) > .form-control").type("José-Pierre");
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(2) > .form-control").type("J");
    cy.get("#birthdatemin").type("1983-03-03");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(1) > .form-control").type("Rue Donzelle");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(2) > .form-control").type("Saint-Rémy Lès Chevreuse");
    cy.get(":nth-child(1) > .form-select").select("Iowa");
    cy.get(":nth-child(2) > :nth-child(2) > .mb-3 > .form-control").type("12345");
    cy.get("#startdatemin").type("2005-03-03");
    cy.get(":nth-child(2) > .form-select").select("Sales");
    cy.get(".btn-success").click();

    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > .text-dark').contains(
      "must be 2 to 50 chars, letters only"
    );
  });

  it("I can't create employee if birth date is less than 15 years behind", () => {
    cy.get('.bg-transparent').click();
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(1) > .form-control").type("Romeo");
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(2) > .form-control").type("Juliette");
    cy.get("#birthdatemin").type("2020-03-03");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(1) > .form-control").type("Rue Donzelle");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(2) > .form-control").type("Chateaufort");
    cy.get(":nth-child(1) > .form-select").select("Iowa");
    cy.get(":nth-child(2) > :nth-child(2) > .mb-3 > .form-control").type("12345");
    cy.get("#startdatemin").type("2005-03-03");
    cy.get(":nth-child(2) > .form-select").select("Sales");
    cy.get(".btn-success").click();

    cy.get(":nth-child(1) > :nth-child(2) > .mb-3 > .text-dark").contains(
      "must be min 15 and max 100 years old"
    );
  });

  it("I can't create employee if street is less than 2 chars", () => {
    cy.get('.bg-transparent').click();
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(1) > .form-control").type("ROMEO");
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(2) > .form-control").type("JULIETTE");
    cy.get("#birthdatemin").type("1983-03-03");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(1) > .form-control").type("2");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(2) > .form-control").type("Saint-Rémy-Lès-Chevreuse");
    cy.get(":nth-child(1) > .form-select").select("Iowa");
    cy.get(":nth-child(2) > :nth-child(2) > .mb-3 > .form-control").type("12345");
    cy.get("#startdatemin").type("2005-03-03");
    cy.get(":nth-child(2) > .form-select").select("Sales");
    cy.get(".btn-success").click();

    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > .text-dark').contains(
      "must be 2 to 50 chars"
    );
  });

  it("I can't create employee if city is less than 2 chars", () => {
    cy.get('.bg-transparent').click();
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(1) > .form-control").type("ROMEO");
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(2) > .form-control").type("JULIETTE");
    cy.get("#birthdatemin").type("1983-03-03");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(1) > .form-control").type("30 Rue Donzelle");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(2) > .form-control").type("S");
    cy.get(":nth-child(1) > .form-select").select("Iowa");
    cy.get(":nth-child(2) > :nth-child(2) > .mb-3 > .form-control").type("12345");
    cy.get("#startdatemin").type("2005-03-03");
    cy.get(":nth-child(2) > .form-select").select("Sales");
    cy.get(".btn-success").click();

    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > .text-dark').contains(
      "must be 2 to 50 chars"
    );
  });

  it("I can't create employee if zip code is not between 0000 & 99999", () => {
    cy.get('.bg-transparent').click();
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(1) > .form-control").type("ROMEO");
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(2) > .form-control").type("JULIETTE");
    cy.get("#birthdatemin").type("1983-03-03");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(1) > .form-control").type("Rue Donzelle");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(2) > .form-control").type("Châteaufort");
    cy.get(":nth-child(1) > .form-select").select("Iowa");
    cy.get(":nth-child(2) > :nth-child(2) > .mb-3 > .form-control").type("2345");
    cy.get("#startdatemin").type("2005-03-03");
    cy.get(":nth-child(2) > .form-select").select("Sales");
    cy.get(".btn-success").click();

    cy.get(':nth-child(2) > :nth-child(2) > .mb-3 > .text-dark').contains(
      "must be 5 numbers"
    );
  });

  it("I can't create employee if start date is less than 15 years after birth date", () => {
    cy.get('.bg-transparent').click();
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(1) > .form-control").type("Romeo");
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(2) > .form-control").type("Juliette");
    cy.get("#birthdatemin").type("2000-03-03");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(1) > .form-control").type("Rue Donzelle");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(2) > .form-control").type("Chateaufort");
    cy.get(":nth-child(1) > .form-select").select("Iowa");
    cy.get(":nth-child(2) > :nth-child(2) > .mb-3 > .form-control").type("12345");
    cy.get("#startdatemin").type("2005-03-03");
    cy.get(":nth-child(2) > .form-select").select("Sales");
    cy.get(".btn-success").click();

    cy.get(".message").should("contain", "Start date must be at least 15 years after birthDate");
    cy.get(".modal-button").click();
  });

  it("I can create employee if every field is ok", () => {
    cy.get('.bg-transparent').click();
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(1) > .form-control").type("Jean-José");
    cy.get(":nth-child(1) > :nth-child(1) > :nth-child(2) > .form-control").type("De la Patelière-Chaumet");
    cy.get("#birthdatemin").type("2000-03-03");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(1) > .form-control").type("2, Rue-Donzèlle de Montabé");
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(2) > .form-control").type("Saint-Rémy Lès Chevreuse");
    cy.get(":nth-child(1) > .form-select").select("Iowa");
    cy.get(":nth-child(2) > :nth-child(2) > .mb-3 > .form-control").type("02345");
    cy.get("#startdatemin").type("2019-03-03");
    cy.get(":nth-child(2) > .form-select").select("Sales");
    cy.get(".btn-success").click();

    cy.get('.message').should("contain", "Employee successfully created");
    cy.get('.modal-button').click();

  });

})