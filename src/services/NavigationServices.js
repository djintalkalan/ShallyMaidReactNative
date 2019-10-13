import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
	navigator = navigatorRef;
}

function navigate(routeName, params) {
	!params ? params = { transition: 'horizontal' } : null
	!params.transition ? params.transition = 'horizontal' : null
	navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		})
	);
}

function goBack(routeName, params) {
	_navigator.dispatch(
		NavigationActions.back({
			routeName,
			params,
		})
	);
}
// add other navigation functions that you need and export them

export default {
	navigate,
	goBack,
	setTopLevelNavigator,
};