import React from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from '@mui/material/Button';


export const Groepslid = ({ groepInfo, persoon, onCheckboxClick, onDeleteClick, PasVoorkeurenAan}) => {
    return (
        <div className='element-of-list'>
            <input
                type="checkbox"
                checked={persoon["checked"]}
                onClick={() => onCheckboxClick(groepInfo, persoon)}
                readOnly
            />
            <p>{persoon["naam"]}</p>
            <div className='buttons'>
                <div className='middle move-right'>
                <div className='left-align-button'>
                <Button variant="outlined" onClick={ () => PasVoorkeurenAan(groepInfo, persoon)} style={{ "white-space": "nowrap"}}>
                Pas voorkeuren aan
                </Button>
                </div>
                {/* <button className="GIP-overwrite-smallButton button-color left-align-button" onClick={ () => PasVoorkeurenAan(groepInfo, persoon) }>Pas voorkeuren aan</button> */}
                </div>
                <div className='middle '>
                <DeleteOutlineOutlinedIcon onClick={ () => onDeleteClick(groepInfo, persoon)}/>
                </div>
            </div>
        </div>
  );
};