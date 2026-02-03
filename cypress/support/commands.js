// Custom commands go here.

Cypress.Commands.add("setupEbupot", () => {
  // Login.
  cy.visit("/login");
  cy.get("body").then(($body) => {
    const emailInput = $body.find('input[placeholder="email@anda.com"]');
    if (emailInput.length) {
      cy.get('input[placeholder="email@anda.com"]')
        .clear()
        .type("pengentestefaktur@yopmail.com");

      cy.get('input[placeholder="Masukkan password"]')
        .clear()
        .type("aaAA11!!", { log: false });

      cy.contains("button", /^Masuk$/i).click();
    }
  });

  cy.url().should("include", "/dashboard");

  // Select company on dashboard.
  cy.get(
    "#select-company-navbar > div.select-label.mr-auto.value-dropdown-company.card-view > div > svg"
  )
    .should("be.visible")
    .click({ force: true });

  cy.get("#select-company-navbar > div.select-options.list-plan.card-options")
    .should("be.visible");

  cy.contains(
    "div.select-option.card-option, label.select-box__option",
    "0717166367077000",
    { timeout: 10000 }
  )
    .scrollIntoView()
    .click({ force: true });

  cy.get(
    "#select-company-navbar > div.select-label.mr-auto.value-dropdown-company.card-view"
  )
    .should("be.visible")
    .and("contain", "0717166367077000");

  // Stop at dashboard; navigation to CTAS is handled in spec to avoid redirects.
});
