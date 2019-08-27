import { combineReducers } from 'redux'
import { isLoginReducer, userDataReducer, } from './userDataReducer'
import { selectedTabReducer, } from './selectedTabReducer'

export default combineReducers({
    isLogin: isLoginReducer,
    userData: userDataReducer,
    selectedTab:selectedTabReducer,
})