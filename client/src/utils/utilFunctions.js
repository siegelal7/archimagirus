// import axios from 'axios';
const handleKitchenCardClick = (e)=>{
    let idFromUrl=null;
    if(e.target.tagName =='DIV'){
      // console.log(e.target.dataset.id);
      idFromUrl=e.target.dataset.id;
    }
    else if (e.target.tagName=='H3'){
      // console.log(e.target.parentElement.dataset.id);
      idFromUrl=e.target.parentElement.dataset.id;
    }
    return idFromUrl;
    // if(idFromUrl){
    //   navigate(`/singlekitchen/${idFromUrl}`,{state:{searchValue:searchValue}});
    // }
}
// const newIngredSubmit =(newIngred,setLoginPleaseText,setNewIngred)=>{
//     if(!newIngred.kitchen || newIngred.kitchen === ''){
//         setLoginPleaseText('Login or create a kitchen to add an ingredient');
//       } else if(newIngred.name === ''){
//         setLoginPleaseText('Enter your ingredient name!');
//       }
//       if(newIngred.kitchen && newIngred.kitchen !== '' && newIngred.name !== ''){
//         axios.post(`/api/newingredient/${id}`, newIngred)
//           .then(response=>{
//               if(response.status==200){
//                 console.log(response);
//                 // setIngreds({type:'Meat', name:'', kitchen: newIngred.kitchen});
//                 setNewIngred({type:'Meat', name:'', kitchen: newIngred.kitchen});
//                   // setIngreds(...ingreds,[response.data]);
//                   setIngreds([...ingreds, response.data?.ingredJson]);
                  
//               }
//           })
//           .catch(err=>{
//               console.log(err);
//           })
//       }
// }

export default handleKitchenCardClick;