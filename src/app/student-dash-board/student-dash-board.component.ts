import { Component, OnInit } from '@angular/core';
import { FirebaseUserModel } from '../FirebaseUserModel';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-student-dash-board',
  templateUrl: './student-dash-board.component.html',
  styleUrls: ['./student-dash-board.component.css']
})
export class StudentDashBoardComponent implements OnInit {

  user: FirebaseUserModel;
  username: string;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.getUserProfile()
    this.user = this.authenticationService.firebaseuser
    this.username = this.user.name
  }

}
