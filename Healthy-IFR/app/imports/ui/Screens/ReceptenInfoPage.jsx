import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import { Collapsible } from '../Elementen/Collapsible';
import Doughnut  from '../Elementen/Doughnut'
import HappySmiley  from '../Elementen/HappySmiley'
import SadSmiley  from '../Elementen/SadSmiley'
import ReceptenInfoElement from '../Elementen/ReceptenInfoElement'





function ReceptenInfoPage({user, alleIngredienten, groepInfo}) {
    const { state } = useLocation()
    const recept = state["recept"]

    const [openBasisInfo, setOPenBasisInfo] = useState(false);
    const toggleBasisInfo = () => {
        setOPenBasisInfo(!openBasisInfo);
    }; 

    const [openMeningen, setOPenMeningen] = useState(false);
    const toggleMeningen = () => {
        setOPenMeningen(!openMeningen);
    };

    const [openVoedingswaarden, setOPenVoedingswaarden] = useState(false);
    const toggleVoedingswaarden = () => {
        setOPenVoedingswaarden(!openVoedingswaarden);
    };


    return (
        <div>
            <ReceptenInfoElement    
                recept = {recept} 
                user = {user} 
                shared = {1} 
                smileyWidth = {75}
                alleIngredienten = {alleIngredienten}
                groepInfo = {groepInfo}
            />
        </div>
        // <div>
        // <h2><u>{recept.titel}</u></h2>
        // <Collapsible label = "Basis info" open = {openBasisInfo} toggle = {toggleBasisInfo}>
        //     <div className='indent'>
        //     <h5 className='tussentitel'></h5>
        //     <p>{recept.beschrijving}</p>
        //     </div>
        //     <div className='receptInfoImgContainter'>
        //     <img src={recept.imgLink}></img>
        //     </div>
        //     <div className='indent'>
        //     <div>
        //     <h5 className='tussentitel'><u>Ingredienten</u></h5>
        //     <p>{recept.ingredienten}</p>
        //     </div>
        //     <div>
        //     <h5 className='tussentitel'><u>Bereiding</u></h5>
        //     <p>{recept.bereidingswijze}</p>
        //     </div>
        //     <div>
        //     <p>{recept.link}</p>
        //     </div>
        //     </div>
        // </Collapsible> 

        // <Collapsible label = "Voorspelling meningen" open = {openMeningen} toggle = {toggleMeningen}>
        // {/* <div><HappySmiley veryHappy = {true} idString = {"test1"}/></div> */}
        // {/* <div><HappySmiley veryHappy = {false} idString = {"test2"}/></div> */}
        // <div><SadSmiley verySad = {true} idString = {"test3"}/></div>
        // {/* <div><SadSmiley verySad = {false} idString = {"test4"}/></div> */}


        // </Collapsible>

        // <Collapsible label = "Voedingswaarden" open = {openVoedingswaarden} toggle = {toggleVoedingswaarden}>
        //     <Doughnut recept = {recept}/>
        //     <div className='indent'>
        //     <h5 className='tussentitel'><u>Per portie:</u></h5>
        //     {"cal : test"}
        //     </div>
        // </Collapsible>
        // </div>
    );
}

export default ReceptenInfoPage;