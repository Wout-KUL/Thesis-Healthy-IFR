import React from 'react';
import {useLocation} from "react-router-dom";
import PersonalizedIngredientExplanationElement from '../Elementen/PersonalizedIngredientExplanationElement'
import PersonalizedRecipeExplanationElement from '../Elementen/PersonalizedRecipeExplanationElement'

function PersonalizedExplanationsPage({setter, geselecteerdeIngredienten}) {
    const { state } = useLocation()
    const recept = state["recept"]
    const group = state["group"]
    const ingredient = state["ingredient"]
    const andereRecepten = state["andereRecepten"]

    



    console.log("recept is " , recept);
    console.log("ingredient is " , ingredient);
    console.log("group is " , group);
    return (
        <div className='padding-tabs'>
        <div className="main-div">
        <div className='main-div-root'>
        {recept? 
        <PersonalizedRecipeExplanationElement recept = {recept} group= {group} andereRecepten = {andereRecepten} /> 
        : 
        <PersonalizedIngredientExplanationElement ingredient = {ingredient} group = {group} geselecteerdeIngredienten = {geselecteerdeIngredienten} setter = {setter} />}
        </div>
        </div>
        </div>

    );
}

export default PersonalizedExplanationsPage;