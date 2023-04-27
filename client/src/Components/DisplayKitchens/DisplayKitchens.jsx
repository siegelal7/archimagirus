import axios from 'axios';
import React, { useState,useEffect } from 'react';
import KitchenCard from '../KitchenCard/KitchenCard';
import { useNavigate } from 'react-router-dom';
import "./DisplayKitchens.css";

export default function DisplayKitchens({id,refreshComponent,kitchens,setKitchens,userId}) {
    // const [creatorId,setCreatorId]=useState('');
    const [logicHasRan,setLogicHasRan]=useState(false);
    const navigate=useNavigate();

    useEffect(() => {
        // const checkId=localStorage.getItem('id');
        console.log(id);
        if(userId){
            // setCreatorId(checkId);
            fireRefresh(userId);
        } else if(!userId){
            setLogicHasRan(true);
        }
      return () => {
        // setCreatorId('');
      }
    }, []);

    const fireRefresh=(userId)=>{
            axios.get(`/api/getkitchensbycreator/${userId}`, {
              headers: {
                "x-auth-token": localStorage.getItem("token"),
              },
            })
            .then(response=>{
              console.log(response);
                setKitchens(response.data);
                setLogicHasRan(true);
            })
            .catch(err=>{
                console.log(err);
                setLogicHasRan(true);
            });
    }

    const handleClickSingleClick =e=>{
      // console.log(e);
      let idFromUrl=null;
      if(e.target.tagName =='DIV'){
        // console.log(e.target.dataset.id);
        idFromUrl=e.target.dataset.id;
      }
      else if (e.target.tagName=='P'){
        // console.log(e.target.parentElement.dataset.id);
        idFromUrl=e.target.parentElement.dataset.id;
      }
      if(idFromUrl){
        navigate(`/singlekitchen/${idFromUrl}`);
      }
    }

    if(logicHasRan && (kitchens == null || kitchens.length == 0)){
        return (<h3>Add some kitchens or log in!</h3>)
    }
  return (
    <div className='flexGrid'>
        {kitchens.length != 0 && kitchens.map((x) => (
                <React.Fragment key={x._id}><KitchenCard kitchen={x} onClick={handleClickSingleClick}></KitchenCard></React.Fragment>
            ))}
    </div>
  )
}
