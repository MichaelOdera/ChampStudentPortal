import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseUserModel } from '../FirebaseUserModel';
import { Router } from '@angular/router';
import { GradeserviceService } from '../gradeservice.service';
import { Result } from '../result.model';

@Component({
  selector: 'app-student-dash-board',
  templateUrl: './student-dash-board.component.html',
  styleUrls: ['./student-dash-board.component.css']
})
export class StudentDashBoardComponent implements OnInit {

  firstResult: any;
  finalResult: any;
  
  constructor( public authService: AuthenticationService, private router: Router, public afauth: AngularFireAuth, public gradeService: GradeserviceService) { 
  
   }

   sendResults(form){
    this.gradeService.submitGrades(form.value)
      // aler("Subjects Submitted Successfully");
   }

   logOut(){
     this.authService.logout()
   }

   getId(id){
     //console.log(id)
     this.getGrades(id)
   }

  getGrades(id: any) {
    return new Promise((resolve, reject) =>{
      firebase.database().ref("users").child(id).child("grades").once('value', data => {
          this.firstResult = data.val()
          resolve(this.firstResult)
      }, error => reject(error))
    })
  }

  
  ngOnInit(): void {

    console.log(this.authService.getMeNow)    

    console.log("The detail are here")

    


  
  }

  

}
