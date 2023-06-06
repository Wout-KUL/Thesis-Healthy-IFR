import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { SignUpPage } from './SignUpPage';
import { useTracker } from 'meteor/react-meteor-data';
import Header from "../Header";
import Button from '@mui/material/Button';


export const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [viewCredits, setViewCredits] = useState(false);


  const submit = e => {

    Meteor.loginWithPassword(username, password);
  };


  const { signupClicked, setSignupClicked} = useTracker(() => {
    const [signupClicked, setSignupClicked] = useState(false);
    return { signupClicked, setSignupClicked};
  });


  return (
    <div >
    <div>
    <Header/>
    </div>
    <div className=''>
    <div className='bordered-div '>
    <div >
    {signupClicked ? (
      <SignUpPage />
      ) : (
      <form onSubmit={submit} className="login-form">
        <div>
            <label htmlFor="username">Gebruikersnaam</label>
    
            <input
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
    
        <div>
            <label htmlFor="password">Wachtwoord</label>
    
            <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    
        <div>
            <Button variant="outlined" onClick={  () => submit()} style={{ "whiteSpace": "nowrap"}}>
            Inloggen
          </Button>
        </div>
        </form>
      )}
      </div>
      <div className="signupbutton margin-top div-padding-bot">
          <Button variant="outlined" onClick={() => setSignupClicked(!signupClicked)} style={{ "whiteSpace": "nowrap"}}>
          {signupClicked ? 'Ik heb al een account' : 'Account aanmaken'}
          </Button>
      </div>
      <a onClick={() => setViewCredits(!viewCredits)}>{viewCredits? "Verberg credits" : "Bekijk credits"}</a>
      {viewCredits? 
      <div>
      <div className='in-between-div'></div>
      <div>
      <a href="https://www.flaticon.com/free-icons/logout" title="logout icons">Logout icons created by Gregor Cresnar - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/people" title="people icons">People icons created by SBTS2018 - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Freepik - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/meal" title="meal icons">Meal icons created by Becris - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/camera" title="camera icons">Camera icons created by Good Ware - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/question" title="question icons">Question icons created by Freepik - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/ui" title="ui icons">Ui icons created by Fathema Khanom - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/left-arrow" title="left arrow icons">Left arrow icons created by Freepik - Flaticon</a>
      </div>
      </div>

      :
      <></>
      }
      </div>
    </div>
    </div>

  );
};