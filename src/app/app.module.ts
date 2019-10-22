import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';

import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
// import {ChartModule} from 'primeng/chart';
import { TableComponent } from './shared/table/table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TabViewModule } from 'primeng/tabview';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccsummaryComponent } from './components/accsummary/accsummary.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginnComponent } from './components/loginn/loginn.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    TableComponent,
    AccsummaryComponent,
    DashboardComponent,
    LoginnComponent,
    PolicyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    PanelModule,
    PaginatorModule,
    CardModule,
    TabViewModule,
    InputTextModule,
    PanelModule,
    BrowserAnimationsModule,
    MenuModule,
    BrowserModule,
    AppRoutingModule,
    // ChartModule,
    CardModule,
    Ng2SmartTableModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
