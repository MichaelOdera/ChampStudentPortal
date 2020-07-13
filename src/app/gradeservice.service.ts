import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ValueTransformer } from '@angular/compiler/src/util';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

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

  average: any;
  sumTotal: any;
  showNullResultMessage: boolean = false;

  constructor(public afAuth: AngularFireAuth, public angularfire: AngularFirestore, public router: Router) {

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


  getGrades() {
    firebase.database().ref("users/").child(this.userData.uid).child("grades").once("value", (snapshot) => {
      console.log("My grades are these::::::" + snapshot.val())
      this.subject1 = snapshot.val().subject1
      console.log("My Subject One" + this.subject1)
      return snapshot.val().grades
    })

  }

  getAllGrades() {
    return this.angularfire.collection("users/" + this.userData.uid + "/grades").snapshotChanges();
  }

  submitGrades(value) {
    var newSubjects = {
      subject1: value.firstsubject,
      subject2: value.secondsubject,
      subject3: value.thirdsubject,
      subject4: value.fourthsubject,
      subject5: value.fifthsubject,
      subject6: value.sixthsubject,
      subject7: value.seventhsubject

    }

    let first = value.firstsubject
    let second = value.firstsubject
    let third = value.firstsubject
    let fourth = value.firstsubject
    let fifth = value.firstsubject
    let sixth = value.firstsubject
    let seventh = value.firstsubject

    if (first >= 0 && first <101 && second >= 0 && second <101 && third >= 0 && third < 101 && fourth >= 0 && fourth < 101 && fifth >= 0 && fifth < 101 && sixth >= 0 && sixth< 101 && seventh >=0 && seventh < 101) {
      firebase.database().ref("users/").child(this.userData.uid).child("grades").set(newSubjects)
      this.getTotalValue(newSubjects)
      this.router.navigate(['datasuccess'])
    } else {
      this.showNullResultMessage = !this.showNullResultMessage
    }





    return this.angularfire.collection("users/" + this.userData.uid + "/grades").add(newSubjects)
  }
  getTotalValue(newSubjects: { subject1: any; subject2: any; subject3: any; subject4: any; subject5: any; subject6: any; subject7: any; }) {
    let values = Object.values(newSubjects)
    this.sumTotal = 0;
    values.forEach(value => {
      this.sumTotal = this.sumTotal + value;
    })

    this.getAverageValue(this.sumTotal, values.length)

  }


  getAverageValue(sumTotal: any, length: number) {
    let firstDivsionResult = (sumTotal / length);
    this.average = Math.round(firstDivsionResult * 100) / 100
    this.saveAverageToFirebase(this.average)
    this.getRank(this.average)
    return this.average
  }


  getRank(average: any) {
    let rankItem = "";
    if (average > 69 && average < 101) {
      rankItem = "Excellent"
    }
    if (average > 59 && average < 70) {
      rankItem = "Good"
    }
    if (average > 45 && average < 60) {
      rankItem = "Fair"
    }
    if (average > 40 && average < 46) {
      rankItem = "Pass"
    }
    if (average >= 0 && average < 40) {
      rankItem = "Fail"
    }

    firebase.database().ref("users/").child(this.userData.uid).child("grades").child("rank").set(rankItem)
  }

  saveAverageToFirebase(average: any) {
    firebase.database().ref("users/").child(this.userData.uid).child("grades").child("average").set(average)
    var averageMe = {
      gradeGiven: average
    }

    return this.angularfire.collection("users").doc("grades").set(averageMe)
  }


}
