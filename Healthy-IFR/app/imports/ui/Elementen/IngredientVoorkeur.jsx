import React from 'react';
import Likert from 'react-likert-scale';


export const IngredientVoorkeur = ({ ingredient, updateVoorkeuren, index, isAllergisch, checked, blockLearner, setBlockLearner }) => {
  const likertOptions = {
    question: "Hoe lekker vind je dit ingrediënt?",
    responses: [
      { value: 1, text: "--" },
      { value: 2, text: "-" },
      { value: 3, text: "0"},
      { value: 4, text: "+" },
      { value: 5, text: "++" }
    ],
    onChange: val => {updateVoorkeuren(val, ingredient.naam)},
    id : ingredient._id
  };
  likertOptions["responses"][index]["checked"]=  true;

  return (
    <div className='element-of-list'>
      <p><b>{ingredient.naam}</b></p>
      <div className='div-margin-bot'>
        <Likert {...likertOptions} />
      </div>
      <div className='div-margin-bot'>
        <input
                type="checkbox"
                checked={checked}
                onClick={() => isAllergisch(ingredient.naam)}
                readOnly
        />
        <label>Ik ben hier allergisch voor</label>
        </div>
        <div className='div-margin-bot'>
        <input
                type="checkbox"
                checked={blockLearner}
                onClick={() => setBlockLearner(ingredient.naam)}
                readOnly
        />
        <label>Blokkeer automatisch updaten door algoritme</label>
        </div>
    </div>
  );
};