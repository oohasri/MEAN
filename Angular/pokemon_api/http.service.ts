import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { 
    this.getPoke();
  }
  getPoke(){
    // our http response is an Observable, store it in a variable
    const tempObservable = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    tempObservable.subscribe(data => {
      console.log('Got our tasks!', data.abilities);
      for(const ability of data.abilities) {
        console.log(ability.ability.url);
        const url = ability.ability.url;
        const observablePoke = this._http.get(url);
        observablePoke.subscribe(data => {
          console.log(data.pokemon.length);
          for(const name of data.pokemon){
            console.log(name.pokemon.name);
          }
        })
      }
    });
 }
}

