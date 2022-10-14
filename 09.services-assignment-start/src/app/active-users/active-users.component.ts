import { Component, DoCheck, OnInit } from '@angular/core';
import { CounterService } from '../shared/counter.service';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit, DoCheck {
  users: string[];
  counter: number;

  constructor(private usersService: UsersService, private counterService: CounterService) {}

  ngOnInit(): void {
    this.users = this.usersService.activeUsers;
  }
  ngDoCheck(): void {
    this.counter = this.counterService.inactiveToActiveActions;
  }
  onSetToInactive(id: number) {
    console.log('active > inactive');
    this.usersService.setInactive(id);
  }
}
