import { Actions, ofType, Effect } from '@ngrx/effects'
import * as AuthActions from './auth.actions'
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../auth.user.model';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
    registered?: boolean
}



const handleAuthentication = (resData: AuthResponseData) => {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({ email: resData.email, userid: resData.localId, token: resData.idToken, expirationDate: expirationDate, redirect: true })
}

const handleError = (errorRes: any) => {
    let errorMessage = 'An unkwown error ocurred!'
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage));
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
    return of(new AuthActions.AuthenticateFail(errorMessage));
}
@Injectable()
export class AuthEffects {

    @Effect()
    authSignUp = this.actions$.pipe(
        ofType(AuthActions.SINGUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            ).pipe(tap(resData => {
                this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            })
                , map(resData => {
                    handleAuthentication(resData);
                }), catchError(errorRes => handleError(errorRes))
            );
        }))

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }

            ).pipe(tap(resData => {
                this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }), map(resData => {
                return handleAuthentication(resData);
            }), catchError(errorRes => handleError(errorRes))
            );
        }))

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
            if (authSuccessAction.payload.redirect) {
                this.router.navigate(['./'])
            }
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN), map(() => {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return { type: 'Dummy' }
            }
            const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
            if (loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);
                return new AuthActions.AuthenticateSuccess({ email: loadedUser.email, userid: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate), redirect: false })
            } else {
                return { type: 'Dummy' }
            }
        })
    )
    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    );

    constructor(private actions$: Actions, private httpClient: HttpClient, private router: Router, private authService: AuthService) { }

}