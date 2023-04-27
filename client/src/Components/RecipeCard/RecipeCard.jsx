import React, { useEffect, useState } from 'react';
import './RecipeCard.css';

export default function RecipeCard({recipeId, recipe, handleSingleRecipeCardClick}) {
  const [logicRan, setLogicRan]=useState(false);

  useEffect(()=>{
    if(!logicRan){
      console.log('recipe From recipeCard');
      console.log(recipeId);
      console.log('recipe');
      console.log(recipe);
    }
    setLogicRan(true);
  },[]);

  return (
  
    // <div className='container'>
      <div className='card' data-recipe={recipeId} data-id={recipeId} onClick={handleSingleRecipeCardClick}>
          <p>{recipe}</p>
      </div>
    // </div>
    
  )
}
