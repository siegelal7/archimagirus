import React, {Fragment} from 'react';
import {Link} from 'react-router-dom'; 
import "./Header.css";

export default function Header({user, currentPage, kitchenName, id,priorSearchTerm,recipe,kitchenFrom}) {

  if(currentPage==='Kitchen'){
    return (
        <>
           {user?._id ? (
            <Fragment>
                <Link className='basicLink' to='/'>Home</Link>
                {/* <Link className='basicLink' to={`/make/${id}`}>Create!</Link> */}
                <Link className='basicLink' to='/logout'>Logout</Link>
            {/* <Link to={`/make/${3234}`}>Create!</Link> */}
            </Fragment>
                ) : (
            <Fragment>
                <Link className='basicLink' to="/register">Register</Link>
                <Link className='basicLink' to='/login'>Login</Link>
            </Fragment>
            )}  
          </>
    )
  }
  else if (currentPage=='MakeMeal'){
    return (
        <>
            <Link className="basicLink" to="/">Home</Link>
            {kitchenName != '' && <Link className="basicLink" to={`/singlekitchen/${user?._id}`}>Back to {kitchenName} kitchen</Link>}
      </>
    )
  }
  else if(currentPage=="SingleKitchen"){
    return (
        <>
            {priorSearchTerm !== '' && priorSearchTerm ? <Link className='basicLink' to='/' state={{ from: priorSearchTerm }}>Return to Search</Link> : <Link className='basicLink' to={`/kitchen/${id}`}>Your kitchens</Link>}
            <Link className='basicLink' to='/'>Home Page</Link>
            <Link className='basicLink' to={`/make/${id}`}>Create!</Link>
            <Link className='basicLink' to='/logout'>Logout</Link>
        </>
    )
  }
  else if(currentPage=="SingleRecipe"){
    return (
        <>
            {recipe && recipe?.kitchen && recipe?.kitchen.length !== 0 && kitchenFrom && kitchenFrom?.kitchenName && <Link className='basicLink spaceBottom' to={`/singlekitchen/${kitchenFrom?._id}`}>Back to {kitchenFrom.kitchenName} kitchen</Link>}
        </>
    )
  }
  return (
    <>
    {user?._id ? (
        <Fragment>
          <Link className='basicLink' to="/logout">Logout</Link>
          <Link className='basicLink' to={`/kitchen/${user._id}`}>My Kitchens</Link>
          {/* <Link to={`/make/${3234}`}>Create!</Link> */}
        </Fragment>
      ) : (
        <Fragment>
          <Link className='basicLink' to="/register">Register</Link>
          <Link className='basicLink' to="/login">Login</Link>
        </Fragment>
      )}
      </>
  )
}
