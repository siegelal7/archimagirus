// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Auth/Register.jsx";
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Auth/Login.jsx';
import ImageTextReader from './pages/ImageTextReader/ImageTextReader';
import Kitchen from "./pages/Kitchen/Kitchen.jsx";
import Logout from "./pages/Auth/Logout.jsx";
import SingleKitchen from "./pages/SingleKitchen/SingleKitchen.jsx";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element ={<HomePage />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/imagereader" element={<ImageTextReader />}></Route>
          <Route exact path="/kitchen" element={<Kitchen />}></Route>
          <Route exact path="/logout" element={<Logout/>}></Route>
          <Route path="/singlekitchen/:id" element={<SingleKitchen />}></Route>

        </Routes>
      </Router>        
  
    </div>
  );
}

export default App;
