describe("Logout", () => {
  beforeEach(() => {
    cy.login("pengentestefaktur@yopmail.com", "aaAA11!!");
  });

  it("logs out from the user menu", () => {
    cy.get(
      "#pajak-io-app > div > div.page-navbar > div.dashboard-header.box-shadow > div.action-menu > svg"
    )
      .should("be.visible")
      .click();

    cy.get(
      "#pajak-io-app > div > div.page-navbar > div.dashboard-header.box-shadow > div.action-menu > div.flex.relative > div.box-shadow.absolute.top-30.right-0.bg-white.w-250.z-2"
    )
      .should("be.visible")
      .within(() => {
        cy.contains(".item-menu", /^Logout$/i).click({ force: true });
      });

  });
});
