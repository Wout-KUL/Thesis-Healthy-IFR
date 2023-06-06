import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useOutletContext } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [log, logNav] = useOutletContext();


  const [value, setValue] = React.useState(props.startTab? props.startTab : 0);

  const handleChange = (event, newValue) => {
    if (props.setter) {
      props.setter(newValue)
    }
    log(props.page + "_" + [props.title1, props.title2, props.title3][newValue].replaceAll(" ", "_"))
    setValue(newValue);
  };
 


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label={props.title1} {...a11yProps(0)} />
          <Tab label={props.title2} {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
      {props.children[0]}
      </TabPanel>
      <TabPanel value={value} index={1}>
      {props.children[1]}
      </TabPanel>
    </Box>
  );
}