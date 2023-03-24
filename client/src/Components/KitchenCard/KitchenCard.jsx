import React, { useEffect, useState } from 'react';
import './KitchenCard.css';

export default function KitchenCard({kitchen}) {
  useEffect(()=>{
    if(kitchen){
        // console.log(kitchen);
    }
  }, []);

  return (
    <div className='card'>
        <p className='innerText'>
            {kitchen?.kitchenName}
        </p>
    </div>
  )
}
