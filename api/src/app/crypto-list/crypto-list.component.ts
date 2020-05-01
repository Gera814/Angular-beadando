import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Router} from '@angular/router';


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
        <tr *ngFor="let crypto of cryptos.coins;let i = index">
          <td>{{crypto.rank}}</td>
          <td>{{crypto.name}}</td>
          <td>{{crypto.price}}</td>
          <td>{{crypto.delta_24h}}</td>
          <td>
            <button (click)="goToBuy(crypto.name)">BUY</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['./crypto-list.component.css']
})
export class CryptoListComponent implements OnInit {

  public cryptos = [];

  //instance hozzaadasa
  // tslint:disable-next-line:variable-name
  constructor(private _employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit(): void {
    this._employeeService.getCryptoInfo()
      .subscribe(data => this.cryptos = data);
  }

  goToBuy(name): void {
    this.router.navigate(['/buy', name]);
  }

}
