Cypress.Commands.add("closeModals", () => {
  // Tutup modal "Tutup" yang sedang tampil agar tidak menghalangi aksi.
  cy.get("body").then(($body) => {
    const buttons = $body.find('button:contains("Tutup")');
    if (buttons.length) {
      cy.wrap(buttons).each((btn) => cy.wrap(btn).click({ force: true }));
    }
  });
});

Cypress.Commands.add("selectCompany", (companyId) => {
  // Ganti perusahaan aktif lewat dropdown di navbar.
  cy.get(
    "#select-company-navbar > div.select-label.mr-auto.value-dropdown-company.card-view > div > svg"
  )
    .should("be.visible")
    .click({ force: true });

  cy.get("#select-company-navbar > div.select-options.list-plan.card-options")
    .should("be.visible");

  cy.contains(
    "div.select-option.card-option, label.select-box__option",
    companyId,
    { timeout: 10000 }
  )
    .scrollIntoView()
    .click({ force: true });

  cy.get(
    "#select-company-navbar > div.select-label.mr-auto.value-dropdown-company.card-view"
  )
    .should("be.visible")
    .and("contain", companyId);
});

Cypress.Commands.add("login", (email, password) => {
  // Login ke aplikasi; urutan langkah diatur di beforeEach pada spec.
  cy.visit("/login");

  cy.get('input[placeholder="email@anda.com"]').clear().type(email);

  cy.get('input[placeholder="Masukkan password"]')
    .clear()
    .type(password, { log: false });

  cy.contains("button", /^Masuk$/i).click();

  cy.url().should("include", "/dashboard");
  cy.closeModals();
});
