describe("Ebupot Unifikasi - Create Draft then Single Upload", () => {
  beforeEach(() => {
    cy.setupEbupot();
  });

  it("creates a draft then uploads it", () => {
    cy.createEbupotDraft();
    cy.contains("Bupot berhasil dibuat").should("be.visible");

    cy.singleUploadDraft("Februari 2026");
  });
});
