import axios from 'axios';
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';

export default function SingleKitchen() {
    const {id} = useParams();
    const [kitchen,setKitchen]=useState({});
    const [errorText,setErrorText]=useState('');

    useEffect(()=>{
        // console.log(id);
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
            {errorText !='' ? (<p>{errorText}</p>) : (<p>{kitchen.kitchenName}</p>)}
        </div>
    )
}
