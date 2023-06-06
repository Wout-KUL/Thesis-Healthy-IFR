import React, { useState } from 'react';
import { IngredientVoorkeur } from '../Elementen/IngredientVoorkeur';
import { useTracker } from 'meteor/react-meteor-data';
import { GroepsInformatieDB } from '../../db/GroepsInformatieDB';
import {useNavigate } from "react-router-dom";
import { Collapsible } from '../Elementen/Collapsible';
import { useOutletContext } from "react-router-dom";
import ControlledRadioButtonsGroup from '../Elementen/RadioButton';
import TextField from "@mui/material/TextField";
import { VoorkeurenZoekbalk } from '../Elementen/VoorkeurenZoekbalk';
import Button from '@mui/material/Button';
import { Alert, Checkbox, FormControlLabel } from '@mui/material';
import { APPparameters } from "../Elementen/Parameters";



function GroepslidToevoegenPage({user, alleIngredienten}) {
    const [log, logNav, rootURL] = useOutletContext();


    const [username, setUsername] = useState('');
    const [voorkeuren, setVoorkeuren] = useState({});
    const [geslacht, setGeslacht] = useState('');

    const [allergienArray, setAllergienArray] = useState([]);
    const [dummy, setDummy] = useState(false);

    const userFilter = user ? { userId: user._id } : {};

    const [openIngredientenVoorkeuren, setOPen] = useState(false);
    const toggle = () => {
        setOPen(!openIngredientenVoorkeuren);
    };

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    }

    const [isVegi, setIsVegi] = useState("Vleeseter");


    function isAllergisch(ingredientNaam) {
        // log("Button_" + "IsAllergisch_" + ingredientNaam.replaceAll(" ", "_") +"_"+username+"_"+ "GroepslidToevoegenPage")
        // log("Button_" + "IsAllergisch_" + "GroepslidToevoegenPage")
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
        console.log(allergienArray)
        setDummy(!dummy)

    }

    function updateVoorkeuren (value, ingredientNaam) {
        ingredientNaam = ingredientNaam.replaceAll(" ", "").toUpperCase()
        if (value["value"] == 3) {
            if (voorkeuren.hasOwnProperty(ingredientNaam)) {
                delete voorkeuren[ingredientNaam];
                setVoorkeuren(voorkeuren)
            }
        }
        else {
            voorkeuren[ingredientNaam] = value["value"];
            setVoorkeuren(voorkeuren)

        }
        console.log(voorkeuren)
    }

    const { groepInfo, isLoading } = useTracker(() => {
        const noDataAvailable = { groepInfo: {group:[]}};
        if (!Meteor.user()) {
          return noDataAvailable;
        }
        const handler = Meteor.subscribe('GroepsInformatieDB');
    
        if (!handler.ready()) {
          return { ...noDataAvailable, isLoading: true };
        }
    
        let groepInfo = GroepsInformatieDB.findOne(
          userFilter,
        )
    
        return { groepInfo };
      });

    const submit = e => {
        e.preventDefault();
    
        if (!username){
            alert("Vergeet je naam niet")
            return;
        }
        if (!username.length>15){
            alert("Je naam mag maximum 15 tekens bevatten")
            return;
        }
        if (geslacht == ""){
            alert("Vergeet geen geslacht te selecteren")
            return;
        }
        if (groepInfo["group"].map(lid => lid.naam).includes(username)){
            alert("Deze persoon bestaat al")
            return;
        }
        log("Button_" + "GroepslidToevoegen" +"_"+username+"_"+ "GroepslidToevoegenPage")
        log("Deelnemer")
        log(geslacht)
        log(isVegi)
        for (const [ingredientNaam, value] of Object.entries(voorkeuren)) {
            log("Button_" + "UpdateVoorkeuren_" + ingredientNaam.replaceAll(" ", "_") +"_"+ value  +"_"+username+"_"+ "GroepslidToevoegenPage")
            log("Button_" + "UpdateVoorkeuren_" + "GroepslidToevoegenPage")
          }
        allergienArray.forEach(allergie => {
            log("Button_" + "SetAllergie_" + allergie.replaceAll(" ", "_")  +"_"+username+"_"+ "GroepslidToevoegenPage")
            log("Button_" + "SetAllergie_" + "GroepslidToevoegenPage")
        });

        //metric van 0 tot 100 -> 0 demotion , 100 promotion
        learnedPreferences = {}
        alleIngredienten.forEach(ingredient => {
            // if (Object.keys(voorkeuren).includes(ingredient.naam)) {
            //     learnedPreferences[ingredient.naam] = (voorkeuren[ingredient.naam] - 3) * 100
            // }else{
            //     learnedPreferences[ingredient.naam] = 0
            // }
            learnedPreferences[ingredient.naam.replaceAll(" ", "").toUpperCase()] = (APPparameters.learnedUpperLimit - APPparameters.learnedLowerLimit) /2
        });

        log("Button_" + "block_" + "GroepslidToevoegenPage_" + blockedArray.length)


        groepInfo["group"].push({naam : username.replaceAll(".", "_"), voorkeuren: voorkeuren, allergien : allergienArray, 
                                    isVegi: isVegi == "Vegetarisch", geslacht : geslacht, checked : true, 
                                    learnedPreferences: learnedPreferences, blockedArray: blockedArray
                                })
        Meteor.call('GroepsInformatieDB.update', groepInfo);
        logNav("/GroepsInstellingenPage")
    };

    const [blockedArray, setBlockedArray] = useState([]);

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
            <div className=''>
                <div className='float-right'>
                <Button variant="outlined" onClick={ submit} style={{ "white-space": "nowrap"}}>
                Toevoegen
                </Button>
                </div>
                {/* <button className= "smallButton button-color float-right" type="submit" onClick={submit}>Toevoegen</button> */}
            </div>
            <h2>Nieuw Groepslid</h2>
            <div className='radio-buttons-container'>
                <div className='radio-button'>
                <ControlledRadioButtonsGroup titel = {"Gender:"} optie1 = {"Man"} optie2 = {"Vrouw"} optie3 = {"Andere"} start = {geslacht} setter = {setGeslacht} />
                </div>
                <div className='radio-button'>
                <ControlledRadioButtonsGroup titel = {"Dieet:"} optie1 = {"Vleeseter"} optie2 = {"Vegetarisch"} start = {isVegi} setter = {setIsVegi} />
                </div>
            </div>
            <div className='div-margin-bot'>
                <input
                className='username-input '
                type="text"
                placeholder="Naam"
                name="username"
                required
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            </div>
            </div>
            <div className='in-between-div'></div>


            <div className='main-div'>
            <Alert severity="info">Dit deel is optioneel en kan later ook nog gebeuren</Alert>   

            <div className='main-div-root'>
            <div>
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
                        isAllergisch = {isAllergisch}
                        index = {2}
                        allergienArray = {allergienArray}
                        setBlockLearner ={setBlockLearner}
                        blockedArray = {blockedArray}

                    /> 
                    </div>

        </div>

            </div>
            </div>
            </div>
            {/* <div className='in-between-div'></div>

            <div className='main-div'>
            <div className='main-div-root div-margin-bot'>
            <div className='div-50-height'>
                <button className= "smallButton button-color horizontal-center-button" type="submit" onClick={submit}>Toevoegen</button>
            </div>
            </div>
            </div> */}
        </div>

    );
}

export default GroepslidToevoegenPage;