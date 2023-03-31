import {useContext, useEffect, useState} from 'react';
import {  Link } from "react-router-dom";
import SearchKitchens from '../../Components/SearchKitchens/SearchKitchens';
import { UserContext } from '../../Context/UserContext';

export default function HomePage() {
  const {user} = useContext(UserContext);
  // useEffect
  return (
    <>
        <div>HomePage</div>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to ="/logout">Logout</Link>
        <Link to="/kitchen">My Kitchens</Link>
        <p>Hello {user?.name}</p>
        {/* {user?.name ? <p>Hello {user?.name}</p>: <p>Log in to see</p>} */}
        <SearchKitchens></SearchKitchens>
    </>
  )
}
