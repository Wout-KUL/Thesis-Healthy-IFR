import React, {useState} from 'react';
import {useLocation, useOutletContext} from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';

import { NutrientDisplay } from '../Elementen/NutrientDisplay';
import Hexagon  from '../Elementen/Hexagon'
import HexagonVitMin  from '../Elementen/HexagonVitMin'

import '../../../client/IngredientenInfoPage.css'
import {useNavigate } from "react-router-dom";
import { TabsElement } from '../Elementen/Tabs'
import BasicTabs from '../Elementen/BasicTabs';
import ControlledRadioButtonsGroup from '../Elementen/RadioButton';
import Button from '@mui/material/Button';



function IngredientenInfoPage( {geselecteerdeIngredienten, setter, groepInfo}) {
    const [log, logNav, rootURL] = useOutletContext();

    const nav =  useNavigate();
    const navigate = (value, state) => nav(rootURL+ value, state)
    const { state } = useLocation()
    const ingredient = state["ingredient"]


    const toevoegen = () => {
        log("Button_" + "IngredientToevoegen_" + ingredient.naam.replaceAll(" ", "_") +"_"+ arguments.callee.name)
        log("Button_" + "IngredientToevoegen_" + arguments.callee.name)

        geselecteerdeIngredienten.push(ingredient);
        setter(geselecteerdeIngredienten);
        logNav('/' )
    };

    

    function goToExplanationsPage () {
        log('/ExplanationsPage' + "_Hexagon")
        navigate('/ExplanationsPage',
            {state : {hexagon: true}}
        )
    }
    const [isVegi, setIsVegi] = useState("Vleeseter");


    const [majority, setMajority] = useState("Man");


    const { firstTimePageOpens, setFirstTimePageOpens} = useTracker(() => {
        const [firstTimePageOpens, setFirstTimePageOpens] = useState(true);
        console.log(firstTimePageOpens)
        console.log(groepInfo["group"].length)

        if (firstTimePageOpens && groepInfo["group"].length > 0) {
            setMajority(getMajority())
            setFirstTimePageOpens(false)
        }

        return firstTimePageOpens, setFirstTimePageOpens
    })

    
    function getMajority(){
      let nmbMen = 0
      let nmbWomen = 0
      let nmbOther = 0

      groepInfo["group"].forEach(lid => {
        if (lid.geslacht == "Man") {
          nmbMen ++
        }else if(lid.geslacht == "Vrouw"){
          nmbWomen ++ 
        }else{
            nmbOther ++
        }
      });
      if (nmbMen >= nmbWomen && nmbMen >= nmbOther) {
        return "Man"
      }else if(nmbWomen >= nmbMen && nmbWomen >= nmbOther) {
        return "Vrouw"
      }else{
        return "Andere"
      }
    }
    console.log("nutrienten", ingredient["nutrienten"]);


    var divOffset ={ top: 0, left: 54}


    return (
        <div className='padding-tabs overflow-x-hidden'>
            <div>
                <div className='main-div'>
                <div className='main-div-root'>
                <div className='float-right'>
                <Button variant="outlined" onClick={ toevoegen} style={{ "white-space": "nowrap"}}>
                Toevoegen
                </Button>
                </div>
                <h2>{ingredient.naam}:</h2>
                
                <div>
                <div className='radio-buttons-container'>
                <div className='radio-button'>
                <ControlledRadioButtonsGroup titel = {"Gender:"} optie1 = {"Man"} optie2 = {"Vrouw"} optie3 = {"Andere"} start = {majority} setter = {setMajority} />
                </div>
                <div className='radio-button'>
                <ControlledRadioButtonsGroup titel = {"Dieet:"} optie1 = {"Vleeseter"} optie2 = {"Vegetarisch"} start = {isVegi} setter = {setIsVegi} />
                </div>
                </div>

                <BasicTabs  title1 = {"Algemeen"} title2={"Vitamines & Mineralen"} page = {"/IngredientenInfoPage"}>
                <div key = {"gewoon" + majority+ isVegi}>
                    <Hexagon ingredient = {ingredient} goToExplanationsPage = {goToExplanationsPage} isVegi = {isVegi == "Vegetarisch"} 
                    majority = {majority} offset = {divOffset.left} rootURL = {rootURL} />
                </div>
                <div key = {"vitmin" + majority+ isVegi}>
                    <HexagonVitMin ingredient = {ingredient} goToExplanationsPage = {goToExplanationsPage}  isVegi = {isVegi  == "Vegetarisch"} 
                    majority = {majority} offset = {divOffset.left} rootURL = {rootURL}/>
                </div>

                </BasicTabs>
                {/* <TabsElement title1 = {"Algemeen"} title2="Vitamines & Mineralen">    
                    <div key = {"gewoon" + majorityMen + isVegi}>
                    <Hexagon ingredient = {ingredient} goToExplanationsPage = {goToExplanationsPage} isVegi = {isVegi} majorityMen = {majorityMen}/>
                    </div>
                    <div key = {"gewoon" + majorityMen + isVegi}>
                    <HexagonVitMin ingredient = {ingredient} goToExplanationsPage = {goToExplanationsPage}  isVegi = {isVegi} majorityMen = {majorityMen}/>
                    </div>

                </TabsElement> */}
                </div>
                </div>
                </div>
                <div className='in-between-div'></div>

                <div className='main-div'>
                <div className='main-div-root'>
                    <div>
                        <h4><u>Per 100 gram: </u></h4>
                    </div>
                    <div className='ingredientInfoScollableDiv scrollable-border'>
                        {Object.keys(ingredient["nutrienten"]).filter(key => (!key.includes("ADH"))).map(key => (
                            // ingredient.nutrienten[key] *= 2;
                            <NutrientDisplay
                            key={ingredient._id + key} 
                            nutrientNaam={key}
                            nutrientHoeveelheid = {ingredient["nutrienten"][key]}
                            />
                        ))}
                    </div>
                </div>
                </div>

            </div>
            {/* <div className='in-between-div'></div>

            <div className='main-div'>
            <div className='div-50-height'>
                <button className= "smallButton button-color horizontal-center-button" type="submit" onClick={toevoegen}>Toevoegen</button>


            </div>
            </div> */}
        </div>
    );
}

export default IngredientenInfoPage;