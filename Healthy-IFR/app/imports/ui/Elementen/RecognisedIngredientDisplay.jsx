import React from 'react';
import { IngredientUitIngredientenLijst } from '../Elementen/IngredientUitIngredientenLijst';
import { useNavigate, useOutletContext } from 'react-router-dom';

export const RecognisedIngredientDisplay = ({index, percentage, alleIngredienten, geselecteerdeIngredienten, setter}) => {
  const [log, logNav, rootURL] = useOutletContext();

  const nav =  useNavigate();
  const navigate = (value, state) => nav(rootURL+ value, state)



  const toevoegen = (ingredient) => {
    log("Button_" + "IngredientToevoegen_" + ingredient.naam.replaceAll(" ", "_") +"_"+ "RecognisedIngredientDisplay")
    log("Button_" + "IngredientToevoegen_" + "RecognisedIngredientDisplay")

    geselecteerdeIngredienten.push(ingredient);
    setter(geselecteerdeIngredienten);
    logNav('/' )
  };

function leesMeer (ingredient) {
    log("/IngredientenInfoPage")
    log("/IngredientenInfoPage" + "_" + ingredient.naam.replaceAll(" ", "_"))
    log("/IngredientenInfoPage_Algemeen" + "_Auto_Load")

    navigate('/IngredientenInfoPage',
        {state : {ingredient: ingredient}}
    )
}


  console.log(index);
    return (
        <div className='element-of-list'>
            <div>{"Met " + percentage.toFixed(0) + "% zekerheid:"}</div>
            <IngredientUitIngredientenLijst
                        key={alleIngredienten[index]._id}
                        ingredient={alleIngredienten[index]}
                        toevoegen = {toevoegen}
                        leesMeer = {leesMeer}
                        // onCheckboxClick={toggleChecked}
                        />
        </div>
  );
};