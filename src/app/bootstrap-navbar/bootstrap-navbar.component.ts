import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Component({
  selector: 'bootstrap-navbar',
  templateUrl: './bootstrap-navbar.component.html',
  styleUrls: ['./bootstrap-navbar.component.css']
})
export class BootstrapNavbarComponent {

  user$ : Observable<firebase.User>;

  constructor(private afAuth:AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  logout(){
    this.afAuth.auth.signOut();
  }

}
