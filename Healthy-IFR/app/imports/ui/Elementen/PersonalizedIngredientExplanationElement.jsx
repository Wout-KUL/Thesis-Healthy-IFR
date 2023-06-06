import React from 'react';
import {Bars} from './BarShart'
import { useOutletContext, useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';



function PersonalizedIngredientExplanationElement({ingredient, group, geselecteerdeIngredienten, setter}) {
    const [log, logNav, rootURL] = useOutletContext();
    const nav =  useNavigate();
    const navigate = (value, state) => nav(rootURL+ value, state)

    console.log(ingredient);
    console.log(ingredient.opinion);

    function getTotalScore(){
        console.log(((ingredient["health"] + ingredient["opinion"]) /2) *100)
        return ((ingredient["health"] + ingredient["opinion"]) /2) *100
    }
    const total = getTotalScore().toFixed(0)
    const health = (ingredient.health*100).toFixed(0)
    const opinion = (ingredient.opinion * 100).toFixed(0)


    const toevoegen = (ingredient) => {
    log("Button_" + "IngredientToevoegen_" + ingredient.naam.replaceAll(" ", "_") +"_"+ arguments.callee.name)
    log("Button_" + "IngredientToevoegen_" + arguments.callee.name)

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

    return (
        <div>
        <h2>{ingredient.naam}</h2>
        <Bars labels = {["Gezondheid", "Smaak"]} values = {[ health, opinion]}/>
        {/* <p>Dit ingredient heeft een totale score gekregen van <b></b>{total} op een schaal van 0 tot 100. 
        Bij het berekenen van deze score worden gezondheid en smaken met eenzelfde gewicht in rekening gebracht.
        </p> */}
        <p>Dit ingrediënt heeft een <b>gezondheidsscore</b> van <b>{health}</b> gekregen op een schaal van 0 tot 100. Deze score is afhankelijk van voor hoeveel categorieën
        het ingrediënt voldoet aan de aangerade dagelijkse hoeveelheden opgesteld door het <a href="https://ods.od.nih.gov/HealthInformation/nutrientrecommendations.aspx">
        Nationaal Instituut voor Gezondheid van de Verenigde Staten</a>. 
        </p>
        <p>De <b>smaakscore</b> van dit ingrediënt is <b>{opinion}</b> op een schaal van 0 tot 100. Deze score kijkt naar wie er mee-eet en wat hun mening is over het 
        ingrediënt (dit kan u aanduiden bij de groepsinstellingen). Hoe meer groepsleden een positieve mening hebben over 
        het ingrediënt, hoe hoger de score. Hoe negatiever de meningen over het ingrediënt, hoe lager de score. Een score van 50 betekent dat de gemiddelde mening over 
        het ingrediënt neutraal is. 
        
        </p>

        <p>Voor het aanbevelen van ingrediënten worden gezondheid en smaak als even belangrijk gezien. Daarom krijgt dit ingrediënt een <b>totaalscore</b> van <b>{total}</b> op 100</p>


            <div className='div-padding-bot'>
            <div className='left-align-button'>
            <Button variant="outlined" onClick={  () => toevoegen(ingredient)} style={{ "white-space": "nowrap"}}>
            Toevoegen
            </Button>   
            </div>
            <div className='left-align-button'>
            <Button variant="outlined" onClick={  () => leesMeer(ingredient)} style={{ "white-space": "nowrap"}}>
            Lees Meer
            </Button>
            </div>
            </div>
            </div>
    );
}

export default PersonalizedIngredientExplanationElement;