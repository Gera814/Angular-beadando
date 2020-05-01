import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IEmployee} from './models/employee';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {CryptoCoin} from './models/crypto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url: string = "https://www.breakingbadapi.com/api/characters?limit=10&offset=10";
  private url2: string ="https://coinlib.io/api/v1/coin?key=33c958006668416a&pref=USD&symbol=BTC,ETH,XMR";


  constructor(private http: HttpClient) { }

  getEmployees(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this.url)
      .pipe(catchError(this.errorHandler));
  }
  getCryptoInfo(): Observable<CryptoCoin[]>{
    return this.http.get<CryptoCoin[]>(this.url2)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message);
  }
}
