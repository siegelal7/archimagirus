import React, { useEffect, useState } from "react";
import "./MakeMeal.css";
import Draggable from "react-draggable";
import GridLayout, {
  Responsive as ResponsiveGridLayout,
} from "react-grid-layout";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function MakeMeal() {
  const [ingreds, setIngreds] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [newIngred, setNewIngred] = useState({
    name: '',
    type:''
  });

  useEffect(() => {
    if (ingreds.length === 0) {
      axios.get('/api/getallingredients')
        .then(response=>{
            if(response.status==200){
                console.log(response);
                setIngreds(response.data);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    //   setIngreds(arr);
    }
  }, []);

  const handleStart = (e) => {
    console.log("start");
    console.log(e);
  };

  const handleDrag = (e) => {};

  const handleStop = (e) => {
    console.log("stop");
    console.log(e);
    const xAxis = e.pageX;
    if (xAxis >= 850) {
    }
  };

  const handleLayoutChange = (e) => {
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
    // setIngreds(ingredientsOnLeft);
    // console.log(ingredientsOnLeft);
    // console.log(recipeOnRight);
  };

  const handleCreateRecipe = (e) => {
    console.log(recipe);
    // console.log(ingreds);
  };

  const handleIngredInutChange = e =>{
        const val = e.target.value;
        if (val != ''){
            setNewIngred({name:val});
        }
  }

  const handleSelectChange = e=>{
    const valSelected = e?.target?.value;
    if(valSelected){
        setNewIngred({type:valSelected});
    }
  }

  const handleNewIngredSubmit = e =>{
    e.preventDefault();
    // const payload = {
    //     name: newIngred,
    //     quantity: 1
    // }
    axios.post('/api/newingredient', newIngred)
        .then(response=>{
            console.log(response);
            if(response.status==200){
                // setIngreds(...ingreds,[response.data]);
                setIngreds([...ingreds, response.data])
            }
        })
        .catch(err=>{
            console.log(err);
        })
  }

  // const layout = [
  //     { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
  //     { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  //   ];
  return (
    <>

      <Link to="/">Home</Link>
      <form onSubmit={handleNewIngredSubmit}>
        <label htmlFor="ingredientName">Ingredient name: </label>
        <input name='ingredientName' style={{marginLeft:'1rem'}} value={newIngred.name} type='text' onChange={handleIngredInutChange} />
        <label htmlFor="foodGroup">Food group: </label>
        <select id="foodGroup" name="foodGroup" onChange={handleSelectChange}>
            <option value="Meat">Meat</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Nut">Nut</option>
            <option value="Drink">Drink</option>
            <option value="Dairy">Dairy</option>
            <option value="Fish">Fish</option>
        </select>
      </form>
      {/* <div className='left'> */}
      <div className="grid">
        <h1 className="row-column">Ingredients</h1>
        {/* <input value={newIngred} type='text' onChange={handleIngredInutChange} /> */}
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
              <div className="padding" key={i._id+' '+i.name}>
                <Draggable
                  onStart={handleStart}
                  onDrag={handleDrag}
                  onStop={handleStop}
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
      <button onClick={handleCreateRecipe}>mmmmm</button>
    </>
  );
}
