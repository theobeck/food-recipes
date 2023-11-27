import RECIPES from '../../src/components/RecipeList/queries';
import GET_RECIPE from '../../src/pages/RecipeDetails/queries';
import ADD_REVIEW from '../../src/components/Review/queries';

describe('GraphQL API', () => {
  before(() => {
    cy.visit('/');
  });

  it('should return all the recipes from the database', () => {
    cy.request({
      url: 'http://localhost:4000/graphql',
      method: 'POST',
      body: {
        query: RECIPES.loc?.source.body,
        variables: {
          limit: 1,
          offset: 0,
          sort: 'name',
          tags: [],
          searchTerm: '',
        },
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.getRecipes.totalCount).to.eq(58);
    });
  });

  it('should return the correct data for "Beef Tacos" recipe', () => {
    cy.request({
      url: 'http://localhost:4000/graphql',
      method: 'POST',
      body: {
        query: GET_RECIPE.loc?.source.body,
        variables: {
          id: 49,
        },
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('getRecipeById');

      const { getRecipeById } = response.body.data;
      expect(getRecipeById).to.have.property('id').to.equal('49');
      expect(getRecipeById).to.have.property('name').to.equal('Beef Tacos');
      expect(getRecipeById)
        .to.have.property('imageUrl')
        .to.equal(
          'https://images.immediate.co.uk/production/volatile/sites/30/2021/02/Next-level-tacos-e163429.jpg?quality=90&webp=true&resize=375,341',
        );
      expect(getRecipeById)
        .to.have.property('description')
        .to.equal(
          "Beef Tacos are a beloved Mexican dish featuring seasoned ground beef, fresh toppings, and warm tortillas. They're perfect for a casual and customizable meal, allowing everyone to build their own tacos.",
        );
      expect(getRecipeById)
        .to.have.property('ingredients')
        .to.deep.equal([
          'Ground beef, seasoned with taco spices',
          'Taco shells or tortillas',
          'Lettuce, shredded',
          'Tomatoes, diced',
          'Cheddar cheese, grated',
          'Sour cream and salsa for toppings',
          'Guacamole, if desired',
        ]);
      expect(getRecipeById)
        .to.have.property('instructions')
        .to.deep.equal([
          'Brown the seasoned ground beef in a skillet until cooked through.',
          'Warm taco shells or tortillas in the oven.',
          'Assemble your tacos with lettuce, diced tomatoes, grated Cheddar cheese, sour cream, salsa, and guacamole.',
          'Enjoy your customizable Beef Tacos.',
        ]);
      expect(getRecipeById).to.have.property('tags').to.deep.equal(['mexican', 'taco', 'meat', 'beef']);
      expect(getRecipeById.reviews[0]).to.have.property('rating').to.equal(5);
      expect(getRecipeById.reviews[0]).to.have.property('comment').to.equal('Tacos with beef is something extra<3');
    });
  });

  it('should return null for a recipe that does not exist', () => {
    cy.request({
      url: 'http://localhost:4000/graphql',
      method: 'POST',
      body: {
        query: GET_RECIPE.loc?.source.body,
        variables: {
          id: 999,
        },
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('getRecipeById');
      expect(response.body.data.getRecipeById).to.be.null;
    });
  });

  it('should add a review to the "Beef Tacos" recipe', () => {
    cy.request({
      url: 'http://localhost:4000/graphql',
      method: 'POST',
      body: {
        query: ADD_REVIEW.loc?.source.body,
        variables: {
          id: 49,
          rating: 5,
          comment: "Look mom, I'm reviewing a recipe!",
        },
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('addReview');
      expect(response.body.data.addReview).to.have.property('id').to.equal('49');
    });
  });
});
