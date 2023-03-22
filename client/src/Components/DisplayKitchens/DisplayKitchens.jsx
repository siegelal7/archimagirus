import axios from 'axios'
import React, { useState,useEffect } from 'react'

export default function DisplayKitchens({refreshComponent,kitchens,setKitchens}) {
    // const [kitchens, setKitchens]=useState([]);
    // const [kitchenNames,setKitchenNames]=useState([]);
    const [creatorId,setCreatorId]=useState('');
    const [logicHasRan,setLogicHasRan]=useState(false);

    useEffect(() => {
        const checkId=localStorage.getItem('id');
        console.log(checkId);
        if(checkId){
            setCreatorId(checkId);
            fireRefresh(checkId);
        }
        // if(checkId){
        // }
      return () => {
        // setKitchens([]);
      }
    }, []);

    // useEffect(()=>{
    //     const arr = [];
    //     if(kitchens.length!=0){
    //         for (let index = 0; index < kitchens.length; index++) {
    //             arr.push(kitchens[index]?.kitchenName);            
    //         }
    //         setKitchenNames(arr);
    //     }
    // },[kitchens]);
    
    const fireRefresh=(checkId)=>{
        // const id=creatorId;
        console.log(creatorId);
        // if(creatorId){
            axios.get(`/api/getkitchens/${checkId}`)
            // axios.get(`/api/getkitchens/${creatorId}`)
            .then(response=>{
                console.log(response);
                setKitchens(response.data);
                setLogicHasRan(true);
            })
            .catch(err=>{
                console.log(err);
            })
            // setLogicHasRan(true);
        // }
    }
    if(logicHasRan && (kitchens ==null || kitchens.length==0)){
        return (<p>Add some kitchens or log in!</p>)
    }
  return (
    <div>
        <ul>
        {kitchens.length!=0 && kitchens.map((x) => (
                <li key={x._id}>{x.kitchenName}</li>
            ))}
        </ul>
    </div>
  )
}
