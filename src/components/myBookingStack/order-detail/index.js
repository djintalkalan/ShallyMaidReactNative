import React, { Component } from 'react';
import { View, ActivityIndicator, Image, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import MyStatusBar from '../../custom/my-status-bar'
import { connect } from 'react-redux'
import styles from './style'
import { Constants, Images, GlobalStyle, strings } from '../../../utils';
import { TextHeading, TextLite, TextRegular, } from '../../custom/text'
import Ripple from 'react-native-material-ripple';
import NavigationService from '../../../services/NavigationServices';
import { getMyOrderApi } from '../../../services/APIService'
import { ScrollView } from 'react-native-gesture-handler';

class OrderDetail extends Component {
	static navigationOptions = {
		// title: 'Please sign in',
		header: null, //hide the header
		tabBarVisible: false,
	};

	constructor(props) {
		super(props)
		this.state = {
			orderObject: null,
		}
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
	componentDidMount() {
		const { navigation } = this.props;
		const navigateFrom = navigation.getParam('navigateFrom', '');
		const orderObject = navigation.getParam('orderObject', '');
		if (navigateFrom == "MyOrders") {
			this.setState({
				orderObject: orderObject
			})
		}
	}
	render() {
		if (!this.props.isLogin) {
			return null
		}
		let item = this.state.orderObject
		return (
			<View style={styles.container}>
				<SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
				<MyStatusBar title={"Order Detail"} goback={() => this.onBackClick()} />
				<ScrollView style={{ flex: 1 }}>
					<View style={{ flex: 1, padding: 15 }}>
						{item == null ? null :
							<Ripple
								style={styles.mainCard}
								//onPress={() => { this.cardPressed(item, index) }}
								rippleColor={Constants.color.black}>
								<View style={{ flexDirection: 'row', margin: 10, padding: 4, alignItems: 'center' }}>
									<TextHeading title={"Service Name"} textStyle={styles.textItemName} />
									<TextHeading ellipsizeMode={'tail'} title={item.selectedService.name} textStyle={styles.textItemValue} />
								</View>
								<View style={{ width: '100%', height: 0.8, backgroundColor: "#bfbfbf" }} />


								<View style={{ flexDirection: 'row', margin: 10, padding: 4, alignItems: 'center' }}>
									<TextHeading title={"Category Name"} textStyle={styles.textItemName} />
									<TextHeading ellipsizeMode={'tail'} title={item.selectedCategory.name + (item.selectedSubcategory == null ? "" : "-" + item.selectedSubcategory.name)}
										textStyle={styles.textItemValue} />
								</View>
								<View style={{ width: '100%', height: 0.8, backgroundColor: "#bfbfbf" }} />


								<View style={{ flexDirection: 'row', margin: 10, padding: 4, alignItems: 'center' }}>
									<TextHeading title={"Order Number"} textStyle={styles.textItemName} />
									<TextHeading ellipsizeMode={'tail'} title={item.order_number}
										textStyle={styles.textItemValue} />
								</View>
								<View style={{ width: '100%', height: 0.8, backgroundColor: "#bfbfbf" }} />

								<View style={{ flexDirection: 'row', margin: 10, padding: 4, alignItems: 'center' }}>
									<TextHeading title={"Availability"} textStyle={styles.textItemName} />
									<TextHeading ellipsizeMode={'tail'} title={item.req_type}
										textStyle={styles.textItemValue} />
								</View>
								<View style={{ width: '100%', height: 0.8, backgroundColor: "#bfbfbf" }} />


								{item.booking_date ? <><View style={{ flexDirection: 'row', margin: 10, padding: 4, alignItems: 'center' }}>
									<TextHeading title={"Date of Availability"} textStyle={styles.textItemName} />
									<TextHeading ellipsizeMode={'tail'} title={item.booking_date}
										textStyle={styles.textItemValue} />
								</View>
									<View style={{ width: '100%', height: 0.8, backgroundColor: "#bfbfbf" }} /></> : null}


								{item.family_member ? <><View style={{ flexDirection: 'row', margin: 10, padding: 4, alignItems: 'center' }}>
									<TextHeading title={"Number of Family Members"} textStyle={styles.textItemName} />
									<TextHeading ellipsizeMode={'tail'} title={item.family_member}
										textStyle={styles.textItemValue} />
								</View>
									<View style={{ width: '100%', height: 0.8, backgroundColor: "#bfbfbf" }} /></> : null}

								<View style={{ flexDirection: 'row', margin: 10, padding: 4, alignItems: 'center' }}>
									<TextHeading title={"Alternate Number"} textStyle={styles.textItemName} />
									<TextHeading ellipsizeMode={'tail'} title={item.alternate_number}
										textStyle={styles.textItemValue} />
								</View>
								<View style={{ width: '100%', height: 0.8, backgroundColor: "#bfbfbf" }} />

								<View style={{ flexDirection: 'row', margin: 10, padding: 4, alignItems: 'center' }}>
									<TextHeading title={"Address"} textStyle={styles.textItemName} />
									<TextHeading ellipsizeMode={'tail'} title={item.address}
										textStyle={styles.textItemValue} />
								</View>
								<View style={{ width: '100%', height: 0.8, backgroundColor: "#bfbfbf" }} />

								<View style={{ flexDirection: 'row', margin: 10, padding: 4, alignItems: 'center' }}>
									<TextHeading title={"Placed on"} textStyle={styles.textItemName} />
									<TextHeading ellipsizeMode={'tail'} title={item.addedon}
										textStyle={styles.textItemValue} />
								</View>
								<View style={{ width: '100%', height: 0.8, backgroundColor: "#bfbfbf" }} />

								<View style={{ flexDirection: 'row', margin: 10, padding: 4, alignItems: 'center' }}>
									<TextHeading title={"Status"} textStyle={styles.textItemName} />
									<TextHeading ellipsizeMode={'tail'} title={this.calculateStatus(item.status)}
										textStyle={styles.textAmountProcessing} />
								</View>



							</Ripple>}

					</View>
				</ScrollView>{this.renderProgressBar()}
			</View >
		);
	}
}

function mapStateToProps(state) {
	return {
		userData: state.userData,
		isLogin: state.isLogin,
	}
}

export default connect(mapStateToProps, {})(OrderDetail)