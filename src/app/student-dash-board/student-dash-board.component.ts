import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseUserModel } from '../FirebaseUserModel';
import { Router } from '@angular/router';
import { GradeserviceService } from '../gradeservice.service';

@Component({
  selector: 'app-student-dash-board',
  templateUrl: './student-dash-board.component.html',
  styleUrls: ['./student-dash-board.component.css']
})
export class StudentDashBoardComponent implements OnInit {

  firstResult: any;
  finalResult: any;
  average: any;
  snapshot: any;

  grades:any;
  
  constructor( public authService: AuthenticationService, private router: Router, public afauth: AngularFireAuth, public gradeService: GradeserviceService) { 
  
   }

   sendResults(form){
    this.gradeService.submitGrades(form.value)
    this.router.navigate(['datasuccess'])
   }

   logOut(){
     this.authService.logout()
   }

   getId(id){
     //console.log(id)
     this.getGrades(id)
     this.displayAverage(id)
   }


  displayAverage(id: any) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("users").child(id).child("grades").child("average").once('value', data => {
        this.average = data.val()
        resolve(this.average)
      }, error => reject(error))
    })
  }

  getGrades(id: any) {
    return new Promise((resolve, reject) =>{
      firebase.database().ref("users").child(id).child("grades").once('value', data => {
          this.firstResult = data.val()
          resolve(this.firstResult)
      }, error => reject(error))
    })
  }

  getUsers(){
    return new Promise((resolve, reject) => {
      firebase.database().ref("users").on('child_added', snap=>{
      console.log(snap.val().grades)
      this.grades = snap.val().grades
      console.log(this.grades)
      resolve(this.grades)
    }, error => reject(error))
    })
    
  }

  
  

  
  ngOnInit(): void {
    console.log(this.grades)
    console.log("Listed Already")
    this.gradeService.getAverageValue
  }  

}
