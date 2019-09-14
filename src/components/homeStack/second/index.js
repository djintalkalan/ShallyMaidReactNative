import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { TextBold } from '../../custom/text';
import { Constants, Images } from '../../../utils';
import { AppMainData } from '../../../utils/appMainData'
import MyStatusBar from '../../custom/my-status-bar'
import styles from './style'
import NavigationService from '../../../services/NavigationServices';

let vis = [];
export default class SecondHome extends Component {
	static navigationOptions = {
		// title: 'Please sign in',
		header: null //hide the header
	};

	constructor(props) {
		super(props)
		this.state = {
			serviceItem: null,
			toggle: false
		}
	}
	componentDidMount() {
		const { navigation } = this.props;
		const navigateFrom = navigation.getParam('navigateFrom', '');
		const data = navigation.getParam('data', '');
		for (let i = 0; i < data.category.length; i++) {
			vis.push(false)
		}
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
		if (item.subcategory != null) {
			vis[index] = !vis[index]
			this.setState({
				toggle: !this.state.toggle
			})
		}
		else {
			NavigationService.navigate('SelectionScreen', {
				navigateFrom: "SecondHome",
				selectedItems: {
					selectedService: this.state.serviceItem,
					selectedCategory: item,
					selectedSubCategory:""
				}
			})
		}
	}

	cardPressedSub(item, index,catItem) {
			NavigationService.navigate('SelectionScreen', {
				navigateFrom: "SecondHome",
				selectedItems: {
					selectedService: this.state.serviceItem,
					selectedCategory: catItem,
					selectedSubCategory:item
				}
			})
		}
	

	renderFlatListItem({ item, index }) {
		let catItem=item
		return (
			<View>
				<TouchableOpacity
					activeOpacity={0.1}
					style={styles.flatListTouch}
					onPress={() => { this.cardPressed(item, index) }}>
					<View style={{ width: '50%', justifyContent: 'center', padding: 15 }}>
						<View style={{ paddingLeft: 15, alignItems: 'flex-start', }}>
							<TextBold
								title={item.name}
								textStyle={{ color: "#555555", fontSize: 14 }} />

						</View>
					</View>
				</TouchableOpacity>
				{vis[index] ?
					<FlatList
						style={{ paddingBottom: 5, }}
						data={item.subcategory}
						keyExtractor={item => item.id}
						// ListHeaderComponent={this.renderHeader}
						renderItem={({ item, index }) => (
							this.renderSubCatItem({ item, index },catItem)
						)} />
					: null
				}
			</View>
		)
	}

	renderSubCatItem({ item, index },catItem) {
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				style={styles.subcatItemTouch}
				onPress={() => { this.cardPressedSub(item, index,catItem)}}>
				<View style={{ width: '50%', justifyContent: 'center', paddingTop: 5 }}>
					<View style={{ paddingLeft: 30, alignItems: 'flex-start', }}>
						<TextBold
							title={item.name}
							textStyle={{ color: "#777777", fontSize: 13 }} />

					</View>
				</View>
			</TouchableOpacity>)
	}

	render() {
		if (this.state.serviceItem == null)
			return null
		else
			return (
				<View style={styles.container}>
					<SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
					<MyStatusBar title={this.state.serviceItem.name} goback={() => this.onBackClick()} />
					<View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>

						<FlatList
							data={this.state.serviceItem.category}
							extraData={this.state.toggle}
							keyExtractor={item => item.id}
							// ListHeaderComponent={this.renderHeader}
							renderItem={({ item, index }) => (
								this.renderFlatListItem({ item, index })
							)} />


					</View>

				</View>
			);
	}
}