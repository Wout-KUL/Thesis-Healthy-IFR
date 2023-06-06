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

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const [rating, setRating] = useState(3);
    const [description, setDescription] = useState("");
    const { onClose, selectedValue, open } = props;
    const [makeMeal, setMakeMeal] = useState(false);

    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setDescription(lowerCase);
    }

    console.log(props);
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const handleSubmit = () => {
        handleClose();
        props.kiesRecept(props.recept, rating, description, makeMeal)
    }
    console.log(rating);
    console.log(description);

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Hoe zou u dit recept beoordelen?</DialogTitle>
            <div className='pop-up-padding'>
                <div className='div-margin-bot'>
                <HoverRating setRating = {setRating}/>
                </div>

                <div className='div-margin-bot'>
                <TextField 
                fullWidth 
                label="Optionele verklaring" 
                id="fullWidth" 
                onChange={inputHandler}
                variant="outlined"
                />
                </div>
                <FormControlLabel control={
                                    <Checkbox
                                      checked={makeMeal}
                                      onChange={() => setMakeMeal(!makeMeal)}
                                      inputProps={{ 'aria-label': 'controlled' }}
                                    />}
                                    label = {"Ik ga dit recept klaarmaken"}
                                    />
                <div className='div-margin-bot float-right'>
                <Button variant="outlined" onClick={handleSubmit}>
                Kies Recept
                </Button>
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
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  console.log(props)

  return (
    <div className="horizontal-center-button">
        <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Kies Recept
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        recept = {props.recept}
        kiesRecept = {props.kiesRecept}
      />
      </div>
    </div>
  );
}