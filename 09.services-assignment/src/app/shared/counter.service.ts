import { Injectable } from "@angular/core";

@Injectable()
export class CounterService {
	activeToInactiveActions = 0;
	inactiveToActiveActions = 0;

	activeToInactiveCounter() {
		this.activeToInactiveActions++;
		console.log('active > inactive counter' + this.activeToInactiveActions);
	}
	inactiveToActiveCounter() {
		this.inactiveToActiveActions++;
		console.log('inactive > active counter' + this.inactiveToActiveActions);
	}
}