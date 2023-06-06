import React from 'react';
import Button from '@mui/material/Button';

export const IngredientUitIngredientenLijst = ({ ingredient, toevoegen, leesMeer }) => {
    return (
    <div key={ingredient._id}>
      <p>{ingredient.naam}</p>
      <div className='inline-div'>
      <div className='left-align-button'>

      <Button variant="outlined" onClick={ () => toevoegen(ingredient)} style={{ "whiteSpace": "nowrap"}}>
      Toevoegen
      </Button>
      </div>

      <div className='left-align-button'>
      <Button variant="outlined" onClick={() => leesMeer(ingredient)} style={{ "whiteSpace": "nowrap"}}>
      Lees Meer
      </Button>
      </div>
    </div>
    </div>
  );
};