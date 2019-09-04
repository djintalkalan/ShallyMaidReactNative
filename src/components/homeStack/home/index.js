import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, FlatList, TouchableOpacity, TouchableHighlight, ImageBackground } from 'react-native';
import { TextBold } from '../../custom/text'
import { SafeAreaView } from 'react-navigation';
import { Constants, Images } from '../../../utils';
import MyStatusBar from '../../custom/my-status-bar'
import Carousel from 'react-native-looped-carousel';
import styles from './style';
import NavigationService from '../../../services/NavigationServices';
import {AppMainData} from '../../../utils/appMainData'


class Home extends Component {
	static navigationOptions = {
		// title: 'Please sign in',
		header: null //hide the header
	};

	componentDidMount() {
		let dat = []
		for (let i = 0; i < 10; i++) {
			dat.push('http://homepages.cae.wisc.edu/~ece533/images/monarch.png');
			if (i == 9) {
				//alert(dat[9])
			}
		}
		this.setState({ data: dat })
	}

	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			loading: false,
			data: [],
			}
	}

	cardPressed(item, index) {
		console.log("Cardf" + item.title)
		NavigationService.navigate('SecondHome', { navigateFrom: "Home", data: item })
	}

	_renderItem(item, index) {
		return (
			<TouchableOpacity

				onPress={() => { }}
				style={{
					width: Constants.Screen.width, height: 140, alignItems: "center", justifyContent: 'flex-start'
					, elevation: 3, overflow: 'hidden',
				}}>

				<Image source={{ uri: item }}
					style={{
						width: Constants.Screen.width - 20,
						height: 140,
						borderRadius: 5,
						resizeMode: 'stretch',

					}} />
			</TouchableOpacity>
		);
	}

	renderFlatListItem({ item, index }) {
		return (
			<TouchableOpacity
				style={styles.flatListTouch}
				onPress={() => { this.cardPressed(item, index) }}>
				<View style={{ width: '50%', justifyContent: 'center', paddingLeft: 15 }}>
					<View style={{ alignItems: 'flex-start', }}>
						<TextBold
							title={item.title}
							textStyle={{ color: "#555555", fontSize: 14 }} />
						<TextBold
							title={item.desc}
							textStyle={{ color: "#8B0000", fontSize: 11 }} />
					</View>
				</View>
				<View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
					<Image style={{ width: 18, height: 18, resizeMode: 'contain' }}
						source={Images.ic_arrow_pointing_right_in_circle} />
				</View>
				<View style={{
					width: '40%',
					alignItems: 'flex-end',
				}}>
					<Image style={{
						width: "100%",
						height: Constants.Screen.width * 2 / 5 - 50,
					}}
						resizeMode={"stretch"}
						source={Images.maid} />
				</View>
			</TouchableOpacity>
		)
	}


	render() {
		console.log("Login");
		return (
			<View style={styles.container}>
				<SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
				<MyStatusBar title="Home" />
				<View style={{ flex: 1 }}>
					<View style={{ marginTop: 10, marginBottom: 10 }}>
						{this.state.data.length > 0 ?
							<Carousel
								delay={2000}
								style={{ width: Constants.Screen.width, height: 140 }}
								autoplay
								onAnimateNextPage={(p) => console.log(p)}
							>
								{this.state.data.map((item, index) => this._renderItem(item, index))}
							</Carousel> : null}
					</View>
					{<FlatList
						data={AppMainData}
						keyExtractor={item => item.order_number}
						// ListHeaderComponent={this.renderHeader}
						renderItem={({ item, index }) => (
							this.renderFlatListItem({ item, index })
						)} />}


				</View>

			</View>
		);
	}
}

export default Home 