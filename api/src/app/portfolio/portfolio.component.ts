import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-portfolio',
  template: `
    <div class="container">
      <h1 class="title">Portfolio</h1>
      <p class="smallTitle">Here is your Portfolio. You can see here your Crypto Currencies</p>
      <table class="content-table">
        <thead>
        <tr>
          <td id="mid">TRADE</td>
          <td>NAME</td>
          <td>AMOUNT</td>
          <td>BUYED EXCHANGE RATE</td>
          <td>CURRENT EXCHANGE RATE</td>
          <td>BUYED PRICE</td>
          <td>CURRENT PRICE</td>
          <td>PROFIT</td>
          <td>Delete</td>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let buyedCrypto of buyedCryptos;let i = index">
          <td id="mid">{{i+1}}.</td>
          <td class="important">{{buyedCrypto.name}}</td>
          <td>{{buyedCrypto.quantity}}</td>
          <td >$ {{buyedCrypto.price_usd}}</td>
          <td>$ {{getActualCryptoPrice(buyedCrypto.id)}}</td>
          <td class="important">$ {{buyedCrypto.quantity*buyedCrypto.price_usd}}</td>
          <td class="important">$ {{buyedCrypto.quantity * getActualCryptoPrice(buyedCrypto.id)}}</td>
          <td [style.color]="isColor((getActualCryptoPrice(buyedCrypto.id)-buyedCrypto.price_usd)*buyedCrypto.quantity) ? 'green' : 'red'">$ {{(getActualCryptoPrice(buyedCrypto.id)-buyedCrypto.price_usd)*buyedCrypto.quantity}}</td>
          <td>
            <button (click)="deleteBuy(buyedCrypto.id)" >DELETE</button>
          </td>
        </tr>
        </tbody>
      </table>
      
    </div>
  `,
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  public buyedCryptos = [];
  constructor(private service: DataService, private router: Router) { }
  public cryptosList:any;
  faArrowRight = faArrowRight;

  ngOnInit(): void {
    this.service.getCryptos()
      .subscribe(
        (data) => {
          this.cryptosList = data;
        },
        (err) => console.error(err),
        () => console.log(this.cryptosList.data)
      );

    this.buyedCryptos = this.service.getBuyedCriptos();
  }

  getActualCryptoPrice(id){
    const searchedPrice = this.cryptosList.data.find(x => x.id === id);
    return(searchedPrice.price_usd);
  }

  deleteBuy(id){
    console.log(id);
    console.log('elotte' + this.buyedCryptos);
    const deleteIndex = this.buyedCryptos.findIndex(x => x.id === id);
    console.log(deleteIndex);
    this.buyedCryptos.splice(deleteIndex,1);
    localStorage.removeItem('buyed');
    localStorage.setItem('buyed', JSON.stringify(this.buyedCryptos));
  }
  isColor(value) {
    if (value > 0) {
      return true;
    }
    return false;
  }

}
