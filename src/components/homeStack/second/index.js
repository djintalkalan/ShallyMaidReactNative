import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { TextBold } from '../../custom/text';
import { Constants, Images } from '../../../utils';
import { AppMainData } from '../../../utils/appMainData'
import MyStatusBar from '../../custom/my-status-bar'
import styles from './style'
import NavigationService from '../../../services/NavigationServices';







export default class SecondHome extends Component {
	static navigationOptions = {
		// title: 'Please sign in',
		header: null //hide the header
	};

	constructor(props) {
		super(props)
		this.state = {
			serviceItem: null
		}
	}
	componentDidMount() {
		const { navigation } = this.props;
		const navigateFrom = navigation.getParam('navigateFrom', '');
		const data = navigation.getParam('data', '');
		if (navigateFrom == "Home") {
			this.setState({
				serviceItem: data
			})
		}
	}
	onBackClick = () => {

		const { navigation } = this.props;
		navigation.goBack();
	}

	cardPressed(item, index) {
		NavigationService.navigate('SelectionScreen', {
			navigateFrom: "SecondHome",
			selectedItems: {
				selectedService:this.state.serviceItem.title,
				selectedChild:item.childName
			}
		})
	}

	renderFlatListItem({ item, index }) {
		return (
			<TouchableOpacity
				style={styles.flatListTouch}
				onPress={() => { this.cardPressed(item, index) }}>
				<View style={{ width: '50%', justifyContent: 'center', padding: 15 }}>
					<View style={{ paddingLeft: 15, alignItems: 'flex-start', }}>
						<TextBold
							title={item.childName}
							textStyle={{ color: "#555555", fontSize: 14 }} />

					</View>
				</View>

			</TouchableOpacity>
		)
	}

	render() {
		if (this.state.serviceItem == null)
			return null
		else
			return (
				<View style={styles.container}>
					<SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
					<MyStatusBar title={this.state.serviceItem.title} goback={() => this.onBackClick()} />
					<View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>

						<FlatList
							data={this.state.serviceItem.child}
							keyExtractor={item => item.order_number}
							// ListHeaderComponent={this.renderHeader}
							renderItem={({ item, index }) => (
								this.renderFlatListItem({ item, index })
							)} />


					</View>

				</View>
			);
	}
}