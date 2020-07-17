import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscriptionOptions: string[] = ['Basic', 'Advanced', 'Pro'];
  submitted: boolean = false;
  defaultSubscription = 'Advanced';
  formData = { email: '', subscription: '', password: '' };
  @ViewChild('form', { static: true }) sampleForm: NgForm;

  onSubmit() {
    this.submitted = true;
    this.formData.email = this.sampleForm.value.email;
    this.formData.password = this.sampleForm.value.password;
    this.formData.subscription = this.sampleForm.value.subscription;
    console.log(this.formData.email + '-' + this.formData.password + '-' + this.formData.subscription)
  }
}
