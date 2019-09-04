import {createStore} from 'redux'
import rootReducer from '../reducers'

export default store = createStore(rootReducer)

export const configureStore = () => {
	return createStore(rootReducer,/* preloadedState, */
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
}