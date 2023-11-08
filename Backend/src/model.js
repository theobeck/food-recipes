import mongoose from 'mongoose';
const { Schema } = mongoose;

const recipesSchema = new Schema({
  id: {
    type: Number,
    required: true, // You can add more validation as needed
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  vegetarian: {
    type: Boolean,
    required: false,
  },
  reviews: [
    // Subdocument schema for reviews
    new Schema({
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
    }),
  ],
});

const Recipe = mongoose.model('Recipe', recipesSchema, 'Recipes');

export default Recipe;
