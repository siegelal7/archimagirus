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
  const [loginPleaseText, setLoginPleaseText]=useState('');
  const [newIngred, setNewIngred] = useState({
    name: '',
    type:'Meat',
    kitchen:id ? id : '',
  });

  useEffect(() => {
    if(!user && !localStorage.getItem('id') && !localStorage.getItem('token')){
      navigate('/login');
    }

    if (ingreds.length === 0) {
      axios.get(`/api/getallingredients/${id}`)
        .then(response=>{
            if(response.status==200){
                setIngreds(response.data);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    //   setIngreds(arr);
    }
  }, []);

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
  };

  const handleCreateRecipe = (e) => {
    console.log(recipe);
    // console.log(ingreds);
  };

  const handleIngredInutChange = e =>{
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
    
  }

  // const layout = [
  //     { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
  //     { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  //   ];
  return (
    <>

      <Link to="/">Home</Link>
      <AddIngredient handleNewIngredSubmit={handleNewIngredSubmit} newIngred={newIngred} handleIngredInutChange={handleIngredInutChange} handleSelectChange={handleSelectChange} loginPleaseText={loginPleaseText}></AddIngredient>

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
              // <DraggableGrid key={i._id+' '+i.name} i={i}></DraggableGrid>
              <div className="padding" key={i._id+' | '+i.name + ' | '+i.type}>
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
      <button onClick={handleCreateRecipe}>mmmmm</button>
    </>
  );
}
