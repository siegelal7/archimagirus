import {useContext, useEffect, useState, Fragment} from 'react';
import './HomePage.css';
import {  Link, useLocation } from "react-router-dom";
import SearchKitchens from '../../Components/SearchKitchens/SearchKitchens';
import { UserContext } from '../../Context/UserContext';

export default function HomePage() {
  const [priorSearchTerm, setPriorSearchTerm]=useState('');
  const {user} = useContext(UserContext);
  const location = useLocation();

  useEffect(()=>{
    // console.log(location?.state?.from);
    if (location && location?.state?.from != priorSearchTerm){
      setPriorSearchTerm(location?.state?.from);
    }
  },[]);

  return (
    <>
        <div>HomePage</div>
        {user?._id ? (<Fragment><Link to ="/logout">Logout</Link><Link to="/kitchen">My Kitchens</Link></Fragment>) : 
        <Fragment>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        </Fragment>
        }
       
      
        <h3 className='greetingText'>Hello {user?.name}</h3>
        {/* {user?.name ? <p>Hello {user?.name}</p>: <p>Log in to see</p>} */}
        <SearchKitchens priorSearchTerm={priorSearchTerm}></SearchKitchens>
    </>
  )
}
