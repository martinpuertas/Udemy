import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Subject, throwError, tap } from "rxjs";
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
	apiKey = 'AIzaSyD-xLIsFhOTaT-khlGr01xVQP0yMjsuPIQ';
	// we store de user data in a subject, then we emit (next) a new instance of User when we receive a user's data
	user = new Subject<User>();

	constructor(private http: HttpClient) {}
	
	signup(email: string, password: string) {
		return this.http.post<AuthResponseData>(
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
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
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
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

	private handleAuthentication(email: string, userId: string, token: string, expiresIn:number) {
		const expirationTime = new Date(new Date().getTime() + expiresIn * 1000)
		const user = new User(
			email,
			userId,
			token,
			expirationTime
		);
		this.user.next(user);
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