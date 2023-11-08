# Documentation

## Project Description

We have chosen to create a page for recipes. On the main page, the user is presented with a list of dish names along with corresponding images. To view more dishes, the user can click a button that loads additional items. The user can then select a desired dish, which redirects them to a page containing the recipe for preparing this dish. Here, both the list of ingredients and the preparation steps are provided.

Additionally, we have implemented several more features. Within each individual recipe, users are able to leave a review of the recipe, including a star rating out of five and a comment. On the main page, there is also be the capability to filter for vegatarian recipes, and users can search for specific recipes.

MainPage retrieves all the recipes from the database using GraphQL queries. RecipeDetails retrieves the recipe details from the database using GraphQL queries. RecipeDetails also allows users to leave reviews for the recipe, which are stored in the database using GraphQL mutations.

## How to run

1. Open a terminal and navigate to the Backend folder.
2. Run `npm install` to install all dependencies.
3. Run `npm start` to start the server.
4. Open antoher terminal and navigate to the project directory.
5. Run `npm install` to install all dependencies.
6. Run `npm run dev` to start the application.
7. Enjoy the application!
