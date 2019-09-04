import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Images from '../Componants/Images';
import Constants from '../Componants/Constants';
import Fonts from '../Componants/Fonts';
import NavigationService from '../Componants/NavigationService';
import { TextBold } from '../Componants/TextField';
import Styles from '../Componants/Styles';

export default class AuthScreen extends Component {

	componentDidMount = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			const user = await AsyncStorage.getItem('userdetail');
			Constants.user = user ? JSON.parse(user) : {};
			Constants.TOKEN = token ? token : "";
			// NavigationService.navigate('MainStack');
			NavigationService.navigate(token ? 'MainStack' : 'LoginStack');
		} catch (e) {
			// error reading value
			alert(e)
		}
	}

	// Render any loading content that you like here
	render() {
		console.log("checking auth");
		// console.disableYellowBox = true;
		return (
			<ImageBackground source={Images.ImgSplash} style={Styles.container} resizeMode="stretch">
				<ActivityIndicator color={Constants.themeDark} size="large"></ActivityIndicator>
				<TextBold textStyle={{
					color: "white",
					fontSize: 18,
					fontFamily: Fonts.bold,
					marginTop: 20
				}} title="Loading . . ."></TextBold>
				<StatusBar backgroundColor={Constants.themeDark} hidden={true} barStyle="light-content" />
			</ImageBackground>
		)
	}
}