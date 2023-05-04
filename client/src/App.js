import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Auth/Register.jsx";
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Auth/Login.jsx';
import ImageTextReader from './pages/ImageTextReader/ImageTextReader';
import Kitchen from "./pages/Kitchen/Kitchen.jsx";
import Logout from "./pages/Auth/Logout.jsx";
import SingleKitchen from "./pages/SingleKitchen/SingleKitchen.jsx";
import { useEffect, useState } from 'react';
import axios from "axios";
import {UserContext} from './Context/UserContext';
import MakeMeal from "./pages/MakeMeal/MakeMeal.jsx";
import SingleRecipe from "./pages/SingleRecipe/SingleRecipe.jsx";
// import Header from './Components/Header/Header';
// const UserContext = createContext();

function App() {
  const [userLoggedIn, setUserLoggedIn]=useState(null);
  const [idFromStorage, setIdFromStorage]=useState('');

  useEffect(()=>{
    let userIdFromStorage = localStorage.getItem('id');
    setIdFromStorage(userIdFromStorage);
    if(idFromStorage !== '' && idFromStorage !== null && userLoggedIn === null && !userLoggedIn?._id){
      axios.get(`/api/user/${userIdFromStorage}`)
      .then(response=>{
        setUserLoggedIn(response.data);
      })
      .catch(err=>{
        console.log(err);
      });
    }},[idFromStorage]);
  
  return (
    <div className="App">
      {/* <Header></Header> */}
      <UserContext.Provider value={{user:userLoggedIn, setUser:setUserLoggedIn}}>
        <Router>
          <Routes>
            <Route exact path="/" element ={<HomePage />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/imagereader" element={<ImageTextReader />}></Route>
            <Route exact path="/kitchen/:id" element={<Kitchen />}></Route>
            <Route path="/singlekitchen/:id" element={<SingleKitchen />}></Route>
            <Route path="/make/:id" element={<MakeMeal />}></Route>
            <Route path="/recipe/:id" element={<SingleRecipe />}></Route>
            <Route exact path="/logout" element={<Logout/>}></Route>

          </Routes>
        </Router>  
      </UserContext.Provider>      
  
    </div>
  );
}

export default App;
