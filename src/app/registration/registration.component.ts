import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FirebaseUserModel } from '../FirebaseUserModel';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string;
  successMessage: string;

  user : FirebaseUserModel;

  constructor(public authService: AuthenticationService) { 
    this.user = new FirebaseUserModel("", "");
  }

  

  register(form){
    this.authService.SignUp(form.value)
  }


  ngOnInit(): void {
  }

}
