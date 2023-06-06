import React from 'react';
import Alert from '@mui/material/Alert';
import { KiesReceptButton } from './KiesReceptButton';
import { useOutletContext } from 'react-router-dom';


export const ReceptBasicInfoElement = ({ recept, kiesRecept, goToPersonalizedExplanationsPage, groepInfo}) => {
  const [log, logNav, rootURL] = useOutletContext();

  let ingredientsCopy = [...recept.ingredienten]
    if(ingredientsCopy[0] == "[")  {
      if (ingredientsCopy[1] == "1" && ingredientsCopy[2] == " " ) {
        ingredientsCopy=recept.ingredienten.replace(/\[|\]/g,'').split(';')

      }else{
        ingredientsCopy=recept.ingredienten.replace(/\[|\]/g,'').split(',')

      }
    }else{
      ingredientsCopy=recept.ingredienten.replace(/\[|\]/g,'').split(';')
    }
    return (
      <div className='overflow-x-hidden'>
        <div className='main-div'>
        <div className="question-container HomePage-red-question float-right">
            <img className='red-question-img' src={rootURL + '/Images/question-red.png'} onClick={() => goToPersonalizedExplanationsPage(recept)}/>
        </div>
        <h3 className='recept-titel-tabs'>{recept.titel}</h3>

        <div className='indent'>
        <h5 className='tussentitel'></h5>
        <p>{recept.beschrijving[0] == "#"? "": recept.beschrijving}</p>
        </div>
        <div className='receptInfoImgContainter'>
        {recept.origineelEngels && groepInfo["notifications"]?<Alert severity="warning">Opgelet, deze foto komt niet van het originele recept!</Alert> : <></>}
        {recept.origineelEngels && groepInfo["notifications"]?<Alert severity="warning">Opgelet, dit recept was oorspronkelijk in het Engels!</Alert> : <></>}

        <img src={recept.imgLink}></img>
        </div>
        <div className='indent'>
        <div>
        <h5 className='tussentitel'><u>{"Ingredienten voor " + recept.Yields +  " personen:"}</u></h5>
        <ul>
        {ingredientsCopy.map( ingredient => {
          if (ingredient.replaceAll(" ", "") != "") {
            return <li className='ingredienten-opsomming-element'>{ingredient}</li>
          }
          })}
        </ul>
        </div>
        <div>
        <h5 className='tussentitel'><u>Bereiding</u></h5>
        <p>{recept.bereidingswijze}</p>
        </div>
        {recept.link? 
        <div>
          <a href={recept.link}>Ga naar de originele pagina</a>
        </div>
        :
        <></>
        }
        </div>

    </div>
    <div className='in-between-div'></div>

<KiesReceptButton recept = {recept} kiesRecept={kiesRecept}/>
    </div>
  );
};