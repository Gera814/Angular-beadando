import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {CryptoCoin} from '../models/crypto';
import {Coin} from '../models/coin';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url: string ="https://api.coinlore.net/api/tickers/?start=0&limit=20";
  public storageCryptoData = [];
  public buyedCryptos = [];
  constructor(private http: HttpClient) {

  }
  getCryptos(): Observable<CryptoCoin[]>{
    return this.http.get<CryptoCoin[]>(this.url)
      .pipe(catchError(this.errorHandler));
  }
  getCryptoBySymbol(id): Observable<Coin[]>{
    return this.http.get<Coin[]>("https://api.coinlore.net/api/ticker/?id=" + id )
      .pipe(catchError(this.errorHandler));
  }

  public getBuyedCriptos(): Coin[] {
    return JSON.parse(localStorage.getItem('buyed')) as Coin[];
  }
  addCrypto(data) {
    this.buyedCryptos = this.getBuyedCriptos();
    if(this.buyedCryptos == null){
      this.buyedCryptos = [];
    }
    console.log(this.buyedCryptos);
    this.buyedCryptos.push(data);
    console.log(this.buyedCryptos);
    localStorage.setItem('buyed', JSON.stringify(this.buyedCryptos));

  }
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message);
  }

}
