import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { rejects } from 'assert';





@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;
  user: Observable<firebase.User>;

  details: any;


  userId: any;

  showInvalidDetailsErrorDiv: boolean = false;
  showAlreadyRegisteredDiv: boolean = false;



  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, public router: Router, public ngZone: NgZone) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        sessionStorage.user = JSON.stringify('user',this.userData.displayName);
        JSON.parse(localStorage.getItem('user'));
        JSON.parse(sessionStorage.user);
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }



  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (this.userData == null) ? false : true;
  }



  SignUp(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(success => {
          var newuser = {
            name: value.name,
            uid: success.user.uid,
            email: success.user.email
          }


          success.user.sendEmailVerification().then(result => {
              
          })
          success.user.updateProfile({
            displayName: value.name
          }).then(res => {
            this.saveUserData(newuser)
            this.SendVerificationMail(success)
            this.router.navigate(['registrationresponse']);
            resolve(res);
          })





        }, err => {
          this.showAlreadyRegisteredDiv = !this.showAlreadyRegisteredDiv

          reject(err)
        })
    })
  }

  writeUserData(newuser: { name: string; uid: string; email: string; }) {
    firebase.database().ref("/users" + newuser.uid).set(newuser).catch(error =>
      console.log("Error message " + error.message));
  }

  SendVerificationMail(success: firebase.auth.UserCredential) {
    return new Promise((resolve, reject) => {
      success.user.sendEmailVerification().then( res => {
        this.router.navigate(['registrationresponse']);
        resolve(res)
      }, error => {
        this.router.navigate(['registrationresponse']);
        //this.router.navigate(['registrationfail']);
        reject(error)
      })
    })
  }

  saveUserData(newuser: { name: string; uid: string; email: string; }) {
    firebase.database().ref("users/" + newuser.uid).set(newuser).catch(error =>
      console.log("Error message: " + error.message));
  }



  SignIn(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.useremail, value.password).then(success => {
        if(success.user.emailVerified && success.user){
          this.router.navigate(['/dashboard']);
          
        }else {
          this.router.navigate(['registrationfail']);
        }
      resolve(success)
      }, error => {
        this.showInvalidDetailsErrorDiv = !this.showInvalidDetailsErrorDiv
        reject(error)
      })
    })
  }

  logout() {
    this.afAuth
      .signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['landing']);
      });
  }


  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.router.navigate(['emailsent'])
      }).catch((error) => {
        window.alert(error)
      })
  }



}




