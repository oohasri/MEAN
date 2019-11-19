import { Component, OnInit} from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  addCake: any;
  cakeById: any;
  cakes = [];
  isError = false;
  errors: [];
  comment: { rating: '', comment: ''};
  constructor(private _httpService: HttpService) {}
  dataFromChild(eventData) {
    this.onComment(eventData);
  }
  cakeDataFromChild(eventData) {
    console.log(eventData);
    this.getCakeById(eventData);
  }
  ngOnInit() {
    this.addCake = { baker_name: '', url: '' };
    this.comment = { rating: '', comment: ''};
  }
  OnSubmit() {
    const observable = this._httpService.create(this.addCake);
    observable.subscribe((data: any) => {
      console.log('data inserted');
      console.log(data);
      if ('errors' in data) {
        this.isError = true;
        this.errors = data.errors;
      } else {
        this.getCakes();
      }
    });
  }
  getCakes() {
    this.cakes = [];
    const observable = this._httpService.getAll();
    observable.subscribe(data => {
      console.log('Data retrived');
      for (const cake of data[Symbol.iterator]()) {
        this.cakes.push(cake);
      }
      console.log(this.cakes);
    });
  }
  onComment(commentBody) {
    console.log(commentBody.id);
    const observable = this._httpService.addComment(commentBody.id, commentBody);
    observable.subscribe(data => {
      console.log('Comment Added');
      console.log(data);
    });
  }
  getCakeById(id) {
    const observable = this._httpService.retrieveById(id);
    observable.subscribe(data => {
      console.log('Got the cake by id');
      console.log('*******', data);
      this.cakeById = data;
    });
  }
}
