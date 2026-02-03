describe("Ebupot Unifikasi - Import", () => {
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
