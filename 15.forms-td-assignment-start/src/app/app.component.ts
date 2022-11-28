import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') form: NgForm;

  mail = '';
  password = '';
  subscriptions = ['Basic', 'Advanced', 'Pro']
  subscriptionType = 'Advanced';

  onSubmit() {
    console.log(this.form);
  }
}
