import { Link } from 'react-router-dom';

interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
}
interface RecipeListItemProps {
  recipe: Recipe;
}

export default function RecipeListItem(props: RecipeListItemProps) {
  const { id, name, imageUrl } = props.recipe;

  return (
    <li key={id}>
      <Link to={`/recipe/${id}`}>
        <img src={imageUrl} alt={name} />
        {name}
      </Link>
    </li>
  );
}