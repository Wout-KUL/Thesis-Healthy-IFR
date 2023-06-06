import React, {useState} from 'react'
import {Collapsible} from './Collapsible'
import { IngredientUitIngredientenLijst } from './IngredientUitIngredientenLijst';
import { useOutletContext } from "react-router-dom";



export const ZoekbalkLijst = (props) => {
    const [log] = useOutletContext();
    const label = "Alle ingredienten"
    const [openList, setOPen] = useState(false);
    const toggle = (collapsibleLabel) => {
        log("Collapsible_"  + collapsibleLabel.replaceAll(" ", "_") +"_"+ "ZoekbalkLijst")
        setOPen(!openList);
    };
    //create a new array by filtering the original array
    const filteredData = props.ingredienten.filter((el) => {
        //if no input the return the original
        if (props.inputText === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            if(!openList){
                toggle(label);
            }
            return el.naam.toLowerCase().includes(props.inputText)
        }
    })

    return (
            <div className='IngredientenLijstPage-div-scrollable scrollable-border'>
                    {filteredData.length>0 ? 
                    filteredData.map((ingredient) => (
                        <div key={"alleIngredienten" + ingredient._id} className='alleIngredientenLi element-of-list'>
                        <IngredientUitIngredientenLijst
                        key={"alleIngredienten" + ingredient._id}
                        ingredient={ingredient}
                        toevoegen = {props.toevoegen}
                        leesMeer = {props.leesMeer}
                        />
                        </div>)): 'Geen ingrediënten gevonden met naam "' + props.inputText + '"'}
            </div>
  );
};

export default ZoekbalkLijst