import { Component, DoCheck, OnInit } from '@angular/core';
import { CounterService } from '../shared/counter.service';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit, DoCheck {
  users: string[];
  counter: number;

  constructor(private usersService:UsersService, private counterService: CounterService) { }

  ngOnInit(): void {
    this.users = this.usersService.inactiveUsers;
  }
  ngDoCheck(): void {
    this.counter = this.counterService.activeToInactiveActions;
  }
  onSetToActive(id: number) {
    this.usersService.setActive(id);
  }
}
