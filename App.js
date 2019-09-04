

import React, { Component } from 'react';
import { Image, View,ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider } from 'react-redux';
import { configureStore } from "./src/redux/store"
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import NavigationService from './src/services/NavigationServices';
const store = configureStore();

//Utils
import { Images, GlobalStyle, strings, Constants } from './src/utils';

//Auth and Login Screens
import Login from './src/components/loginStack/login';
import Second from './src/components/loginStack/second';


//Home tab screens
import Home from './src/components/homeStack/home';
import SecondHome from './src/components/homeStack/second';
import SelectionScreen from './src/components/homeStack/selection-screen'

//Deals tab screens
import Deals from './src/components/dealsStack/deals';
import SecondDeals from './src/components/dealsStack/second';

//Profile tab screens
import MyProfile from './src/components/myProfileStack/myProfile';
import SecondMyProfile from './src/components/myProfileStack/second';


//Login Stack
const LoginStack = createStackNavigator({
	Login: {
		screen: Login
	},
});

//Home Stack
const HomeStack = createStackNavigator({
	Home: {
		screen: Home
	},
	SecondHome: {
		screen: SecondHome
	},
	SelectionScreen:{
		screen:SelectionScreen
	}
});

//Deals Stack
const DealsStack = createStackNavigator({
	Deals: {
		screen: Deals
	},
	SecondDeals: {
		screen: SecondDeals
	},
});

//My Profile Stack
const MyProfileStack = createStackNavigator({
	MyProfile: {
		screen: MyProfile
	},
	SecondMyProfile: {
		screen: SecondMyProfile
	},
});

const TabNavigator = createBottomTabNavigator({
	Home: {
		screen: HomeStack,
		navigationOptions: () => ({
			tabBarIcon: ({ tintColor }) => (
				<View style={{ height: '100%', width: '100%' }}>
					{tintColor == '#808080' ?
						<View style={{ borderTopColor: 'white', borderWidth: 2, height: '100%', width: '100%', borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
							<Image source={Images.ic_home_grey} style={{ width: 20, height: 20, resizeMode: "contain" }}></Image>
						</View> :
						<View style={{ borderTopColor: tintColor, borderWidth: 2, height: '100%', width: '100%', borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
							<Image source={Images.ic_home_primary} style={{ width: 25, height: 25, resizeMode: "contain" }}></Image>
						</View>
					}
				</View>
			),
			tabBarLabel: 'Home',
		})
	},
	Deals: {
		screen: DealsStack,
		navigationOptions: () => ({
			tabBarIcon: ({ tintColor }) => (
				<View style={{ height: '100%', width: '100%' }}>
					{tintColor == '#808080' ?
						<View style={{ borderTopColor: 'white', borderWidth: 2, height: '100%', width: '100%', borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
							<Image source={Images.ic_home_grey} style={{ width: 20, height: 20, resizeMode: "contain" }}></Image>
						</View> :
						<View style={{ borderTopColor: tintColor, borderWidth: 2, height: '100%', width: '100%', borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
							<Image source={Images.ic_home_primary} style={{ width: 25, height: 25, resizeMode: "contain" }}></Image>
						</View>
					}
				</View>
			),
			tabBarLabel: 'Deals',
		})
	},
	MyProfile: {
		screen: MyProfileStack,
		navigationOptions: () => ({
			tabBarIcon: ({ tintColor }) => (
				<View style={{ height: '100%', width: '100%' }}>
					{tintColor == '#808080' ?
						<View style={{ borderTopColor: 'white', borderWidth: 2, height: '100%', width: '100%', borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
							<Image source={Images.ic_home_grey} style={{ width: 20, height: 20, resizeMode: "contain" }}></Image>
						</View> :
						<View style={{ borderTopColor: tintColor, borderWidth: 2, height: '100%', width: '100%', borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
							<Image source={Images.ic_home_primary} style={{ width: 25, height: 25, resizeMode: "contain" }}></Image>
						</View>
					}
				</View>
			),
			tabBarLabel: 'My Profile',
		})
	}
}, {
		// initialRouteName: "ScheduleOrders",
		tabBarOptions: {
			activeTintColor: Constants.color.primary,
			inactiveTintColor: '#808080',
			// showLabel: false
		},
		lazy: true
	});

export default class App extends Component {
	state = {
		isLoginI: 0
	}


	componentDidMount = async () => {
		SplashScreen.hide();
	
		console.log('App')
		try {
			const isLoginC = await AsyncStorage.getItem(Constants.STORAGE_KEY.isLogin);
			isLogin = (JSON.parse(isLoginC)).isLogin
			let isLoginI
			if (isLogin == true) {
				isLoginI = 1
			}
			if (isLogin == false) {
				isLoginI = 2
			}
			this.setState({ isLoginI: isLoginI }, () => {
				SplashScreen.hide();
			})
			

			// NavigationService.navigate('MainStack');
			// NavigationService.navigate(token ? 'MainStack' : 'LoginStack');
		} catch (e) {
			// error reading value
		//	alert(e)
			
			isLoginI = 3
			this.setState({ isLoginI: isLoginI }, () => {
				SplashScreen.hide();
			})
		}
		
	}
	getRoute() {
		switch (this.state.isLoginI) {
			case 1:
				return "MainStack"
			case 2:
				return "LoginStack"
			case 3:
				return "LoginStack"
		}
	}
	renderProgressBar() {
      
            return (
                <View style={GlobalStyle.activityIndicatorView}>
                    <View style={GlobalStyle.activityIndicatorWrapper}>
                        <ActivityIndicator
                            size={"large"}
                            color={Constants.color.primary}
                            animating={true} />
                    </View>
                </View>
            )
			}

	render() {

		const Navigations = createAppContainer(
			createSwitchNavigator({
				// AuthLoading: AuthLoadingScreen,
				LoginStack: LoginStack,
				MainStack: TabNavigator,
			}, {
					// initialRouteName: "LoginStack",
					initialRouteName: this.getRoute()
				}
			)
		);
		console.disableYellowBox = true;
		if(this.state.isLoginI==0){
			return (
				<View style={{flex:1}}
				>
					{this.renderProgressBar()}
				</View>
			)
		}else
		return (
			<Provider store={store}>
				<Navigations
					ref={navigatorRef => {
						NavigationService.setTopLevelNavigator(navigatorRef);
					}}
				/>
			</Provider >
		)
	}
}
