describe('Pagination', () => {
  it('should browse different pages and choose one', () => {
    cy.visit('/');
    // Get the pagination component locator
    cy.get('[data-testid="pagination"]').as('pagination');

    // Assert that the page 1 is the one currently active
    cy.get('@pagination').contains('1').should('have.attr', 'aria-current');

    const firstRecipe = 'Pasta Primavera';

    // Assert that 'Pasta Primavera' is the first recipe at page 1
    cy.get('[data-testid="recipeList"]').contains(firstRecipe).should('exist');

    // Assert that the previous page button is disabled
    cy.get('@pagination').get('ul li:first-child button').should('have.attr', 'disabled');

    // Click on page 5 button
    cy.get('@pagination').contains('5').click();

    // Click the next page button
    cy.get('@pagination').get('ul li:last-child button').click();

    // Assert that the page 6 is the one currently active
    cy.get('@pagination').contains('6').should('have.attr', 'aria-current');

    // Assert that the previous page button is enabled
    cy.get('@pagination').get('ul li:first-child button').should('not.have.attr', 'disabled');

    // Assert that 'Pasta Primavera' is not the first recipe at page 6
    cy.get('[data-testid="recipeList"]').contains(firstRecipe).should('not.exist');
  });
});
