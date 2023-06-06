import React, {useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Layout";

import GroepsInstellingenPage from "./Screens/GroepsInstellingenPage";
import HomePage from "./Screens/HomePage";
import IngredientenInfoPage from "./Screens/IngredientenInfoPage";
import IngredientenLijstPage from "./Screens/IngredientenLijstPage";
import IngredientenVoorkeurenPage from "./Screens/IngredientenVoorkeurenPage";
import ReceptenInfoPage from "./Screens/ReceptenInfoPage";
import VergelijkReceptenPage from "./Screens/VergelijkReceptenPage";
import ReceptenGeschiedenisPage from "./Screens/ReceptenGeschiedenisPage";
import NoPage from "./Screens/NoPage";
import {SignInPage} from "./Screens/SignInPage";
import GroepslidToevoegenPage from "./Screens/GroepslidToevoegenPage";
import ExplanationsPage from './Screens/ExplanationsPage'
import IngredientRecognitionPage from "./Screens/IngredientRecognitionPage";
import PersonalizedExplanationsPage from "./Screens/PersonalizedExplanationsPage";
import { IngredientenDB } from '../db/IngredientenDB';
import { ActivityLogboekDB } from '../db/ActivityLogboekDB';
import { GroepsInformatieDB } from '../db/GroepsInformatieDB';



export const App = () => {
  const rootURL = "/Healthy-IFR"

  console.log("test");
  // const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());

  const [currentPage, setCurrentPage] = useState("");
  const [geselecteerdeIngredienten, setGeselecteerdeIngredienten] = useState([]);
  const user = useTracker(() => Meteor.user());
  const userFilter = user ? { userId: user._id } : {};


  const logout = () => {
    // navigate("/")
    window.location.pathname = rootURL;

    Meteor.logout()
  };


  const { ingredienten, isLoading } = useTracker(() => {
    const noDataAvailable = { ingredienten: []};

    if (!Meteor.user()) {
        return noDataAvailable;
    }
    const handler = Meteor.subscribe('ingredientenDB');

    if (!handler.ready()) {
        return { ...noDataAvailable, isLoading: true };
    }

    const ingredienten = IngredientenDB.find(
        {},
        {
            sort: { naam: 1 },
        }
    ).fetch();

    return { ingredienten };
  });


  const { userLogs, isLoadingUserLog } = useTracker(() => {
    const noDataAvailable = { userLogs: {logs: [], total: {}, timeLogs : []}};

    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('ActivityLogboekDB');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    let userLogs = ActivityLogboekDB.findOne(
      userFilter,
    )

    return { userLogs };
  });


  const { groepInfo, isLoadingGroepInfo } = useTracker(() => {
    const noDataAvailable = { groepInfo: {group: []}};

    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('GroepsInformatieDB');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    let groepInfo = GroepsInformatieDB.findOne(
      userFilter,
    )

    return { groepInfo };
  });

  


  function setter(newArray){
    const uniqueArray = newArray.filter((value, index) => {
      const _value = JSON.stringify(value);
      return index === newArray.findIndex(obj => {
        return JSON.stringify(obj) === _value;
      });
    });
    setGeselecteerdeIngredienten(uniqueArray)
  }
  console.log(user);



//   function setCurrentPage(pageName){
//     console.log("setPAge");

//     localStorage.setItem("currentPage", pageName);

// }



  // console.log(user);
  // console.log(window.location.pathname);
  // if(!user){
  //   window.location.pathname = "/";

  // }
  // console.log(window.location.pathname);


  return (
    <div>
        <script src="timeme.min.js"></script>
        <BrowserRouter>
        <Routes>
        <Route path={rootURL} element={user ? <Layout   userLogs= {userLogs} logout = {logout} user = {user}
                                                       currentPage = {currentPage} setCurrentPage = {setCurrentPage} 
                                                       startDate = {startDate} setStartDate = {setStartDate} rootURL = {rootURL}/> 
                                                       
                                                       : <SignInPage/>}>
                <Route index element={<HomePage 
                                        geselecteerdeIngredienten = {geselecteerdeIngredienten} 
                                        setter = {setter}
                                        alleIngredienten = {ingredienten}
                                        groepInfo = {groepInfo}
                                      />} />
                <Route path={rootURL + "/ReceptenGeschiedenisPage"} element={<ReceptenGeschiedenisPage user = {user}/>} />
                <Route path={rootURL + "/GroepsInstellingenPage"} element={<GroepsInstellingenPage user = {user} groepInfo = {groepInfo}/>} />
                <Route  path={rootURL + "/IngredientenLijstPage"} 
                        element={<IngredientenLijstPage 
                                    geselecteerdeIngredienten = {geselecteerdeIngredienten} 
                                    setter = {setter}
                                    alleIngredienten = {ingredienten}
                                    groepInfo = {groepInfo}
                                />} />
                <Route path={rootURL + "/IngredientenInfoPage" }
                        element={<IngredientenInfoPage 
                                    user = {user}
                                    geselecteerdeIngredienten = {geselecteerdeIngredienten} 
                                    setter = {setter}
                                    groepInfo = {groepInfo}

                                />} />
                <Route path={rootURL + "/ReceptenInfoPage"} element={<ReceptenInfoPage user = {user} alleIngredienten = {ingredienten} groepInfo = {groepInfo} />} />
                <Route path={rootURL + "/VergelijkReceptenPage"} element={<VergelijkReceptenPage user = {user} alleIngredienten = {ingredienten} groepInfo = {groepInfo}/>} />
                <Route  path={rootURL + "/GroepslidToevoegenPage"} 
                        element={<GroepslidToevoegenPage 
                                    user = {user} 
                                    alleIngredienten = {ingredienten}
                                />} />
                <Route path={rootURL + "/IngredientenVoorkeurenPage"} element={<IngredientenVoorkeurenPage alleIngredienten = {ingredienten} groepInfo = {groepInfo}/>} />
                <Route path={rootURL + "/IngredientRecognitionPage" }
                        element={<IngredientRecognitionPage 
                                        alleIngredienten = {ingredienten} 
                                        geselecteerdeIngredienten = {geselecteerdeIngredienten} 
                                        setter = {setter}
                                        />} />
                <Route path={rootURL + "/ExplanationsPage"} element={<ExplanationsPage />} />
                <Route path={rootURL + "/PersonalizedExplanationsPage"} element={
                <PersonalizedExplanationsPage 
                  setter = {setter}
                  geselecteerdeIngredienten = {geselecteerdeIngredienten}
                  />} />

                <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
  );
}
