import ActionTypes from './types'

export const isLoginAction = (isLogin) =>{
    return{
        type:ActionTypes.IS_LOGIN,
        isLogin:isLogin
    };
}

export const userDataAction = (userData) =>{
    return{
        type:ActionTypes.USER_DATA,
        userData:userData
    };
}