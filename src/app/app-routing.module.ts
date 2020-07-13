import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StudentDashBoardComponent } from './student-dash-board/student-dash-board.component';
import { AuthGuard } from './core/auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { SuccessComponent } from './success/success.component';
import { InquirySuccessComponent } from './inquiry-success/inquiry-success.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { EmailsentconfirmationComponent } from './emailsentconfirmation/emailsentconfirmation.component';
import { SuccessfulregistrationComponent } from './successfulregistration/successfulregistration.component';
import { RegistrationfailComponent } from './registrationfail/registrationfail.component';


const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent, },
  { path: 'registration', component: RegistrationComponent},
  { path: 'dashboard', component: StudentDashBoardComponent, canActivate: [AuthGuard]},
  { path: 'datasuccess', component: SuccessComponent},
  { path: 'inquirysuccess', component: InquirySuccessComponent},
  { path: 'passwordreset', component: ForgotpasswordComponent},
  { path: 'emailsent', component: EmailsentconfirmationComponent},
  { path: 'registrationresponse', component: SuccessfulregistrationComponent},
  { path: 'registrationfail', component: RegistrationfailComponent},
  { path:'**', component : NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  [x: string]: any;
}
