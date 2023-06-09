import { useContext, useEffect, useState, Fragment } from "react";
import "./HomePage.css";
import { Link, useLocation } from "react-router-dom";
import SearchKitchens from "../../Components/SearchKitchens/SearchKitchens";
import { UserContext } from "../../Context/UserContext";
import axios from 'axios';
import Header from "../../Components/Header/Header";

export default function HomePage() {
  const [searchValue,setSearchValue]=useState('');
  const [priorSearchTerm, setPriorSearchTerm] = useState("");
  const [firstMount,setFirstMount]=useState(true);
  const [kitchensReturned,setKitchensReturned]=useState([]);
  const [kitchensReturnText,setKitchensReturnText]= useState('')
  const { user } = useContext(UserContext);
  const location = useLocation();


  useEffect(() => {
    // console.log(location?.state?.from);
    if (location && location?.state?.from != priorSearchTerm) {
      setPriorSearchTerm(location?.state?.from);
    }
  }, []);

  useEffect(()=>{
      if(firstMount) setFirstMount(false);
      
      if(priorSearchTerm && searchValue === '' && !firstMount){
        setSearchValue(priorSearchTerm);
        handleSearch(null, priorSearchTerm);
      }
    },[firstMount]);

  const handleSearch =(e, priorSearchTerm)=>{
    e?.preventDefault();
    const termToSearch = searchValue != '' ? searchValue : priorSearchTerm;
    axios.get(`/api/getkitchenssearch/${termToSearch}`)
        .then(response=>{
            if(response.data.length===0){
              setKitchensReturnText('No Kitchens returned');
            }
            else{
              setKitchensReturned(response.data);
            }
        })
        .catch(err=>{
            console.log(err);
        });
  };

  const handleSearchInputChange =(e)=>{
    setSearchValue(e.target.value);
  };

  return (
    <>
    <Header user={user}></Header>
     

      <h3 className="greetingText">Hello {user?.name}</h3>
      {/* {user?.name ? <p>Hello {user?.name}</p>: <p>Log in to see</p>} */}
      <SearchKitchens handleSearchInputChange={handleSearchInputChange} firstMount={firstMount} kitchensReturnText={kitchensReturnText} kitchensReturned={kitchensReturned} searchValue={searchValue} handleSearch={handleSearch} priorSearchTerm={priorSearchTerm}></SearchKitchens>
      {/* <SearchKitchens handleSearchInputChange={handleSearchInputChange} firstMount={firstMount} kitchensReturnText={kitchensReturnText} kitchensReturn={kitchensReturned} searchValue={searchValue} handleSearch={handleSearch} priorSearchTerm={priorSearchTerm}></SearchKitchens> */}
    </>
  );
}
