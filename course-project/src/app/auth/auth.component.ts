import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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
    if (this.isLoginMode) {
      // todo
    } else {
      this.authService.signup(form.value.email, form.value.password).subscribe(
        responseData => {
          this.isLoading = false;
          console.log(responseData)
        },
        error => {
          this.isLoading = false;
          console.log(error);
          this.error = 'An error occurred'
        }
      );
    }
    form.reset();
  }
}