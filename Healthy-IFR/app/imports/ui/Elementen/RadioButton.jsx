import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ControlledRadioButtonsGroup(props) {

  const handleChange = (event) => {
    props.setter(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">{props.titel}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={props.start}
        onChange={handleChange}
      >
        <FormControlLabel value={props.optie1} control={<Radio size="small"/>} label={props.optie1} />
        <FormControlLabel value={props.optie2} control={<Radio size="small"/>} label={props.optie2} />
        {props.optie3?<FormControlLabel value={props.optie3} control={<Radio size="small"/>} label={props.optie3} />: <></>}

      </RadioGroup>
    </FormControl>
  );
}