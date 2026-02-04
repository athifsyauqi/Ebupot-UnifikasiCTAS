// cypress/e2e/WPDN/ebupot-unifikasi-GetDetailUploadGagal.cy.js

describe("Ebupot Unifikasi - GetDetail Upload Gagal", () => {
  beforeEach(() => {
    cy.setupEbupot();
  });

  it("should get detail for Upload Gagal", () => {
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

    cy.url().should("include", "/ctas-ebupot-unifikasi/pph-dalam-negeri/list");

    // Pilih Masa Pajak
    const masaPajakValue = "Februari 2026";
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

    // Filter status Upload Gagal
    cy.contains("div.badge", "Upload Gagal")
      .should("be.visible")
      .click();

    cy.wait(2000);

    cy.get("#button-row-options-0").should("be.visible").click();
    cy.get("body").then(($body) => {
      const $alerts = $body.find(".alert-notification-wrapper:visible");
      if ($alerts.length) {
        const $close = $alerts.find(
          'button, [aria-label="Close"], .close, .btn-close'
        );
        if ($close.length) {
          cy.wrap($close.first()).click({ force: true });
        }
      }
    });
    cy.get(
      "div.static-menu.right:nth-of-type(2) > div.flex > div:nth-of-type(2) > div.options.text-center > ul.list-options.shadow > li.option-item.text-left:nth-of-type(1)"
    )
      .should("be.visible")
      .click({ force: true });
  });
});
