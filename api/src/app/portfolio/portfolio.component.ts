import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';
import {Coin} from '../models/coin';
import {log} from 'util';

@Component({
  selector: 'app-portfolio',
  template: `
    <div class="">
      <table class="table table-striped">
        <thead>
        <tr>
          <td>TRADE</td>
          <td>NAME</td>
          <td>QUANTITY</td>
          <td>BUYED PRICE</td>
          <td>CURRENT PRICE</td>
          <td>BUYED $</td>
          <td>CURRENT $</td>
          <td>PROFIT</td>
          <td>Delete</td>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let buyedCrypto of buyedCryptos;let i = index">
          <td>{{i+1}}.</td>
          <td>{{buyedCrypto.name}}</td>
          <td>{{buyedCrypto.quantity}}</td>
          <td>$ {{buyedCrypto.price_usd}}</td>
          <td>$ {{getActualCryptoPrice(buyedCrypto.id)}}</td>
          <td>$ {{buyedCrypto.quantity*buyedCrypto.price_usd}}</td>
          <td>$ {{buyedCrypto.quantity * getActualCryptoPrice(buyedCrypto.id)}}</td>
          <td>$ {{(getActualCryptoPrice(buyedCrypto.id)-buyedCrypto.price_usd)*buyedCrypto.quantity}}</td>
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

}
