import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class InquiryService {


  constructor(public http: HttpClient, private router: Router) { }

  sendEmail(email) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return new Promise((resolve, reject) => {
       this.http.post(environment.inquiryURL,
      { name: email.name, _replyto: email.email, message: email.message },
      { 'headers': headers }).toPromise().then(res => {
        this.router.navigate(["inquirysuccess"])
        resolve(res)
      }, error => {
      
  
        alert("Please Enter a Valid email to submit Inquiry")
        reject(error)})
    })
   
  }
}
