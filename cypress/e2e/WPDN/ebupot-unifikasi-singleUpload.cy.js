// cypress/e2e/ebupot-unifikasi-singleUpload.cy.js

describe("Ebupot Unifikasi - Single Upload", () => {
  beforeEach(() => {
    cy.setupEbupot();
  });

  it("singleUpload", () => {
    const masaPajakValue = "Februari 2026";

    // ===== STEP 1: Buat Draft Dulu =====
    // (copy semua step dari draft kamu mulai dari "Rekam Bukti Potong" sampai "Bupot berhasil dibuat")

    // ===== STEP 1.1: Buka e-Bupot Unifikasi CTAS =====
    cy.get("#ebupot-unifikasi").should("be.visible");
    cy.get("#ebupot-unifikasi > div.flex.items-center.item-side-nav")
      .click();
    cy.get("#ebupot-unifikasi > div.sub-child")
      .should("have.css", "opacity", "1")
      .and("be.visible");
    cy.contains(
      "#ebupot-unifikasi > div.sub-child",
      "e-Bupot Unifikasi CTAS"
    ).click();

    // ===== STEP 2: Tunggu Kembali ke List =====
    cy.url().should("include", "/ctas-ebupot-unifikasi");

    // ===== STEP 3: Pilih Masa Pajak =====
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

    // ===== STEP 4: Filter status Draft =====
    cy.get(
      "#pajak-io-app > div > div.page-content > div.content > div.content-main > div.box-content > div > div.box-content__main > div:nth-child(3) > div:nth-child(4)"
    )
      .should("be.visible")
      .click();

    cy.wait(2000);

    // ===== STEP 5: Klik burger row pertama =====
    cy.contains("Draft").should("be.visible");
    cy.get('[id^="button-row-options"]')
      .filter(":visible")
      .first()
      .should("be.visible")
      .click({ force: true });

    // ===== STEP 6: Klik "Upload Bupot" =====
    cy.contains("ul.list-options:visible li.option-item", "Upload Bupot")
      .should("be.visible")
      .click();

    // ===== STEP 7: Konfirmasi "Upload Bupot" =====
    cy.contains("button", "Upload Bupot")
      .should("be.visible")
      .click();

    // ===== STEP 8: Assertion sukses =====
    cy.contains("Permintaan Upload Bupot Berhasil").should("be.visible");

  });
});
