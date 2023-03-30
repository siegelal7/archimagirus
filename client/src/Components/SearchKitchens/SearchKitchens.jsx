import axios from 'axios';
import React,{useState,useEffect} from 'react';
import KitchenCard from '../KitchenCard/KitchenCard';
import './SearchKitchens.css';

export default function SearchKitchens() {
  const [searchValue,setSearchValue]=useState('');
  const [kitchensReturned,setKitchensReturned]=useState([]);
  const [kitchensReturnText,setKitchensReturnText]= useState('Search for a kitchen!');
//   const [test,setTest]=useState("Test")
  
  const handleSearchInputChange =(e)=>{
    setSearchValue(e.target.value);
  };

  const handleSearch =(e)=>{
    e.preventDefault();
    axios.get(`/api/getkitchenssearch/${searchValue}`)
        .then(response=>{
            console.log(response);
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
                    <KitchenCard kitchen={x}></KitchenCard>
                </React.Fragment>
            )))}
        </div>
    </div>
  )
}
