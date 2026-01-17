describe("Ebupot Unifikasi - Rekam Bupot", () => {
  const closeModals = () => {
    cy.get("body").then(($body) => {
      const buttons = $body.find('button:contains("Tutup")');
      if (buttons.length) {
        cy.wrap(buttons).each((btn) => {
          cy.wrap(btn).click({ force: true });
        });
      }
    });
  };

  const selectCompany = () => {
    cy.get(
      "#select-company-navbar > div.select-label.mr-auto.value-dropdown-company.card-view > div > svg"
    )
      .should("be.visible")
      .click({ force: true });

    cy.get(
      "#select-company-navbar > div.select-options.list-plan.card-options"
    )
      .should("be.visible")
      .within(() => {
        cy.contains("div.select-option.card-option", "0717166367077000")
          .scrollIntoView()
          .click({ force: true });
      });

    cy.get(
      "#select-company-navbar > div.select-label.mr-auto.value-dropdown-company.card-view"
    )
      .should("be.visible")
      .and("contain", "0717166367077000");
  };

  beforeEach(() => {
    cy.visit("/login");

    cy.get("input[placeholder=\"email@anda.com\"]")
      .clear()
      .type("pengentestefaktur@yopmail.com");

    cy.get("input[placeholder=\"Masukkan password\"]")
      .clear()
      .type("aaAA11!!", { log: false });

    cy.contains("button", /^Masuk$/i).click();

    cy.url().should("include", "/dashboard");
    closeModals();
  });

  it("switches company and opens Rekam Bukti Potong", () => {
    selectCompany();

    cy.visit("/ctas-ebupot-unifikasi");
    closeModals();
    cy.get(
      "#select-company-navbar > div.select-label.mr-auto.value-dropdown-company.card-view"
    ).then(($label) => {
      if (!$label.text().includes("0717166367077000")) {
        selectCompany();
      }
    });
    cy.contains("button", "PPh Dalam Negeri").click();
    cy.get("#button-rekam-bupot").click();
    closeModals();

    // ===== TANGGAL PEMOTONGAN =====
cy.get('input[name="tanggal-pemotongan"]')
  .should('be.visible')
  .click();

cy.get('[role="dialog"]')
  .should('be.visible')
  .first()
  .within(() => {
    cy.contains('[role="gridcell"]', /^1$/).click();
  });

// tutup datepicker
cy.get('body').click(0, 0);
cy.get('body').type('{esc}');

// assertion value
cy.get('input[name="tanggal-pemotongan"]')
  .should('have.value', '01 Januari 2026');


// ===== MASA PAJAK =====
cy.get('input[aria-label="Datepicker input"]')
  .eq(1) // pastikan input ke-2 (karena ada 2 datepicker)
  .should('be.visible')
  .click();

cy.get('[role="dialog"]')
  .should('be.visible')
  .first()
  .within(() => {
    cy.get('button[aria-label="Previous year"]').click();
    cy.contains('[role="gridcell"]', 'Des').click();
  });

// tutup datepicker
cy.get('body').click(0, 0);

    // assertion value
    cy.get('input[aria-label="Datepicker input"]')
      .eq(1)
      .should('have.value', 'Desember 2025'); 

    // ===== LAWAN DIPOTONG =====
  closeModals();
  cy.get('input[placeholder="Pilih Lawan Dipotong"]')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });

cy.get('div.dropdown-content:visible')
  .should('be.visible')
  .within(() => {
    cy.get('input')
      .clear()
      .type('0941650236023000');
  });

cy.contains(
  'div.pr-3.text-left, label.select-box__option',
  'NAMA0941650236023000 - 0941650236023000'
).click();

cy.get('input[placeholder="Pilih Lawan Dipotong"]')
  .should('have.value', 'NAMA0941650236023000 - 0941650236023000');

    // ===== JENIS PAJAK =====
  closeModals();
  cy.get('input[placeholder="Pilih jenis pajak"]')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });

  cy.get('div.dropdown-content:visible')
    .should('be.visible')
    .contains('div.pr-3.text-left, label.select-box__option', 'Pasal 23')
    .click({ force: true });

  cy.get('input[placeholder="Pilih jenis pajak"]')
    .should('have.value', 'Pasal 23');

    // ===== KODE OBJEK PAJAK =====
  closeModals();
  cy.get('input[placeholder="Pilih objek pajak"]')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });

  cy.get('div.dropdown-content:visible')
    .should('be.visible')
    .within(() => {
      cy.get('input[placeholder="Cari"]')
        .clear()
        .type('24-104-08');
      cy.contains(
        'div.pr-3.text-left, label.select-box__option',
        '24-104-08 Jasa Arsitektur'
      ).click({ force: true });
    });

  cy.get('input[placeholder="Pilih objek pajak"]')
    .should('have.value', '24-104-08 Jasa Arsitektur');

    // ===== JUMLAH PENGHASILAN BRUTO =====
  closeModals();
  cy.get('#inputCurrency')
    .scrollIntoView()
    .should('be.visible')
    .clear()
    .type('100000');

    // ===== TAMBAH DOKUMEN =====
  cy.get('#button-tambah-dokref')
    .scrollIntoView()
    .should('be.visible')
    .click();

  const pilihJenisDokumen = (jenis) => {
    cy.get('input[placeholder="Pilih Jenis Dokumen"]')
      .should('be.visible')
      .click({ force: true });
    cy.get('div.dropdown-content:visible')
      .should('be.visible')
      .contains('div, label, span', jenis)
      .click({ force: true });
  };

  pilihJenisDokumen('Pengumuman');

  // ===== NOMOR DOKUMEN =====

  cy.get('input[placeholder="Nomor Dokumen"]')
    .should('be.visible')
    .clear()
    .type('TEST-001');

  // ===== TANGGAL DOKUMEN =====
  const inputTanggal = (hari, bulan, tahun) => {
    const bulanAngka = {
      Januari: '01',
      Februari: '02',
      Maret: '03',
      April: '04',
      Mei: '05',
      Juni: '06',
      Juli: '07',
      Agustus: '08',
      September: '09',
      Oktober: '10',
      November: '11',
      Desember: '12',
    };

    if (!bulanAngka[bulan]) {
      throw new Error(`Bulan tidak dikenali: ${bulan}`);
    }

    const tanggalFormat = `${tahun}/${bulanAngka[bulan]}/${String(hari).padStart(2, '0')}`;

    cy.get('input[name="tanggal-dokumen"]')
      .should('be.visible')
      .clear()
      .type(tanggalFormat);
  };

  inputTanggal('1', 'Januari', '2026');

  // ===== SIMPAN DOKUMEN =====
  cy.get('#button-simpan-dokref')
    .scrollIntoView()
    .should('be.visible')
    .click();

  

  });
}); 
    
