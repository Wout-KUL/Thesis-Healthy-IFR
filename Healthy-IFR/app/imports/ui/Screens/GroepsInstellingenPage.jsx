import React from 'react';
import {useNavigate } from "react-router-dom";
import { Groepslid } from '../Elementen/Groepslid';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useOutletContext } from "react-router-dom";
import Button from '@mui/material/Button';
import { FormControlLabel, Switch } from '@mui/material';



function GroepsInstellingenPage({user, groepInfo}) {
  const [log, logNav, rootURL] = useOutletContext();

  const nav =  useNavigate();
  const navigate = (value, state) => nav(rootURL+ value, state)

    const nieuwGroepslidToevoegen = () => {
      logNav('/GroepslidToevoegenPage')
    };



    const toggleChecked = (groepInfo, persoon) => {
        log("Button_" + "ToggleChecked_" + persoon["naam"].replaceAll(" ", "_") +"_"+ "GroepsInstellingenPage")

        console.log("test");
        Meteor.call('GroepsInformatieDB.setIsChecked', groepInfo, persoon);
      };
      
    const deleteGroepslid = (groepInfo, persoon) => {
        log("Button_" + "DeleteGroepslid_" + persoon["naam"].replaceAll(" ", "_") +"_"+ "GroepsInstellingenPage")

        Meteor.call('GroepsInformatieDB.removeGroepslid', groepInfo, persoon);
    }

    const deleteGroepslidPopUp = (groepInfo, persoon) => {
        confirmAlert({
            title: 'Bevestig om door te gaan',
            message: 'Bent u zeker dat u "' + persoon.naam + '" wilt verwijderen?',
            buttons: [
              {
                label: 'Ja',
                onClick: () => deleteGroepslid(groepInfo, persoon)
              },
              {
                label: 'Neen',
                onClick: () => {}
              }
            ],
            overlayClassName: "test45"

          });
    }

    const PasVoorkeurenAan = (groepInfo, persoon) => {
        log('/IngredientenVoorkeurenPage')
        navigate('/IngredientenVoorkeurenPage',
            {state : {groepInfo: groepInfo, persoon: persoon}}
        )
    }

    function compare( a, b ) {
      if ( a.naam < b.naam ){
        return -1;
      }
      if ( a.naam > b.naam ){
        return 1;
      }
      return 0;
    }

    function handleChangeNotifications(newValue){
      Meteor.call('GroepsInformatieDB.setMeldingen', groepInfo, newValue);

  }
    
    return (
      <div className='padding-tabs'>
        <div className='main-div '>
          <div className='main-div-root'>
          <h2 className='GIP-h2'>Groepsinstellingen</h2>
          <div>
          <FormControlLabel   control={<Switch    
                                                checked={groepInfo["notifications"] == undefined? true : groepInfo["notifications"]}
                                                onChange={() => handleChangeNotifications(!groepInfo["notifications"])}
                                                size="small"
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                />} 
                                    label="Toon waarschuwingen en infoberichten" />
            <h3 className='GIP-h3'><u>Groepsleden: </u></h3>
            <p className='ik-eet-mee'><span>⬐</span> Ik eet mee!</p>
            <div className='leden scrollable-border'>
            {groepInfo["group"].sort(compare).map(persoon => (
                            <Groepslid
                            key={this.userId + persoon["naam"]}
                            groepInfo={groepInfo}
                            persoon={persoon}
                            onCheckboxClick={toggleChecked}
                            onDeleteClick={deleteGroepslidPopUp}
                            PasVoorkeurenAan = {PasVoorkeurenAan}
                            />
                ))}
            </div>
            <div className='horizontal-center-button div-padding-bot'>
            <Button variant="outlined" onClick={ () => nieuwGroepslidToevoegen()} style={{ "white-space": "nowrap"}}>
            Lid toevoegen
            </Button>
            </div>
          </div>
          </div>
        </div>
        </div>

    );
}

export default GroepsInstellingenPage;