import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './auth.user.model';

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
    user = new Subject<User>();
    constructor(private httpClient: HttpClient) { }

    signUp(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsSXmUOWu1Suw3zNZBX9cUvEGrdFPwt1I',
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
        return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsSXmUOWu1Suw3zNZBX9cUvEGrdFPwt1I',
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
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
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
