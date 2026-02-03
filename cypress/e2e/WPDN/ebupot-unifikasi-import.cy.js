// cypress/e2e/ebupot-unifikasi-import.cy.js

describe("Ebupot Unifikasi - Import", () => {
  beforeEach(() => {
    cy.setupEbupot(); // Otomatis login, select company, navigate ke /ctas-ebupot-unifikasi
  });

  it("should import file", () => {
    // Step 1: Buka menu e-Bupot Unifikasi (expand dropdown)
    cy.get("#ebupot-unifikasi").should("be.visible");
    cy.get("#ebupot-unifikasi > div.flex.items-center.item-side-nav")
      .click();

    cy.get("#ebupot-unifikasi > div.sub-child")
      .should("have.css", "opacity", "1")
      .and("be.visible");

    // Step 2: Klik submenu e-Bupot Unifikasi CTAS
    cy.contains(
      "#ebupot-unifikasi > div.sub-child",
      "e-Bupot Unifikasi CTAS"
    ).click();

    // Step 3: Klik tab PPh Dalam Negeri
    cy.contains("button", "PPh Dalam Negeri").should("be.visible").click();

    // Step 4: Klik Import
    cy.get("body").click(0, 0);
    cy.contains("button", "Import", { timeout: 20000 })
      .should("be.visible")
      .click();

    // Step 5: Pilih file XLSX dari fixtures
    cy.get('input[type="file"]')
      .should("exist")
      .selectFile(
        "cypress/fixtures/Template-WPDN-update-100-upload-sukses.xlsx",
        { force: true }
      );

    // Step 6: Klik Upload
    cy.contains("button", "Upload").should("be.visible").click();
  });
});
