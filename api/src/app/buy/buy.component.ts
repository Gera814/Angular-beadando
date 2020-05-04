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
          <td>LAST 24H</td>
          <td></td>
          <td></td>
        </tr>
        </thead>
        <tbody>
        <tr >
          <td>{{actualCoin.name}}</td>
          <td>$ {{actualCoin.price_usd}}</td>
          <td>{{actualCoin.percent_change_24h}}</td>
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
    this.service.addCrypto(this.actualCoin);
  }



}
