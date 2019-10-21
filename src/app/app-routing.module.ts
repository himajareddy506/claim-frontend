import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccsummaryComponent } from './components/accsummary/accsummary.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PolicyComponent } from './components/policy/policy.component';


const routes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'claim', component: RegisterComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'summary', component: AccsummaryComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: PolicyComponent },
  { path: '', component: PolicyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
