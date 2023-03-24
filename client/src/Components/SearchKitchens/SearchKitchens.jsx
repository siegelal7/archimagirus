import axios from 'axios';
import React,{useState,useEffect} from 'react';
import KitchenCard from '../KitchenCard/KitchenCard';
import './SearchKitchens.css';

export default function SearchKitchens() {
  const [searchValue,setSearchValue]=useState('');
  const [kitchensReturned,setKitchensReturned]=useState([]);
//   const [test,setTest]=useState("Test")
  
  const handleSearchInputChange =(e)=>{
    setSearchValue(e.target.value);
  };

  const handleSearch =(e)=>{
    e.preventDefault();
    axios.get(`/api/getkitchenssearch/${searchValue}`)
        .then(response=>{
            // console.log(response);
            setKitchensReturned(response.data);
        })
        .catch(err=>{
            console.log(err);
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
        {kitchensReturned.length == 0 ? (<p>No Results</p>) : (kitchensReturned.map(x => (
                <React.Fragment key={x._id}>
                    <KitchenCard kitchen={x}></KitchenCard>
                </React.Fragment>
            )))}
        </div>
    </div>
  )
}
