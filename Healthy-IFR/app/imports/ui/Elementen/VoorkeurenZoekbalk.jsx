import React, {useState} from 'react'
import '../../../client/ZoekbalkLijst.css'
import { IngredientVoorkeur } from './IngredientVoorkeur';


export const VoorkeurenZoekbalk = (props) => {

    const filteredData = props.ingredienten.filter((el) => {
        if (props.inputText === '') {
            return el;
        }
        else {
            return el.naam.toLowerCase().includes(props.inputText)
        }
    })
    console.log(props.persoon?props.persoon : "new")


    return (
            <div className='ZoekbalkLijst-div-scrollable'>
                    {filteredData.length>0 ? 
                    filteredData.map((ingredient) => (
                        <IngredientVoorkeur
                        key={ingredient._id}
                        ingredient={ingredient}
                        updateVoorkeuren = {props.updateVoorkeuren}
                        index = {props.index? 
                                    props.index 
                                    : 
                                    props.persoon["voorkeuren"].hasOwnProperty(ingredient["naam"].replaceAll(" ", "").toUpperCase()) ? 
                                            props.persoon["voorkeuren"][ingredient["naam"].replaceAll(" ", "").toUpperCase()] -1 
                                            : 
                                            2}
                        isAllergisch = {props.isAllergisch}
                        checked = {props.allergienArray? props.allergienArray.includes(ingredient.naam) :props.persoon["allergien"].includes(ingredient.naam)}
                        blockLearner = {props.blockedArray? props.blockedArray.includes(ingredient.naam.replaceAll(" ", "").toUpperCase()) : false}
                        setBlockLearner ={ props.setBlockLearner}
                        />
                    )): "Geen ingrediënten gevonden met naam " + props.inputText}
            </div>
  );
};

export default VoorkeurenZoekbalk