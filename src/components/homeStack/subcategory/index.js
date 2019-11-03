import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { TextBold, TextHeading } from '../../custom/text';
import { Constants, Images } from '../../../utils';
import { AppMainData } from '../../../utils/appMainData'
import MyStatusBar from '../../custom/my-status-bar'
import styles from './style'
import Ripple from 'react-native-material-ripple';
import NavigationService from '../../../services/NavigationServices';

export default class Subcategory extends Component {
	static navigationOptions = {
		// title: 'Please sign in',
		header: null //hide the header
	};

	constructor(props) {
		super(props)
		this.state = {
			selectedService: null,
			selectedCategory: null,
			subcategory: null,
			selectedSubCategory: null,
		}
	}
	componentDidMount() {
		const { navigation } = this.props;
		const navigateFrom = navigation.getParam('navigateFrom', '');
		const data = navigation.getParam('selectedItems', '');

		if (navigateFrom == "Category") {
			this.setState({
				selectedService: data.selectedService,
				selectedCategory: data.selectedCategory,
				subcategory: data.selectedSubCategory,
			})
		}
	}
	onBackClick = () => {

		const { navigation } = this.props;
		navigation.goBack();
	}

	cardPressed(item, index) {

		NavigationService.navigate('SelectionScreen', {
			navigateFrom: "Category",
			selectedItems: {
				selectedService: this.state.selectedService,
				selectedCategory: this.state.selectedCategory,
				selectedSubCategory: item
			}
		})
	}



	renderFlatListItem({ item, index }) {
		return (
			<Ripple
				style={styles.flatListTouch}
				onPress={() => { this.cardPressed(item, index) }}>
				<Image source={item.img ? { uri:Constants.URL.baseURL + Constants.URL.assets + Constants.URL.img +  item.img } : Images.shallymaid_logo}
					style={{ width: 50, height: 50 ,resizeMode:'contain'}} />
				<View style={{ paddingLeft: 15, }}>
					<TextBold
						title={item.name}
						textStyle={{ fontSize: 14 }} />
				</View>
			</Ripple>
		)
	}




	render() {
		if (this.state.selectedCategory == null)
			return null
		else
			return (
				<View style={styles.container}>
					<SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
					<MyStatusBar title={this.state.selectedCategory.name} goback={() => this.onBackClick()} />
					<View style={{ flex: 1, paddingBottom: 10 }}>
						<View style={{ flexDirection: 'row', width: '100%' }}>

							<View style={{ width: '70%', padding: 10 }}>

								<TextHeading style={{ color: 'black', fontWeight: '700' }} title={"What are you looking for ?"} />
								<FlatList
									data={this.state.subcategory}
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

				</View >
			);
	}
}