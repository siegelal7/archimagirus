import React from 'react';
import './KitchenCard.css';

export default function KitchenCard({kitchen,onClick}) {

  return (
    <div className='card' data-id={kitchen._id} onClick={onClick}>
        <h3 className='innerText'>
            {kitchen?.kitchenName}
        </h3>
    </div>
  )
}
