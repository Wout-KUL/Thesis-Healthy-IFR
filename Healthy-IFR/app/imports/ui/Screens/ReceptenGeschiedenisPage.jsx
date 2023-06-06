import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { MaaltijdGeschiedenisDB } from '../../db/MaaltijdGeschiedenisDB';
import { GeschiedenisMaaltijd } from '../Elementen/GeschiedenisMaaltijd';
import {Link, useLocation, useNavigate, useOutletContext } from "react-router-dom";



function ReceptenGeschiedenisPage({user}) {
  const [log, logNav, rootURL] = useOutletContext();

    const userFilter = user ? { userId: user._id } : {};
    const nav =  useNavigate();
    const navigate = (value, state) => nav(rootURL+ value, state)


    const { userGeschiedenis, isLoading } = useTracker(() => {
        const noDataAvailable = { userGeschiedenis: {geschiedenis : []}};
        // console.log(!Meteor.user())

        if (!Meteor.user()) {
          return noDataAvailable;
        }
        const handler = Meteor.subscribe('maaltijdGeschiedenisDB');
        // console.log(!handler.ready())

        if (!handler.ready()) {
          return { ...noDataAvailable, isLoading: true };
        }
    
        let userGeschiedenis = MaaltijdGeschiedenisDB.findOne(
          userFilter,
          {
            sort: { createdAt: -1 },
          }
        )    
        return { userGeschiedenis };
      });

    function leesMeer (recept) {
      log("/ReceptenInfoPage_Algemeen" + "_Auto_Load")
      log('/ReceptenInfoPage')
      navigate('/ReceptenInfoPage',
            {state : {recept: recept}}
        )
    }


    return (
        <div className='padding-tabs'>
          <div id="VoorgesteldeRecepten" className="main-div min-height">
          <div className='main-div-root'>
            <h2>Recepten geschiedenis</h2>
            <div className='recepten-geschiedenis-div-scrollable scrollable-border'> 
            {userGeschiedenis["geschiedenis"].length == 0 ? 
            <p className='uitleg-p'>U heeft de afgelopen dagen nog geen recept gekozen. Selecteer via de startpagina enkele ingredienten en vind een recept dat bij u past!</p>
            :
            userGeschiedenis["geschiedenis"].sort(function(a,b){return b.createdAt- a.createdAt; }).map(geschiedenisElement => (
                        <GeschiedenisMaaltijd
                        key={geschiedenisElement["recept"]._id + geschiedenisElement.createdAt}
                        recept={geschiedenisElement["recept"]}
                        leesMeer = {leesMeer}
                        rating = {geschiedenisElement.rating?geschiedenisElement.rating: undefined}
                        description = {geschiedenisElement.description?geschiedenisElement.description:undefined}
                        makeMeal = {geschiedenisElement.makeMeal?geschiedenisElement.makeMeal:false}

                        />
              ))}
          </div>
          </div>
          </div>

        </div>
    );
}

export default ReceptenGeschiedenisPage;