import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './auth.user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Login, Logout } from './store/auth.actions';

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
    //user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    constructor(private httpClient: HttpClient, private router: Router, private store: Store<AppState>) { }

    signUp(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(data => this.handleAuthentication(data.email, data.idToken, data.refreshToken, +data.expiresIn))
        )
    }

    logIn(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(data => this.handleAuthentication(data.email, data.localId, data.idToken, +data.expiresIn))
        )
    }

    logOut() {
        this.store.dispatch(new Logout());
        this.router.navigate(['auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut()
        }, expirationDuration)
    }
    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            this.store.dispatch(new Login({ email: loadedUser.email, userid: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate) }))
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
        const loadedUser = new User(email, userId, token, expirationDate);
        this.store.dispatch(new Login({ email: loadedUser.email, userid: loadedUser.id, token: loadedUser.token, expirationDate: expirationDate }))
        this.autoLogout(+expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(loadedUser));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unkwown error ocurred!'
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email already exists'
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email not found'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid Password'
                break;
            case 'USER_DISABLED':
                errorMessage = 'User is disabled'
                break;
        }
        return throwError(errorMessage);
    }
}
