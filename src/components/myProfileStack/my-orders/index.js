import React, { Component } from 'react';
import { View, ActivityIndicator, Image, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import MyStatusBar from '../../custom/my-status-bar'
import { connect } from 'react-redux'
import styles from './style'
import { Constants, Images, GlobalStyle, strings } from '../../../utils';
import { TextBold, TextLite, TextRegular, } from '../../custom/text'
import NavigationService from '../../../services/NavigationServices';
import { getMyOrderApi } from '../../../services/APIService'

class MyOrders extends Component {
	static navigationOptions = {
		// title: 'Please sign in',
		header: null, //hide the header
		tabBarVisible: false,
	};

	constructor(props) {
		super(props)
		this.state = {
			// username: 'khushal.pahuja@enukesoftware.com',
			// password: '1234567',
			currentPage: -10,
			totalPages: -10,
			isLoading: false,
			orderList: null,
		}
	}

	componentDidMount() {
		this.callInitMyOrdersApi();
	}

	onBackClick = () => {
		const { navigation } = this.props;
		navigation.goBack();
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

	callInitMyOrdersApi() {

		const param = {
			"id": this.props.userData.id,
			"limit": 7,
			"currentpage": 1
		}

		this.setState({
			isLoading: true,
		})

		let url = Constants.URL.baseURL + '/' + Constants.URL.vesrion + '/' + Constants.URL.getOrderList

		getMyOrderApi(url, param).then(res => {

			if (res && res.success) {
				this.setState({
					isLoading: false,
					orderList: res.data,
					currentPage: res.currentPage,
					totalPages: res.totalPages
				}, () => {
					if (res.data) {
						//console.log('PAGINATION',JSON.stringify(res))

					}
				})
			} else {
				this.setState({
					isLoading: false,
				})
				if (res && res.error) {
					alert(res.error)
				}
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

	callgetMyOrdersApi() {
		let currentPage;
		if (this.state.currentPage != -10) {
			if (this.state.currentPage && this.state.totalPages && !(this.state.currentPage === this.state.totalPages)) {
				currentPage = (parseInt(this.state.currentPage) + 1)
			} else return
		} else return

		const param = {
			id: this.props.userData.id,
			limit: 7,
			currentpage: currentPage
		}

		this.setState({
			isLoading: true,
		})

		let url = Constants.URL.baseURL + '/' + Constants.URL.vesrion + '/' + Constants.URL.getOrderList

		getMyOrderApi(url, param).then(res => {

			if (res && res.success && res.data) {

				this.setState(prevState => ({
					orderList: [...prevState.orderList, ...res.data],
					orderLoaderIsVisible: false,
					isLoading: false,
					currentPage: res.currentPage,
					totalPages: res.totalPages
				}), () => {
					console.log('PAGI', JSON.stringify(this.state.orderList))
				})
			} else {
				this.setState({
					isLoading: false,
				})
				if (res && res.error) {
					alert(res.error)
				}
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

	calculateStatus(id) {
		switch (parseInt(id)) {
			case Constants.ORDER_STATUS.processing_1:
				return strings.processing
			case Constants.ORDER_STATUS.preparing_2:
				return "Seen"
			case Constants.ORDER_STATUS.preparing_3:
				return "Proccessed"
		}
	}
	renderFlatListItem({ item, index }) {
		console.log("ITEM", JSON.stringify(item))
		return (
			<TouchableOpacity style={styles.mainCard}
			//onPress={() => this.orderClicked(item.order_number, index)}
			>
				{/* View For Image and Items*/}
				<View style={{ flexDirection: 'row' }}>
					{/* View For Image */}
					<View style={styles.viewImg}>
						<Image source={item.selectedService.img
							? { uri: item.selectedService.img } : Images.maid}
							resizeMode='contain'
							style={styles.imgLogo} ></Image>
					</View>
					{/* View For Items */}
					<View style={styles.viewItems}>
						<View style={styles.viewInputRow}>
							<View style={{ width: "100%" }}>
								<TextBold title={"Service: " + item.selectedService.name} textStyle={styles.textItemName} />
							</View>
						</View>
						<TextRegular title={
							"Category: " + item.selectedCategory.name + (item.selectedSubcategory == null ? "" : "-" + item.selectedSubcategory.name)
						} textStyle={styles.textItems} />
						<TextRegular title={strings.dateString + ": " + item.addedon} textStyle={styles.textItems} />

						<TextRegular title={"Order number: " + item.order_number} textStyle={styles.textItems} />

					</View>
				</View>
				{/* View For Buttons */}
				<View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'flex-end' }}>
					{/* Button Status */}
					<View style={styles.buttonStatus}   >
						<TextBold title={this.calculateStatus(item.status)} textStyle={styles.textAmountProcessing} />
					</View>
				</View>
			</TouchableOpacity>

		)
	}

	render() {
		if (!this.props.isLogin) {
			return null
		}
		return (
			<View style={styles.container}>
				<SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
				<MyStatusBar title={strings.my_orders} goback={() => this.onBackClick()} />
				<View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingHorizontal: 5 }}>
					{this.state.orderList == null?null:
					<FlatList
						// onRefresh={this.mRefresh}
						// refreshing={this.state.isRefreshing}
						data={this.state.orderList}
						keyExtractor={item => item.order_number}
						// ListHeaderComponent={this.renderHeader}
						onEndReached={() => { this.callgetMyOrdersApi() }}
						onEndReachedThreshold={0.1}
						renderItem={({ item, index }) => this.renderFlatListItem({ item, index })} />}

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

export default connect(mapStateToProps, {})(MyOrders)