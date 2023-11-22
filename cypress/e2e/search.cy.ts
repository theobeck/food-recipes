describe('Search funcionality', () => {
  it('should allow a user to search for recipes and navigate to a specific recipe page', () => {
    // Opens the main page
    cy.visit('/');

    //Finds the search bar and types mango
    cy.get('[placeholder="Search"]').type('mango');

    //Clicks the Mango Sticky Rice recipe
    cy.contains('Mango Sticky Rice').click();

    //Checks that the page contains the right recipe title and that the url is correct
    cy.contains('Mango Sticky Rice').should('exist');
    cy.url().should('include', '/recipe/24');
  });
});
