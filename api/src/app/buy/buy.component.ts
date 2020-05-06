import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {log} from 'util';

@Component({
  selector: 'app-buy',
  template: `
    <div class="">
      <table class="table table-striped">
        <thead>
        <tr>
          <td>NAME</td>
          <td>PRICE</td>
          <td>LAST 1H</td>
          <td>LAST 24H</td>
          <td>LAST 7D</td>
          <td>How many {{actualCoin.name}} want you buy?</td>
          <td>Buy</td>
        </tr>
        </thead>
        <tbody>
        <tr >
          <td>{{actualCoin.name}}</td>
          <td>$ {{actualCoin.price_usd}}</td>
          <td>{{actualCoin.percent_change_1h}}</td>
          <td>{{actualCoin.percent_change_24h}}</td>
          <td>{{actualCoin.percent_change_7d}}</td>
          <td >
            <div class="row">
              <div class="input-field col s6" >
                <input [(ngModel)]="quantity" type="text" class="validate"><p *ngIf="quantity">You can buy {{quantity}} {{actualCoin.name}} for $ {{quantity * actualCoin.price_usd}}</p>
              </div>
            </div>
          </td>
          <td>
            <button (click)="buyCoin()" >BUY</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: []
})


export class BuyComponent implements OnInit {

  public id;
  public actualCoin;
  quantity;
  constructor(private service: DataService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.service.getCryptoBySymbol(this.id)
      .subscribe(
        (data) => {
          this.actualCoin = data;
        },
        (err) => console.error(err),
        () => this.actualCoin = this.actualCoin[0]
      );
  }
  buyCoin(): void {
    console.log(this.actualCoin);
    this.actualCoin.quantity = this.quantity;
    this.service.addCrypto(this.actualCoin);
  }



}
