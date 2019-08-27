import ActionTypes from '../actions/types'

export const selectedTabReducer = (state = null, action) => {
    switch (action.type) {
        case ActionTypes.SELECTED_TAB:
            return action.selectedTab
        default:
            return state
    }
}

