import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./NavBar";
import Header from "./Header";
import {Link, useLocation, useNavigate } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';

import TimeMe from 'timeme.js';

import LabelBottomNavigation from "./Elementen/Navbar2";

const Layout = ({userLogs, logout, user, log, logNav, currentPage, setCurrentPage, startDate, setStartDate, rootURL}) => {
  const navigate = useNavigate()
  console.log(rootURL);


  function log(key , args){
    if(key == -1){
      key = "/Terug"
    }
    key = key.replaceAll(".", "_")
    // if()
    console.log("inlog", userLogs);
    console.log("inlog", user);

    if(key == "/"){
      key = "/HomePage"
    }



    if(!userLogs.total[key]){
      userLogs.total[key] = 0
    }
    console.log(currentPage);
    console.log(key);
    // let currentPage = localStorage.getItem("currentPage");
    if (key != currentPage){
      logTime()

      userLogs.logs.push(([key, new Date()]))
      userLogs.total[key]  = userLogs.total[key] + 1 
      Meteor.call('ActivityLogboekDB.update', userLogs);
  
    }
  
  
    if(key[0] == "/"){
      setCurrentPage(key)
    }
  }
  


  const { firstTimePageOpens, setFirstTimePageOpens} = useTracker(() => {
    const [firstTimePageOpens, setFirstTimePageOpens] = useState(true);
  
    if (firstTimePageOpens) {
        TimeMe.initialize({
        currentPageName: "my-home-page", 
        idleTimeoutInSeconds: 30 
      });
        setFirstTimePageOpens(false)
    }
  
    return firstTimePageOpens, setFirstTimePageOpens
  })
  
  function logTime(){
  // var startDate = new Date();
  // // Do your operations
  const now = new Date()
  var seconds = (now.getTime() - startDate.getTime()) / 1000;
    console.log("seconds ", seconds);



    // let timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
    let timeSpentOnPage = seconds
    if(!userLogs.total["totalTimeSpend"]){
      userLogs.total["totalTimeSpend"] = 0
    }

  
    const lastEntry = userLogs.timeLogs[userLogs.timeLogs.length-1]
      if (userLogs.timeLogs.length > 0 && lastEntry[2].getDate() == now.getDate() &&  now.getHours() - lastEntry[2].getHours() <1) {
        userLogs.timeLogs[userLogs.timeLogs.length-1] = ["timeSpend",lastEntry[1] + timeSpentOnPage  , lastEntry[2]]
      }
      else{
        userLogs.timeLogs.push((["timeSpend", timeSpentOnPage , new Date()]))
      }

      const sum = userLogs.timeLogs.map(log => {
        return log[1]
      }).reduce((partialSum, a) => partialSum + a, 0) 
      userLogs.total["totalTimeSpend"]  = isNaN(sum)? 0 : sum
      Meteor.call('ActivityLogboekDB.update', userLogs);
      setStartDate(now)
    }
  
  
    function logNav(key, args){
      key == -1? navigate(key): navigate(rootURL + key)

      log(key, args) //log als 2e zodat getcuttentpage kan achterhalen naar welke pagina de terugknop gaat
    }
  

  return (
    <div className="body-box">
      <div className="fixed">
      {user ? <div className="header-div"></div>:  <Header />}
      
      <LabelBottomNavigation logout = {logout} logNav = {logNav} log = {log}/>
      {/* <Navbar logout = {logout} user = {user}/> */}
      </div>
      <Outlet context={[log, logNav, rootURL]}/>
    </div>
  );
};

export default Layout;