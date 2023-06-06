
import React from 'react';
import SimpleDialogDemo from './PopUp';


export const KiesReceptButton = ({recept,  kiesRecept }) => {
    return (
            <div className='main-div'>
            <div className='main-div-root div-margin-bot'>
            <div className='div-50-height'>
                <SimpleDialogDemo  recept = {recept} kiesRecept = {kiesRecept}/>

                {/* <button className= "smallButton button-color horizontal-center-button" type="submit" onClick={() => kiesRecept(recept)}>Kies recept</button> */}
            </div>
            </div>
            </div>
  );
};