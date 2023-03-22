// import axios from 'axios';
// import {useEffect, useState} from 'react';

export default function AddKitchen({kitchenName,setKitchenName,creatorId,setCreatorId,handleNameChange,handleSubmit}) {
    // const [kitchenName, setKitchenName] = useState("");
    // const [creatorId, setCreatorId]=useState('');
    // const handleNameChange=(e)=>{
    //     setKitchenName(e.target.value);
    // }
    // useEffect(() => {
    //   const uid= localStorage.getItem('id');
    //   if(uid!=null && uid!=''){
    //     setCreatorId(uid);
    //   }
    //   return () => {}
    // }, []);
    

    // const handleSubmit=(e)=>{
    //     e.preventDefault();
    //     const body = {
    //         kitchenName,
    //         creatorId
    //     };
    //     console.log(body);
    //     axios.post('/api/kitchen',body)
    //         .then(response=>{
    //             // console.log(response);
    //         })
    //         .catch(err=>{
    //             console.log(err);
    //         })
    // }
  return (
    <div>
        <h1>Add your Kitchen</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" value={kitchenName} onChange={(e)=>handleNameChange(e)}/>
        </form>
    </div>
    
  )
}
