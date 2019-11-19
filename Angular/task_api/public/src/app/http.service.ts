import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient) {
    this.getTasks();
  }
  getTasks() {
    // // our http response is an Observable, store it in a variable
    // const tempObservable = this._http.get('/tasks');
    // // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log('Got our tasks!', data));
    return this._http.get('/tasks');
  }
  getTasksId(id) {
    // const tempObservable = this._http.get('/task/${id}');
    // tempObservable.subscribe(data => console.log('Your task', data));
    // console.log('In service',id)
    return this._http.get('/task/' + id);
  }
  create(taskbody) {
    // const tempObservable = this._http.post('/task/new', taskbody);
    // tempObservable.subscribe(data => console.log("new task", data));
    return this._http.post('/task/new', taskbody);
  }
  update(id, taskbody) {
    // const tempObservable = this._http.put('/task/${id}', taskbody);
    // tempObservable.subscribe(data => console.log("updated task", data));
    return this._http.put('/task/' + id, taskbody);
  }
  delete(id) {
    // const tempObservable = this._http.delete('/task/${id}');
    // tempObservable.subscribe(data => console.log('delete', data));
    return this._http.delete('/task/' + id);
  }
}



