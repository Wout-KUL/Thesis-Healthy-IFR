import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import Groups2Icon from '@mui/icons-material/Groups2';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import SpaIcon from '@mui/icons-material/Spa';

export default function LabelBottomNavigation({logout, logNav, log}) {

  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const replacementString = "";


  return (

    <BottomNavigation sx={{ width: "100%", }} value={value} onChange={handleChange}>
    {window.location.pathname == "/Healthy-IFR/" ?
      <BottomNavigationAction
      sx={{ minWidth: "70px" }}        
      label="" //Healthy-IFR
      value="never"
      icon={<SpaIcon/>}
    /> : <BottomNavigationAction
        sx={{ minWidth: "70px" }}        
        label="Terug"
        value="Terug"
        icon={<KeyboardBackspaceIcon onClick = {()=> window.location.pathname == "/Healthy-IFR/" ? false : logNav(-1)}/>}
      /> }


      <BottomNavigationAction
        sx={{ minWidth: "70px" }}
        label="Thuis"
        value="Thuis"
        icon={<HomeIcon  onClick = {()=> logNav("/")}/>}
      />


      <BottomNavigationAction
        sx={{ minWidth: "70px" }}
        label={window.location.pathname == "/ReceptenGeschiedenisPage"? "Maaltijd Geschiedenis" : replacementString}
        value="Maaltijd Geschiedenis"
        icon={<HistoryIcon onClick = {()=> logNav("/ReceptenGeschiedenisPage")}  />}
      />

      <BottomNavigationAction
        sx={{ minWidth: "70px" }}
        label= {window.location.pathname == "/GroepsInstellingenPage"? "Groeps - instellingen" : replacementString}
        value="Groeps - instellingen"
        icon={<Groups2Icon  onClick = {()=> logNav("/GroepsInstellingenPage")}/>}
      />

      <BottomNavigationAction
        sx={{ minWidth: "70px" }}
        label="Uitloggen"
        value="Uitloggen"
        icon={<LogoutIcon  onClick = {()=> {logout()}
        }/>}
      />
    </BottomNavigation>
  );
}