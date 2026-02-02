describe("Ebupot Unifikasi - Draft", () => {
  beforeEach(() => {
    cy.login("pengentestefaktur@yopmail.com", "aaAA11!!");
  });

  it("fills draft steps", () => {
    cy.selectCompany("0717166367077000");
    cy.closeModals();
    cy.wait(500);
    cy.get(
      "#ebupot-unifikasi > div.flex.items-center.item-side-nav > div.arrow-child"
    )
      .should("be.visible")
      .click({ force: true });
    cy.wait(500);
    cy.get(
      "#ebupot-unifikasi > div.sub-child > div:nth-child(2) > div.typo-text.ml-8 > p"
    )
      .should("be.visible")
      .click({ force: true });

      
  });
});
