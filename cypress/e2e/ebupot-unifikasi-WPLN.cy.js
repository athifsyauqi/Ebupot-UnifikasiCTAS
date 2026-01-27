describe("Ebupot Unifikasi WPLN", () => {
  beforeEach(() => {
    cy.login("pengentestefaktur@yopmail.com", "aaAA11!!");
    cy.selectCompany("0717166367077000");

    cy.visit("/ctas-ebupot-unifikasi");
    cy.closeModals();
    cy.get(
      "#select-company-navbar > div.select-label.mr-auto.value-dropdown-company.card-view"
    ).then(($label) => {
      if (!$label.text().includes("0717166367077000")) {
        cy.selectCompany("0717166367077000");
      }
    });

    cy.contains("button", "PPh Luar Negeri").click();
  });

  it("opens PPh Luar Negeri list", () => {
    cy.contains("PPh Luar Negeri").should("be.visible");
    cy.url().should("include", "/pph-luar-negeri/");
  });
});
