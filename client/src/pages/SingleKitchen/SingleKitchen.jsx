import axios from 'axios';
import {useState,useEffect} from 'react';
import {Link, useParams,useLocation,useNavigate} from 'react-router-dom';
import "./SingleKitchen.css";
import RecipeCard from '../../Components/RecipeCard/RecipeCard';

export default function SingleKitchen() {
    const navigate=useNavigate();
    const {id} = useParams();
    const [kitchen,setKitchen]=useState({});
    const [errorText,setErrorText]=useState('');
    const [priorSearchTerm, setPriorSearchTerm]=useState('');
    const [recipes,setRecipes]=useState([]);

    const location = useLocation();

    useEffect(()=>{
        if(priorSearchTerm === '' && location?.state?.searchValue != priorSearchTerm){
            setPriorSearchTerm(location?.state?.searchValue);
        }
        axios.get(`/api/getkitchensbyid/${id}`)
            .then(response=>{
                console.log(response);
                setKitchen(response.data);
                if(response.data.recipes !== 0){
                    setRecipes(response.data.recipes);
                }
            })
            .catch(err=>{
                console.log(err);
                setErrorText('Sorry, no kitchen found');
            })
    },[id]);
    
    const handleSingleRecipeCardClick =(e)=>{
        // console.log(e);
        e.stopPropagation();
        let node ={};
        let id='';
        let clickedRecipe={};
        if(e.target?.localName==='p'){
            node = e.target.parentElement;
        } else if(e.target?.localName==='div'){
            // console.log('div');
            node=e.target;
        }
        id=node.dataset?.id;
        clickedRecipe=JSON.parse(node.dataset?.recipe);
        console.log(JSON.parse(node.dataset.recipe));
        navigate(`/recipe/${id}`,{state:{recipe:clickedRecipe,kitchenFrom:kitchen}});
    }

    return (
        <div>
            {priorSearchTerm !== '' && priorSearchTerm ? <Link className='basicLink' to='/' state={{ from: priorSearchTerm }}>Return to Search</Link> : <Link className='basicLink' to={`/kitchen/${id}`}>Your kitchens</Link>}
            <Link className='basicLink' to='/'>Home Page</Link>
            <Link className='basicLink' to={`/make/${id}`}>Create!</Link>
            <Link className='basicLink' to='/logout'>Logout</Link>
            <h1>{kitchen?.kitchenName}</h1>
            {errorText !='' && (<p>{errorText}</p>)}
            {kitchen?.ingredients && kitchen?.ingredients.length != 0 && (
                <>
                    <ul>
                        {kitchen.ingredients.map(i=>(
                            <li key={i._id}>{i.name}</li>
                        ))}
                    </ul>
                </>
            )}
            {recipes.length !== 0 && recipes?.map(i=>(
                <RecipeCard recipe={i} key={i._id} handleSingleRecipeCardClick={handleSingleRecipeCardClick}></RecipeCard>
            ))}
        </div>
    )
}
