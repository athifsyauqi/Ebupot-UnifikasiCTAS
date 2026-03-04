describe("Ebupot Unifikasi - Draft", () => {
  beforeEach(() => {
    cy.setupEbupot();
    cy.createEbupotDraft();
  });

  it("creates a draft", () => {
    cy.contains("Bupot berhasil dibuat").should("be.visible");
  });
});
