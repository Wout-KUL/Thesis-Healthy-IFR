import React, {useState} from 'react';
import {useLocation } from "react-router-dom";
import { IngredientVoorkeur } from '../Elementen/IngredientVoorkeur';
import {useNavigate } from "react-router-dom";
import { VoorkeurenZoekbalk } from '../Elementen/VoorkeurenZoekbalk';
import TextField from "@mui/material/TextField";
import { useOutletContext } from "react-router-dom";
import ControlledRadioButtonsGroup from '../Elementen/RadioButton';
import Button from '@mui/material/Button';
import { Checkbox, FormControlLabel } from '@mui/material';


function IngredientenVoorkeurenPage({alleIngredienten, groepInfo}) {
    const [log, logNav, rootURL] = useOutletContext();


    const { state } = useLocation()
    const persoon = state["persoon"]

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    }

    const [allergienArray, setAllergienArray] = useState(persoon["allergien"]);
    const [dummy, setDummy] = useState(false);
    const [isVegi, setIsVegi] = useState(persoon["isVegi"] ? "Vegetarisch":"Vleeseter");
    const [geslacht, setGeslacht] = useState(persoon["geslacht"]);

    const [allergienArrayORI, setAllergienArrayORI] = useState([...persoon["allergien"]]);
    const [voorkeurenORI, setVoorkeurenORI] = useState({...persoon["voorkeuren"]});



    function isAllergisch(ingredientNaam) {
        const index = allergienArray.indexOf(ingredientNaam);
        let allergienTemp = allergienArray
        if (index > -1) {
            allergienTemp.splice(index, 1);
            setAllergienArray(allergienTemp)
        }
        else {
            allergienTemp.push(ingredientNaam)
            setAllergienArray(allergienTemp)

        }
        setDummy(!dummy)

    }


    function updateVoorkeuren (value, naam) {
        naam = naam.replaceAll(" ", "").toUpperCase()


        if (value["value"] == 3) {
            if ( persoon["voorkeuren"].hasOwnProperty(naam)) {
                delete persoon["voorkeuren"][naam];
            }
        }
        else {
            persoon["voorkeuren"][naam] = value["value"];
        }
    }

    const submit = e => {
        e.preventDefault();

        if (persoon["geslacht"] != geslacht) {
            log(persoon["naam"] + "_nieuw_geslacht_" + geslacht )
        }

        const dieetTemp = persoon["isVegi"]? "Vegetarisch" : "Vleeseter"
        
        if (dieetTemp != isVegi) {
            log(persoon["naam"] + "_nieuw_dieet_" + isVegi )
        }

        for (let [ingredientNaam, value] of Object.entries(persoon["voorkeuren"])) {
            persoon["voorkeuren"]
            if(!voorkeurenORI.hasOwnProperty(ingredientNaam) || (voorkeurenORI.hasOwnProperty(ingredientNaam) &&voorkeurenORI[ingredientNaam] !=value) ){
                log("Button_" + "UpdateVoorkeuren_" + ingredientNaam.replaceAll(" ", "_") +"_"+ value  +"_"+persoon["naam"]+"_"+ "IngredientenVoorkeurenPage")
                log("Button_" + "UpdateVoorkeuren_" + "IngredientenVoorkeurenPage")
            }
        }
        for (let [ingredientNaam, value] of Object.entries(voorkeurenORI)) {
            if(!persoon["voorkeuren"].hasOwnProperty(ingredientNaam) ){
                log("Button_" + "UpdateVoorkeuren_" + ingredientNaam.replaceAll(" ", "_") +"_"+ 3  +"_"+persoon["naam"]+"_"+ "IngredientenVoorkeurenPage")
                log("Button_" + "UpdateVoorkeuren_" + "IngredientenVoorkeurenPage")
            }
        }


        allergienArray.forEach(allergie => {
            if(!allergienArrayORI.includes(allergie)){
            log("Button_" + "SetAllergie_" + allergie.replaceAll(" ", "_")  +"_"+persoon["naam"]+"_"+ "IngredientenVoorkeurenPage")
            log("Button_" + "SetAllergie_" + "IngredientenVoorkeurenPage")
            }
        });

        allergienArrayORI.forEach(allergie => {
            if(!allergienArray.includes(allergie) ){
                log("Button_" + "removeAllergie_" + allergie.replaceAll(" ", "_")  +"_"+persoon["naam"]+"_"+ "IngredientenVoorkeurenPage")
                log("Button_" + "removeAllergie_" + "IngredientenVoorkeurenPage")
            }

        });

        log("Button_" + "block_" + "IngredientenVoorkeurenPage_" + blockedArray.length)


        groepInfo["group"] = groepInfo["group"].filter(currPersoon => (
            currPersoon["naam"] != persoon["naam"]
        ))
        groepInfo["group"].push({naam : persoon["naam"], voorkeuren: persoon["voorkeuren"], allergien: allergienArray,  
                                geslacht : geslacht, isVegi: isVegi == "Vegetarisch", checked : persoon["checked"], 
                                learnedPreferences:  persoon["learnedPreferences"]?persoon["learnedPreferences"] : undefined,
                                blockedArray: blockedArray
                            })

        Meteor.call('GroepsInformatieDB.update', groepInfo);
        logNav("/GroepsInstellingenPage")

    };

    const [blockedArray, setBlockedArray] = useState(persoon["blockedArray"]);

    function setBlockLearner(ingredientNaam){
        ingredientNaam = ingredientNaam.replaceAll(" ", "").toUpperCase()
        const index = blockedArray.indexOf(ingredientNaam);
        let blockedTemp = blockedArray
        if (index > -1) {
            blockedTemp.splice(index, 1);
            setBlockedArray(blockedTemp)
        }
        else {
            blockedTemp.push(ingredientNaam)
            setBlockedArray(blockedTemp)

        }
        setDummy(!dummy)

    }
    console.log(blockedArray);


    function setBlockAll(){
        let newBlockedArray = []
        if (alleIngredienten.length == blockedArray.length) {
            setBlockedArray(newBlockedArray)
            setDummy(!dummy)
        }
        else{
            alleIngredienten.forEach(ingredient => {
                newBlockedArray.push(ingredient.naam.replaceAll(" ", "").toUpperCase())
            });
            setBlockedArray(newBlockedArray)
            setDummy(!dummy)
        }
    }
 
    return (
        <div className='padding-tabs'> 
            <div className='main-div'>
            <div className='main-div-root'>
            <div className='float-right'>
                <Button variant="outlined" onClick={ submit} style={{ "white-space": "nowrap"}}>
                Opslaan
                </Button>
            </div>
        
        <h2 className='naam'>{persoon["naam"]}</h2>
        <div className='radio-buttons-container'>
            <div className='radio-button'>
            <ControlledRadioButtonsGroup titel = {"Gender:"} optie1 = {"Man"} optie2 = {"Vrouw"} optie3 = {"Andere"} start = {geslacht} setter = {setGeslacht} />
            </div>
            <div className='radio-button'>
            <ControlledRadioButtonsGroup titel = {"Dieet:"} optie1 = {"Vleeseter"} optie2 = {"Vegetarisch"} start = {isVegi} setter = {setIsVegi} />
            </div>
        </div>
        {/* <input
                type="checkbox"
                checked={isVegi}
                onClick={() => setIsVegi(!isVegi)}
                readOnly
        />
        <label>Ik ben vegetarisch</label> */}

        </div>
        </div>
        <div className='in-between-div'></div>


        <div className='main-div'>
            <div className='main-div-root'>
        <div className="main div-margin-bot">
                    <div className="search">
                        <TextField
                        id="outlined-basic"
                        onChange={inputHandler}
                        variant="outlined"
                        fullWidth
                        label="Zoek"
                        />
                    </div>
                    <div>
                    <FormControlLabel control={
                                                <Checkbox
                                                size='small'
                                                checked={alleIngredienten.length == blockedArray.length}
                                                onChange={setBlockAll}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                    } label="Blokkeer alle automatische updates" />


                    </div>
                    <div className='scrollable-border'>
                    <VoorkeurenZoekbalk 
                        ingredienten = {alleIngredienten} 
                        inputText= {inputText}
                        updateVoorkeuren = {updateVoorkeuren}
                        persoon = {persoon}
                        isAllergisch = {isAllergisch}
                        setBlockLearner ={setBlockLearner}
                        blockedArray = {blockedArray}

                    /> 
                    </div>
        </div>

        </div>
        </div>
        {/* <div className='in-between-div'></div>


        <div className='main-div'>
        <div className='main-div-root div-margin-bot'>
        <div className='div-50-height'>
            <button className='smallButton button-color horizontal-center-button' type="submit" onClick={submit}>Opslaan</button>
        </div>
        </div>
        </div> */}
        </div>
    );
}

export default IngredientenVoorkeurenPage;