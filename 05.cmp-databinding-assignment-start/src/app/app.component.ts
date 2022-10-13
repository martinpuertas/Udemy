import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  oddElements = [];
  evenElements = [];

  onOddCreated(elemInfo: {counter: number}) {
    this.oddElements.push({type: 'odd', num: elemInfo.counter})
  }

  onEvenCreated(elemInfo: {counter: number}) {
    this.evenElements.push({type: 'even', num: elemInfo.counter})
  }
}
