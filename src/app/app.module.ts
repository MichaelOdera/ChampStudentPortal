import { BrowserModule } from '@angular/platform-browser';
import {NgxWebstorageModule, LocalStorageService} from 'ngx-webstorage';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'ngx-webstorage-service';


import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { environment } from '../environments/environment';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpClientModule } from '@ngx-progressbar/http-client';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { StudentDashBoardComponent } from './student-dash-board/student-dash-board.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthenticationService } from './authentication.service';
import { NavbarComponent } from './navbar/navbar.component';
import { from } from 'rxjs';
import { NotfoundComponent } from './notfound/notfound.component';
import { SuccessComponent } from './success/success.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    StudentDashBoardComponent,
    LandingPageComponent,
    NavbarComponent,
    NotfoundComponent,
    SuccessComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    NgProgressModule.forRoot(),
    NgProgressHttpClientModule,
    MDBBootstrapModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    StorageServiceModule
  ],
  providers: [AuthenticationService, LocalStorageService],
  bootstrap: [AppComponent]
 
})
export class AppModule { }
