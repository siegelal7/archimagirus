import axios from 'axios';
import React,{useState,useEffect} from 'react';
import KitchenCard from '../KitchenCard/KitchenCard';
import './SearchKitchens.css';
import { useNavigate } from "react-router-dom";

export default function SearchKitchens() {
  const [searchValue,setSearchValue]=useState('');
  const [kitchensReturned,setKitchensReturned]=useState([]);
  const [kitchensReturnText,setKitchensReturnText]= useState('Search for a kitchen!');
//   const [test,setTest]=useState("Test")
  const navigate = useNavigate();
  
  const handleSearchInputChange =(e)=>{
    setSearchValue(e.target.value);
  };

  const handleSearch =(e)=>{
    e.preventDefault();
    axios.get(`/api/getkitchenssearch/${searchValue}`)
        .then(response=>{
            if(response.data.length==0){
              setKitchensReturnText('No Kitchens returned');
            }
            else{
              setKitchensReturned(response.data);
            }
        })
        .catch(err=>{
            console.log(err);
            // setKitchensReturnText('No Kitchens returned');
        });
  };

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

  return (
    <div>
        <div className='flexGrid searchForm'>
            <form onSubmit={handleSearch}>
                <input type='text' onChange={e=>handleSearchInputChange(e)} value={searchValue} name='searchValue' />
                <button onClick={handleSearch}>Find Kitchens</button>
            </form>
        </div>
        <div className='flexGrid'>
        {kitchensReturned.length == 0 ? (<h2>{kitchensReturnText}</h2>) : (kitchensReturned.map(x => (
                <React.Fragment key={x._id}>
                    <KitchenCard onClick={e=>handleClickSingleClick(e)} kitchen={x}></KitchenCard>
                </React.Fragment>
            )))}
        </div>
    </div>
  )
}
