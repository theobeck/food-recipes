describe('Filtering', () => {
  beforeEach(() => {
    // Open the main page
    cy.visit('/');

    // Get the filter component and the list of recipes and save them as aliases
    cy.get('[data-testid="filter"]').as('filter');
    cy.get('[data-testid="recipeListItem"]').as('recipeListItem');
  });

  it('should allow a user to filter recipes by category, then remove filtering again', () => {
    // Save the first recipe name to assert later
    const firstRecipe = 'Pasta Primavera';
    cy.get('@recipeListItem').first().should('contain.text', firstRecipe);

    // Click on the "Dessert" filter button
    cy.get('@filter').contains('Dessert').click();

    // Check if the first recipe is not the same as before
    cy.get('@recipeListItem').first().should('contain.text', 'Chocolate Chip Cookies');
    cy.get('@recipeListItem').first().should('not.contain.text', firstRecipe);

    // Click on the "Dessert" filter button again to remove the filter
    cy.get('@filter').contains('Dessert').click();

    // Check if the first recipe is back to being the recipe orginally at the top
    cy.get('@recipeListItem').first().should('contain.text', firstRecipe);
  });

  it('should allow a user to filter recipes by several categories simultaneouly', () => {
    // Click on the "Chicken" and "Asian" filter button
    cy.get('@filter').contains('Chicken').click();
    cy.get('@filter').contains('Asian').click();

    cy.get('@recipeListItem').first().should('contain.text', 'Kung Pao Chicken');

    cy.get('[aria-haspopup="listbox"]').click();
    cy.get('[aria-haspopup="listbox"]').siblings('.Dropdown-menu').contains('Alphabetical Order').click();

    cy.get('@recipeListItem').first().should('contain.text', 'Chicken Tikka Masala');
  });
});
