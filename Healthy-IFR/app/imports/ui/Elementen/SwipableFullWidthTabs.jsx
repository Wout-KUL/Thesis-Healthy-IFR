import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
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
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

 
export default function FullWidthTabs(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(props.startTab?props.startTab: 0 );
  const [log, logNav] = useOutletContext();


  const handleChange = (event, newValue) => {
    log(props.page + "_" + [props.title1, props.title2, props.title3][newValue].replaceAll(" ", "_"))
    console.log([props.title1, props.title2, props.title3][newValue].replaceAll(" ", "_") );
    if([props.title1, props.title2, props.title3][newValue].replaceAll(" ", "_") == "Voedings_-_waarden"){
      console.log(props.page + "_Algemeen_Auto_Load")
      log(props.page + "/Voedingswaarden" +"_Algemeen_Auto_Load")
    }
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };



  return (
    <Box sx={{ bgcolor: 'background.paper', '& .MuiBox-root': {padding: '0px',},}}>
      <AppBar position="static">
        {props.title3 ? 
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label={props.title1} {...a11yProps(0)} />
            <Tab label={props.title2} {...a11yProps(1)} />
            <Tab label={props.title3} {...a11yProps(2)}/>
          </Tabs>
         : 
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label={props.title1} {...a11yProps(0)} />
            <Tab label={props.title2} {...a11yProps(1)} />
          </Tabs>
        }
      </AppBar>
      {props.slideable? 
      props.title3 ? 
      <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          >
          <TabPanel value={value} index={0} dir={theme.direction}>
          {props.children[0]}
          </TabPanel>
          
          <TabPanel value={value} index={1} dir={theme.direction}>
          {props.children[1]}
          </TabPanel>
        
          <TabPanel value={value} index={2} dir={theme.direction}>
          {props.children[2]}
          </TabPanel>
      </SwipeableViews>
      :
      <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                {props.children[0]}
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
              {props.children[1]}
              </TabPanel>
      </SwipeableViews>
      :
      <Box sx={{ width: '100%' }}>
      <TabPanel value={value} index={0}>
      {props.children[0]}
      </TabPanel>
      <TabPanel value={value} index={1}>
      {props.children[1]}
      </TabPanel>
      <TabPanel value={value} index={2}>
      {props.children[2]}
      </TabPanel>
      </Box>
      }
    </Box>
  );
}