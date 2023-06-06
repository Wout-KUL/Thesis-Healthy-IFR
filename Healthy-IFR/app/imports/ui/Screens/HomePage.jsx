import React, {useState} from 'react';
import {useNavigate, useOutletContext } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';

import { MaaltijdGeschiedenisDB } from '../../db/MaaltijdGeschiedenisDB';

import { ReceptenDB } from '../../db/ReceptenDB';
import { ReceptDisplay } from '../Elementen/ReceptDisplay';

import "../../../client/HomePage.css"

import {getParticipatingMembers} from '../Elementen/TasteFunctions'
import Alert from '@mui/material/Alert';
import { Badge, FormControlLabel, Switch } from '@mui/material';

import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import { addTasteMetric, addHealthMetric } from '../Elementen/MetricFunctions';






function HomePage({geselecteerdeIngredienten, setter, alleIngredienten, groepInfo}) {
    const [log, logNav, rootURL] = useOutletContext();
    const nav =  useNavigate();
    const navigate = (value, state) => nav(rootURL+ value, state)

    const [dummy, setDummy] = useState(false);

    const [vergelijkenArray, setVergelijkenArray] = useState([]);

    const userFilter = Meteor.user() ? { userId: Meteor.user()._id } : {};

    const { recepten, isLoading } = useTracker(() => {
        const noDataAvailable = { recepten: []};
        if (!Meteor.user()) {
            return noDataAvailable;
        }
        const handler = Meteor.subscribe('receptenDB');
        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const recepten = ReceptenDB.find(
        ).fetch();

        return { recepten };
    });

    const { userGeschiedenis, isLoadingGeschiedenis } = useTracker(() => {
        const noDataAvailable = { userGeschiedenis: {geschiedenis : []}};

        if (!Meteor.user()) {
          return noDataAvailable;
        }
        const handler = Meteor.subscribe('maaltijdGeschiedenisDB');

        if (!handler.ready()) {
          return { ...noDataAvailable, isLoading: true };
        }
    
        let userGeschiedenis = MaaltijdGeschiedenisDB.findOne(
          userFilter,
          {
            sort: { createdAt: -1 },
          }
        )    
        return { userGeschiedenis };
      });

    const deleteTag = (verwijderdeIngredient) => {
        setter(geselecteerdeIngredienten.filter(ingredient => ingredient._id != verwijderdeIngredient._id))
    }
    
    const vergelijkenArrayHasRecept = (recept) => {
        for (let index = 0; index < vergelijkenArray.length; index++) {
            if (vergelijkenArray[index]._id == recept._id) {
                return true;
            }
            
        }     
        return false;   
    }

    
    const vergelijken = (recept) => {
        const max = 6
        console.log(recept);
        if (!vergelijkenArrayHasRecept(recept)) {
            if(vergelijkenArray.length==max){
                alert("Je kan maximum " + max + " recepten vergelijken")
            }else{
                const temp = vergelijkenArray
                temp.push(recept)
                setVergelijkenArray(temp)
            }
        }
        else {
            const temp = vergelijkenArray.filter( currRecept => (
                    currRecept._id != recept._id
                    
                ))
            setVergelijkenArray(temp)
        }
        setDummy(!dummy)

    }

    function leesMeer (recept) {
        log("/ReceptenInfoPage_Algemeen" + "_Auto_Load")
        log('/ReceptenInfoPage')
        navigate('/ReceptenInfoPage',
            {state : {recept: recept}}
        )
    }

    function vergelijkRecepten () {
        log("/VergelijkReceptenPage_Algemeen" + "_Auto_Load")
        log('/VergelijkReceptenPage' + vergelijkenArray.length)

        navigate('/VergelijkReceptenPage',
            {state : {recepten: vergelijkenArray}}
        )
    }

    function lessThanWeekAgo(today, receptDate){
        return today.getDate() - receptDate.getDate() < 7
    }

    function getEvenNietMeerGegetenRecepten() {
        const today = new Date();
        return recepten.filter(recept => {
            let sameName = false
            for (let index = 0; index < userGeschiedenis.geschiedenis.length; index++) {
                const geschiedenisEntry = userGeschiedenis.geschiedenis[index];

                if (geschiedenisEntry.recept.titel == recept.titel && lessThanWeekAgo(today, geschiedenisEntry.createdAt)) {
                    sameName =true
                }
            }
            return !sameName

        })
    }
    const evenNietMeerGegetenRecepten = getEvenNietMeerGegetenRecepten()


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


    function getReceptenMetLifestyle(evenNietMeerGegetenRecepten) {
        if (groupContainsVegan()) {
            return evenNietMeerGegetenRecepten.filter(recept => {return recept.vegan == 1})
        }else{
            return evenNietMeerGegetenRecepten
        }

    }
    const receptenMetLifestyle = getReceptenMetLifestyle(evenNietMeerGegetenRecepten)

    function containsAllTags (recept) {
        let bool = true
        geselecteerdeIngredienten.forEach(tag => {
            if (!recept.SubTags.includes(tag["naam"])) {
                bool = false
            }
        });
        return bool

    }

    function getReceptenMetTags (receptenMetLifestyle) {
        return receptenMetLifestyle.filter(containsAllTags )
    }
    const receptenMetTags = getReceptenMetTags(receptenMetLifestyle)


    function reorder(receptenMetTags){
        let health = addHealthMetric(receptenMetTags, groepInfo, alleIngredienten)
        let healthAndTastes = addTasteMetric(health, groepInfo)

        return healthAndTastes.sort(function(a, b) { return (b["healthScore"] + b["opinion"]) - (a["healthScore"] + a["opinion"]) })


    }

    // function countNmbSucceededHealthCategories(recepten){
    //     let counter = {}
    //     recepten.forEach(recept => {
    //         const nutrienten = sumTagNutritions(recept, alleIngredienten) 
    //         const enoughHeuristics = calcHeuristics(calcZScoresSufficientOfRecipe(nutrienten))
    //         const toMuchHeuristics = calcHeuristics(calcZScoresToMuchOfRecipe(nutrienten))
    //         for (const [key, enoughValue] of Object.entries(enoughHeuristics)) {
    //             const toMuchValue = toMuchHeuristics[key]
    //             if (!counter[key]){[
    //                 counter[key] = 0
    //             ]}
    //             if (enoughValue >= 1 && toMuchValue <= 1) {
    //                 counter[key] = counter[key] + 1 
    //             }
    //             // healthScoreLength++
    //         }
    //     });
    //     return counter
    // }


    const receptenMetTagsReordered = reorder(receptenMetTags)
    receptenMetTagsReordered.forEach(recept => {
        recept["total"] = (recept["healthScore"] + recept["opinion"])/2

    });
    function goToPersonalizedExplanationsPage(recept){
        console.log("here");
        log('/PersonalizedExplanationsPage'  + "_Recept")
        navigate('/PersonalizedExplanationsPage',
            {state : {recept: recept, group: groepInfo["group"]}}
        )
    }

    function goToIngredientenLijstPage(){
        log("/IngredientenLijstPage_Voorgestelde_ingredienten" + "_Auto_Load")
        logNav('/IngredientenLijstPage')
    }



    console.log(groepInfo["notifications"]);

    return (
        <div className='padding-tabs'>
            <div >                   
                 {groepInfo["group"].length == 0 && groepInfo["notifications"]? 
                 <Alert 
                 severity="info" 
                 onClick={ () =>  logNav('/GroepsInstellingenPage')}>
                    Opgelet, u heeft nog geen groep ingegeven! Klik hier om dit te doen

                </Alert> 
                : <></>}
                <div className="main-div">
                    <div className='main-div-root'>
                    <h2>Ingredient toevoegen: </h2>
                    <div className="ingredientenlijstButton">
                    <Button variant="outlined" onClick={ () => goToIngredientenLijstPage() } style={{maxWidth: '200px', maxHeight: '70px', minWidth: '30px', minHeight: '30px'}}>
                    {geselecteerdeIngredienten.length == 0 ? "Voeg hier ingrediënten toe" : "Extra ingrediënt toevoegen"}
                    </Button>
                    </div>
                    </div>
                </div>
                <div className="in-between-div"></div>

                {geselecteerdeIngredienten.length>0 ? 
                <div>
                <div className="main-div">
                    <div className='main-div-root'>
                    <h2>Huidige ingredienten: </h2>
                    <div id="IngredientenTagsContainer">
                        {geselecteerdeIngredienten.map( (ingredient) => (
                            <div className="tag button-color">
                                {ingredient.naam}
                                <label onClick={() => deleteTag(ingredient)}>x</label>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
                <div className="in-between-div"></div>
                </div>
                : 
                <></>
                }
            </div>

            <div id="VoorgesteldeRecepten" className="main-div">
            <div className='main-div-root div-padding-bot'>

                <h2>Voorgestelde Recepten:</h2>
                {groepInfo["notifications"]?
                <Alert severity="info">
                {/* <div className='clear-notification'>
                    <ClearIcon onClick= {() => setNotification(false)}/>
                </div> */}
                <div className='float-left'>
                <span >Klik op <div className="div-img-in-tekst"><img className='img-in-tekst' src= {rootURL + '/Images/question-red.png'}></img></div> voor een gepersonaliseerde verklaring </span>
                </div>


                </Alert>  
                :
                <></>
                }



                <div id="Recepten" className='HomePage-div-scrollable scrollable-border '>
                    {receptenMetTagsReordered.length > 0? receptenMetTagsReordered.map(recept => (
                        <ReceptDisplay
                        key={recept._id}
                        recept={recept}
                        checked = {  vergelijkenArrayHasRecept(recept)}
                        vergelijken = {vergelijken}
                        leesMeer = {leesMeer}
                        vergelijkenArray = {vergelijkenArray}
                        goToPersonalizedExplanationsPage = {goToPersonalizedExplanationsPage}
                        />
                    )): <p className='uitleg-p'>Geen recepten gevonden die voldoen aan alle tags (recepten die tot 7 dagen terug zijn gekozen, zijn terug te vinden bij uw maaltijdgeschiedenis.</p>}
                </div>
                {vergelijkenArray.length>1? 
                <div id='anchor'>
                <div id="VergelijkKnop">
  
                <Badge badgeContent={vergelijkenArray.length}  sx={{"& .MuiBadge-badge": { backgroundColor: '#87B5E3',}}}> 
                    <Button variant="contained" onClick={vergelijkRecepten} style={{maxWidth: '130px', maxHeight: '50px', borderRadius : "10px"}}>
                        Vergelijk Recepten
                    </Button>
              </Badge>  
              </div> 
              </div>
            

                :
                <></>
                }
   
                </div>
            </div>
        </div>
    );
}

export default HomePage;