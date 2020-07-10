import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquiry-success',
  templateUrl: './inquiry-success.component.html',
  styleUrls: ['./inquiry-success.component.css']
})
export class InquirySuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
