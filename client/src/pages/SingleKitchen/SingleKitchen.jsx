import axios from 'axios';
import {useState,useEffect} from 'react';
import {Link, useParams,useLocation,useNavigate} from 'react-router-dom';
import "./SingleKitchen.css";
import RecipeCard from '../../Components/RecipeCard/RecipeCard';
import Header from '../../Components/Header/Header';

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
        e.stopPropagation();
        let node ={};
        let id='';
        let clickedRecipe={};
        if(e.target?.localName==='p'){
            node = e.target.parentElement;
        } else if(e.target?.localName==='div'){
            node=e.target;
        }
        id=node.dataset?.id;
        clickedRecipe=node.dataset?.recipe;
        navigate(`/recipe/${id}`,{state:{recipe:clickedRecipe,kitchenFrom:kitchen}});
    }

    return (
        <div id='kitchenPageContainer'>
            <Header id={id} currentPage="SingleKitchen" priorSearchTerm={priorSearchTerm}></Header> 
            
            <h1>{kitchen?.kitchenName}</h1>
            {errorText !='' && (<p>{errorText}</p>)}
            {kitchen?.ingredients && kitchen?.ingredients.length != 0 && (
                <>
                    <ul id='ingredientsListContainer'>
                        {kitchen.ingredients.map(i=>(
                            <li className='ingredientList' key={i._id}>{i.name}</li>
                        ))}
                    </ul>
                </>
            )}
            <div className='container'>
                {recipes.length !== 0 && recipes?.map(i=>(
                    <RecipeCard recipe={i.recipeName} recipeId={i._id} key={i._id} handleSingleRecipeCardClick={handleSingleRecipeCardClick}></RecipeCard>
                ))}
            </div>
        </div>
    )
}
