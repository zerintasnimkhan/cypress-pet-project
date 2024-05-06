describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-testid="cypress-title"]')
      .should("exist")
      .should("have.text", "Todo-App");
  });
});
