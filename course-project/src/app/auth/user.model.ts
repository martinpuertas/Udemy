export class User {
	constructor(
		public email:string,
		public id: string,
		private _token: string,
		private _tokenExpirationDate: Date
	) {	}
	get token() {
		// a getter is a property in which we can run code when accessing this property like 'user.token'
		if (!this._token || this._tokenExpirationDate < new Date()) {
			return null;
		}
		return this._token;
	}
}