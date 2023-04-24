import React from 'react';
import "./AddIngredient.css"

export default function AddIngredient({handleNewIngredSubmit, newIngred, handleIngredInputChange, handleSelectChange, loginPleaseText}) {
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
        </select>
        <button className='basicButton' onClick={handleNewIngredSubmit}>Add ingredient</button>
      </form>
      {loginPleaseText !== '' && <p>{loginPleaseText}</p>}
    </div>
  )
}
