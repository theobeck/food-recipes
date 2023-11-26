describe('Reviewing', () => {
  it('should allow a user to review a recipe', () => {
    // Open the main page
    cy.visit('/');

    // Find the search bar and type 'alfredo'
    cy.get('[placeholder="Search"]').type('alfredo');

    // Click the Chicken Alfredo recipe
    cy.get('[data-testid="recipeListItem"]').contains('Chicken Alfredo').click();

    // Find the reviews component and save it as an alias
    cy.get('[data-testid="reviews"]').as('reviews');

    // Write a review and check that the number of reviews has increased by 1
    cy.get('@reviews')
      .find('ul')
      .children()
      .its('length')
      .then((reviewsCount) => {
        cy.get('@reviews').find('.rating').children().first().children().eq(3).click();
        cy.get('[placeholder="Add a review"]').type("Look mom, I'm reviewing a recipe!");
        cy.get('[data-testid="submitReview"]').click();

        cy.get('@reviews')
          .find('ul')
          .children()
          .should('have.length', reviewsCount + 1);
      });
  });
});
