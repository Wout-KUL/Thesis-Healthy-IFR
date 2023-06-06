import React, {useState, useEffect} from 'react';
import {useLocation, useOutletContext} from "react-router-dom";
import { Collapsible } from '../Elementen/Collapsible';



import { MaaltijdGeschiedenisDB } from '../../db/MaaltijdGeschiedenisDB';
import { useTracker } from 'meteor/react-meteor-data';
import { GroepsInformatieDB } from '../../db/GroepsInformatieDB';
import { TabsElement } from '../Elementen/Tabs';
import {useNavigate } from "react-router-dom";

import FullWidthTabs from './SwipableFullWidthTabs';

import { ReceptBasicInfoElement } from './ReceptBasicInfoElement';
import { ReceptSmakenInfoElement } from './ReceptSmakenInfoElement';
import { ReceptVoedingswaardenInfoElement } from './ReceptVoedingswaardenInfoElement';
import { KiesReceptButton } from './KiesReceptButton';
import SimpleDialogDemo from './PopUp';
import { updateLearnedPreferences } from './LearningFunctions';









function ReceptenInfoElement({recept, user, shared, smileyWidth, alleIngredienten, groepInfo}) {
  const [log, logNav, rootURL] = useOutletContext();

  const nav =  useNavigate();
  const navigate = (value, state) => nav(rootURL+ value, state)  

    const userFilter = user ? { userId: user._id } : {};




      const { firstTimePageOpens, setFirstTimePageOpens} = useTracker(() => {
        const [firstTimePageOpens, setFirstTimePageOpens] = useState(true);

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
      log("/ReceptenInfoPage_" + "Recept_" + (makeMeal? "klaargemaakt" : "enkel_bekeken"))
      log("/ReceptenInfoPage_" + "Recept_" + recept.titel.replaceAll(" ", "_").replaceAll(".", "_"))
      log("/ReceptenInfoPage_" + "Rating_" + rating)
      log("/ReceptenInfoPage_" + "Description")
      if (description!= "") {
        log("/ReceptenInfoPage_" + "Description_Not_Empty")
      }
        userGeschiedenis["geschiedenis"].push({recept : recept, rating:rating, description:description , makeMeal:makeMeal, createdAt: new Date,})
        Meteor.call('maaltijdGeschiedenisDB.update', userGeschiedenis);
        alert("Recept opgeslagen in geschiedenis")
    }


    function allertAllergies () {
        bool = false
        groepInfo["group"].forEach(lid => {
            const subtags = recept.SubTags.split(',');
            subtags.forEach(ingredient => {
                lid["allergien"].forEach(gevaarlijkIngredient => {
                    if(gevaarlijkIngredient.replaceAll(/\s/g, '') == ingredient.replaceAll(/\s/g, '')){
                        bool = true
                    }
                });

            });
        });
        if (bool) {
            alert("Iemand van uw groep is allergisch voor een van de ingrediënten in dit recept! (Om ongelukken te voorkomen ziet u deze melding ook wanneer u heeft aangeduidt dat de persoon in kwestie niet mee-eet)")
        }
    }

    function goToPersonalizedExplanationsPage(recept){
      console.log("here");
      log('/PersonalizedExplanationsPage'  + "_Recept")
      navigate('/PersonalizedExplanationsPage',
          {state : {recept: recept, group: groepInfo["group"]}}
      )
  }


    var target = document.getElementById("target");

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

    return (
      <div>
        <div>
        <FullWidthTabs title1 = {"Algemeen"} title2={"Smaken"} title3={"Voedings - waarden"} slideable = {true} page = {"/ReceptenInfoPage"}>
            <div key={"1"} className='padding-tabs'>
            <ReceptBasicInfoElement recept = {recept}  kiesRecept={kiesRecept} goToPersonalizedExplanationsPage = {goToPersonalizedExplanationsPage} groepInfo = {groepInfo}/>
            </div>
            <div key={"2"} className='padding-tabs'>
            <ReceptSmakenInfoElement recept = {recept} groepInfo = {groepInfo} shared = {shared} user = {user} 
            kiesRecept={kiesRecept} goToPersonalizedExplanationsPage = {goToPersonalizedExplanationsPage}/>
            </div>
            <div key={"3"} className='padding-tabs '>
            <ReceptVoedingswaardenInfoElement recept = {recept} groepInfo = {groepInfo} 
            shared = {shared} alleIngredienten = {alleIngredienten} 
            kiesRecept={kiesRecept} page = {"/ReceptenInfoPage/Voedingswaarden"} 
            goToPersonalizedExplanationsPage = {goToPersonalizedExplanationsPage}/>

            </div>
            
        </FullWidthTabs>
        </div>

        </div>
    );
}

export default ReceptenInfoElement;