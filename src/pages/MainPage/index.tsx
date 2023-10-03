import RecipeListItem from "../../components/RecipeItem";
import './index.css'

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
    <div className="main-page">
      <div className="container">
        <h1>Recipes</h1>
        <ul className="recipe-link">
          {props.recipes.map((recipe) => (
            <RecipeListItem key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      </div>

    </div>
  );
}

export default MainPage;
