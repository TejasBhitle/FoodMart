import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private afAuth:AngularFireAuth) {

  }

  login(){
    var provider = new firebase.auth.GoogleAuthProvider();

    this.afAuth.auth.signInWithRedirect(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(token+" "+user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      console.log("Error");
      var errorMessage = error.message;
      // The email of the user's account used.
      console.log("error: "+" "+error.name+" "+errorMessage);
      // ...
    });
  }
}
