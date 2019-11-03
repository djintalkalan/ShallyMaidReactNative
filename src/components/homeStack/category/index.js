import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { TextBold, TextHeading } from '../../custom/text';
import { Constants, Images } from '../../../utils';
import { AppMainData } from '../../../utils/appMainData'
import MyStatusBar from '../../custom/my-status-bar'
import styles from './style'
import Ripple from 'react-native-material-ripple';
import NavigationService from '../../../services/NavigationServices';

let vis = [];
export default class Category extends Component {
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

	cardPressed(item) {
		console.log("SUBCAS", JSON.stringify(item))

		NavigationService.navigate(item.subcategory && item.subcategory.length > 0 ? 'Subcategory' : 'SelectionScreen', {
			navigateFrom: "Category",
			selectedItems: {
				selectedService: this.state.serviceItem,
				selectedCategory: item,
				selectedSubCategory: item.subcategory
			}
		})

	}



	renderFlatListItem({ item, index }) {
		return (
			<Ripple
				style={styles.flatListTouch}
				onPress={() => { this.cardPressed(item, index) }}>
				<Image source={item.img ? { uri:Constants.URL.baseURL + Constants.URL.assets + Constants.URL.img + item.img } : Images.shallymaid_logo}
					style={{ width: 50, height: 50,resizeMode:'contain' }} />

				<View style={{ paddingLeft: 15, }}>
					<TextBold
						title={item.name}
						textStyle={{ fontSize: 14 }} />

				</View>
			</Ripple>
		)
	}


	render() {
		if (this.state.serviceItem == null)
			return null
		else
			return (
				<View style={styles.container}>
					<SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
					<MyStatusBar title={this.state.serviceItem.name} goback={() => this.onBackClick()} />
					<View style={{
						flex: 1, paddingBottom: 10,
						backgroundColor: "#f0f0f0"
					}}>
						<View style={{ flexDirection: 'row', width: '100%' }}>

							<View style={{ width: '70%', padding: 10 }}>

								<TextHeading style={{ color: 'black', fontWeight: '700' }} title={"What are you looking for ?"} />
								<FlatList
									data={this.state.serviceItem.category}
									extraData={this.state.toggle}
									keyExtractor={item => item.id}
									renderItem={({ item, index }) => (
										this.renderFlatListItem({ item, index })
									)} />
							</View>


							<View style={{ width: '30%' }}>
								<Image source={Images.ic_thinking} resizeMode={'contain'} style={{ height: '60%', width: '100%' }} />
							</View>

						</View>



					</View>




				</View>

			);
	}
}