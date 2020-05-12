import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import {LoginComponent} from './login/login.component';
import {BuyComponent} from './buy/buy.component';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {AuthGuard} from './auth.guard';



const routes: Routes = [
  {path: 'list', canActivate: [AuthGuard], component: CryptoListComponent},
  {path: '', component: LoginComponent},
  {path: 'buy/:id', component: BuyComponent},
  {path: 'portfolio', canActivate: [AuthGuard], component: PortfolioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [CryptoListComponent, LoginComponent, BuyComponent, PortfolioComponent]
