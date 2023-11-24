import Recipe, { RecipeDocument, Review } from '../src/model.js';
type MatchStage = {
  $match: { [key: string]: unknown };
};

type AddFieldsStage = {
  $addFields: { [key: string]: unknown };
};

type SortStage = {
  $sort: { [key: string]: 1 | -1 };
};

type SkipStage = {
  $skip: number;
};

type LimitStage = {
  $limit: number;
};

type AggregationStage = MatchStage | AddFieldsStage | SortStage | SkipStage | LimitStage;

interface Query {
  [key: string]: string | { $all: string[] } | { $regex: string; $options: string };
}

const resolvers = {
  Query: {
    getRecipes: async (
      _,
      { limit = 4, offset = 0, sort, tags, searchTerm },
    ): Promise<{ recipes: RecipeDocument[]; totalCount: number }> => {
      const query: Query = {};
      if (tags && tags.length > 0) {
        query['tags'] = { $all: tags };
      }
      if (searchTerm) {
        query['name'] = { $regex: searchTerm, $options: 'i' };
      }

      const pipeline: AggregationStage[] = [
        // Create the aggregation pipeline
        { $match: query },
        {
          $addFields: {
            averageRating: { $avg: '$reviews.rating' }, // Calculate the average rating
          },
        },
      ];

      if (sort === 'highest-rating') {
        pipeline.push({ $sort: { averageRating: -1 } });
      } else if (sort === 'alphabetical-order') {
        pipeline.push({ $sort: { name: 1 } });
      }

      pipeline.push({ $skip: offset }, { $limit: limit });

      try {
        const recipes = await Recipe.aggregate(pipeline);

        // Total number of recipes
        const totalRecipes = await Recipe.countDocuments(query);

        return {
          recipes,
          totalCount: totalRecipes,
        };
      } catch (error) {
        console.error(error);
        throw new Error('Error while fetching recipes');
      }
    },

    getRecipeById: async (parent, args: { id: number }) => {
      return Recipe.findOne({
        id: args.id,
      })
        .then((recipe: RecipeDocument | null) => {
          return recipe ? { ...recipe.toObject() } : null;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getRecipeByName: async (parent, args: { name: string }) => {
      return Recipe.findOne({ name: args.name })
        .then((recipe: RecipeDocument | null) => {
          return recipe ? { ...recipe.toObject() } : null;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  Mutation: {
    addRecipe: (
      parent,
      args: {
        name: string;
        imageUrl: string;
        description: string;
        ingredients: string[];
        instructions: string[];
        reviews: {
          rating: number;
          comment: string;
        }[];
      },
    ) => {
      const { name, imageUrl, description, ingredients, instructions, reviews } = args;
      const recipe = new Recipe({
        name,
        imageUrl,
        description,
        ingredients,
        instructions,
        reviews,
      });
      return recipe
        .save()
        .then((result: RecipeDocument) => {
          return { ...result.toObject() };
        })
        .catch((err) => {
          console.error(err);
        });
    },
    addReview: async (
      parent,
      args: {
        id: number;
        rating: number;
        comment: string;
      },
    ): Promise<RecipeDocument | null> => {
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
