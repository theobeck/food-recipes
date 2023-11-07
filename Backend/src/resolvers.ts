import Recipe, { RecipeDocument } from '../src/model.js';


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
  },
};

export default resolvers;