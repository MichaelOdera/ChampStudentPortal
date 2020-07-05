import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseUserModel } from './FirebaseUserModel';




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;
  user : firebase.User;
  name: String;
 
  firebaseuser: FirebaseUserModel;
  defaultDatabase: firebase.database.Database;

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }


  constructor( public afAuth: AngularFireAuth, public afs: AngularFirestore, public router : Router, public ngZone : NgZone) {
    this.firebaseuser = new FirebaseUserModel("", "");

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

 

  SignUp(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(success => {
        var newuser = {
          name: value.name,
          uid: success.user.uid,
          email: success.user.email
      }
        success.user.updateProfile({
          displayName: value.name
        }).then(res => {
          this.writeUserData(newuser)
          this.router.navigate(['/dashboard']);
          resolve(res);
        })
        
        
      }, err => reject(err))
    })
  } 

  writeUserData(newuser: { name: string; uid: string; email: string; }) {
    firebase.database().ref("/users"+ newuser.uid).set(newuser).catch( error =>
      console.log("Error message " + error.message));
  }



 

  SignIn(value) {
    return this.afAuth.signInWithEmailAndPassword(value.email, value.password)
      .then((_result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  logout() {
    this.afAuth
      .signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      });
  }


  getUserProfile() {      
    let promise = new Promise((resolve, reject) => {
        this.afAuth.currentUser
            .then(res => {
                if (res.providerData[0].providerId == 'password') {
                    this.firebaseuser.name = res.displayName;
                    this.firebaseuser.provider = res.providerData[0].providerId;
                    return resolve(this.user);
                }
                else {
                    this.firebaseuser.name = res.displayName;
                    this.firebaseuser.provider = res.providerData[0].providerId;
                    return resolve(this.user);
                }
            }, err => {
                this.router.navigate(['login']);
                return reject(err);
            })
    })
    return promise;
}
}




