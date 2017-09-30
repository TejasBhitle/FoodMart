import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'bootstrap-navbar',
  templateUrl: './bootstrap-navbar.component.html',
  styleUrls: ['./bootstrap-navbar.component.css']
})
export class BootstrapNavbarComponent {

  user : firebase.User;

  constructor(private afAuth:AngularFireAuth) {
    afAuth.authState.subscribe(user => this.user = user );
  }

  logout(){
    this.afAuth.auth.signOut();
  }

}
