import React from 'react';
import {  Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
        <div>HomePage</div>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to ="/logout">Logout</Link>
        <Link to="/kitchen">Kitchen</Link>
    </>
  )
}
