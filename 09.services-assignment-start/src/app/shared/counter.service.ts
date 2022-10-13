export class CounterService {
	activeToInactiveActions = 0;
	inactiveToActiveActions = 0;

	activeToInactiveCounter() {
		this.activeToInactiveActions + 1;
	}
	inactiveToActiveCounter() {
		this.inactiveToActiveActions ++;
	}
}