import React from 'react';
import HappySmiley  from '../Elementen/HappySmiley'
import SadSmiley  from '../Elementen/SadSmiley'
import NeutralSmiley  from '../Elementen/NeutralSmiley'

import {rateRecept, getSharedIngredients} from './TasteFunctions'

import MoodBadIcon from '@mui/icons-material/MoodBad';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import TagFacesIcon from '@mui/icons-material/TagFaces';

// import MoodBadTwoToneIcon from '@mui/icons-material/MoodBadTwoTone';

// import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

// import SentimentSatisfiedTwoToneIcon from '@mui/icons-material/SentimentSatisfiedTwoTone';
// import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone';
// import SentimentVerySatisfiedTwoToneIcon from '@mui/icons-material/SentimentVerySatisfiedTwoTone';

export const SmakenDisplay = (props) => {
    function createName(){
        return nutrientNaam.replaceAll("_", " ").replaceAll(" g", " (g)")
                            .replaceAll(" mg", " (mg)").replaceAll(" ug", " (ug)")
                            .replaceAll(" OR ", "/").replaceAll("3", " 3").replaceAll("6", " 6")
    }

    function choseSmiley(){
        let  opinion = rateRecept(props.recept, props.persoon) 
        console.log("opinion is ", opinion)
        // console.log(props.recept)
        // console.log(props.persoon)


        let smiley = 0
        // switch (true) {
        //     case opinion>=0.5:
        //         smiley =  <HappySmiley veryHappy = {true} idString= {props.idString} shared= {props.shared}/>;
        //         break;
        //     case opinion>0:
        //         smiley = <HappySmiley veryHappy = {false} idString= {props.idString} shared= {props.shared}/>;
        //         break;
        //     case opinion==0:
        //         smiley = <NeutralSmiley idString= {props.idString} shared= {props.shared} />;
        //         break;
        //     case opinion<=-0.5:
        //         smiley = <SadSmiley verySad = {true} idString= {props.idString} shared= {props.shared}/>;
        //         break;
        //     case opinion<0:
        //         smiley = <SadSmiley verySad = {false} idString= {props.idString} shared= {props.shared}/>;
        //         break;

        //   }
        switch (true) {
            case opinion>=0.5:
                smiley =  <TagFacesIcon style={{ 'color': "black"}} sx={{ fontSize: 40 }}/>
                break;
            case opinion>0:
                smiley = <SentimentSatisfiedAltIcon style={{ 'color': "black"}} sx={{ fontSize: 40 }}/>
                break;
            case opinion==0:
                smiley = <SentimentSatisfiedIcon style={{ 'color': "black"}} sx={{ fontSize: 40 }}/> ;
                break;
            case opinion<=-0.5:
                smiley = <MoodBadIcon style={{ 'color': "black"}} sx={{ fontSize: 40 }}/>
                break;
            case opinion<0:
                smiley = <SentimentVeryDissatisfiedIcon style={{ 'color': "black"}} sx={{ fontSize: 40 }}/>
                break;

          }
        return smiley
    }
    function toTitleCase(ingredientNaam){
        return ingredientNaam[0]+ ingredientNaam.substring(1, ingredientNaam.length).toLowerCase() 
    }

    console.log(choseSmiley());
    return (
        <div className='element-of-list'>
            <div>
                <p className='smaken-inline smaken-name-p'>{props.persoon.naam} : </p>
                <div className='smaken-inline smaken-opinion-p'>{choseSmiley()}</div>
            </div>
            <div>
            {getSharedIngredients(props.persoon.voorkeuren, props.recept.SubTags).map(key => (
                    <div className='nutrient-div' >
                        <p className='smaken-name-p'>{toTitleCase(key)} : </p>
                        <p className='smaken-opinion-p'>{props.persoon.voorkeuren[key]}</p>
                    </div>
            ))}
            </div>
        </div>
    ); 
};