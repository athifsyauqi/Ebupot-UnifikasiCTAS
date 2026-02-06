describe("Ebupot Unifikasi - Search No Bupot", () => {
  const testData = {
    nomorBupot: "25000J6YQ",
    month: "12",
    year: "2025",
  };

  beforeEach(() => {
    cy.setupEbupot(); // Login + pilih company
  });

  it("should search nomor bupot", () => {
    // Step 1: Masuk ke fitur e-Bupot Unifikasi CTAS
    cy.get("#ebupot-unifikasi").should("be.visible");
    cy.get("#ebupot-unifikasi > div.flex.items-center.item-side-nav").click();
    cy.get("#ebupot-unifikasi > div.sub-child")
      .should("have.css", "opacity", "1")
      .and("be.visible");
    cy.contains(
      "#ebupot-unifikasi > div.sub-child",
      "e-Bupot Unifikasi CTAS"
    ).click();

    // Step 2: Pastikan tab PPh Dalam Negeri muncul
    cy.contains("button", "PPh Dalam Negeri").should("be.visible");

    // Step 3: Pilih periode (datepicker) - ikut pola dari ebupot-unifikasi-singleUpload
    const monthNames = {
      "01": "Januari",
      "02": "Februari",
      "03": "Maret",
      "04": "April",
      "05": "Mei",
      "06": "Juni",
      "07": "Juli",
      "08": "Agustus",
      "09": "September",
      "10": "Oktober",
      "11": "November",
      "12": "Desember",
    };
    const masaPajakValue = `${monthNames[testData.month]} ${testData.year}`;

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
    cy.contains("Masa Pajak")
      .parent()
      .find("input")
      .should("have.value", masaPajakValue);

    // Step 4: Cari nomor bupot
    cy.get('[data-test="base-form-input"]:visible')
      .first()
      .should("be.visible")
      .clear()
      .type(testData.nomorBupot);

    // Step 5: Klik tombol cari
    cy.get("button.button.button-line.button-xs")
      .should("be.visible")
      .click();
  });
});
