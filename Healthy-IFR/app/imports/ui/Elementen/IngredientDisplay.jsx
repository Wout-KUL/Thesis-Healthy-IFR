import React from 'react';

export const IngredientDisplay = ({ ingredient }) => {
    return (
    <li>
      {/* <input 
        id={recept.titel}
        type="checkbox"
        // checked={!!exercise.isChecked}
        onClick={() => onCheckboxClick(this)}
        readOnly
      /> */}
      <span>{ingredient.naam}</span>
    </li>
  );
};