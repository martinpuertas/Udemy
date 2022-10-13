import { Component, OnInit } from '@angular/core';

import { CounterService } from './shared/counter.service';
import { UsersService } from './shared/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UsersService
  ]
})
export class AppComponent implements OnInit {
  activeUsers = [];
  inactiveUsers = [];
  activationsCounter = 0;
  inactivationsCounter = 0;
  
  constructor(private usersService: UsersService, private counterService: CounterService) {}
  ngOnInit() {
    this.activeUsers = this.usersService.activeUsers;
    this.inactiveUsers = this.usersService.inactiveUsers;
  };
  ngOnChanges() {
    this.activationsCounter = this.counterService.inactiveToActiveActions;
    this.inactivationsCounter = this.counterService.activeToInactiveActions;
  }
}
