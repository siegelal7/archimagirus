import React, { useEffect,useState } from 'react';
import {useLocation, Link} from 'react-router-dom';

export default function SingleRecipe() {
  const location = useLocation();
  const [recipe, setRecipe] = useState({});
  const [kitchenFrom, setKitchenFrom]=useState('');

  useEffect(()=>{
    if(location.state?.recipe){
      console.log('here');
      console.log(location.state.recipe);
      setRecipe(location.state.recipe);
    }
    if(location.state?.kitchenFrom){
      setKitchenFrom(location.state.kitchenFrom);
    }
  },[location]);

  return (
    <>
      {recipe && recipe?.kitchen && recipe?.kitchen.length !== 0 && kitchenFrom && kitchenFrom?.kitchenName && <Link to={`/singlekitchen/${recipe?.kitchen[0]}`}>Back to {kitchenFrom.kitchenName} kitchen</Link>}
      <div>SingleRecipe</div>
    </>
  )
}
