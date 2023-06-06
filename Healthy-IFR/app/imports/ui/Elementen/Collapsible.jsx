import React, {useState} from 'react';


export const Collapsible =(props)=>{
      
    //js als <div een value heeft => niet undifined => true
    return (
    <div  className='collapsible'>
        <div className='collapsibleButton' onClick={() => props.toggle(props.label)}>
            <p>{props.label}</p>
            <img src='Images/dropdown.png'/>
        </div>
        {props.open && (
        <div className="toggle">
            {props.children}
        </div>
        )} 
    </div>
    );
}