import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {DataService} from './services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service: DataService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const loggedIn = sessionStorage.getItem("loggedIn");

    if(loggedIn == 'true'){
      console.log("auth true");
      return true;
    }

    console.log("auth false");

    this.router.navigate(['login']);
    return false;
  }

}
