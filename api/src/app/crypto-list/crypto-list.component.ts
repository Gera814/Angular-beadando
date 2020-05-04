import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {log} from 'util';

@Component({
  selector: 'app-crypto-list',
  template: `
    <div class="">
      <table class="table table-striped">
        <thead>
        <tr>
          <td>RANK</td>
          <td>NAME</td>
          <td>PRICE</td>
          <td>LAST 24H</td>
          <td>City</td>
          <td></td>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let crypto of cryptos;let i = index">
          <td>{{crypto.rank}}</td>
          <td>{{crypto.name}}</td>
          <td>$ {{crypto.price_usd}}</td>
          <td>{{crypto.percent_change_24h}}</td>
          <td id="buyTD">
            <input type="text"><button (click)="goToBuy(crypto.id)">BUY</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['./crypto-list.component.css']
})
export class CryptoListComponent implements OnInit {

  public cryptos:any = [];

  //instance hozzaadasa
  // tslint:disable-next-line:variable-name
  constructor(private service: DataService, private router: Router) {
  }

  ngOnInit(): void {

    this.service.getCryptos()
      .subscribe(
        (data) => {
          this.cryptos = data;
        },
        (err) => console.error(err),
        () => this.cryptos = this.cryptos.data
      );

  }




  goToBuy(symbol): void {
    this.router.navigate(['/buy', symbol]);
  }

}

