import { NavigationActions, DrawerActions,NavigationStateRoute } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
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

function closeDrawer(){
  _navigator.dispatch(
    DrawerActions.closeDrawer()
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  closeDrawer,
  setTopLevelNavigator,
};