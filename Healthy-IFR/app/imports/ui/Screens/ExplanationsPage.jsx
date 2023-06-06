import React, {useState} from 'react';
import {Collapsible} from '../Elementen/Collapsible'
import { useLocation, useOutletContext } from "react-router-dom";
import FullWidthTabs from '../Elementen/SwipableFullWidthTabs';
import { recommendedMen, recommendedWomen, calcOther, upperMen, upperWomen } from '../Elementen/RecommendedAndLimitIntakes';
import { NutrientDisplay } from '../Elementen/NutrientDisplay';
import { NutrientDisplayUpperLower } from '../Elementen/NutrientDisplayUpperLower';

function ExplanationsPage() {
    console.log("ingredienten");

    const [log, logNav, rootURL] = useOutletContext();

    const { state } = useLocation()
    const doughnut = state["doughnut"]
    const hexagon = state["hexagon"]
    const recognition = state["recognition"]
    const startTab = hexagon? 0 : (doughnut? 1 : 2)


    console.log("doughnut is " , doughnut);
    console.log("hexagon is " , hexagon);

    const [openHexagon, setOpenHexagon] = useState(hexagon? hexagon: false);
    const [openDoughnut, setOpenDoughnut] = useState(doughnut? doughnut: false);

    const toggleHexagon = (collapsibleLabel) => {
        log("Collapsible_" + collapsibleLabel.replaceAll(" ", "_") +"_"+ arguments.callee.name)
        setOpenHexagon(!openHexagon);
 
    };

    const toggleDoughnut= (collapsibleLabel) => {
        log("Collapsible_" + collapsibleLabel.replaceAll(" ", "_") +"_"+ arguments.callee.name)
        setOpenDoughnut(!openDoughnut);
 
    };


    return (
        <div>
        {/* <h2>ExplanationsPage</h2> */}
        <FullWidthTabs title1 = {"Hexagon"} title2={"Donut"} title3={"Camera"} slideable = {true} startTab = {startTab}>
        <div className='padding-tabs'>

        <div className="main-div">
        <div className='main-div-root'> 
            <p><b>Hoe moet ik deze figuur interpreteren?</b></p>
            <p>De figuur stelt voor hoe dicht een ingrediënt in de buurt komt van de aangerade
                dagelijkse hoeveelheden* opgesteld door het&nbsp;
                <a href="https://ods.od.nih.gov/HealthInformation/nutrientrecommendations.aspx">
                Nationaal Instituut voor Gezondheid van de Verenigde Staten</a>. Hoe dichter het 
                blauwe hoekpunt ligt bij het grijze hoekpunt, hoe beter. Bijgevolg is dus ook een 
                meer gevulde figuur beter dan een legere. 
            </p>
            <p>*De aangerade dagelijkse hoeveelheid (ADH) van een voedingswaarde is de hoeveelheid van deze voedingswaarde dat voldoende is voor 97-98% van gezonde individuen. 
                Speciale omstandigheden zoals zwangerschap, menopauze, ... hebben invloed op de ADH. Ook bepaalde ziektes kunnen de ADH beïnvloeden. 
                Deze situaties vallen buiten de omvang van dit onderzoek en worden dus niet in rekening gebracht. </p>
        </div>

        <FullWidthTabs title1 = {"Man"} title2={"Vrouw"} title3={"Andere"} slideable = {true} startTab = {0}>
            <div id='Man'>
            <div className='ingredientInfoScollableDiv scrollable-border'>
            <div className='element-of-list nutrient-div' >
                <p className='nutrientNameP'></p>
                <p className='nutrientNumberP'>{"ADH*"}</p>
                </div>
                { Object.keys(recommendedMen).map( nutrientName => (
                            <NutrientDisplay
                            key={nutrientName} 
                            nutrientNaam={nutrientName.replaceAll("ADH", "")}
                            nutrientHoeveelheid = {recommendedMen[nutrientName]}
                            />
                )

                )}
            </div>
            </div>


            <div id='Vrouw'>
            <div className='ingredientInfoScollableDiv scrollable-border'>
            <div className='element-of-list nutrient-div' >
                <p className='nutrientNameP'></p>
                <p className='nutrientNumberP'>{"ADH*"}</p>
                </div>
                { Object.keys(recommendedWomen).map( nutrientName => (
                            <NutrientDisplay
                            key={nutrientName} 
                            nutrientNaam={nutrientName.replaceAll("ADH", "")}
                            nutrientHoeveelheid = {recommendedWomen[nutrientName]}
                            />
                )

                )}
                </div>
            </div>

            <div id='Andere'>
            <div className='ingredientInfoScollableDiv scrollable-border'>
                <div className='element-of-list nutrient-div' >
                <p className='nutrientNameP'></p>
                <p className='nutrientNumberP'>{"ADH*"}</p>
                </div>
                { Object.keys(recommendedMen).map( nutrientName => (
                            <NutrientDisplay
                            key={nutrientName} 
                            nutrientNaam={nutrientName.replaceAll("ADH", "")}
                            nutrientHoeveelheid = {calcOther(recommendedMen, recommendedWomen)[nutrientName]}
                            />
                )

                )}
                </div>
            </div>

        </FullWidthTabs>
        </div>

        </div>




        <div className='padding-tabs'>

        <div className="main-div">
        <div className='main-div-root'>  
            <p><b>Hoe moet ik deze figuur interpreteren?</b></p>
            <p>De figuur bestaat uit twee cirkels, een grote buitencirkel en een kleinere binnencirkel. Samen vormen deze twee cirkels een donutvorm.
                <ul>
                <li className='ingredienten-opsomming-element small-div-margin-bot'>Wanneer de waarde van een van de categorieën voldoet aan de aangerade daglijkse hoeveelheid (ADH)* en tegelijkertijd minder is dan het dagelijkse maximum (DM)** opgesteld door het&nbsp;
                <a href="https://ods.od.nih.gov/HealthInformation/nutrientrecommendations.aspx">
                Nationaal Instituut voor Gezondheid van de Verenigde Staten</a> dan kleurt dit deel van de donut donker blauw en bevindt het uiteinde zich in de donut.</li>
                <li className='ingredienten-opsomming-element small-div-margin-bot'>Wanneer er een tekort is aan een van de voedingswaarden, dan kleurt dit deel licht blauw en bevindt het uiteinde zich in het gat van de donut.</li>
                <li className='ingredienten-opsomming-element small-div-margin-bot'>Tot slot, wanneer een recept te veel van een van de categorieën heeft, dan kleurt dit deel opnieuw licht blauw een bevindt het zich voorbij de buitenste cirkel van de donut.</li>
                </ul>
            </p>
            {/* <p>
                Het bereken van de voedingswaarden van een recept gebeurt als volgt:
                <ol>
                <li>Eerst worden de voedingwaarde van alle herkende ingrediënten opgezocht.
                (enkel ingrediënten die u zelf kan selecteren in de ingrediëntenlijst worden in rekening gebracht).</li>
                <li>Vervolgens worden deze waarden herschaalt naar hoe'n groot deel van de maaltijd ze innemen. (Groot, Gemiddeld, Klein, Heel Klein)</li>
                <li>Hierna worden alle waarden opgeteld.</li>
                <li>Ondertussen worden zowel de ADH als de DM herschaalt naar de waarden voor één maaltijd in plaats van een hele dag.</li>
                <li>Uiteindelijk wordt de som uit stap 3 vergeleken met de 2 waarden uit stap 4 om zo tot een conclussie te komen. </li>
                </ol>
            </p> */}
            <p>*De aangerade dagelijkse hoeveelheid (ADH) van een voedingswaarde is de hoeveelheid van deze voedingswaarde dat voldoende is voor 97-98% van gezonde individuen. 
                Speciale omstandigheden zoals zwangerschap, menopauze, ... hebben invloed op de ADH. Ook bepaalde ziektes kunnen de ADH beïnvloeden. 
                Deze situaties vallen buiten de omvang van dit onderzoek en worden dus niet in rekening gebracht. </p>
            <p>**Het dagelijkse maximum (DM) geeft aan hoeveel van een voedingswaarde dat een persoon kan innemen zonder dat de kans op negatieve gevolgen voor de gezondheid te groot worden.</p>
        </div>

        <FullWidthTabs title1 = {"Man"} title2={"Vrouw"} title3={"Andere"} slideable = {true} startTab = {0}>
            <div id='Man'>
            <div className='ingredientInfoScollableDiv scrollable-border'>
            <div className='element-of-list nutrient-div' >
                <p className='nutrientNamePDoughnut'></p>
                <p className='nutrientNumberPDoughnut'>{"ADH*"}</p>
                <p className='nutrientNumberPDoughnut'>{"DM*"}</p>

                </div>
                { Object.keys(recommendedMen).map( nutrientName => (
                            <NutrientDisplayUpperLower
                            key={nutrientName} 
                            nutrientNaam={nutrientName.replaceAll("ADH", "")}
                            nutrientHoeveelheidLower = {recommendedMen[nutrientName]}
                            nutrientHoeveelheidUpper = {upperMen[nutrientName]}

                            />
                )

                )}
            </div>
            </div>


            <div id='Vrouw'>
            <div className='ingredientInfoScollableDiv scrollable-border'>

                <div className='element-of-list nutrient-div' >
                <p className='nutrientNamePDoughnut'></p>
                <p className='nutrientNumberPDoughnut'>{"ADH*"}</p>
                <p className='nutrientNumberPDoughnut'>{"DM*"}</p>

                </div>
                { Object.keys(recommendedWomen).map( nutrientName => (
                            <NutrientDisplayUpperLower
                            key={nutrientName} 
                            nutrientNaam={nutrientName.replaceAll("ADH", "")}
                            nutrientHoeveelheidLower = {recommendedWomen[nutrientName]}
                            nutrientHoeveelheidUpper = {upperWomen[nutrientName]}

                            />
                )

                )}
                </div>
            </div>

            <div id='Andere'>
            <div className='ingredientInfoScollableDiv scrollable-border'>
            <div className='element-of-list nutrient-div' >
                <p className='nutrientNamePDoughnut'></p>
                <p className='nutrientNumberPDoughnut'>{"ADH*"}</p>
                <p className='nutrientNumberPDoughnut'>{"DM*"}</p>

                </div>
                { Object.keys(recommendedMen).map( nutrientName => (
                            <NutrientDisplayUpperLower
                            key={nutrientName} 
                            nutrientNaam={nutrientName.replaceAll("ADH", "")}
                            nutrientHoeveelheidLower = {calcOther(recommendedMen, recommendedWomen)[nutrientName]}
                            nutrientHoeveelheidUpper = {calcOther(upperMen, upperWomen)[nutrientName]}

                            />
                )

                )}
                </div>
            </div>

        </FullWidthTabs>
        </div>
        </div>


        <div className='padding-tabs'>

        <div className="main-div">
        <div className='main-div-root overflow-x-hidden'>        
        <p><b>Waarom wordt mijn camera niet herkend?</b></p>
        <p>Veel internet browsers proberen hun gebruikers extra te beschermen wanneer ze een website onveilig beoordelen.
            Zoals u in uw zoekbalk kan zien, vallen de servers van de KU Leuven jammer genoeg bij veel browsers onder dit soort sites.
        </p>

        <div className="insecure-container">
                    <img className='insecure-image' src={ rootURL + '/Images/not-secure-link.png'} onClick={this.goToExplanationsPage}/>
                </div>

        <p>Een gevolg hiervan is dat bepaalde functies (waaronder het gebruik van uw camera of webcam) op deze webapplicatie automatisch geblokkeerd worden.
            Wij verzekeren u dat dit een geval is waarbij de internet browsers te voorzichtig zijn en dat het gebruik van uw camera volledig zonder risico kan gebeuren.
            Als u uw camera wilt gebruiken, kan u dit handmatig toestaan door de volgende link in uw zoekbalk in te geven:

            <p>Google Chrome:  chrome://flags/#unsafely-treat-insecure-origin-as-secure</p>
            <p>Microsoft Edge:  edge://flags/#unsafely-treat-insecure-origin-as-secure</p>

            U komt dan op de volgende site terecht:
        </p>
                <div className="insecure-container">
                    <img className='insecure-image' src={ rootURL + '/Images/insecure-before.png'} onClick={this.goToExplanationsPage}/>
                </div>

        <p className='explanationsP'>
            Om het gebruik van de camera toe te staan voor deze webapplicatie zet u hier de optie "Disabled"  om naar "Enabled". En vult u in het vakje 
            ernaast de volgende link in "https://augment.cs.kuleuven.be/Healthy-IFR". Geen zorgen, voor andere "onveilige" websites blijft uw camera 
            dus nog altijd geblokkeerd. Het zou er nu zo uit moeten zien:
        </p>
                <div className="insecure-container">
                    <img className='insecure-image' src={ rootURL + '/Images/insecure-after.png'} onClick={this.goToExplanationsPage}/>
                </div>

        <p>
            Tot slot zal u, wanneer u terug op de "https://augment.cs.kuleuven.be/Healthy-IFR/IngredientRecognitionPage" pagina bent, een pop-up te zien 
            krijgen. Wanneer u hier op "Allow" klikt, zou uw camera moeten opspringen. 
        </p>
                <div className="insecure-container">
                    <img className='insecure-image' src={ rootURL + '/Images/toestaan.png'} onClick={this.goToExplanationsPage}/>
                </div>
        <p>Gebeurt dit niet, of krijgt u de pop-up niet te zien, probeer dan de pagina 
            eens opnieuw te laden.</p>
        
            </div>
        </div>
        </div>

        </FullWidthTabs>
        {/* <Collapsible key = {"Hexagon"} label = "Uitleg Hexagon" open = {openHexagon} toggle = {toggleHexagon}>
            <div>
               <p>Hoe moet ik deze figuur interpreteren?</p>
            <p>De figuur stelt voor hoe dicht een ingredient in de buurt komt van de aangerade
                dagelijkse hoeveelheden* opgesteld door het&nbsp;
                <a href="https://ods.od.nih.gov/HealthInformation/nutrientrecommendations.aspx">
                Nationaal Instituut voor Gezondheid van de Verenigde Staten</a>. Hoe dichter het 
                blauwe hoekpunt ligt bij het grijze hoekpunt, hoe beter. Bijgevolg is dus ook een 
                meer gevulde figuur beter dan een legere. 
            </p>
            <p>*De aangerade dagelijkse hoeveelheid (ADH) van een ingredient is de hoeveelheid van dit ingredient dat voldoende is voor 97-98% van gezonde individuen. 
                Speciale omstandigheden zoals zwangerschap, borstvoeding geven, menopauze, ... hebben invloed op de ADH. Ook bepaalde ziektes kunnen de ADH beïnvloeden. 
                Deze situaties vallen buiten de omvang van dit onderzoek en worden dus niet in rekening gebracht. </p>
            </div>
        </Collapsible>
        <Collapsible key = {"Doughnut"} label = "Uitleg Doughnut" open = {openDoughnut} toggle = {toggleDoughnut}>
            doughnut
        <div>
            <p>Hoe moet ik deze figuur interpreteren?</p>
            <p>De figuur bestaat uit twee cirkels, een grote buitencirkel en een kleinere binnencirkel. Samen vormen deze twee cirkels een donutvorm.
                <ul>
                <li>Wanneer de waarde van een van de categoriën voldoet aan de aangerade daglijkse hoeveelheid (ADH)* en tegelijkertijd minder is dan het dagelijkse maximum (DM)** opgesteld door het&nbsp;
                <a href="https://ods.od.nih.gov/HealthInformation/nutrientrecommendations.aspx">
                Nationaal Instituut voor Gezondheid van de Verenigde Staten</a> dan kleurt dit deel van de donut groen en bevindt het uiteinde zich in de donut.</li>
                <li>Wanneer er een tekort is aan een van de voedingswaarden, dan kleurt dit deel rood en bevindt het uiteinde zich in het gat van de donut.</li>
                <li>Tot slot, wanneer een recept te veel van een van de categoriën heeft, dan kleurt dit deel opnieuw rood een bevindt het zich voorbij de buitenste cirkel van de donut.</li>
                </ul>
            </p>
            <p>
                Het bereken van de voedingswaarden van een recept gebeurt als volgt:
                <ol>
                <li>Eerst worden de voedingwaarde van alle herkende ingredienten opgezocht 
                (ingredienten die u zelf niet kan selecteren in de ingredientenlijst worden dus niet in rekening gebracht).</li>
                <li>Vervolgens worden deze waarden herschaalt naar hoe'n groot deel van de maaltijd ze innemen. (Groot, Gemiddeld, Klein, Heel Klein)</li>
                <li>Hierna worden alle waarden opgeteld.</li>
                <li>Ondertussen worden zowel de ADH als de DM herschaalt naar de waarden voor één maaltijd in plaats van een hele dag.</li>
                <li>Uiteindelijk wordt de sum uit stap 3 vergeleken met de 2 waarden uit stap 4 om zo tot een conclussie te komen. </li>
                </ol>
            </p>
            <p>*De aangerade dagelijkse hoeveelheid (ADH) van een ingredient is de hoeveelheid van dit ingredient dat voldoende is voor 97-98% van gezonde individuen. 
                Speciale omstandigheden zoals zwangerschap, borstvoeding geven, menopauze, ... hebben invloed op de ADH. Ook bepaalde ziektes kunnen de ADH beïnvloeden. 
                Deze situaties vallen buiten de omvang van dit onderzoek en worden dus niet in rekening gebracht. </p>
            <p>**Het dagelijkse maximum (DM) is de hoeveelheid van een nutrient dat iemand kan innemen zonder dat de kans op negatieve gevolgen op de gezondheid te groot wordt</p>
        </div>
        </Collapsible> */}
    </div>
    );
}

export default ExplanationsPage;