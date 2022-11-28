import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() oddCreated = new EventEmitter<{counter: number}>();
  @Output() evenCreated = new EventEmitter<{counter: number}>();
  
  counter = 0;
  interval;
  constructor() { }

  ngOnInit(): void {
  }
  startGame() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.counter++;
        if(this.counter % 2 == 1) {
          this.oddCreated.emit({counter: this.counter})
        } else {
          this.evenCreated.emit({counter: this.counter})
        }
      }, 1000);
    }
  }
  stopGame() {
    clearInterval(this.interval);
    this.interval = null;
  }
}
