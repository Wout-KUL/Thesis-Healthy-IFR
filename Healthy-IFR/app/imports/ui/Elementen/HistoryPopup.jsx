import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import HoverRating from './Rating';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useOutletContext } from 'react-router-dom';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;


    console.log(props);
    const handleClose = () => {
        onClose(selectedValue);
    };

    console.log(props.rating);
    console.log(props.description);

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>U gaf dit recept de volgende beoordeling: </DialogTitle>
            <div className='pop-up-padding'>

                <div className='div-margin-bot'>
                <HoverRating rating = {props.rating} readOnly = {true}/>
                </div>

                <div className='div-margin-bot'>
                <FormControlLabel disabled  control={
                                    <Checkbox
                                      checked={props.makeMeal}
                                      inputProps={{ 'aria-label': 'controlled' }}
                                    />}
                                    label = {"Ik heb dit klaargemaakt"}
                                    />         
                </div>

                <div className='div-margin-bot'>
                <p>{props.description}</p>
                </div>

            </div>
        </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
  const [log, logNav] = useOutletContext();

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    log("Open_Mijn_Notities" + props.titel.replaceAll(" ", "_"))
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  console.log(props)

  return (
    <div >
        <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Mijn notities
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        rating = {props.rating}
        description = {props.description}
        makeMeal = {props.makeMeal}
      />
      </div>
    </div>
  );
}