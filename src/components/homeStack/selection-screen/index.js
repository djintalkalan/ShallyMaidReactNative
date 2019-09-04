import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { TextBold } from '../../custom/text';
import { Constants, Images } from '../../../utils';
import {AppMainData} from '../../../utils/appMainData'
import MyStatusBar from '../../custom/my-status-bar'
import styles from './style'







export default class SelectionScreen extends Component {
	static navigationOptions = {
		// title: 'Please sign in',
		header: null //hide the header
	};

	constructor(props) {
		super(props)
		this.state = {
			selectedItems: null
		}
	}
	componentDidMount() {
		const { navigation } = this.props;
		const navigateFrom = navigation.getParam('navigateFrom', '');
		const selectedItems = navigation.getParam('selectedItems', '');
		if (navigateFrom == "SecondHome") {
			this.setState({
				selectedItems: selectedItems
			})
		}
	}
	onBackClick = () => {

		const { navigation } = this.props;
		navigation.goBack();
	}


	render() {
		if (this.state.selectedItems == null)
			return null
		else
			return (
				<View style={styles.container}>
					<SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
					<MyStatusBar title={this.state.selectedItems.selectedChild} goback={() => this.onBackClick()} />
					<View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>

						{/* <FlatList
							data={this.state.serviceItem.child}
							keyExtractor={item => item.order_number}
							// ListHeaderComponent={this.renderHeader}
							renderItem={({ item, index }) => (
								this.renderFlatListItem({ item, index })
							)} /> */}
					</View>

				</View>
			);
	}
}