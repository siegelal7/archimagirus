import axios from 'axios';
import React, { useEffect,useState } from 'react';
import {useLocation, Link} from 'react-router-dom';
import './SingleRecipe.css';
import AddIngredient from '../../Components/AddIngredient/AddIngredient';
import Header from '../../Components/Header/Header';

export default function SingleRecipe() {
  const location = useLocation();
  const [recipe, setRecipe] = useState({});
  const [kitchenFrom, setKitchenFrom]=useState({});
  const [ingreds,setIngreds] = useState([]);
  const [cancelCode, setCancelCode]=useState(false);
  // const [logicRan, setLogicRan]=useState(false);

  useEffect(()=>{
    // if(!cancelCode){
    if(ingreds && ingreds.length === 0 && recipe && recipe.ingredient){
    console.log(recipe)
    setIngreds(recipe.ingredient);
    }
    // }
    
    // return ()=>{
    //   setCancelCode(true);
    // }
    // setLogicRan(true);
  },[recipe]);

  useEffect(()=>{
    // if(!cancelCode){
    console.log('ran!?!?');

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
    // };

    // return () =>{
    //   setCancelCode(true);
    // };
  },[location]);

  return (
    <>
      <Header currentPage='SingleRecipe' recipe={recipe} kitchenFrom={kitchenFrom}></Header>
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
