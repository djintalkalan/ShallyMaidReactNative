import React, { Component } from 'react';
import { View, Image, ActivityIndicator, AsyncStorage, FlatList, TouchableOpacity, TouchableHighlight, ImageBackground } from 'react-native';
import { TextBold, TextRegular, TextHeading } from '../../custom/text'
import { SafeAreaView } from 'react-navigation';
import { Constants, Images, GlobalStyle } from '../../../utils';
import MyStatusBar from '../../custom/my-status-bar'
import Carousel from 'react-native-looped-carousel';
import { connect } from 'react-redux'
import { isLoginAction, userDataAction } from '../../../redux/actions/userData'
import styles from './style';
import Ripple from 'react-native-material-ripple';
import CardView from 'react-native-cardview'
import NavigationService from '../../../services/NavigationServices';
import { serviceListApi } from '../../../services/APIService'
import { ScrollView } from 'react-native-gesture-handler';

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
		AsyncStorage.getItem(Constants.STORAGE_KEY.userData, (error, result) => {
			if (error) {
				console.log("ERROR:" + JSON.stringify(error))
			}
			else {
				if (result) {
					console.log("USER_DATA_RESULT:" + result)
					result = JSON.parse(result)
					this.props.userDataAction(result)
				}
			}
		})

		AsyncStorage.getItem(Constants.STORAGE_KEY.isLogin, (error, result) => {
			if (error) {
				console.log("ERROR:" + JSON.stringify(error))
			}
			else {
				if (result) {
					console.log("USER_DATA_RESULT:" + result)
					result = JSON.parse(result)
					this.props.isLoginAction(result)
				}
			}
		})

		this.setState({ data: dat })
		this.callServiceListApi()
	}

	constructor(props) {
		super(props)

		this.state = {
			username: '',
			password: '',
			data: [],
			serviceList: [],
			isLoading: false,
		}
	}

	cardPressed(item, index) {
		NavigationService.navigate('SecondHome', { navigateFrom: "Home", data: item })
	}

	_renderItem(item, index) {
		return (
			<TouchableOpacity
				activeOpacity={0.85}
				onPress={() => { }}
				style={{
					width: Constants.Screen.width, height: 160, alignItems: "center", justifyContent: 'flex-start'
					, elevation: 3, overflow: 'hidden',
				}}>

				<Image source={{ uri: item }}
					style={{
						width: Constants.Screen.width - 20,
						height: 160,
						borderRadius: 5,
						resizeMode: 'cover',

					}} />
			</TouchableOpacity>
		);
	}

	renderFlatListItem() {
		return (
			this.state.serviceList.map((item, index) => (

				<ImageBackground
					imageStyle={{ borderRadius: 10 }}
					source={{ uri: Constants.URL.baseURL + Constants.URL.assets + Constants.URL.img + item.img }}
					resizeMode={"cover"}
					style={{ marginHorizontal: 15, marginVertical: 10 }}>
					<Ripple
						style={styles.flatListTouch}
						onPress={() => { this.cardPressed(item, index) }}
						rippleColor={Constants.color.black}>

						<View style={{ width: '100%', height: 110, justifyContent: 'flex-end', padding: 15 }}>
							<View style={{ alignItems: 'flex-start' }}>
								<TextHeading
									title={item.name}
									textStyle={{ fontSize: 12, color: Constants.color.white }} />
								<TextRegular
									title={item.description}
									textStyle={{ fontSize: 9, color: Constants.color.white }} />
							</View>
						</View>

					</Ripple>
				</ImageBackground>))
		)
	}


	renderGridViewItems() {
		let serviceList = this.state.serviceList;

		// let matrix = [], i, k;

		// for (i = 0, k = -1; i < serviceList.length; i++) {
		// 	if (i % 3 === 0) {
		// 		k++;
		// 		matrix[k] = [];
		// 	}
		// 	matrix[k].push(serviceList[i]);
		// }

		// return matrix.map((row, index) => (
		// 	<View style={{width:"100%"}}>

		// 	</View>
		// ));




	}

	callServiceListApi() {


		this.setState({
			isLoading: true,
		})
		let url = Constants.URL.baseURL + '/' + Constants.URL.vesrion + '/' + Constants.URL.serviceList

		serviceListApi(url).then(res => {

			if (res && res.success) {
				console.log("DEALS_RESPONSE:" + JSON.stringify(res))
				this.setState({
					isLoading: false,
					serviceList: res.data
				})

			} else {
				this.setState({
					isLoading: false,
				}, () => {
					if (res && res.error) {
						alert(res.error)
					}
				})
			}

		}).catch(err => {
			this.setState({
				isLoading: false,
			})
			setTimeout(() => {
				if (err) {
					alert(JSON.stringify(err));
				}
			}, 100);
		});

	}

	renderProgressBar() {
		if (this.state.isLoading) {
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
		} else {
			return
		}

	}

	render() {
		return (
			<View style={styles.container}>
				<SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
				<ScrollView>
					<View>
						<MyStatusBar title="Home" />
						<View style={{ flex: 1 }}>

							<TextHeading title="Current Offers" textStyle={{ fontSize: 12, padding: 15 }} />

							<View style={{}}>
								{this.state.data.length > 0 ?
									<Carousel
										delay={5000}
										style={{ width: Constants.Screen.width, height: 160 }}
										autoplay
									>
										{this.state.data.map((item, index) => this._renderItem(item, index))}
									</Carousel> : null}
							</View>
							<TextHeading title="Services" textStyle={{ fontSize: 12, padding: 15, paddingBottom: 5 }} />
							<View >
								{this.renderFlatListItem()}
							</View>
							<View >
								<CardView
									style={{
										margin: 15,
										backgroundColor: '#bfbfbf',
										borderColor: "white",
									}}
									cornerRadius={7}
									borderColor={"white"}
									cardElevation={2}>
									<FlatList
										data={this.state.serviceList}
										renderItem={({ item }) => (
											<View style={{
												flex: 1,
												height: 120,
												backgroundColor: "white",
												margin: 0.3
											}}>
												<Ripple style={{width:'100%',height:'100%',
												flexDirection: 'column',
												alignItems: 'center',
												justifyContent: 'center',}}>
												<Image style={styles.imageThumbnail}
													source={{ uri: Constants.URL.baseURL + Constants.URL.assets + Constants.URL.icons + item.icon }} />
												<TextBold  title={item.name} textStyle={{ fontSize: 10, textAlign: 'center', padding: 5 }} />
												</Ripple>
											</View>
										)}
										//Setting the number of column
										numColumns={3}
										keyExtractor={(item, index) => index.toString()}
									/>
								</CardView>
							</View>

						</View>
					</View>
				</ScrollView>
				{this.renderProgressBar()}
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		userData: state.userData,
		isLogin: state.isLogin,
	}
}

export default connect(mapStateToProps, { userDataAction, isLoginAction })(Home)