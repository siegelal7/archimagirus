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
  // const [ingredsPlaceholder, setIngredsPlaceholder] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [recipeName,setRecipeName]=useState('');
  const [loginPleaseText, setLoginPleaseText]=useState('');
  const [newIngred, setNewIngred] = useState({
    name: '',
    type:'Meat',
    kitchen:id ? id : '',
  });

  const [layout,setLayout]=useState([])
      // { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
      // { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  useEffect(() => {
    if(!user && !localStorage.getItem('id') && !localStorage.getItem('token')){
      navigate('/login');
    }

    if (ingreds.length === 0) {
      axios.get(`/api/getallingredients/${id}`)
        .then(response=>{
            if(response.status==200){
              console.log(response);
                setIngreds(response.data);
                setLayout(response.data.length !== 0 && response.data.forEach(i=>{
                  let combined={
                    
                  }
                }))
                // setIngreds
            }
        })
        .catch(err=>{
            console.log(err);
        })
    //   setIngreds(arr);
    // setIngredsPlaceholder(ingreds);
    }
  }, []);

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

  const handleCreateRecipe = (e) => {
    // console.log(e);
    let payload={
      recipeName:recipeName,
      ingredient:[],
    }
    for(let i = 0; i<recipe.length;i++){
      let splitIngredArr=recipe[i]?.i.split('|');

      payload ={
        recipeName:payload.recipeName,
        ingredient:[...payload.ingredient, splitIngredArr[0]]
      };
    }

    if(payload.recipeName!='' && payload.ingredient.length !== 0){
      axios.post(`/api/makefood`,payload)
          .then(response=>{
            console.log(response);
            setRecipeName('');
            setRecipe([]);
          })
          .catch(error=>{
            console.log(error);
          });
    }
    
  };

  const handleIngredInputChange = e =>{
        const val = e.target.value;
        if (val != ''){
            setNewIngred({name:val, type:newIngred.type, kitchen: newIngred.kitchen});
        }
  }

  const handleSelectChange = e=>{
    const valSelected = e?.target?.value;
    if(valSelected){
        setNewIngred({type:valSelected, name:newIngred.name, kitchen: newIngred.kitchen});
    }
  };

  const handleRecipeNameChange = e=>{
    if(e.target.value!= recipeName){
      setRecipeName(e.target.value);
    }
  }

  const handleNewIngredSubmit = e =>{
    e.preventDefault();
    if(!newIngred.kitchen || newIngred.kitchen === ''){
      setLoginPleaseText('Login or create a kitchen to add an ingredient');
    } else if(newIngred.name === ''){
      setLoginPleaseText('Enter your ingredient name!');
    }
    if(newIngred.kitchen && newIngred.kitchen !== '' && newIngred.name !== ''){
      axios.post(`/api/newingredient/${id}`, newIngred)
        .then(response=>{
            if(response.status==200){
              setIngreds({type:'Meat', name:'', kitchen: newIngred.kitchen})
                // setIngreds(...ingreds,[response.data]);
                setIngreds([...ingreds, response.data])
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
  };


  // const layout = [
  //     { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
  //     { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  //   ];
  return (
    <>

      <Link to="/">Home</Link>
      <AddIngredient handleNewIngredSubmit={handleNewIngredSubmit} newIngred={newIngred} handleIngredInputChange={handleIngredInputChange} handleSelectChange={handleSelectChange} loginPleaseText={loginPleaseText}></AddIngredient>

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
      <input value={recipeName} onChange={handleRecipeNameChange} type='text' name='recipeName' />
      <button onClick={(e,layout)=>handleCreateRecipe(e,layout)}>mmmmm</button>
    </>
  );
}
