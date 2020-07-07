import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseUserModel } from '../FirebaseUserModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dash-board',
  templateUrl: './student-dash-board.component.html',
  styleUrls: ['./student-dash-board.component.css']
})
export class StudentDashBoardComponent implements OnInit {

  userProfile: any;
  name: string;
  user: firebase.User;
  displayProfile : FirebaseUserModel;

  constructor( public authService: AuthenticationService, private router: Router, public afauth: AngularFireAuth) { 
    this.userProfile = ""
    //this.userDisplayName = this.router.getCurrentNavigation().extras.state.example; 
    this.afauth.onAuthStateChanged(user => {
        firebase.database().ref('users/'+user.uid).once("value", snap=>{
          console.log(snap.val())
          this.userProfile = snap.val().name
          console.log("My User Name"+this.userProfile) 
        })
    })
   }

  ngOnInit(): void {
    this.afauth.currentUser.then(person =>{
      this.name = person.email
    })
   
  }

}
