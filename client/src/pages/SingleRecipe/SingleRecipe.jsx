import axios from 'axios';
import React, { useEffect,useState } from 'react';
import {useLocation, Link} from 'react-router-dom';
import './SingleRecipe.css';
import AddIngredient from '../../Components/AddIngredient/AddIngredient';

export default function SingleRecipe() {
  const location = useLocation();
  const [recipe, setRecipe] = useState({});
  const [kitchenFrom, setKitchenFrom]=useState({});
  const [ingreds,setIngreds] = useState([]);
  // const [logicRan, setLogicRan]=useState(false);

  useEffect(()=>{
    if(ingreds && ingreds.length === 0 && recipe && recipe.ingredient){
      console.log(recipe)
      setIngreds(recipe.ingredient);
    }
    // setLogicRan(true);
  },[recipe])

  useEffect(()=>{
    if(location.state?.recipe){
      const rec= location.state.recipe;
      axios.get(`/api/recipe/${rec}`)
        .then(response=>{
          setRecipe(response?.data);
        })
        .catch(err=>{
          console.log(err);
        })
    };
    if(location.state?.kitchenFrom){
      setKitchenFrom(location.state.kitchenFrom);
    };
  },[location]);

  return (
    <>
      {recipe && recipe?.kitchen && recipe?.kitchen.length !== 0 && kitchenFrom && kitchenFrom?.kitchenName && <Link className='marginBottomSmall' to={`/singlekitchen/${kitchenFrom?._id}`}>Back to {kitchenFrom.kitchenName} kitchen</Link>}

      <AddIngredient recipeId={recipe._id} from='SingleRecipe' ingreds={recipe.ingredient} setIngreds={setIngreds} id={kitchenFrom._id}></AddIngredient>

      <div>
        <h3>{recipe.recipeName}</h3>
        {/* {recipe && recipe?.ingredient && recipe.ingredient.length !== 0 && recipe.ingredient.map(i=>(
          <li className='ingredientList' key={i._id}>{i.name}    -    {i.type}</li>
        ))} */}
        {ingreds && ingreds.length !== 0 && ingreds.map(i=>(
          <li className='ingredientList' key={i._id}>{i.name}    -    {i.type}</li>
        ))}
      </div>
    </>
  )
}
