import axios from 'axios';
import React, { useState,useEffect } from 'react';

export default function DisplayKitchens({id,refreshComponent,kitchens,setKitchens}) {
    // const [creatorId,setCreatorId]=useState('');
    const [logicHasRan,setLogicHasRan]=useState(false);

    useEffect(() => {
        // const checkId=localStorage.getItem('id');
        if(id){
            // setCreatorId(checkId);
            fireRefresh(id);
        } else if(!id){
            setLogicHasRan(true);
        }
      return () => {
        // setCreatorId('');
      }
    }, []);

    const fireRefresh=(id)=>{
            axios.get(`/api/getkitchensbycreator/${id}`, {
              headers: {
                "x-auth-token": localStorage.getItem("token"),
              },
            })
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
