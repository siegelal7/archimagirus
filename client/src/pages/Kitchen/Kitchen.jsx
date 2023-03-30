import React,{useEffect,useState} from 'react'
import AddKitchen from '../../Components/AddKitchen/AddKitchen';
import axios from 'axios';
import DisplayKitchens from '../../Components/DisplayKitchens/DisplayKitchens';
import { Link } from 'react-router-dom';

export default function Kitchen() {
    const [kitchenName, setKitchenName] = useState("");
    const [creatorId, setCreatorId]=useState('');
    const [kitchens, setKitchens]=useState([]);
    const [showLoginText,setShowLoginText]=useState('false');
    // const [kitchenNames,setKitchenNames]=useState([]);
    const [logicHasRan,setLogicHasRan]=useState(false);
    const handleNameChange=(e)=>{
        setKitchenName(e.target.value);
    }
    useEffect(() => {
      const uid= localStorage.getItem('id');
      if(uid!=null && uid!=''){
        setCreatorId(uid);
      }
      return () => {
        setKitchenName('');
        setCreatorId('');
        setShowLoginText(false);
      }
    }, []);

    const refreshComponent = (e)=>{
        fireRefresh(creatorId);
    }

    const fireRefresh=(checkId)=>{
        // const id=creatorId;
        // if(creatorId){
            axios.get(`/api/getkitchensbycreator/${checkId}`)
            // axios.get(`/api/getkitchens/${creatorId}`)
            .then(response=>{
                setKitchens(response.data);
                setLogicHasRan(true);
            })
            .catch(err=>{
                console.log(err);
            })
            // setLogicHasRan(true);
        // }
    }

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
    }
  return (
    <>
        <div>Kitchen</div>
        <Link to='/logout'>Logout</Link>
        <Link to='/login'>Login</Link>
        <Link to='/'>Home Page</Link>

        <AddKitchen 
            kitchenName={kitchenName} 
            setKitchenName={setKitchenName} 
            creatorId={creatorId} 
            setCreatorId={setCreatorId}
            handleNameChange={handleNameChange}
            handleSubmit={handleSubmit}
        ></AddKitchen>
        <DisplayKitchens kitchens={kitchens} setKitchens={setKitchens} refreshComponent={refreshComponent}></DisplayKitchens>
        {showLoginText == true &&  (<p>Please Login!</p>)}
    </>
  )
}
