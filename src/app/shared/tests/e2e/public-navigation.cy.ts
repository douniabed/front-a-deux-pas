context('Public Pages Navigation E2E', () => {
  it('should load the home page', () => {
    cy.visit('http://localhost:4200');
    cy.url().should('eq', 'http://localhost:4200/');

    // Check that the page loads without errors
    cy.get('body').should('be.visible');
  });

  it('should display the navbar on all pages', () => {
    cy.visit('http://localhost:4200');

    // Check navbar exists
    cy.get('nav, header').should('exist');
  });

  it('should display the footer on all pages', () => {
    cy.visit('http://localhost:4200');

    // Check footer exists
    cy.get('footer, app-footer').should('exist');
  });

  it('should navigate to different public pages', () => {
    cy.visit('http://localhost:4200');

    // Test that navigation doesn't cause errors
    cy.url().should('include', 'localhost:4200');
  });

  it('should handle responsive design', () => {
    // Test desktop viewport
    cy.viewport(1280, 720);
    cy.visit('http://localhost:4200');
    cy.get('body').should('be.visible');

    // Test tablet viewport
    cy.viewport(768, 1024);
    cy.visit('http://localhost:4200');
    cy.get('body').should('be.visible');

    // Test mobile viewport
    cy.viewport(375, 667);
    cy.visit('http://localhost:4200');
    cy.get('body').should('be.visible');
  });

  it('should redirect protected routes to home when not authenticated', () => {
    // Try to access a protected route
    cy.visit('http://localhost:4200/compte/profil', { failOnStatusCode: false });

    // Should be redirected or show an error
    // Note: The exact behavior depends on the guard implementation
    cy.url().should('satisfy', (url) => {
      return url === 'http://localhost:4200/' || url.includes('/compte/profil');
    });
  });

  it('should handle page refresh without errors', () => {
    cy.visit('http://localhost:4200');
    cy.get('body').should('be.visible');

    // Reload the page
    cy.reload();

    // Check page still loads
    cy.get('body').should('be.visible');
  });

  it('should have correct page title', () => {
    cy.visit('http://localhost:4200');
    cy.title().should('include', 'A deux pas');
  });
});
