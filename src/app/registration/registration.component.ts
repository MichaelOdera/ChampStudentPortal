import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

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

  constructor(public authService: AuthenticationService) { }

  register(form){
    this.authService.SignUp(form.value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      alert("Successfully Created");
      this.successMessage = "Your account has been created";
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }


  ngOnInit(): void {
  }

}
