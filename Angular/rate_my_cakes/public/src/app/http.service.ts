import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {

   }
   create(cakeBody) {
      return this._http.post('/cake/new', cakeBody);
   }
   getAll() {
     return this._http.get('/cakes');
   }
   addComment(id, commentBody) {
     return this._http.post('/comment/' + id, commentBody );
   }
   retrieveById(id) {
     return this._http.get('/cake/' + id);
   }
}

