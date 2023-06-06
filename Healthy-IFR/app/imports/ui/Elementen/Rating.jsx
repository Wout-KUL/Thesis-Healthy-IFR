import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Useless',
  1: '',
  1.5: '',
  2: '',
  2.5: '',
  3: '',
  3.5: '',
  4: '',
  4.5: '',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({setRating, rating, readOnly}) {
  const [value, setValue] = React.useState(rating? rating : 2.5);
  const [hover, setHover] = React.useState(-1);
  console.log(value);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
        <Box sx={{ mr: 2 }}>Gebrekkig</Box>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        // getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          setRating(newValue)
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        readOnly = {readOnly? readOnly : false}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>Perfect!</Box>
      )}
    </Box>
  );
}