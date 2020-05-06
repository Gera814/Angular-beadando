import { Component } from '@angular/core';
import {DataService} from './services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api';
  public name = "Gera";

  public message = "";
  constructor(private service: DataService, private router: Router) {
  }
  ngOnInit(): void {


  }
  isLoggedIn(){
    const loggedIn = sessionStorage.getItem("loggedIn");
    if(loggedIn == 'true'){
      return true;
    }

    return false;
  }
  logOut(){
    sessionStorage.setItem('loggedIn', 'false');
    this.router.navigate(['login']);
  }
}
