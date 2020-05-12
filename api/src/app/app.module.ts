import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { TetsComponent } from './tets/tets.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import {EmployeeService} from './employee.service';
import {HttpClientModule} from '@angular/common/http';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { BuyComponent } from './buy/buy.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    TetsComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    CryptoListComponent,
    routingComponents,
    BuyComponent,
    PortfolioComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        FontAwesomeModule
    ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
