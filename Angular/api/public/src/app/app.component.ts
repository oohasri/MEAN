import { HttpService } from './http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  pokemons = [];

  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    this.getTasksFromService();
  }
  getTasksFromService() {
    let observable = this._httpService.getPoke();
    observable.subscribe(data => {
          console.log("Got our tasks!", data);
          for (const ability of data.abilities) {
            console.log(ability.ability.url);
            const url = ability.ability.url;
            const observablePoke = this._httpService.getability(url);
            observablePoke.subscribe(data => {
                    console.log(data.pokemon.length);
                    for (const name of data.pokemon){
                      console.log(name.pokemon.name);
                    }
                  });
          }
        }

    );

  }
}
