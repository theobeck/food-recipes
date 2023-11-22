describe('About Us Page', () => {
  it('should allow user to learn more about the team', () => {
    cy.visit('/');
    cy.contains('About us').click();
    cy.url().should('exist');
    // cy.get('[aria-label="Reject the use of cookies and other data for the puposes described"]').click();
  });
});
