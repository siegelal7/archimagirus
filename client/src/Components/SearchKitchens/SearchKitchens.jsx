import axios from 'axios';
import React,{useState,useEffect} from 'react';
import KitchenCard from '../KitchenCard/KitchenCard';
import './SearchKitchens.css';
import { useNavigate } from "react-router-dom";
import {TailSpin} from 'react-loader-spinner';

export default function SearchKitchens({priorSearchTerm}) {
  const [searchValue,setSearchValue]=useState('');
  const [firstMount,setFirstMount]=useState(true);
  const [kitchensReturned,setKitchensReturned]=useState([]);
  const [kitchensReturnText,setKitchensReturnText]= useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    if(firstMount) setFirstMount(false);
    
    if(priorSearchTerm && searchValue==='' && !firstMount){
      setSearchValue(priorSearchTerm);
      handleSearch(null, priorSearchTerm);
    }
  },[firstMount]);
  
  const handleSearchInputChange =(e)=>{
    setSearchValue(e.target.value);
  };

  const handleSearch =(e, priorSearchTerm)=>{
    console.log('ran');
    e?.preventDefault();
    const termToSearch = searchValue != '' ? searchValue : priorSearchTerm;
    axios.get(`/api/getkitchenssearch/${termToSearch}`)
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
      navigate(`/singlekitchen/${idFromUrl}`,{state:{searchValue:searchValue}});
    }
  }
  // if (firstMount){
  //   return (
  //     <div className='loadingWrapper'>
  //       <Dna
  //         visible={{firstMount}}
  //         height="80"
  //         width="80"
  //         ariaLabel="dna-loading"
  //         wrapperStyle={{}}
  //         wrapperClass="loadingWrapper"
  //       />
  //     </div>
  //   )
  // }

  return (
    <div>
        {/* <Dna
          visible={{firstMount}}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        /> */}
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
