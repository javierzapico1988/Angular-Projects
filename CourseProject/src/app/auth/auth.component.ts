import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    let authObs: Observable<AuthResponseData>;

    if (form.valid) {
      this.isLoading = true;
      if (this.isLoginMode) {
        authObs = this.authService.logIn(form.value.email, form.value.password);
      } else {
        authObs = this.authService.signUp(form.value.email, form.value.password);
      }

      authObs.subscribe(
        (response) => {
          console.log(response);
          this.isLoading = false;
        }, error => {
          this.error = error;
          this.isLoading = false;
        }
      );
      form.reset();
    }


  }


}
