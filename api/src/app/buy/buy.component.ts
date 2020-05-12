import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {faChartLine} from '@fortawesome/free-solid-svg-icons';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {faUniversity} from '@fortawesome/free-solid-svg-icons';
import {faCoins} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-buy',
  template: `
    <div class="container">
      <div class="topper" *ngIf="activePopup"></div>
      <h1 class="title">{{actualCoin.name}}</h1>
      <p class="navigation"><a routerLink="/list">All Coins</a>&nbsp;&nbsp;  <fa-icon  class="arrow" [icon]="faArrowRight"></fa-icon> &nbsp;&nbsp; {{actualCoin.name}}</p>
      <button class="buyBtn" (click)="activePopup = true">Buy {{actualCoin.name}}</button>
      <div class="cardContainer">
        <div class="leftHolder">
          <h2 class="aboutTitle">About {{actualCoin.name}}</h2>
          <p class="aboutText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor vel eros ac lobortis. Nam ornare nisi diam, id rhoncus est imperdiet non.<br><br> Nam eget aliquam risus, non rhoncus enim. Vivamus molestie dolor a lacus ullamcorper, nec accumsan sem cursus. <br><br>Curabitur sagittis, lorem non dignissim cursus, mi ipsum tincidunt magna, sed auctor dui ligula nec velit. Mauris fringilla elementum nunc, vitae pretium quam ornare at. Vivamus auctor vel eros ac lobortis.</p>
        </div>
        <div class="rightHolder">
          <div class="last24h">
            <div class="cardLeftSide"><fa-icon  [icon]="faChartLine"></fa-icon></div>
            <div class="cardRightSide">
             <h3>{{actualCoin.percent_change_24h}} %</h3>
              <p>Last 24h</p>
            </div>
          </div>
          <div class="symbol">
            <div class="cardLeftSide"><fa-icon  [icon]="faUniversity"></fa-icon></div>
            <div class="cardRightSide">
              <h3>{{actualCoin.rank}}.</h3>
              <p>Rank in the crypto market</p>
            </div>
          </div>
          <div class="last1h">
            <div class="cardLeftSide"><fa-icon  [icon]="faChartLine"></fa-icon></div>
            <div class="cardRightSide">
              <h3>{{actualCoin.percent_change_7d}} %</h3>
              <p>Last 7d</p>
            </div>
          </div>
          <div class="rank">
            <div class="cardLeftSide"><fa-icon  [icon]="faCoins"></fa-icon></div>
            <div class="cardRightSide">
              <h3>{{actualCoin.symbol}}</h3>
              <p>Symbol</p>
            </div>
          </div>
        </div>
      </div>
      <div class="buyPopup" *ngIf="activePopup">
        <div class="exit" (click)="activePopup = false"><fa-icon  [icon]="faTimes"></fa-icon></div>
        <div class="popupTitle">
          <h2>How much {{actualCoin.name}} do you want to buy?</h2>
        </div>
        <div class="popupData">
          <input [(ngModel)]="quantity" type="text">
          <button (click)="buyCoin()">Buy Now</button>
          <p *ngIf="quantity">You can buy {{quantity}} {{actualCoin.name}} for $ {{quantity * actualCoin.price_usd}}</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./buy.component.css']
})


export class BuyComponent implements OnInit {

  public id;
  public actualCoin;
  quantity;
  faArrowRight = faArrowRight;
  faChartLine = faChartLine;
  faTimes = faTimes;
  faUniversity = faUniversity;
  faCoins = faCoins
  activePopup = false;
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
    this.activePopup = false;
  }



}
