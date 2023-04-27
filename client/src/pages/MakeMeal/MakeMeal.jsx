import React, { useEffect, useState,useContext } from "react";
import "./MakeMeal.css";
import Draggable from "react-draggable";
import GridLayout, {
  Responsive as ResponsiveGridLayout,
} from "react-grid-layout";
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../../Context/UserContext";
import AddIngredient from "../../Components/AddIngredient/AddIngredient";
// import DraggableGrid from "../../Components/DraggableGrid/DraggableGrid";

export default function MakeMeal() {

  const navigate=useNavigate();

  const {user} =useContext(UserContext);
  const {id}=useParams();
  const [ingreds, setIngreds] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [recipeName,setRecipeName]=useState('');
  const [kitchenName,setKitchenName]=useState('');

  // const [layout,setLayout]=useState([])
      // { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
      // { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  useEffect(() => {
    if(!user && !localStorage.getItem('id') && !localStorage.getItem('token')){
      navigate('/login');
    }

    if (ingreds.length === 0 && id) {
      getIngreds(id);
    }
  }, []);

  useEffect(()=>{
    if(kitchenName == undefined || kitchenName == null){
      axios.get(`/api/getkitchensbyid/${id}`)
        .then(response=>{
          if(response.status==200 || response.status==304){
            setKitchenName(response.data.kitchenName)
          }
        })
        .catch(err=>{
          console.log(err);
        })
    }
  },[kitchenName]);

  const getIngreds = (id)=>{
    setIngreds([]);
    axios.get(`/api/getallingredients/${id}`)
    .then(response=>{
        if(response.status==200){
          console.log(response);
            setIngreds(response.data);
            setKitchenName(response.data[0]?.kitchen?.kitchenName);
        }
    })
  };


  const handleLayoutChange = (e) => {
    console.log(e);
    const ingredientsOnLeft = [];
    const recipeOnRight = [];
    for (let i = 0; i < e.length; i++) {
      if (e[i]?.x === 0) { 
        // console.log("on left");
        ingredientsOnLeft.push(e[i]);
      } else if (e[i]?.x === 1) {
        // console.log("on right");
        recipeOnRight.push(e[i]);
      }
    }
    setRecipe(recipeOnRight);
  };

  const handleRecipeNameChange = e=>{
    if(e.target.value!= recipeName){
      setRecipeName(e.target.value);
    }
  };

  const handleCreateRecipe = (e) => {
    e.preventDefault();
    // console.log(e);
    let payload={
      recipeName:recipeName,
      ingredient:[],
      kitchen:id
    }
    for(let i = 0; i<recipe.length;i++){
      let splitIngredArr=recipe[i]?.i.split('|');

      payload ={
        recipeName:payload.recipeName,
        ingredient:[...payload.ingredient, splitIngredArr[0]],
        kitchen:payload.kitchen
      };
    }

    if(payload.recipeName!='' && payload.ingredient.length !== 0 && payload.kitchen){
      axios.post(`/api/makefood/${payload.kitchen}`,payload)
          .then(response=>{
            console.log(response);
            setRecipeName('');
            setRecipe([]);
            getIngreds(id);
          })
          .catch(error=>{
            console.log(error);
          });
    }
    
  };


  // const layout = [
  //     { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
  //     { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  //   ];
  return (
    <>

      <Link className="basicLink" to="/">Home</Link>
      {kitchenName != '' && <Link className="basicLink" to={`/singlekitchen/${id}`}>Back to {kitchenName} kitchen</Link>}
      <AddIngredient from='MakeMeal' ingreds={ingreds} setIngreds={setIngreds} id={id}></AddIngredient>

      <div className="grid">
        <h1 className="row-column">Ingredients</h1>
        {/* <input value={newIngred} type='text' onChange={handleIngredInputChange} /> */}
        <h1 className="row-column">Recipe</h1>
      </div>
      <GridLayout
        onLayoutChange={handleLayoutChange}
        className="layout"
        cols={2}
        rowHeight={30}
        width={1500}
      >
        {/* <div className='left'> */}

        {ingreds.length !== 0 &&
          ingreds.map((i) => {
            return (
              // <DraggableGrid key={i._id+' '+i.name} i={i}></DraggableGrid>
              <div className="padding" key={i._id+'|'+i.name + '|'+i.type}>
                <Draggable
                  grid={[20, 500]}
                >
                  <div className="row-column" id="ingredients">
                    {i.name}
                  </div>
                </Draggable>
              </div>
            );
          })}
      </GridLayout>
      <form onSubmit={(e)=>handleCreateRecipe(e)}>
        <input value={recipeName} onChange={handleRecipeNameChange} type='text' name='recipeName' />
        <button onClick={(e)=>handleCreateRecipe(e)}>mmmmm</button>
      </form>
    </>
  );
}
