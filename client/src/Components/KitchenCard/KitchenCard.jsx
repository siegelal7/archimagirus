import React, { useEffect, useState } from 'react';
import './KitchenCard.css';

export default function KitchenCard({kitchen,onClick}) {
  useEffect(()=>{
    if(kitchen){
        // console.log(kitchen);
    }
  }, []);

  return (
    <div className='card' data-id={kitchen._id} onClick={onClick}>
        <p className='innerText'>
            {kitchen?.kitchenName}
        </p>
    </div>
  )
}
