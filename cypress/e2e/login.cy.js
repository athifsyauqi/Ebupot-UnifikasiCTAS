describe("Login", () => {
  it("shows an error with invalid credentials", () => {
    cy.visit("/login");

    cy.get("input[placeholder=\"email@anda.com\"]")
      .clear()
      .type("pengentestefaktur@yopmail.com");

    cy.get("input[placeholder=\"Masukkan password\"]")
      .clear()
      .type("wrongpass", { log: false });

    cy.contains("button", /^Masuk$/i).click();

    cy.contains("GAGAL MASUK, SILAHKAN COBA LAGI ATAU HUBUNGI ADMIN").should(
      "be.visible"
    );
    cy.url().should("include", "/login");
  });

  it("logs in with valid credentials", () => {
    cy.visit("/login");

    cy.get("input[placeholder=\"email@anda.com\"]")
      .clear()
      .type("pengentestefaktur@yopmail.com");

    cy.get("input[placeholder=\"Masukkan password\"]")
      .clear()
      .type("aaAA11!!", { log: false });

    cy.contains("button", /^Masuk$/i).click();

    cy.url().should("include", "/dashboard");
  });
});
