import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StudentDashBoardComponent } from './student-dash-board/student-dash-board.component';
import { AuthGuard } from './core/auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent, canActivate: [AuthGuard]},
  { path: 'registration', component: RegistrationComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: StudentDashBoardComponent},
  { path:'**', component : NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  [x: string]: any;
}
