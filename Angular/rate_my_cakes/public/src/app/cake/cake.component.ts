import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent implements OnInit {
  comment: { id: '', rating: '', comment: ''};
  @Input() getCakes: any;
  @Output() aTaskEventEmitter = new EventEmitter();
  @Output() aCakeDisplayEmitter = new EventEmitter();
  constructor() {}
  ngOnInit() {
    this.comment = { id: '', rating: '', comment: ''};
    this.comment.id = this.getCakes._id;
  }
  triggerEvent() {
    //  2b. Emit the Event
    console.log('Awesome', this.comment);
    this.aTaskEventEmitter.emit(this.comment);
  }
  triggerDisplayCake() {
    this.aCakeDisplayEmitter.emit(this.getCakes._id);
  }
}
