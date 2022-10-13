import { Component, Input } from '@angular/core';
import { CounterService } from '../shared/counter.service';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  @Input() users: string[];
  @Input() counter: number[];

  constructor(private usersService:UsersService, private counterService: CounterService) { }

  onSetToActive(id: number) {
    this.usersService.setActive(id);
    this.counterService.inactiveToActiveCounter();
  }
}
