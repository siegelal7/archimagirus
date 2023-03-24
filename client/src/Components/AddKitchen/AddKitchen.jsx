// import axios from 'axios';
// import {useEffect, useState} from 'react';

export default function AddKitchen({kitchenName,setKitchenName,creatorId,setCreatorId,handleNameChange,handleSubmit}) {
  return (
    <div>
        <h1>Add your Kitchen</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" value={kitchenName} onChange={(e)=>handleNameChange(e)}/>
        </form>
    </div>
    
  )
}
