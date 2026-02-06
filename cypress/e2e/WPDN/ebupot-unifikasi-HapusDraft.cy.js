describe("Ebupot Unifikasi - Hapus Draft", () => {
  beforeEach(() => {
    cy.setupEbupot();
  });

  it("should delete draft bupot", () => {

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

    // Step 3: Pilih masa pajak
    const masaPajakValue = "Januari 2026";
    cy.get("body").then(($body) => {
      const alerts = $body.find(".alert-notification-wrapper");
      if (alerts.length) {
        cy.wrap(alerts).should("not.be.visible");
      }
    });

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
    cy.get(
      "#pajak-io-app > div > div.page-content > div.content > div.content-main > div.box-content > div > div.box-content__main > div:nth-child(3) > div:nth-child(4)"
    )
      .should("be.visible")
      .click();

    cy.wait(2000);

    // Step 5: Klik burger row pertama
    cy.contains("Draft").should("be.visible");
    cy.get('[id^="button-row-options"]')
      .filter(":visible")
      .first()
      .should("be.visible")
      .click({ force: true });

    // Step 6: Klik "Hapus Draft"
    cy.contains("ul.list-options:visible li.option-item", "Hapus Draft")
      .should("be.visible")
      .click();

    // Step 7: Konfirmasi hapus
    cy.contains("button", "Hapus")
      .should("be.visible")
      .click();
  });
});
