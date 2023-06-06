import React from 'react';
import {Bars} from './BarShart'
import { useNavigate, useOutletContext } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Badge } from '@mui/material';

function PersonalizedRecipeExplanationElement({recept, group, andereRecepten}) {
    const [log, logNav, rootURL] = useOutletContext();

    const nav =  useNavigate();
    const navigate = (value, state) => nav(rootURL+ value, state)
    console.log(recept);
    function getTotalScore(){
        console.log(((recept["healthScore"] + recept["opinion"]) /2) *100)
        return ((recept["healthScore"] + recept["opinion"]) /2) *100
    }
    const total = getTotalScore().toFixed(0)
    const health = (recept.healthScore*100).toFixed(0)
    const opinion = (recept.opinion * 100).toFixed(0)

    function leesMeer (recept) {
        log("/ReceptenInfoPage_Algemeen" + "_Auto_Load")
        log('/ReceptenInfoPage')
        navigate('/ReceptenInfoPage',
            {state : {recept: recept}}
        )
    }

    function vergelijkRecepten () {
        log("/VergelijkReceptenPage_Algemeen" + "_Auto_Load")
        log('/VergelijkReceptenPage' + andereRecepten.length)

        navigate('/VergelijkReceptenPage',
            {state : {recepten: andereRecepten}}
        )
    }

    return (
        <div>
        <h2>{recept.titel}</h2>
        <Bars labels = {["Gezondheid", "Smaak"]} values = {[health, opinion]}/>
        {/* <p>Dit recept heeft een totale score gekregen van {total} op een schaal van 0 tot 100. 
        Bij het berekenen van deze score worden gezondheid en smaken met eenzelfde gewicht in rekening gebracht.
        </p> */}
        <p>Dit recept heeft een <b>gezondheidsscore</b> gekregen van <b>{health}</b> op een schaal van 0 tot 100. Deze score is afhankelijk van voor hoeveel categorieën
        het recept zich binnenin de donut bevindt. 
        </p>
        <p>De <b>smaakscore</b> van dit recept is <b> {opinion}</b> op een schaal van 0 tot 100. Deze score kijkt naar wie er mee-eet en wat hun mening is over de 
        ingrediënten in het recept (dit kan u aanduiden bij de groepsinstellingen). Hoe meer groepsleden een positieve mening hebben over 
        de ingrediënten in het recept, hoe hoger de score. Hoe negatiever de meningen over de ingrediënten, hoe lager de score. Een score van 50 betekent dat de gemiddelde mening over 
        de ingrediënten in dit recept neutraal is. 
        
        </p>
        {/* <p>Dit recept heeft een totale score gekregen van {total} op een schaal van 0 tot 100. 
        Bij het berekenen van deze score worden gezondheid en smaken met eenzelfde gewicht in rekening gebracht.
        </p> */}
        <p>Voor het aanbevelen van recepten worden gezondheid en smaak als even belangrijk gezien. Daarom krijgt dit recept een <b>totaalscore</b> van <b>{total}</b> op 100</p>

        <div className='add-padding-for-button-div'>
            {/* <button className="" onClick={ () => leesMeer(recept) }>Lees Meer</button> */}
        <div className='float-right'>

        {andereRecepten? 

        <Badge badgeContent={andereRecepten? andereRecepten.length: 0}  sx={{"& .MuiBadge-badge": { backgroundColor: '#87B5E3',}}}> 
            <Button variant="outlined" onClick={vergelijkRecepten} style={{ "whiteSpace": "nowrap"}}>
                Terug naar vergelijken
            </Button>
        </Badge> 
        :
        <Button variant="outlined" onClick={  () => leesMeer(recept)} style={{ "whiteSpace": "nowrap"}}>
        Recept informatie
        </Button> }
        </div>
        </div>
        </div>
    );
}

export default PersonalizedRecipeExplanationElement;