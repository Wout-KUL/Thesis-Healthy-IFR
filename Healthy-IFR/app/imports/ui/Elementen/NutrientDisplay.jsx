import React from 'react';

export const NutrientDisplay = ({listKey , nutrientNaam, nutrientHoeveelheid }) => {
    function createName(){
        return nutrientNaam.replaceAll("_", " ").replaceAll(" g", " (g)")
                            .replaceAll(" mg", " (mg)").replaceAll(" ug", " (ug)")
                            .replaceAll(" OR ", "/").replaceAll("3", " 3").replaceAll("6", " 6")
    }

    return (
    // <li key = {listKey} className='nutrientDiv'>
        <div className='element-of-list nutrient-div' >
            <p className='nutrientNameP'>{createName()} : </p>
            <p className='nutrientNumberP'>{nutrientHoeveelheid && nutrientHoeveelheid!= "–" ? nutrientHoeveelheid.toFixed(0): "-"}</p>
        </div>
    // </li>
    ); 
};