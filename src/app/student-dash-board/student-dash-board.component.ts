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
  userEmail: string;
  userData: any;
  user: firebase.User;
  userUid: any;
  displayProfile : FirebaseUserModel;
  key1: string;

  
  

  constructor( public authService: AuthenticationService, private router: Router, public afauth: AngularFireAuth) { 
   

   }



  ngOnInit(): void {
   
  }

  

}
