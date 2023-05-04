import React,{useEffect,useState,useContext, Fragment} from 'react';
import AddKitchen from '../../Components/AddKitchen/AddKitchen';
import axios from 'axios';
import DisplayKitchens from '../../Components/DisplayKitchens/DisplayKitchens';
import { Link,useParams } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import './Kitchen.css';
import Header from '../../Components/Header/Header';

export default function Kitchen() {
    const {id} = useParams();
    const { user } = useContext(UserContext);
    const [kitchenName, setKitchenName] = useState("");
    const [creatorId, setCreatorId]=useState('');
    const [kitchens, setKitchens]=useState([]);
    const [showLoginText,setShowLoginText]=useState(false);
    // const [kitchenNames,setKitchenNames]=useState([]);
    const [logicHasRan,setLogicHasRan]=useState(false);

    useEffect(() => {
        if(kitchens?.length === 0 && id){
            fireRefresh();
        }
      if(user?._id !== null && user?._id !== ''){
        setCreatorId(user?._id);
      }
      return () => {
      }
    }, [user?._id]);

    const handleNameChange=(e)=>{
        setKitchenName(e.target.value);
    };

    const refreshComponent = (e)=>{
        setKitchenName('');
        fireRefresh();
    }

    const fireRefresh=()=>{
        // const id=creatorId;
        // if(creatorId){
            axios.get(`/api/getkitchensbycreator/${user?._id}`, {
                headers: {
                  "x-auth-token": localStorage.getItem("token"),
                },
              })
            .then(response=>{
                setKitchens(response.data);
                setLogicHasRan(true);
            })
            .catch(err=>{
                console.log(err);
            })
            // setLogicHasRan(true);
        // }
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        const body = {
            kitchenName,
            creatorId
        };
        if(body.creatorId && body.creatorId!=''){
            axios.post('/api/kitchen',body)
                .then(response=>{
                    refreshComponent();
                })
                .catch(err=>{
                    console.log(err);
                });
        } else if(!body.creatorId){
            setShowLoginText(true);
        }
    };
    
  return (
    <>
        <Header user={user} currentPage="Kitchen"></Header>
        {/* <Link to='/logout'>Logout</Link>
        <Link to='/login'>Login</Link>
        <Link to='/'>Home Page</Link>
        <Link to={`/make/${id}`}>Create!</Link> */}

        <AddKitchen 
            kitchenName={kitchenName} 
            setKitchenName={setKitchenName} 
            creatorId={creatorId} 
            setCreatorId={setCreatorId}
            handleNameChange={handleNameChange}
            handleSubmit={handleSubmit}
        ></AddKitchen>
        <DisplayKitchens id={id} userId={user?._id} kitchens={kitchens} setKitchens={setKitchens} refreshComponent={refreshComponent}></DisplayKitchens>
        {showLoginText === true &&  (<p>Please Login!</p>)}
    </>
  )
}
