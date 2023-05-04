import React from 'react';
import './RecipeCard.css';

export default function RecipeCard({recipeId, recipe, handleSingleRecipeCardClick}) {

  return (
  
    // <div className='container'>
      <div className='card' data-recipe={recipeId} data-id={recipeId} onClick={handleSingleRecipeCardClick}>
          <p>{recipe}</p>
      </div>
    // </div>
    
  )
}
