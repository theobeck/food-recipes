import Recipe, { RecipeDocument, Review } from '../src/model.js';


const resolvers = {
  Query: {
    getAllRecipes: async () => {
      try {
        const recipes = await Recipe.find({});
        return recipes.map((recipe: RecipeDocument) => ({ ...recipe.toObject() }));
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getRecipeById: async (parent, args: { id: number }) => {
      return Recipe.findOne({
        id: args.id,
      }).then((recipe: RecipeDocument | null) => {
        return recipe ? { ...recipe.toObject() } : null;
      }).catch(err => {
        console.error(err);
      });
    },
    getRecipeByName: async (parent, args: { name: string }) => {
      return Recipe.findOne({ name: args.name }).then((recipe: RecipeDocument | null) => {
        return recipe ? { ...recipe.toObject() } : null;
      }).catch(err => {
        console.error(err);
      });
    },
    getAllVegetarianRecipes: async () => {
      return Recipe.find({ vegetarian: true}).then((recipes: RecipeDocument[]) => {
        return recipes.map((recipe: RecipeDocument) => ({ ...recipe.toObject() }));
      }).catch(err => {
        console.error(err);
      });
    }
  },
  Mutation: {
    addRecipe: (parent, args: {
      name: string;
      imageUrl: string;
      description: string;
      ingredients: string[];
      instructions: string[];
      reviews: {
        rating: number;
        comment: string;
      }[];
    }) => {
      const { name, imageUrl, description, ingredients, instructions, reviews } = args;
      const recipe = new Recipe({
        name,
        imageUrl,
        description,
        ingredients,
        instructions,
        reviews,
      });
      return recipe.save().then((result: RecipeDocument) => {
        return { ...result.toObject() };
      }).catch(err => {
        console.error(err);
      });
    },
    addReview: async (parent, args: {
      
      id: number;
      rating: number;
      comment: string;

    }): Promise<RecipeDocument | null> => {
      const { id, rating, comment } = args;
      try {
        const recipe = await Recipe.findOne({ id: id });
        if (!recipe) {
          throw new Error(`Recipe with ID ${id} not found`);
        }
        // Create a new review and add it to the recipe's reviews array
        const newReview: Review = { rating, comment };
        recipe.reviews.push(newReview);
        const result = await recipe.save();
        return { ...result.toObject() };
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
};

export default resolvers;
