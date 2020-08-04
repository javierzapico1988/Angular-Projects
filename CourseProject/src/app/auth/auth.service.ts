import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Logout } from './store/auth.actions';
import { ThrowStmt } from '@angular/compiler';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
    registered?: boolean
}


@Injectable({ providedIn: 'root' })
export class AuthService {
    private tokenExpirationTimer: any;
    constructor(private store: Store<AppState>) { }

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new Logout());
        }, expirationDuration);

    }
    clearLogoutTimer() {
        if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer)
        this.tokenExpirationTimer = null;
    }


}
