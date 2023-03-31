import React, { useEffect, useContext, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {UserContext} from '../../Context/UserContext';

export default function Logout() {
  const [userReset, setUserReset]=useState({});
  const {setUser}=useContext(UserContext);
  // const value = useMemo(
  //   ()=>({ user, setUser}),[user]
  // );
  // const {user, setUser}
  // const { userInfo } = useContext(UserContext);
  // const { _id } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(()=>{
    // console.log(_id);
      setUser(userReset);
      localStorage.clear();
      navigate('/');
  },[]);
  return (
    // <UserContext.Provider value={{user:user, setUser:setUser}}>
      <div>Happy cooking!</div>
    //  </UserContext.Provider>
  )
}
