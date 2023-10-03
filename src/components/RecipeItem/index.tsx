
export default function RecipeItem({ recipe }: { recipe: Recipe }) {
  return (
    <div className="recipe-item">
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
    </div>
  )
}