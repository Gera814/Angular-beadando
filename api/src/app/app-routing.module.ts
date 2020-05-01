import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import {LoginComponent} from './login/login.component';
import {BuyComponent} from './buy/buy.component';



const routes: Routes = [
  {path: 'list', component: CryptoListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'buy/:id', component: BuyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [CryptoListComponent, LoginComponent, BuyComponent]
