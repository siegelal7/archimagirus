import axios from 'axios';
import React, { useState,useEffect } from 'react';

export default function DisplayKitchens({refreshComponent,kitchens,setKitchens}) {
    // const [creatorId,setCreatorId]=useState('');
    const [logicHasRan,setLogicHasRan]=useState(false);

    useEffect(() => {
        const checkId=localStorage.getItem('id');
        if(checkId){
            // setCreatorId(checkId);
            fireRefresh(checkId);
        } else if(!checkId){
            setLogicHasRan(true);
        }
      return () => {
        // setCreatorId('');
      }
    }, []);

    const fireRefresh=(checkId)=>{
            axios.get(`/api/getkitchens/${checkId}`)
            .then(response=>{
                setKitchens(response.data);
                setLogicHasRan(true);
            })
            .catch(err=>{
                console.log(err);
            });
    }
    if(logicHasRan && (kitchens == null || kitchens.length == 0)){
        return (<h3>Add some kitchens or log in!</h3>)
    }
  return (
    <div>
        <ul>
        {kitchens.length != 0 && kitchens.map((x) => (
                <li key={x._id}>{x.kitchenName}</li>
            ))}
        </ul>
    </div>
  )
}
