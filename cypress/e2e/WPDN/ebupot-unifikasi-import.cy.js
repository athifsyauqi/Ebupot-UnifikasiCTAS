describe("Ebupot Unifikasi - Import", () => {
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

    cy.contains("button", "PPh Dalam Negeri").click();
  });

  it("uploads import template xlsx", () => {
    cy.contains("button", "Import").click();

    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/Template-WPDN-update-100-upload-sukses.xlsx",
      { force: true }
    );
    cy.get("#button-confirm-import").click();

    cy.contains("Berhasil!").should("be.visible");
    cy.contains("File Import berhasil diupload").should("be.visible");
    cy.contains("100 Import Bupot Dalam Negeri Berhasil").should("be.visible");
  });
});
