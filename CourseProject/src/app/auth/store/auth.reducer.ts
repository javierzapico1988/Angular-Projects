import { User } from '../auth.user.model';
import { AuthActions, LOGOUT, LOGIN_START, AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL, SINGUP_START, CLEAR_ERROR } from './auth.actions';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState =
{
    user: null,
    authError: null,
    loading: false
}
export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case AUTHENTICATE_SUCCESS:
            const user = new User
                (
                    action.payload.email,
                    action.payload.userid,
                    action.payload.token,
                    action.payload.expirationDate
                )
            return { ...state, user: user, authError: null, loading: false }
        case LOGOUT:
            return { ...state, user: null, authError: null, loading: false }
        case LOGIN_START:
        case SINGUP_START:
            return { ...state, authError: null, loading: true }
        case AUTHENTICATE_FAIL:
            return { ...state, user: null, authError: action.payload, loading: false }
        case CLEAR_ERROR:
            return { ...state, authError: null }
        default:
            return state

    }
}

