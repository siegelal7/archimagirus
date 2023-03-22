import React,{useEffect,useState} from 'react'
import AddKitchen from '../../Components/AddKitchen/AddKitchen';
import axios from 'axios';
import DisplayKitchens from '../../Components/DisplayKitchens/DisplayKitchens';
import { Link } from 'react-router-dom';

export default function Kitchen() {
    const [kitchenName, setKitchenName] = useState("");
    const [creatorId, setCreatorId]=useState('');
    const [kitchens, setKitchens]=useState([]);
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
      }
    }, []);
    const refreshComponent = (e)=>{
        fireRefresh(creatorId);
    }
    const fireRefresh=(checkId)=>{
        // const id=creatorId;
        console.log(creatorId);
        // if(creatorId){
            axios.get(`/api/getkitchens/${checkId}`)
            // axios.get(`/api/getkitchens/${creatorId}`)
            .then(response=>{
                console.log(response);
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
        console.log(body);
        axios.post('/api/kitchen',body)
            .then(response=>{
                // console.log(response);
                refreshComponent();
            })
            .catch(err=>{
                console.log(err);
            })
    }
  return (
    <>
        <div>Kitchen</div>
        <Link to='/logout'>Logout</Link>
        <Link to='/login'>Login</Link>    

        <AddKitchen 
            kitchenName={kitchenName} 
            setKitchenName={setKitchenName} 
            creatorId={creatorId} 
            setCreatorId={setCreatorId}
            handleNameChange={handleNameChange}
            handleSubmit={handleSubmit}
        ></AddKitchen>
        <DisplayKitchens kitchens={kitchens} setKitchens={setKitchens} refreshComponent={refreshComponent}></DisplayKitchens>
    </>
  )
}
