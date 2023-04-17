import axios from 'axios';
import {useState,useEffect} from 'react';
import {Link, useParams,useLocation} from 'react-router-dom';

export default function SingleKitchen() {
    const {id} = useParams();
    const [kitchen,setKitchen]=useState({});
    const [errorText,setErrorText]=useState('');
    const [priorSearchTerm, setPriorSearchTerm]=useState('');

    const location = useLocation();

    useEffect(()=>{
        // console.log(id);
        // console.log(location);
        if(priorSearchTerm === '' && location?.state?.searchValue != priorSearchTerm){
            setPriorSearchTerm(location?.state?.searchValue);
        }
        axios.get(`/api/getkitchensbyid/${id}`)
            .then(response=>{
                setKitchen(response.data);
            })
            .catch(err=>{
                console.log(err);
                setErrorText('Sorry, no kitchen found');
            })
    },[id])

    return (
        <div>
            {priorSearchTerm !== '' && priorSearchTerm ? <Link to='/' state={{ from: priorSearchTerm }}>Return to Search</Link> : <Link to={`/kitchen/${id}`}>Your kitchens</Link>}
            <Link to='/'>Home Page</Link>
            {errorText !='' ? (<p>{errorText}</p>) : (<p>{kitchen.kitchenName}</p>)}
        </div>
    )
}
