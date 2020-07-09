import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GradeserviceService {
  userData: any;
  user: firebase.User;
  subject1: any;
  subject2: any;
  subject3: any;
  subject4: any;
  subject5: any;
  subject6: any;
  subject7: any;

  constructor(public afAuth: AngularFireAuth, public angularfire: AngularFirestore) { 

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }


  getGrades(){
    firebase.database().ref("users/").child(this.userData.uid).child("grades").once("value", (snapshot) => {
      console.log("My grades are these::::::"+ snapshot.val())
      this.subject1 = snapshot.val().subject1
      console.log("My Subject One"+this.subject1)
      return snapshot.val().grades
    })

  }

  getAllGrades() {
    return this.angularfire.collection("users/"+this.userData.uid+"/grades").snapshotChanges();
}

  submitGrades(value){
    var newSubjects = {
      subject1 : value.firstsubject,
      subject2 : value.secondsubject,
      subject3 : value.thirdsubject,
      subject4 : value.fourthsubject,
      subject5 : value.fifthsubject,
      subject6 : value.sixthsubject,
      subject7 : value.seventhsubject

    }
    firebase.database().ref("users/").child(this.userData.uid).child("grades").set(newSubjects)
    
    //return this.subject1;
    return this.angularfire.collection("users/"+this.userData.uid+"/grades").add(newSubjects)
  }

  


}