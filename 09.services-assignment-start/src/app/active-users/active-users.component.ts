import { Component, Input } from '@angular/core';
import { CounterService } from '../shared/counter.service';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  @Input() users: string[];
  @Input() counter: number[];

  constructor(private usersService: UsersService, private counterService: CounterService) {}

  onSetToInactive(id: number) {
    this.usersService.setInactive(id);
    this.counterService.activeToInactiveCounter();
  }
}
