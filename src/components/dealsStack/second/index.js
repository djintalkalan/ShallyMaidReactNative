import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { TextBold } from '../../custom/text';

export default class SecondDeals extends Component {
	static navigationOptions = {
		// title: 'Please sign in',
		header: null //hide the header
	};

	constructor(props) {
		super(props)
		this.state = {
			// username: 'khushal.pahuja@enukesoftware.com',
			// password: '1234567',
			username: '',
			password: '',
			loading: false
		}
	}

	render() {
		return (
			<View style={{justifyContent:'center',alignItems:'center'}}>
				<TextBold title={this.props.navigation.state.routeName + " Screen"}></TextBold>
			</View>
		);
	}
}