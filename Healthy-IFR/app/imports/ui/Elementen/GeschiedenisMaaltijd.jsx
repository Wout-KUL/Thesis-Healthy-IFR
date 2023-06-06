import React from 'react';
import Button from '@mui/material/Button';
import SimpleDialogDemo from './HistoryPopup'

export const GeschiedenisMaaltijd = ({ recept, leesMeer, rating, description, makeMeal}) => {

    return (
      <div className='element-of-list div-padding-bot'>
        <div className='full-container'>
          <div className=''>
            <div className='imgContainter'>
              <img src={recept.imgLink}></img>
            </div>
          </div>
          <div className=''>
          <div className='textContainter'>

          <p>{recept.titel}</p>
          </div>
          </div>
        </div>

      <div className='inline-div'>
      <div className='left-align-button'>
      <Button variant="outlined" onClick={  () => leesMeer(recept)} style={{ "whiteSpace": "nowrap"}}>
          Lees Meer
          </Button>
      </div>

      <div className='left-align-button'>

      {(rating || description)? //is vanaf nu altijd true maar staat hier nog zodat oudere versies (tijdens testfase) niet crashen.
              <SimpleDialogDemo rating = {rating } description={ description} titel = {recept.titel}  makeMeal = {makeMeal}/>
              :
              <></>}
      </div>
      </div>

      </div>
      );
    };