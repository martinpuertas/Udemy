import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError, tap, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;
}

@Injectable({providedIn: "root"})
export class AuthService {
	// apiKey = 'AIzaSyD-xLIsFhOTaT-khlGr01xVQP0yMjsuPIQ';
	// we store de user data in a subject, then we emit (next) a new instance of User
	// when we receive a user's data
	user = new BehaviorSubject<User>(null);
	tokenExpirationTimer: NodeJS.Timeout;

	constructor(private http: HttpClient, private router: Router) {}
	
	signup(email: string, password: string) {
		return this.http.post<AuthResponseData>(
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.fbAPIKey}`,
			{
				email: email,
				password: password,
				returnSecureToken: true
			}
		).pipe(
        	catchError(this.handleError),
        	tap(responseData => {
          		this.handleAuthentication(
            		responseData.email,
            		responseData.localId,
            		responseData.idToken,
            		+responseData.expiresIn
          		);
        	})
      	);
	}

	login(email: string, password: string) {
		return this.http.post<AuthResponseData>(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fbAPIKey}`,
			{
				email: email,
				password: password,
				returnSecureToken: true
			}
		).pipe(
			catchError(this.handleError),
			tap(responseData => {
				this.handleAuthentication(
					responseData.email,
					responseData.localId,
					responseData.idToken,
					+responseData.expiresIn
				);
			})
		)
	}

	autoLogin() {
		const userData: {
			email: string;
			id: string;
			_token: string;
			_tokenExpirationDate: string; // this comes as string
		} = JSON.parse(localStorage.getItem('userData'));
		if(!userData) {
			return;
		}
		const loadedUser = new User(
			userData.email,
			userData.id,
			userData._token,
			new Date(userData._tokenExpirationDate)
			// we have to convert from string to a Date object again
			// userData is a json parsed from string so can't use the getter of the model
		);
		if (loadedUser.token) { 
			// here we can use the getter of the user model that already checks token is valid
			// because loadedUser is a User type
			this.user.next(loadedUser);
			const expirationTime = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
			this.autoLogout(expirationTime)
		}
	}
	
	logout() {
		this.user.next(null);
		this.router.navigate(['/auth']);
		localStorage.removeItem('userData');
		if (this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer);
		}
		this.tokenExpirationTimer = null;
	}

	autoLogout(expirationTime: number) {
		console.log(expirationTime);
		this.tokenExpirationTimer = setTimeout(() => {
			this.logout();
		}, expirationTime);
	}

	private handleAuthentication(email: string, userId: string, token: string, expiresIn:number) {
		const expirationTime = new Date(new Date().getTime() + expiresIn * 1000)
		const user = new User(
			email,
			userId,
			token,
			expirationTime
		);
		this.user.next(user);
		this.autoLogout(expiresIn * 1000); // this sets the timer to expire the token
		localStorage.setItem('userData', JSON.stringify(user))
	}
	private handleError(errorRes: HttpErrorResponse) {
		let errorMessage;
		if(!errorRes.error || !errorRes.error.error) {
			return throwError(() => new Error(errorMessage));
		}
		switch (errorRes.error.error.message) {
			case 'EMAIL_EXISTS':
				errorMessage = 'This email already exists';
				break;
			case 'EMAIL_NOT_FOUND':
			case 'INVALID_PASSWORD':
				errorMessage = 'The email or password provided is invalid';
				break;
			default:
				errorMessage = 'An unknown error occurred!'
		}
		return throwError(() => new Error(errorMessage));
	}
}