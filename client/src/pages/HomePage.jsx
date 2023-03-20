import React from 'react';
import { Outlet, Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
        <div>HomePage</div>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
    </>
  )
}
