import { Action } from '@ngrx/store';
export const LOGIN_START = '[Auth] LOGIN START'
export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE SUCCESS'
export const AUTHENTICATE_FAIL = '[Auth] AUTHENTICATE FAIL'
export const LOGOUT = '[Auth] LOGOUT'
export const SINGUP_START = '[Auth] SINGUP START'
export const CLEAR_ERROR = '[Auth] CLEAR ERROR'
export const AUTO_LOGIN = '[Auth] AUTO LOGIN'

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;

    constructor(public payload: { email: string, userid: string, token: string; expirationDate: Date, redirect: boolean }) { }
}
export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string, password: string }) { }
}
export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;
    constructor(public payload: string) { }
}

export class SignupStart implements Action {
    readonly type = SINGUP_START;
    constructor(public payload: { email: string, password: string }) { }
}
export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}
export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions = AuthenticateSuccess | Logout | LoginStart | AuthenticateFail | SignupStart | ClearError | AutoLogin