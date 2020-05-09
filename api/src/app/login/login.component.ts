import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="loginComponent">
      <div class="headerHolder">
        <div class="logoHolder">
            <img class="logo" src="/assets/login/undraw_bitcoin2_ave7.png" alt="">
          <div class="createdBy">
            <img class="avatar" src="/assets/login/avatar.png" alt="">
            <div class="createdByText"><p>created by Geresdi Bence</p></div>
          </div>
        </div>
      </div>
      <div class="mainContent">
        <div class="mainImgHolder">
          <img src="/assets/login/undraw_btc_p2p_lth5.png" alt="">
        </div>
        <div class="mainTextHolder">
          <h1>Crypto Trader website</h1>
          <h2>Login to Your Account!</h2>
          <button (click)="goLogin()">Login</button>

        </div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: DataService, private router: Router) { }

  ngOnInit(): void {
  }
  goLogin(){
    sessionStorage.setItem('loggedIn', 'true');
    this.router.navigate(['list']);
  }
}
