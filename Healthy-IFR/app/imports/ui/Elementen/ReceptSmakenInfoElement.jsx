import React from 'react';
import {getParticipatingMembers} from './TasteFunctions'
import {SmakenDisplay}  from '../Elementen/SmakenDisplay'
import Alert from '@mui/material/Alert';
import { KiesReceptButton } from './KiesReceptButton';
import { useNavigate, useOutletContext } from 'react-router-dom';



export const ReceptSmakenInfoElement = ({ recept, groepInfo, shared, user, kiesRecept , goToPersonalizedExplanationsPage}) => {
  const [log, logNav, rootURL] = useOutletContext();


    function compare( a, b ) {
        if ( a.naam < b.naam ){
          return -1;
        }
        if ( a.naam > b.naam ){
          return 1;
        }
        return 0;
      }

      console.log(recept);

    return (
      <div>
        <div className='main-div'>
                {groepInfo["group"].length == 0 ? 
                 <Alert 
                 severity="info" 
                 onClick={ () =>  logNav('/GroepsInstellingenPage')}>
                    Opgelet, u heeft nog geen groep ingegeven! Klik hier om dit te doen
                </Alert> 
                : <></>}
              <div className="question-container HomePage-red-question float-right">
                  <img className='red-question-img' src={rootURL + '/Images/question-red.png'} onClick={() => goToPersonalizedExplanationsPage(recept)}/>
              </div>
                <h3 className='recept-titel-tabs'>{recept.titel}</h3>
                {getParticipatingMembers(groepInfo["group"]).sort(compare).map(persoon => (
                <SmakenDisplay 
                persoon = {persoon} 
                recept = {recept}
                shared = {shared}
                idString = {user._id + persoon.naam.replaceAll(" ", "_") + recept._id + "taste"}
                />
                ))}
        </div>
        <div className='in-between-div'></div>

        <KiesReceptButton recept = {recept} kiesRecept={kiesRecept}/>
        {groepInfo["group"].length ==0 ? <div className='filler-div'></div> : <></>}
        </div>
    );
};