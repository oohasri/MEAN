import { Component, OnInit } from '@angular/core';
// Dependency injection
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  scores = [];
  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this.getLeaderboard();
  }
  getLeaderboard() {
    this.scores = [];
    const observable = this._httpService.getAll();
    observable.subscribe(data => {
      console.log('Data retrived');
      for (const score of data[Symbol.iterator]()) {
        this.scores.push(score);
      }
      console.log(this.scores);
    });
  }

}
