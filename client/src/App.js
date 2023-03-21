// import './App.css';
// import ImageTextReader from './Components/ImageTextReader/ImageTextReader';
// import TryExample from './Components/TryExample/TryExample';
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import Register from "./pages/Auth/Register.jsx";
import HomePage from './pages/HomePage';
import Login from './pages/Auth/Login.jsx';
import ImageTextReader from './pages/ImageTextReader/ImageTextReader';


function App() {
  return (
    <div className="App">

      {/* <Register></Register> */}
      <Router>
        <Routes>
          <Route exact path="/" element ={<HomePage />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/imagereader" element={<ImageTextReader />}></Route>

        </Routes>
      </Router>        
  
     
    </div>
  );
}

export default App;
