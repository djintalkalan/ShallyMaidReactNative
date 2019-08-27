import ActionTypes from '../actions/types'

export const isLoginReducer = (state = false, action) => {
    switch (action.type) {
        case ActionTypes.IS_LOGIN:
            return action.isLogin
        default:
            return state
    }
}
export const userDataReducer = (state = null, action) => {
    switch (action.type) {
        case ActionTypes.USER_DATA:
            return action.userData
        default:
            return state
    }
}
