import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  
  constructor(private authService: AuthService) {}
  
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    let authObservable:Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObservable = this.authService.login(form.value.email, form.value.password)
    } else {
      authObservable = this.authService.signup(form.value.email, form.value.password)
    }
    authObservable.subscribe(
      responseData => {
        this.isLoading = false;
        console.log(responseData)
      },
      errorMessage => {
        this.isLoading = false;
        console.log(errorMessage);
        this.error = errorMessage;
        
      }
    );
    form.reset();
  }
}
