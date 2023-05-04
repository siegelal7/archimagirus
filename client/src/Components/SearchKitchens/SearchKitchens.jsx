// import axios from 'axios';
import React,{useState,useEffect} from 'react';
import KitchenCard from '../KitchenCard/KitchenCard';
import './SearchKitchens.css';
import { useNavigate } from "react-router-dom";
import {TailSpin} from 'react-loader-spinner';
import handleKitchenCardClick from '../../utils/utilFunctions';

export default function SearchKitchens({handleSearchInputChange,priorSearchTerm,handleSearch, searchValue, firstMount, kitchensReturned,kitchensReturnText}) {
  const navigate = useNavigate();

  const handleClickSingleClick =e=>{
    // console.log(e);
    let  idFromUrl=handleKitchenCardClick(e);
    // let idFromUrl=null;
    // if(e.target.tagName =='DIV'){
    //   // console.log(e.target.dataset.id);
    //   idFromUrl=e.target.dataset.id;
    // }
    // else if (e.target.tagName=='H3'){
    //   // console.log(e.target.parentElement.dataset.id);
    //   idFromUrl=e.target.parentElement.dataset.id;
    // }
    if(idFromUrl){
      navigate(`/singlekitchen/${idFromUrl}`,{state:{searchValue:searchValue}});
    }
  }


  return (
    <div>
        <div className='flexGridCenter searchForm'>
            <form onSubmit={handleSearch}>
                <input type='text' onChange={e=>handleSearchInputChange(e)} value={searchValue} name='searchValue' />
                <button onClick={handleSearch}>Find Kitchens</button>
            </form>
        </div>
        <div className='flexGridCenter'>
          {kitchensReturned?.length === 0 ? (<h2>{kitchensReturnText}</h2>) : (kitchensReturned?.map(x => (
                  <React.Fragment key={x._id}>
                      <KitchenCard onClick={e=>handleClickSingleClick(e)} kitchen={x}></KitchenCard>
                  </React.Fragment>
              )))}
          {firstMount && 
            (
            <div className='loadingWrapper'>
              <TailSpin
              visible={{firstMount}}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
            </div>)
          }
        </div>
    </div>
  )
}
