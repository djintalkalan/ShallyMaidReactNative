import ActionTypes from './types'

export const selectedTabAction = (selectedTab) =>{
    return{
        type:ActionTypes.SELECTED_TAB,
        selectedTab:selectedTab
    };
}