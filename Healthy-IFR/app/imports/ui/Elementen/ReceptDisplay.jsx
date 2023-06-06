import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Button from '@mui/material/Button';
import { useOutletContext } from 'react-router-dom';

export const ReceptDisplay = ({ recept, checked, vergelijken, leesMeer, vergelijkenArray, goToPersonalizedExplanationsPage }) => {
  const [log, logNav, rootURL] = useOutletContext();

  if (vergelijkenArray.includes(recept)) {
    console.log(vergelijkenArray);

  }
    return (
      <div className='element-of-list div-padding-bot'>
        <div className='full-container'>
          <div className=''>
            <div className='imgContainter'>
              <img src={recept.imgLink}></img>
            </div>
          </div> 
          {checked? 
            <CheckCircleIcon className='check-recipe' sx={{ color: "#1976D2 "}} onClick={ () => vergelijken(recept) }/>
            : 
            <></>             // <RadioButtonUncheckedIcon className='check-recipe' sx={{ color: "#1976D2 "}} onClick={ () => vergelijken(recept) }/>}

          }
          <div className=''>


            <div className='textContainter'>
              <p>{recept.titel}</p>
              </div>
          </div>
        </div>
        <div className='recipe-buttons-container'>
          <div className=''>
          <div className='li-buttons'>
          <Button variant="outlined" onClick={ () => leesMeer(recept)} style={{ "whiteSpace": "nowrap"}}>
          Lees Meer
          </Button>
            {/* <button className="button-color" onClick={ () => leesMeer(recept) }>Lees Meer</button> */}
          </div>
          <div className='li-buttons'>
          {checked?  
          <Button variant="contained" onClick={ () => vergelijken(recept)}>
          Vergelijk
          </Button> 
          :          
          <Button variant="outlined" onClick={ () => vergelijken(recept)}>
          Vergelijk
          </Button>
          }
            {/* <button className="button-color" onClick={ () => vergelijken(recept) }>Vergelijk</button> */}
          </div>

          {/* <div className='li-buttons'>
            <div id = "15" className="checkboxes div-hover-middle button-color" onClick={() => vergelijken(recept)}>
              <label>

                  <input  
                    type="checkbox"
                    checked={checked} 
                    readOnly
                    onClick={() => false}
                  /> 
                  <span >Vergelijk</span>
              </label>
            </div>

          </div> */}
          <div className="question-container HomePage-red-question">
            <img className='red-question-img' src={rootURL + '/Images/question-red.png'} onClick={() => goToPersonalizedExplanationsPage(recept)}/>
        </div>
        </div>
        </div>

      </div>
  );
};