import { Component, OnInit } from '@angular/core';
// Dependency injection
import { HttpService } from '../http.service';
import { ScoreService } from '../score.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-check-leaderboard',
  templateUrl: './check-leaderboard.component.html',
  styleUrls: ['./check-leaderboard.component.css']
})
export class CheckLeaderboardComponent implements OnInit {
  user: any;
  isError = false;
  errors: [];
  score: any;
  scores = [];
  bestscore: any;
  topscores = [];
  top = false;
  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _scoreService: ScoreService) { }

  ngOnInit() {
    this.user = { name: '', score: ''};
    this.score = this._scoreService.getScore();
    this.getLeaderboard();
  }
  onCreate() {
    console.log(this.user);
    // const random = Math.floor((Math.random() * 10) + 1);
    // console.log(random);
    // this.user.score = random;
    this.user.score = this.score;
    const observable = this._httpService.create(this.user);
    observable.subscribe((data: any) => {
      console.log('data inserted');
      this.user = { name: '', score: ''};
      this.getLeaderboard();
      console.log(data);
      if ('errors' in data) {
        this.isError = true;
        this.errors = data.errors;
      } else {
        this._router.navigate(['/checkin']);
      }
    });
  }

  getLeaderboard() {
    this.scores = [];
    const observable = this._httpService.getAll();
    observable.subscribe(data => {
      console.log('Data retrived');
      for (const score of data[Symbol.iterator]()) {
        this.scores.push(score);
        // this.topscores.push(score.score);
      }
      console.log('test', this.scores);
      if (this.score) {
        for (const top5scores of this.scores) {
          if (this.score >= top5scores.score) {
            this.top = true;
            console.log('status', this.top);
          }
        }
      }
      console.log('*********', this.scores);
      if (this.scores.length !== 0) {
        this.bestscore = this.scores[0].score;
      } else {
        this.bestscore = 0;
        if (this.score) {
          this.top = true;
        }
      }
      console.log('best score', this.bestscore );
    });
  }
}
