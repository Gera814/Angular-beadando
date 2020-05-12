import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { BuyComponent } from './buy/buy.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
