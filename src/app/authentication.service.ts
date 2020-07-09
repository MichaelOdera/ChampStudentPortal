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
  user : Observable<firebase.User>;

  details: any;


  userDisplay : string;
  userProfileName: string;

 
  
  defaultDatabase: firebase.database.Database;
  userId: any;

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }


  constructor( public afAuth: AngularFireAuth, public afs: AngularFirestore, public router : Router, public ngZone : NgZone) {

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
    firebase.database().ref("users/"+ newuser.uid).set(newuser).catch( error =>
      console.log("Error message " + error.message));
  }

  getMeNow(){
    let nature = "Molly Dollu Pillow"
    return nature
  }

 

  SignIn(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(success => {
        this.router.navigate(['/dashboard']);
        resolve(success)
      }, error => reject(error))
    })
  }

  logout() {
    this.afAuth
      .signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['landing']);
      });
  }


  
}




