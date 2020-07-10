import { Component, OnInit, ViewChild } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from '../authentication.service';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { InquiryService } from '../inquiry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 }))
      ])
    ])
  ]

})
export class LandingPageComponent implements OnInit {

  @ViewChild(ModalDirective) modal: ModalDirective;

  constructor(public authenticationService: AuthenticationService, public inquiryService: InquiryService, private router: Router) { }

  isShowDiv = false;

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }

  startLog(value){
    console.log(value.value.useremail)
    this.authenticationService.SignIn(value.value);
  }


  onSubmit(contactForm: NgForm) {
    if(contactForm.valid){
      console.log(contactForm.value.email)
      const email = contactForm.value;
      this.inquiryService.sendEmail(email)
    }
     
     
  }


  ngOnInit(): void {
  }

}
