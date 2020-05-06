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
  private url2: string ="https://coinlib.io/api/v1/coin?key=33c958006668416a&pref=USD&symbol=BTC,ETH,XMR,USDT,REP,BTG,ZEC,ETC,BSV,LTC";
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
  /*
  constructor() {
    localStorage.removeItem('data');
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = new User();
      user.id = 'id-id-id-' + i;
      user.name = 'Name ' + i;
      user.birthDate = new Date();
      user.city = 'City ' + i;
      users.push(user);
    }
    localStorage.setItem('data', JSON.stringify(users));
  }

  public list(): User[] {
    return JSON.parse(localStorage.getItem('data')) as User[];
  }

  public add(user: User) {
    const data = this.list();
    data.push(user);
    localStorage.setItem('data', JSON.stringify(data));
  }

  public save(user: User) {
    let data = this.list();
    data = data.filter(value => value.id !== user.id);
    data.push(user);
    localStorage.setItem('data', JSON.stringify(data));
  }

  public findById(id: string) {
    const data = this.list();
    for (const d of data) {
      if (d.id === id) {
        return d;
      }
    }
    return undefined;
  }*/

}
