import React from 'react';
import './RecipeCard.css';

export default function RecipeCard({recipe,handleSingleRecipeCardClick}) {
  return (
    <div className='card' data-recipe={JSON.stringify(recipe)} data-id={recipe._id} onClick={handleSingleRecipeCardClick}>
        <p>{recipe.recipeName}</p>
    </div>
  )
}
