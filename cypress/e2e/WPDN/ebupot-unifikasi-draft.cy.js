describe("Ebupot Unifikasi - Draft", () => {
  it("logs in", () => {
    const nitkuValue =
      Cypress.env("NITKU_VALUE") ||
      "NAMA0717166367077000 - 0717166367077000000000";

    const getNextDocNumber = () => {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, "0");
      const d = String(now.getDate()).padStart(2, "0");
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");

      return `TEST/CYPRESS/${y}${m}${d}-${hh}${mm}`;
    };

    const closeDatepicker = () => {
      cy.get("body").click(0, 0);
      cy.get("body").type("{esc}");
    };

    const inputTanggalDokumen = (hari, bulan, tahun) => {
      const bulanAngka = {
        Januari: "01",
        Februari: "02",
        Maret: "03",
        April: "04",
        Mei: "05",
        Juni: "06",
        Juli: "07",
        Agustus: "08",
        September: "09",
        Oktober: "10",
        November: "11",
        Desember: "12",
      };

      if (!bulanAngka[bulan]) {
        throw new Error(`Bulan tidak dikenali: ${bulan}`);
      }

      const tanggalFormat = `${tahun}/${bulanAngka[bulan]}/${String(hari).padStart(2, "0")}`;

      cy.get('input[name="tanggal-dokumen"]')
        .should("be.visible")
        .clear()
        .type(tanggalFormat);
    };

    cy.visit("/login");

    // Step 1: Login
    cy.get('input[placeholder="email@anda.com"]')
      .clear()
      .type("pengentestefaktur@yopmail.com");

    cy.get('input[placeholder="Masukkan password"]')
      .clear()
      .type("aaAA11!!", { log: false });

    cy.contains("button", /^Masuk$/i).click();

    // Step 2: Pastikan sudah di dashboard
    cy.url().should("include", "/dashboard");

    // Step 3: Buka dropdown company
    cy.get(
      "#select-company-navbar > div.select-label.mr-auto.value-dropdown-company.card-view > div > svg"
    )
      .should("be.visible")
      .click({ force: true });

    cy.get("#select-company-navbar > div.select-options.list-plan.card-options")
      .should("be.visible");

    // Step 4: Pilih company
    cy.contains(
      "div.select-option.card-option, label.select-box__option",
      "0717166367077000",
      { timeout: 10000 }
    )
      .scrollIntoView()
      .click({ force: true });

    // Step 5: Verifikasi company aktif
    cy.get(
      "#select-company-navbar > div.select-label.mr-auto.value-dropdown-company.card-view"
    )
      .should("be.visible")
      .and("contain", "0717166367077000");

    // Step 6: Tunggu menu e-Bupot Unifikasi muncul setelah switch company
    cy.get("#ebupot-unifikasi").should("be.visible");

    // Step 7: Buka menu e-Bupot Unifikasi (expand dropdown)
    cy.get("#ebupot-unifikasi > div.flex.items-center.item-side-nav")
      .click();

    // Step 8: Tunggu submenu benar-benar terbuka
    cy.get("#ebupot-unifikasi > div.sub-child")
      .should("have.css", "opacity", "1")
      .and("be.visible");

    // Step 9: Klik submenu e-Bupot Unifikasi CTAS
    cy.contains(
      "#ebupot-unifikasi > div.sub-child",
      "e-Bupot Unifikasi CTAS"
    ).click();

    // Step 10: Klik menu Rekam Bukti Potong
    cy.contains("Rekam Bukti Potong").should("be.visible").click();

    const docNumber = getNextDocNumber();

    // Step 11: Tanggal Pemotongan
    cy.get('input[name="tanggal-pemotongan"]').should("be.visible").click();

    cy.get('[role="dialog"]')
      .should("be.visible")
      .first()
      .within(() => {
        cy.contains('[role="gridcell"]', /^1$/).click();
      });

    closeDatepicker();

    // Tanggal bisa mengikuti bulan yang sedang aktif di datepicker
    cy.get('input[name="tanggal-pemotongan"]')
      .invoke("val")
      .should((val) => {
        expect(val).to.match(/^01\s+\w+\s+2026$/);
      });

    // Step 12: Masa Pajak
    cy.get('input[aria-label="Datepicker input"]')
      .eq(1)
      .should("be.visible")
      .click();

    cy.get('[role="dialog"]')
      .should("be.visible")
      .first()
      .within(() => {
        cy.get('button[aria-label="Previous year"]').click();
        cy.contains('[role="gridcell"]', "Des").click();
      });

    cy.get("body").click(0, 0);

    cy.get('input[aria-label="Datepicker input"]')
      .eq(1)
      .should("have.value", "Desember 2025");

    // Step 13: Lawan Dipotong
    cy.get('input[placeholder="Pilih Lawan Dipotong"]')
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });

    cy.get("div.dropdown-content:visible")
      .should("be.visible")
      .within(() => {
        cy.get("input").clear().type("0941650236023000");
      });

    cy.contains(
      "div.pr-3.text-left, label.select-box__option",
      "NAMA0941650236023000 - 0941650236023000"
    ).click();

    cy.get('input[placeholder="Pilih Lawan Dipotong"]').should(
      "have.value",
      "NAMA0941650236023000 - 0941650236023000"
    );

    // Step 14: Jenis Pajak
    cy.get('input[placeholder="Pilih jenis pajak"]')
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });

    cy.get("div.dropdown-content:visible")
      .should("be.visible")
      .contains("div.pr-3.text-left, label.select-box__option", "Pasal 23")
      .click({ force: true });

    cy.get('input[placeholder="Pilih jenis pajak"]').should(
      "have.value",
      "Pasal 23"
    );

    // Step 15: Kode Objek Pajak
    cy.get('input[placeholder="Pilih objek pajak"]')
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });

    cy.get("div.dropdown-content:visible")
      .should("be.visible")
      .within(() => {
        cy.get('input[placeholder="Cari"]').clear().type("24-104-08");
        cy.contains(
          "div.pr-3.text-left, label.select-box__option",
          "24-104-08 Jasa Arsitektur"
        ).click({ force: true });
      });

    cy.get('input[placeholder="Pilih objek pajak"]').should(
      "have.value",
      "24-104-08 Jasa Arsitektur"
    );

    // Step 16: Jumlah Penghasilan Bruto
    cy.get("#inputCurrency")
      .scrollIntoView()
      .should("be.visible")
      .clear()
      .type("100000");

    // Step 17: Tambah Dokumen
    cy.get("#button-tambah-dokref")
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.get('input[placeholder="Pilih Jenis Dokumen"]')
      .should("be.visible")
      .click({ force: true });
    cy.get("div.dropdown-content:visible")
      .should("be.visible")
      .contains("div, label, span", "Pengumuman")
      .click({ force: true });

    // Step 18: Nomor Dokumen
    cy.get('input[placeholder="Nomor Dokumen"]')
      .should("be.visible")
      .clear()
      .type(docNumber);

    // Step 19: Tanggal Dokumen
    inputTanggalDokumen("1", "Januari", "2026");

    // Step 20: Simpan tanggal dokumen (jika ada modal datepicker dengan tombol Simpan)
    cy.get("body").then(($body) => {
      const simpanBtn = $body.find('button:contains("Simpan")');
      if (simpanBtn.length) {
        cy.wrap(simpanBtn).filter(":visible").first().click({ force: true });
      }
    });

    // Step 21: NITKU
    const pilihNitku = (value) => {
      cy.get('input[placeholder="Pilih NITKU"]')
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      cy.get("div.dropdown-content:visible")
        .should("be.visible")
        .within(() => {
          cy.get('input[placeholder="Cari"]')
            .scrollIntoView()
            .clear({ force: true })
            .type(value, { force: true });
          cy.contains("div.pr-3.text-left, label.select-box__option", value)
            .scrollIntoView()
            .click({ force: true });
        });

      cy.get('input[placeholder="Pilih NITKU"]').should("have.value", value);
    };

    pilihNitku(nitkuValue);

    // Step 21: Simpan Bukti Potong
    cy.get("#button-simpan-bupot")
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.contains("Bupot berhasil dibuat").should("be.visible");

  });
});
