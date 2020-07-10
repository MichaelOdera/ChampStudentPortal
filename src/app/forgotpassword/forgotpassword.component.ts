import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor( public authService: AuthenticationService) { }

  sendMail(value){
    console.log(value.value)
    this.authService.ForgotPassword(value.value)
  }

  ngOnInit(): void {

  }

}
