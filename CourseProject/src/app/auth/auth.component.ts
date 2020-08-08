import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as AuthActions from './store/auth.actions'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = false;
  isLoading = false;
  error: string = null;
  private storeSub: Subscription
  constructor(private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isLoginMode) {
        this.store.dispatch(new AuthActions.LoginStart({ email: form.value.email, password: form.value.password }))
      } else {
        this.store.dispatch(new AuthActions.SignupStart({ email: form.value.email, password: form.value.password }))
      }
      form.reset();

    }
  }
  onCloseAlert() {
    this.store.dispatch(new AuthActions.ClearError());
  }


}
