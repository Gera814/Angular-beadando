import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {faCaretUp} from '@fortawesome/free-solid-svg-icons';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-crypto-list',
  template: `
    <div class="container">
      <h2 class="title">Crypto Coin List</h2>
      <p class="smallTitle">Here you can buy crypto currencies by clicking the BUY button.</p>
      <table class="content-table">
        <thead>
        <tr>
          <td id="mid">RANK</td>
          <td>NAME</td>
          <td>SYMBOL</td>
          <td>PRICE</td>
          <td>LAST 1H</td>
          <td>LAST 24H</td>
          <td>BUY</td>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let crypto of cryptos;let i = index">
          <td id="mid">{{crypto.rank}}</td>
          <td class="important">{{crypto.name}}</td>
          <td>{{crypto.symbol}}</td>
          <td class="important">$ {{crypto.price_usd}}</td>
          <td [style.color]="isColor(crypto.percent_change_1h) ? 'green' : 'red'"><fa-icon *ngIf="isColor(crypto.percent_change_1h)" class="faCaretUp" [icon]="faCaretUp"></fa-icon><fa-icon *ngIf="!isColor(crypto.percent_change_1h)" class="faCaretDown" [icon]="faCaretDown"></fa-icon>{{crypto.percent_change_1h}} %</td>
          <td [style.color]="isColor(crypto.percent_change_24h) ? 'green' : 'red'"><fa-icon *ngIf="isColor(crypto.percent_change_24h)" class="faCaretUp" [icon]="faCaretUp"></fa-icon><fa-icon *ngIf="!isColor(crypto.percent_change_24h)" class="faCaretDown" [icon]="faCaretDown"></fa-icon>{{crypto.percent_change_24h}} %</td>

          <td>
            <button (click)="goToBuy(crypto.id)">BUY {{quantity}}</button>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  `,
  styleUrls: ['./crypto-list.component.css']
})
export class CryptoListComponent implements OnInit {
  quantity;
  public cryptos:any = [];
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
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


  isColor(value) {
    if (value > 0) {
      return true;
    }
    return false;
  }


  goToBuy(symbol): void {
    this.router.navigate(['/buy', symbol]);
  }

}

