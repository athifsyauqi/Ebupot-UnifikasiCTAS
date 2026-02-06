describe("Ebupot Unifikasi - Bulk Upload", () => {
  beforeEach(() => {
    cy.setupEbupot();
  });

  it("should bulk upload from draft", () => {
    

    // Step 1: Buka e-Bupot Unifikasi CTAS
    cy.get("#ebupot-unifikasi").should("be.visible");
    cy.get("#ebupot-unifikasi > div.flex.items-center.item-side-nav").click();
    cy.get("#ebupot-unifikasi > div.sub-child")
      .should("have.css", "opacity", "1")
      .and("be.visible");
    cy.contains(
      "#ebupot-unifikasi > div.sub-child",
      "e-Bupot Unifikasi CTAS"
    ).click();

    // Step 2: Tunggu kembali ke list
    cy.url().should("include", "/ctas-ebupot-unifikasi");

    // Step 3: Pilih masa pajak (pola singleUpload)
    const masaPajakValue = "Februari 2026";
    cy.contains("Masa Pajak")
      .parent()
      .find("input")
      .should("be.visible")
      .click({ force: true });

    cy.get('[role="dialog"]')
      .should("be.visible")
      .first()
      .within(() => {
        const [bulanLabel, tahunLabel] = masaPajakValue.split(" ");
        const tahunTarget = Number(tahunLabel);
        const tahunSekarang = new Date().getFullYear();
        const diffTahun = tahunSekarang - tahunTarget;

        if (diffTahun > 0) {
          for (let i = 0; i < diffTahun; i += 1) {
            cy.get('button[aria-label="Previous year"]').click();
          }
        } else if (diffTahun < 0) {
          for (let i = 0; i < Math.abs(diffTahun); i += 1) {
            cy.get('button[aria-label="Next year"]').click();
          }
        }

        const bulanMap = {
          Januari: "Jan",
          Februari: "Feb",
          Maret: "Mar",
          April: "Apr",
          Mei: "Mei",
          Juni: "Jun",
          Juli: "Jul",
          Agustus: "Agu",
          September: "Sep",
          Oktober: "Okt",
          November: "Nov",
          Desember: "Des",
        };

        const bulanTarget = bulanMap[bulanLabel] || bulanLabel;
        cy.contains('[role="gridcell"]', bulanTarget).click();
      });

    cy.get("body").click(0, 0);

    // Step 4: Filter status Draft
    cy.get("body").then(($body) => {
      const draftSel =
        "#pajak-io-app > div > div.page-content > div.content > div.content-main > div.box-content > div > div.box-content__main > div:nth-child(3) > div.mb-2.badge.badge-default.badge-status.selected";
      if ($body.find(draftSel).length) {
        cy.get(draftSel).should("be.visible").click();
      } else {
        cy.contains("Draft").filter(":visible").first().click();
      }
    });
    cy.wait(2000);

    // Step 5: Set pagination
    cy.get("#bupot-table > div.pagination > div > select")
      .scrollIntoView()
      .should("be.visible")
      .select("10", { force: true });

    // Step 6: Centang row pertama (recorded)
    cy.get("#checkbox-table-0").check({ force: true });
    cy.wait(1000);

    // Step 7: Centang Select All (recorded)
    cy.get("#checkbox-table-all").check({ force: true });
    cy.wait(1000);

    // Step 8: Klik Upload Bupot (bulk)
    cy.get("#button-multiple-upload-bupot", { timeout: 20000 })
      .should("be.visible")
      .click();

    // Step 9: Konfirmasi Upload Bupot (bulk)
    cy.get("#button-confirm-action-multiple", { timeout: 20000 })
      .should("be.visible")
      .click();

    // Step 10: Verify notifikasi sukses
    cy.contains("Permintaan Bulk Upload Bupot Berhasil", {
      timeout: 20000,
    }).should("be.visible");
  });
});
