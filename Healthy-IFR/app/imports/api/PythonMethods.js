import { Meteor } from 'meteor/meteor';
import fetch from "node-fetch";
import { log } from 'console';


Meteor.methods({
    async 'Python.runRecognition'(photo_base64_string) {
        console.log("send data is ", photo_base64_string.substring(0, 100))
        try {
          const response = await fetch('http://py-app:8000/RecogniseImage', { 
          // const response = await fetch('http://localhost:8000/RecogniseImage', {  
            method: 'POST', 
            cache: 'no-cache', 
            body: photo_base64_string
          })
            return response.text()

          } 
          catch (err) {
            console.log(err);
          }

    },
})