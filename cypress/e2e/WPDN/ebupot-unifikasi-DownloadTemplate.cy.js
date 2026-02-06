describe("Ebupot Unifikasi - Download Template", () => {
    beforeEach(() => {
    cy.setupEbupot(); // Login + pilih company
  });

  it("should download template", () => {
    cy.task("clearDownloads");
    // Masuk ke fitur e-Bupot Unifikasi CTAS
    cy.get("#ebupot-unifikasi").should("be.visible");
    cy.get("#ebupot-unifikasi > div.flex.items-center.item-side-nav").click();
    cy.get("#ebupot-unifikasi > div.sub-child")
      .should("have.css", "opacity", "1")
      .and("be.visible");  
    cy.contains(
      "#ebupot-unifikasi > div.sub-child",
      "e-Bupot Unifikasi CTAS"
    ).click();  

    
    // Step 4: Klik Import
    cy.get("body").click(0, 0);
    cy.contains("button", "Import", { timeout: 20000 })
      .should("be.visible")
      .click();

    // Step 5: Klik Download Template
    cy.get("#button-download-template", { timeout: 20000 })
      .should("be.visible")
      .click();

    // Step 6: (opsional) validasi file ter-download
    

  });
});
