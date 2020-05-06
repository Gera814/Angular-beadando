import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <button (click)="goLogin()">Login</button>
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
