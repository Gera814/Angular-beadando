import { Component } from '@angular/core';
import {DataService} from './services/data.service';
import {Router} from '@angular/router';
import {faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {faCoins} from '@fortawesome/free-solid-svg-icons';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api';
  public name = "Gera";
  faTachometerAlt = faTachometerAlt;
  faCoins = faCoins;
  faSignOutAlt = faSignOutAlt;
  public message = "";

  constructor(private service: DataService, private router: Router) {
  }
  ngOnInit(): void {


  }
  isLoggedIn(){
    const login = sessionStorage.getItem("login");
    if(login == 'true'){
      return true;
    }

    return false;
  }
  logOut(){
    sessionStorage.setItem('login', 'false');
    this.router.navigate(['']);
  }
  goToList(){
    this.router.navigate(['list']);
  }
  goToPortfolio(){
    this.router.navigate(['portfolio']);
  }
  isList(){
    if(this.router.url === '/list'){
      return true;
    }
    return false;
  }
  isPortfolio(){
    if(this.router.url === '/portfolio'){
      return true;
    }
    return false;
  }
}
