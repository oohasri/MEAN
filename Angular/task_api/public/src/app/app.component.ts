import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Welcome to Restful Task API';
  tasks = [];
  taskId: any;
  newTask: any;
  edittask: any;
  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    this.newTask = { title: '', description: '' }
  }
  onButtonClick(): void {
    this.tasks = [];
    const observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log('Got our tasks!', data);
      for (const task of data[Symbol.iterator]()) {
        console.log(task);
        this.tasks.push(task);
      }
      console.log(this.tasks);
    });
    console.log(`Click event is working`);
  }
  getTask(id: string): void {
    this.taskId = {};
    const tempObservable = this._httpService.getTasksId(id);
    tempObservable.subscribe(data => {
      console.log('Your task', data);
      for (const task of data[Symbol.iterator]()) {
        this.taskId = task;
      }
    });
  }
  onSubmit() {
    const observable = this._httpService.create(this.newTask);
    observable.subscribe(data => {
        console.log(data);
        this.onButtonClick();
    });
  }
  getTaskEdit(id: string) {
    const tempObservable = this._httpService.getTasksId(id);
    tempObservable.subscribe(data => {
      for (const task of data[Symbol.iterator]()) {
        this.edittask = task;
      }
    });
  }
  editForm(): void {
    console.log('Edit*********');
    console.log(this.edittask._id);
    const observable = this._httpService.update(this.edittask._id, this.edittask);
    observable.subscribe(data => {
        console.log(data);
        this.onButtonClick();
    });
  }
  deleteTask(id: string) {
    const observable = this._httpService.delete(id);
    observable.subscribe(data => {
      console.log(data);
      this.onButtonClick();
    });
  }
}
