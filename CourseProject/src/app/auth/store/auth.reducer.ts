import { User } from '../auth.user.model';
import { AuthActions, LOGOUT, LOGIN } from './auth.actions';

export interface State {
    user: User
}

const initialState =
{
    user: null
}
export function authReducer(state = initialState, action: AuthActions) {

    switch (action.type) {
        case LOGIN:
            const user = new User
                (
                    action.payload.email,
                    action.payload.userid,
                    action.payload.token,
                    action.payload.expirationDate
                )
            return { ...state, user: user }
        case LOGOUT:
            return { ...state, user: null }
        default:
            return state

    }
    return state;
}

