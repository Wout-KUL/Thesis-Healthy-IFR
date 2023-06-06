import React from 'react';

export const NutrientDisplayUpperLower = ({listKey , nutrientNaam, nutrientHoeveelheidLower, nutrientHoeveelheidUpper }) => {
    function createName(){
        return nutrientNaam.replaceAll("_", " ").replaceAll(" g", " (g)")
                            .replaceAll(" mg", " (mg)").replaceAll(" ug", " (ug)")
                            .replaceAll(" OR ", "/").replaceAll("3", " 3").replaceAll("6", " 6")
    }

    return (
    // <li key = {listKey} className='nutrientDiv'>
        <div className='element-of-list nutrient-div' >
            <p className='nutrientNamePDoughnut'>{createName()} : </p>
            <p className='nutrientNumberPDoughnut'>{nutrientHoeveelheidLower && nutrientHoeveelheidLower!= "–" ? nutrientHoeveelheidLower.toFixed(0): "-"}</p>
            <p className='nutrientNumberPDoughnut'>{nutrientHoeveelheidUpper && nutrientHoeveelheidUpper!= "–" ? nutrientHoeveelheidUpper.toFixed(0): "-"}</p>

        </div>
    // </li>
    ); 
};