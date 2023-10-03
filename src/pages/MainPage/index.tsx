import RecipeListItem from "../../components/RecipeItem";

interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
}

interface MainPageProps {
  recipes: Recipe[];
}

function MainPage(props: MainPageProps) {
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {props.recipes.map((recipe) => (
          <RecipeListItem key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
}

export default MainPage;
