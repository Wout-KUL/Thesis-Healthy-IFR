import React from 'react';
import ReceptenInfoElement from '../Elementen/ReceptenInfoElement'
import {Link, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import FullWidthTabs from '../Elementen/SwipableFullWidthTabs';
import ScrollableTabsButtonAuto from '../Elementen/SwipableScrollableTabs';
import { useTracker } from 'meteor/react-meteor-data';
import { useState } from 'react';
import { MaaltijdGeschiedenisDB } from '../../db/MaaltijdGeschiedenisDB';

import { ReceptBasicInfoElement } from '../Elementen/ReceptBasicInfoElement';
import { ReceptSmakenInfoElement } from '../Elementen/ReceptSmakenInfoElement';
import { ReceptVoedingswaardenInfoElement } from '../Elementen/ReceptVoedingswaardenInfoElement';
import { KiesReceptButton } from '../Elementen/KiesReceptButton';
import { updateLearnedPreferences } from '../Elementen/LearningFunctions';



function VergelijkReceptenPage({user, alleIngredienten, groepInfo}) {
    const nav =  useNavigate();
    const navigate = (value, state) => nav(rootURL+ value, state)
    const [log, logNav, rootURL] = useOutletContext();

    let location = useLocation();
    const { state } = useLocation()
    const recepten = state["recepten"]
    console.log("location is " , location);
    console.log("recepten is " , recepten);
    console.log("recepten is " , recepten.length);

    const userFilter = user ? { userId: user._id } : {};

    console.log("groepInfo is " , groepInfo);

      const { firstTimePageOpens, setFirstTimePageOpens} = useTracker(() => {
        const [firstTimePageOpens, setFirstTimePageOpens] = useState(true);
        console.log(firstTimePageOpens)
        console.log(groepInfo["group"].length)

        if (firstTimePageOpens && groepInfo["group"].length > 0) {
            allertAllergies ()
            setFirstTimePageOpens(false)
        }

        return firstTimePageOpens, setFirstTimePageOpens
    })



    const { userGeschiedenis, isLoading } = useTracker(() => {
        const noDataAvailable = { userGeschiedenis: {}};
        if (!Meteor.user()) {
          return noDataAvailable;
        }
        const handler = Meteor.subscribe('maaltijdGeschiedenisDB');
    
        if (!handler.ready()) {
          return { ...noDataAvailable, isLoading: true };
        }
    
        let userGeschiedenis = MaaltijdGeschiedenisDB.findOne(
          userFilter,
        )

    
        return { userGeschiedenis };
      });


    function kiesRecept (recept, rating, description, makeMeal) {
        updateLearnedPreferences(recept, rating, groepInfo, alleIngredienten)
        log("/VergelijkReceptenPage_" + "Recept_" + (makeMeal? "klaargemaakt" : "enkel_bekeken"))

        log("/VergelijkReceptenPage_" + "Recept_" + recept.titel.replaceAll(" ", "_").replaceAll(".", "_"))
        log("/VergelijkReceptenPage_" + "Rating_" + rating)
        log("/VergelijkReceptenPage_" + "Description")
        if (description!= "") {
          log("/VergelijkReceptenPage_" + "Description_Not_Empty")
        }
          userGeschiedenis["geschiedenis"].push({recept : recept, rating:rating, description:description, makeMeal:makeMeal , createdAt: new Date,})
          Meteor.call('maaltijdGeschiedenisDB.update', userGeschiedenis);
          alert("Recept opgeslagen in geschiedenis")
      }


    function allertAllergies () {
        bool = false
        console.log(groepInfo)
        groepInfo["group"].forEach(lid => {
            recepten.forEach(recept => {

            const subtags = recept.SubTags.split(',');
            subtags.forEach(ingredient => {
                lid["allergien"].forEach(gevaarlijkIngredient => {
                    if(gevaarlijkIngredient.replaceAll(/\s/g, '') == ingredient.replaceAll(/\s/g, '')){
                        bool = true
                    }
                });

            });
        });
        });
        if (bool) {
            alert("Iemand van uw groep is allergisch voor een van de ingrediënten in een van deze recepten! (Om ongelukken te voorkomen ziet u deze melding ook wanneer u heeft aangeduidt dat de persoon in kwestie niet mee-eet)")
        }
    }

    function goToPersonalizedExplanationsPage(recept){
        console.log("here");
        log('/PersonalizedExplanationsPage'  + "_Recept")
        navigate('/PersonalizedExplanationsPage',
            {state : {recept: recept, group: groepInfo["group"], andereRecepten : recepten}}
        )
    }


    var target = document.getElementById("target");
    console.log("offset is ", target? target.offsetLeft : "lala");

  //   function offset(el) {
  //     var rect = el.getBoundingClientRect(),
  //     scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  //     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //     return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  // }

  // example use
  // var div = document.getElementById("target");

  // if (div) {
  //   divOffset = offset(div);
  //   setOffset(divOffset.left)
  //   console.log(divOffset.left, divOffset.top);
  // }
  // console.log(divOffset.left, divOffset.top);
  const [configuration, setConfiguration] = useState({gender: "Man", dieet: "Vleeseter", tab : 0});
//   let configuration = {gender: "Man", dieet: "Vegetarisch", tab : 1}

    function setter(value){
        console.log(value);
        setConfiguration(value)
    }
    console.log("configuration is ",configuration);

    return (
        <div className='VergelijkContainter'>
            {/* <div className='titels'>
                <div className='titelblock'>
                    <h2><u>{recepten[0].titel}</u></h2>
                </div>
                <div className='titelblock'>
                    <h2><u>{recepten[1].titel}</u></h2>
                </div>  
            </div> */}
            <FullWidthTabs title1 = {"Algemeen"} title2={"Smaken"} title3={"Voedings - waarden"} page = {"/VergelijkReceptenPage"} >
              <div className='padding-tabs'>
            <ScrollableTabsButtonAuto length = {recepten.length}>
                {recepten.map(recept => (
                    <ReceptBasicInfoElement recept = {recept} kiesRecept={kiesRecept} goToPersonalizedExplanationsPage = {goToPersonalizedExplanationsPage} groepInfo = {groepInfo}/>
                ))}
            </ScrollableTabsButtonAuto>
            </div>  
            <div className='padding-tabs'>
            <ScrollableTabsButtonAuto length = {recepten.length}>
                {recepten.map(recept => (
                    <ReceptSmakenInfoElement recept = {recept} groepInfo = {groepInfo} shared = {1} user = {user} 
                    kiesRecept={kiesRecept} goToPersonalizedExplanationsPage = {goToPersonalizedExplanationsPage}/>
                ))}
            </ScrollableTabsButtonAuto>
            </div>
            <div className='padding-tabs'> 
            <ScrollableTabsButtonAuto length = {recepten.length}>
                {recepten.map(recept => (
                    <ReceptVoedingswaardenInfoElement recept = {recept} groepInfo = {groepInfo} 
                    shared = {1} alleIngredienten = {alleIngredienten} configuration = {configuration} 
                    setConfiguration = {setter} kiesRecept={kiesRecept}  page = {"/VergelijkReceptenPage/Voedingswaarden"} 
                    goToPersonalizedExplanationsPage = {goToPersonalizedExplanationsPage}/>
            ))}
            </ScrollableTabsButtonAuto>
            </div>
            </FullWidthTabs>
            {/* <div className='receptInfo'>
                <ReceptenInfoElement 
                    recept = {recepten[0]} 
                    user = {user} 
                    center = { window.screen.width/4} 
                    shared = {2} 
                    smileyWidth = {30}
                    alleIngredienten = {alleIngredienten}

                />
            </div>
            <div className='receptInfo'>
                <ReceptenInfoElement 
                    recept = {recepten[1]} 
                    user = {user} 
                    shared = {2} 
                    smileyWidth = {30}
                    alleIngredienten = {alleIngredienten}
                    
                />
            </div> */}
        </div>
    );
}

export default VergelijkReceptenPage;