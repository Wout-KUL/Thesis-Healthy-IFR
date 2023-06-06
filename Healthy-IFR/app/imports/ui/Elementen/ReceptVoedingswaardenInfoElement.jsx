
import React from 'react';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import Doughnut  from '../Elementen/Doughnut'
import DoughnutVitMin  from '../Elementen/DoughnutVitMin'
import { NutrientDisplay } from './NutrientDisplay';
import BasicTabs from './BasicTabs';
import ControlledRadioButtonsGroup from './RadioButton';
import { sumTagNutritions } from './HealthFunctions';
import { KiesReceptButton } from './KiesReceptButton';



export const ReceptVoedingswaardenInfoElement = ({ recept, groepInfo, shared, alleIngredienten, configuration, setConfiguration, kiesRecept, page, goToPersonalizedExplanationsPage }) => {
  const [log, logNav, rootURL] = useOutletContext();

  const nav =  useNavigate();
  const navigate = (value, state) => nav(rootURL+ value, state)
  // console.log(configuration);
    const [majority, setMajority] = useState(configuration? configuration.gender : "Man");
    const [isVegi, setIsVegi] = useState(configuration? configuration.dieet : "Vleeseter");

    function setMajorityConfig(value){
        if (setConfiguration) {
            configuration["gender"] = value
            console.log(configuration);
            setConfiguration(configuration)
        }
        setMajority(value)
    }

    function setIsVegiConfig(value){
        if (setConfiguration) {
            configuration["dieet"] = value
            setConfiguration(configuration)
        }
        setIsVegi(value)
    }

    function setTabConfig(value){
        if (setConfiguration) {
            configuration["tab"] = value
            setConfiguration(configuration)
        }
    }
    

    function goToExplanationsPage () {
      log('/ExplanationsPage_Doughnut')
        navigate('/ExplanationsPage',
            {state : {doughnut: true}}
        )
    }

    var divOffset ={ top: 0, left: 40}


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


    const { firstTimePageOpens, setFirstTimePageOpens} = useTracker(() => {
        const [firstTimePageOpens, setFirstTimePageOpens] = useState(true);
        console.log(firstTimePageOpens)
        console.log(groepInfo["group"].length)

        if (firstTimePageOpens && groepInfo["group"].length > 0) {
            if (!configuration) {
                setMajority(getMajority())
            }
            setFirstTimePageOpens(false)
        }

        return firstTimePageOpens, setFirstTimePageOpens
    })

    const nutrienten =  alleIngredienten.length == 0? [{}] : sumTagNutritions(recept, alleIngredienten)
    // console.log("nutri ",nutrienten)



    return (
      <div>
        <div className='tabs overflow-x-hidden main-div'>
              <div className="question-container HomePage-red-question float-right">
                  <img className='red-question-img' src={rootURL + '/Images/question-red.png'} onClick={() => goToPersonalizedExplanationsPage(recept)}/>
              </div>
                <h3 className='recept-titel-tabs'>{recept.titel}</h3>

                <div className='radio-buttons-container recept-titel-tabs'>
                <div className='radio-button'>
                <ControlledRadioButtonsGroup titel = {"Gender:"} optie1 = {"Man"} optie2 = {"Vrouw"} optie3 = {"Andere"} start = {majority} setter = {setMajorityConfig} />
                </div>
                <div className='radio-button'>
                <ControlledRadioButtonsGroup titel = {"Dieet:"} optie1 = {"Vleeseter"} optie2 = {"Vegetarisch"} start = {isVegi} setter = {setIsVegiConfig} />
                </div>
                </div>
                  <div id='target' className='target-class-doughnut'></div>


                  <BasicTabs title1 = {"Algemeen"} title2={shared == 1? "Vitamines & Mineralen":"Vit. & Min."} startTab = {configuration? configuration.tab : 0} setter = {setTabConfig} page= {page}>

                  <div key = {"gewoon" + majority + isVegi} className='padding-tabs'>
                        <Doughnut key = {"gewoon"} recept = {recept} shared = {shared} idString = {recept._id + majority} 
                                  alleIngredienten = {alleIngredienten} goToExplanationsPage = {goToExplanationsPage}
                                  majority = {majority} isVegi = {isVegi  == "Vegetarisch"} offset= {divOffset.left} rootURL = {rootURL}
                                  />
                    </div>

                    <div key = {"vitmin" + majority+ isVegi} className='padding-tabs'>
                        <DoughnutVitMin key = {"vitmin"} recept = {recept} shared = {shared} idString = {recept._id + majority} 
                                        alleIngredienten = {alleIngredienten} goToExplanationsPage = {goToExplanationsPage}
                                        majority = {majority} isVegi = {isVegi  == "Vegetarisch"} offset= {divOffset.left} rootURL = {rootURL}
                                        />
                    </div>

                  </BasicTabs>

                  <div className='indent'>
                  {/* <h2>Per portie:</h2> */}

                      <h5 className='tussentitel'><u>Per portie:</u></h5>
                      <div className='ingredientInfoScollableDiv scrollable-border'>
                              {Object.keys(nutrienten).filter(key => (!key.includes("ADH"))).map(key => (
                                  // ingredient.nutrienten[key] *= 2;
                                  <NutrientDisplay
                                  key={recept._id + key + "display"}
                                  listKey={recept._id + key}  
                                  nutrientNaam={key}
                                  nutrientHoeveelheid = {nutrienten[key]}
                                  />
                              ))}
                          </div>
                      </div>

                </div>
            <div className='in-between-div'></div>

            <KiesReceptButton recept = {recept} kiesRecept={kiesRecept}/>
            </div>
  );
};