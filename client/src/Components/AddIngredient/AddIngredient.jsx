import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./AddIngredient.css";

export default function AddIngredient({ from, setIngreds, ingreds, id, recipeId}) {
  const [loginPleaseText, setLoginPleaseText]=useState('');
  const [newIngred, setNewIngred] = useState({
    name: '',
    type:'Meat',
    kitchen:id ? id : '',
  });

  useEffect(()=>{
    if(newIngred.kitchen===''){
      setNewIngred({
        kitchen:id ? id :'',
        type:newIngred.type,
        name:newIngred.name
      });
    }
  },[id]);

  const handleIngredInputChange = e =>{
    const val = e.target.value;
    if (val != ''){
        setNewIngred({name:val, type:newIngred.type, kitchen: newIngred.kitchen});
    }
  };

  const handleSelectChange = e=>{
    const valSelected = e?.target?.value;
    if(valSelected){
        setNewIngred({type:valSelected, name:newIngred.name, kitchen: newIngred.kitchen});
    }
  };

  const handleNewIngredSubmit = e =>{
    e.preventDefault();
    if(!newIngred.kitchen || newIngred.kitchen === ''){
      setLoginPleaseText('Login or create a kitchen to add an ingredient');
    } else if(newIngred.name === ''){
      setLoginPleaseText('Enter your ingredient name!');
    }
    let endpoint = '';
    if(newIngred.kitchen && newIngred.kitchen !== '' && newIngred.name !== ''){
      if(from === 'SingleRecipe'){
        endpoint=`/api/newingredienttorecipe/${id}/${recipeId}`;
      }
      else if(from ==='MakeMeal'){
        endpoint=`/api/newingredient/${id}`;
      }
      axios.post(endpoint, newIngred)
        .then(response=>{
            if(response.status==200){
              console.log(response);
              setNewIngred({type:'Meat', name:'', kitchen: newIngred.kitchen});
              setIngreds([...ingreds, response.data?.ingredJson]);
                
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
  };
  return (
    <div>
        <form onSubmit={handleNewIngredSubmit}>
        <label htmlFor="ingredientName">Ingredient name: </label>
        <input name='ingredientName' style={{marginLeft:'1rem'}} value={newIngred.name} type='text' onChange={handleIngredInputChange} />
        <label className='sm-padding-lt' htmlFor="foodGroup">Food group: </label>
        <select value={newIngred.type}  id="foodGroup" name="foodGroup" onChange={handleSelectChange}>
            <option default value="Meat">Meat</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Nut">Nut</option>
            <option value="Drink">Drink</option>
            <option value="Dairy">Dairy</option>
            <option value="Fish">Fish</option>
            <option value="Starch">Starch</option>
        </select>
        <button className='basicButton' onClick={handleNewIngredSubmit}>Add ingredient</button>
      </form>
      {loginPleaseText !== '' && <p>{loginPleaseText}</p>}
    </div>
  )
}
