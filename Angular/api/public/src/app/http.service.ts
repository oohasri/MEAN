import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { 
    this.getPoke();
  }


  getPoke() {
    return this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
  }
  getability(url){
    return this._http.get(url);
  }
}

