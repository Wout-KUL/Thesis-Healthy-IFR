// import { React, useState } from 'react';
import React, {useState} from 'react';

import { useTracker } from 'meteor/react-meteor-data';
import "../../../client/IngredientenLijstPage.css"


import { IngredientUitIngredientenLijst } from '../Elementen/IngredientUitIngredientenLijst';

import TextField from "@mui/material/TextField";
import ZoekbalkLijst from '../Elementen/ZoekbalkLijst' //https://dev.to/salehmubashar/search-bar-in-react-js-545l
import {Collapsible} from '../Elementen/Collapsible'

import {Link, useLocation, useNavigate } from "react-router-dom";

import { useOutletContext } from "react-router-dom";
import FullWidthTabs from '../Elementen/SwipableFullWidthTabs';
import { Alert } from '@mui/material';
import { rateIngredientHealth, rateIngredientTaste } from '../Elementen/MetricFunctions';
import { getParticipatingMembers } from '../Elementen/TasteFunctions';




function IngredientenLijstPage( {geselecteerdeIngredienten, setter, alleIngredienten, groepInfo}) {
    const alleIngredientenCopy = [...alleIngredienten]
    const [log, logNav, rootURL] = useOutletContext();
    const nav =  useNavigate();
    const navigate = (value, state) => nav(rootURL+ value, state)

    const [openVoorgesteldeIngredienten, setOPen] = useState(false);
    const toggle = (collapsibleLabel) => {
        log("Collapsible_" + collapsibleLabel.replaceAll(" ", "_") +"_"+ arguments.callee.name)
        setOPen(!openVoorgesteldeIngredienten);
 
    };

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    }



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
    
    function goToIngriedentRecognition () {
        logNav('/IngredientRecognitionPage',
        )
    }

    function goToPersonalizedExplanationsPage(ingredient){
        log("/PersonalizedExplanationsPage" + "_Ingredient")
        navigate('/PersonalizedExplanationsPage',
            {state : {ingredient: ingredient, group: groepInfo["group"]}}
        )
    }

    const [majorityMen, setMajorityMen] = useState(true);


    const { firstTimePageOpens, setFirstTimePageOpens} = useTracker(() => {
        const [firstTimePageOpens, setFirstTimePageOpens] = useState(true);

        if (firstTimePageOpens && groepInfo["group"].length > 0) {
            setMajorityMen(MajorityMen())
            setFirstTimePageOpens(false)
        }

        return firstTimePageOpens, setFirstTimePageOpens
    })

    
    function MajorityMen(){
      let nmbMen = 0
      let nmbWomen = 0
      groepInfo["group"].forEach(lid => {
        if (lid.geslacht == "Man") {
          nmbMen ++
        }else{
          nmbWomen ++ 
        }
      });
      return nmbMen>nmbWomen
    }

    function groupContainsVegan() {
        const participatingMembers = getParticipatingMembers(groepInfo["group"])
        let bool = false
        participatingMembers.forEach(member => {
            if (member.isVegi) {
                bool = true
            }
        });
        return bool
    }


    function getReceptenMetLifestyle(alleIngredientenCopy) {
        if (groupContainsVegan()) {
            return alleIngredientenCopy.filter(ingredient => {return ingredient.Vegi == 1})
        }else{
            return alleIngredientenCopy
        }

    }

    const receptenMetLifestyle = getReceptenMetLifestyle(alleIngredientenCopy)

    function getReorderIngredients(receptenMetLifestyle){
        receptenMetLifestyle.map( ingredient => {
            rateIngredientTaste(rateIngredientHealth(ingredient, groepInfo), groepInfo)
        })
        return receptenMetLifestyle.sort(function(a, b) { return (b["health"] + b["opinion"]) - (a["health"] + a["opinion"]) })
    }

    const reorderIngredients = getReorderIngredients(receptenMetLifestyle)


    return (
        <div className='main-div'>
             <FullWidthTabs title1 = {"Voorgestelde ingredienten"} title2={"Alle ingredienten"} slideable = {true} page = {"/IngredientenLijstPage"}>
                <div className='padding-tabs'>
                <div  className='main-div'>
                {groepInfo["notifications"]?<Alert severity="info">
                Klik op <div className="div-img-in-tekst"><img className='img-in-tekst' src={rootURL + '/Images/question-red.png'}></img></div> voor een gepersonaliseerde verklaring 
                </Alert> : <></>  }
                <div  className='main-div-root'>


                {/* <h4 className='h4 no-margin-top'>Klik op <div className="div-img-in-tekst"><img className='img-in-tekst' src='Images/question-red.png'></img></div> voor een gepersonaliseerde verklaring </h4> */}
                    <div id="Ingredienten" className='IngredientenLijstPage-div-scrollable scrollable-border'>
                    {reorderIngredients.map(ingredient => (
                            <div key={"voorgesteldeIngredienten" + ingredient._id} className='voorgesteldeIngredientenLi element-of-list'>
                            <div className="question-container red-question">
                                <img className='red-question-img' src={rootURL + '/Images/question-red.png'} onClick={() => goToPersonalizedExplanationsPage(ingredient)}/>
                            </div>
                            <IngredientUitIngredientenLijst
                            key={"voorgesteldeIngredienten" + ingredient._id}
                            ingredient={ingredient}
                            toevoegen = {toevoegen}
                            leesMeer = {leesMeer}
                            />
                            </div>
                    ))}
                    </div>    
                </div>
                </div>

                </div>

                <div className='padding-tabs'>
                <div  className='main-div'>
                <div  className='main-div-root'>
                    <div className="search">
                        <TextField
                        id="outlined-basic"
                        onChange={inputHandler}
                        variant="outlined"
                        fullWidth
                        label="Zoek"
                        />
                    </div>
                    <div className="item2">
                        <img className='IRImage' src={rootURL + "/Images/camera.png"} border="0" alt="javascript button" onClick={goToIngriedentRecognition}></img>
                    </div>
                    <div className='in-between-div'></div>
                    <ZoekbalkLijst 
                    ingredienten = {alleIngredienten} 
                    inputText= {inputText}
                    toevoegen = {toevoegen}
                    leesMeer = {leesMeer}
                    /> 
                </div>
                </div>

                </div>
            </FullWidthTabs>
            {/* <div>
                <div className='main-div'>
                    <div className='main-div-root'>
                    <div className="search">
                        <TextField
                        id="outlined-basic"
                        onChange={inputHandler}
                        variant="outlined"
                        fullWidth
                        label="Zoek"
                        />
                    </div>
                    <div className="item2">
                        <img className='IRImage' src="Images/camera.png" border="0" alt="javascript button" onClick={goToIngriedentRecognition}></img>
                    </div>
                    </div>
                </div>
                <div className='in-between-div'></div>

                <div className='main-div'>
                <div className='main-div-root'>

                <ZoekbalkLijst 
                    ingredienten = {alleIngredientenCopy} 
                    inputText= {inputText}
                    toevoegen = {toevoegen}
                    leesMeer = {leesMeer}
                /> 
                </div>
                </div>
                <div className='in-between-div'></div>

            </div> */}
            {/* <div className='main-div'>
            <div className='main-div-root'>

            <Collapsible key = {"VoorgesteldeIngredienten"} label = "Voorgestelde ingredienten" open = {openVoorgesteldeIngredienten} toggle = {toggle}>
                <div>
                <h4>Klik op <div className="div-img-in-tekst"><img className='img-in-tekst' src='Images/question-red.png'></img></div> voor een gepersonaliseerde verklaring </h4>

                    <div id="Ingredienten" className='IngredientenLijstPage-div-scrollable scrollable-border'>

                    {reorderIngredients().map(ingredient => (
                            <div key={"voorgesteldeIngredienten" + ingredient._id} className='voorgesteldeIngredientenLi element-of-list'>
                            <div className="question-container red-question">
                                <img className='red-question-img' src='Images/question-red.png' onClick={() => goToPersonalizedExplanationsPage(ingredient)}/>
                            </div>
                            <IngredientUitIngredientenLijst
                            key={"voorgesteldeIngredienten" + ingredient._id}
                            ingredient={ingredient}
                            toevoegen = {toevoegen}
                            leesMeer = {leesMeer}
                            />
                            </div>

                    ))}

                    </div>    
                </div>
            </Collapsible>
            </div>
            </div> */}

        </div>
    );
}

export default IngredientenLijstPage;