import { Alert } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import Button from '@mui/material/Button';


export const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUserPasswordConfirmed, setPasswordConfirmed] = useState('');


  const submit = e => {

    // Meteor.loginWithPassword(username, password);
    Meteor.call('verify-signup-info', {
        newUserName: username,
        newUserPassword: password,
        newUserPasswordConfirmed : newUserPasswordConfirmed
      }, (err, res) => {
        if (err) {
          alert(err);
          console.error(e);
        } else {
          console.error("Succes");
          Meteor.loginWithPassword(username, password);

          // const user = Meteor.user();
          Meteor.call('GroepsInformatieDB.insert');
          Meteor.call('maaltijdGeschiedenisDB.insert');
          Meteor.call('ActivityLogboekDB.insert');



        }
      });
  };
  return (
    <form onSubmit={submit} className="login-form">
      <Alert severity="warning">
        Opgelet, deze applicatie werd niet opgesteld door een dokter of dietist. Hoewel er grondig opzoekwerk aan dit onderzoek vooraf is gegaan, 
        is het altijd mogelijk dat er fouten in de applicatie zitten. Het doel van dit onderzoek is het achterhalen van de gebruikerservaring omtrent dit soort
        aanraadsysteem, niet het ontwikkelen van een waterdichte gezondheidsapplicatie.
      
      </Alert>
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
        <label htmlFor="password">Wachtwoord</label>
 
        <input
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={(e) => setPasswordConfirmed(e.target.value)}
        />
    </div>

    <div>
    <Button variant="outlined" onClick={  () => submit()} style={{ "whiteSpace": "nowrap"}}>
            Maak account aan
    </Button>
    </div>
    </form>
  );
};