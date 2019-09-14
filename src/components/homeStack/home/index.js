import React, { Component } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, AsyncStorage, FlatList, TouchableOpacity, TouchableHighlight, ImageBackground } from 'react-native';
import { TextBold } from '../../custom/text'
import { SafeAreaView } from 'react-navigation';
import { Constants, Images,GlobalStyle } from '../../../utils';
import MyStatusBar from '../../custom/my-status-bar'
import Carousel from 'react-native-looped-carousel';
import { connect } from 'react-redux'
import { isLoginAction, userDataAction } from '../../../redux/actions/userData'
import styles from './style';
import NavigationService from '../../../services/NavigationServices';
import { serviceListApi } from '../../../services/APIService'

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
							title={item.name}
							textStyle={{ color: "#555555", fontSize: 14 }} />
						<TextBold
							title={item.description}
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
				<MyStatusBar title="Home" />
				<View style={{ flex: 1 }}>
					<View style={{ marginTop: 10, marginBottom: 10 }}>
						{this.state.data.length > 0 ?
							<Carousel
								delay={5000}
								style={{ width: Constants.Screen.width, height: 160 }}
								autoplay
							>
								{this.state.data.map((item, index) => this._renderItem(item, index))}
							</Carousel> : null}
					</View>
					{<FlatList
						data={this.state.serviceList}
						keyExtractor={item => item.id}
						// ListHeaderComponent={this.renderHeader}
						renderItem={({ item, index }) => (
							this.renderFlatListItem({ item, index })
						)} />}


				</View>
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