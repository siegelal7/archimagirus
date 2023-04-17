import React from 'react';
import Draggable from "react-draggable";
import './DraggableGrid.css';

export default function DraggableGrid({i}) {
  return (
    <div className="padding" key={i._id+' '+i.name}>
        <Draggable
        grid={[20, 500]}
        >
            <div className="row-column" id="ingredients">
                {i.name}
            </div>
        </Draggable>
    </div>
  )
}
