describe("Ebupot Unifikasi WPLN", () => {
  it("opens PPh Luar Negeri list", () => {
    cy.contains("PPh Luar Negeri").should("be.visible");
    cy.url().should("include", "/pph-luar-negeri/");
  });
});
