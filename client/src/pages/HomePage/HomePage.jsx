import {useContext, useEffect, useState, Fragment} from 'react';
import './HomePage.css';
import {  Link } from "react-router-dom";
import SearchKitchens from '../../Components/SearchKitchens/SearchKitchens';
import { UserContext } from '../../Context/UserContext';

export default function HomePage() {
  const {user} = useContext(UserContext);

  // useEffect(()=>{
  // },[]);

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
        <SearchKitchens></SearchKitchens>
    </>
  )
}
