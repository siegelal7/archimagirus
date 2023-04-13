import React, { useEffect, useState } from 'react';
import './MakeMeal.css';
import Draggable from 'react-draggable';
import GridLayout,{ Responsive as ResponsiveGridLayout } from "react-grid-layout";

export default function MakeMeal() {
    const [ingreds,setIngreds]=useState([]);
    const [recipe,setRecipe]=useState([]);
    useEffect(()=>{
        if(ingreds.length===0){
            const arr = [{
                name: 'test1',
                id:'123'
            },{
                name: 'test2',
                id:'231'
            },{
                name: 'test3',
                id:'312'
            },{
                name: 'test4',
                id:'321'
            },{
                name: 'test5',
                id:'213'
            },{
                name: 'test6',
                id:'132'
            },{
                name: 'test7',
                id:'432'
            }]
            setIngreds(arr);
        }
    },[]);
    const handleStart = (e) =>{
        console.log("start");
        console.log(e);
    }

    const handleDrag = (e) =>{
        
    }

    const handleStop = (e) =>{
        console.log("stop");
        console.log(e);
        const xAxis = e.pageX;
        if(xAxis >= 850){
        }
    }

    const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
        { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      ];
  return (
        <>
            {/* <div className='left'> */}
            <GridLayout className="layout" cols={2} rowHeight={30} width={2000}>
                {/* <div className='left'> */}

                    {ingreds.length!== 0 && ingreds.map( (i)=>{return(
                        <div className='padding' key={i.id}>
                        <Draggable
                        onStart={handleStart}
                        onDrag={handleDrag}
                        onStop={handleStop}
                        grid={[20,500]}
                        >
                            <div className='row-column' id='ingredients'>MakeMeal</div>
                        </Draggable>
                        </div>
                    )})}
                {/* </div> */}
                {/* <div className='right'> */}
                    <Draggable
                        grid={[20,900]}
                    >
                        <div className='row-column' id='recipe'>MakeMeal</div>
                    </Draggable>
                {/* </div> */}
            </GridLayout>
        </>
  )
}
