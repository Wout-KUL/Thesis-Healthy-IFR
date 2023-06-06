import React, {useState } from 'react';
import { TakeImageElement } from '../Elementen/TakeImageElement';
import styled from 'styled-components';
import {RecognisedIngredientDisplay} from '../Elementen/RecognisedIngredientDisplay'
import ClearIcon from '@mui/icons-material/Clear';
import { useOutletContext } from 'react-router-dom';



const FullScreenImagePreview = 
  styled.div`
  width: 200px;
  height: 200px;
  z-index: 100;

  background-color: transparent;
  ${({ image }) => (image ? `background-image:  url(${image});` : '')}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: scale(-1, 1);

`;

const IngredientRecognitionPage = ({alleIngredienten, geselecteerdeIngredienten, setter}) => {
  const [log] = useOutletContext();

  const [image, setImage] = useState(null);
  const [recogniseIngredientArray, setRecogniseIngredientArray] = useState([]);

  const [showImage, setShowImage] = useState(false);



  console.log(recogniseIngredientArray);
  function clearPhoto(){
    log("Clear_Photo")
    setShowImage(!showImage)
  }

  return (
    <div>
    {showImage?      
    <>
    <div className="">
        
        <div className=''>
          <div className='div-around-img '>
            
          <FullScreenImagePreview image={image} >
            <div className='right-above'><ClearIcon onClick= {() => clearPhoto()}/></div>
          </FullScreenImagePreview>
          </div>
    </div>   
    </div>
    <div className='in-between-div'></div>

      <div></div>
    <div className='half-screen '>
      <div className='padding-tabs'>
    <div className="main-div width-100">
        <div className='main-div-root'>
        <h2>Ingredient toevoegen: </h2>
        <div className='scrollable-border IR-div-scrollable'>
            {recogniseIngredientArray.map((ingredient) => (
              <RecognisedIngredientDisplay 
              index = {ingredient[0]} 
              percentage = {ingredient[1]} 
              alleIngredienten = {alleIngredienten} 
              geselecteerdeIngredienten = {geselecteerdeIngredienten} 
              setter = {setter} 
              />
            ))}
        </div> 
        </div>
        </div>
        </div>  
    </div>
    </>

            : 
            <TakeImageElement image = {image} setImage = {setImage}   showImage = {showImage} setShowImage = {setShowImage} setRecogniseIngredientArray = {setRecogniseIngredientArray}/>}
    </div>
  );
};

export default IngredientRecognitionPage;

