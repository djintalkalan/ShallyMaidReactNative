import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { TextBold, TextHeading, TextRegular } from '../../custom/text';
import { Constants, Images, strings } from '../../../utils';
import { AppMainData } from '../../../utils/appMainData'
import MyStatusBar from '../../custom/my-status-bar'
import styles from './style'
import Ripple from 'react-native-material-ripple';
import NavigationService from '../../../services/NavigationServices';
import { selectedTabAction } from '../../../redux/actions/selectedTab'
import { connect } from 'react-redux'

class OrderConfirmation extends Component {
	static navigationOptions = {
		// title: 'Please sign in',
		header: null //hide the header
	};

	constructor(props) {
		super(props);
		this.state = {
			succesfull: true,
			key: ""
		}
	}
	componentDidMount() {
		const { navigation } = this.props;
		this.props.selectedTabAction(true)

		//console.log('addessJson:'+navigateFrom)

		let key = navigation.getParam('KEY', '');
		// console.log('addessJson:' + JSON.stringify(key))
		this.setState({
			key: key
		})


	}
	onBackClick = () => {

		const { navigation } = this.props;
		navigation.goBack();
	}






	render() {
		if (this.state.key == null)
			return null
		else
			return (
				<View style={styles.container}>
					<SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
					<MyStatusBar title={"Order Confirmation"} goback={() => this.onBackClick()} />
					<View style={{ flex: 1, paddingBottom: 10, margin: 35 }}>
						<View style={{ flex: 2.5, width: '100%', alignItems: "center" }}>
							<Image
								resizeMode='contain' style={{ width: '100%', height: '100%' }}
								source={Images.ic_deliveryman}></Image>
						</View>

						<View style={{ flex: 7.5 }}>

							<TextBold title={strings.order_text} textStyle={styles.textConfirmation} />
							<View style={styles.viewText}>
								<TextRegular title={strings.ordercode_text} textStyle={styles.textLine} />
								<TextBold title={this.state.key == "" ? null : this.state.key.data.order_number} textStyle={styles.textData} />
							</View>
							<View style={styles.viewText}>
								<TextRegular title={strings.orderreceive_text} textStyle={styles.textLine} />

							</View>

							<TextRegular title={strings.enquiry_text} textStyle={styles.textContact} />
							<View style={styles.viewEmailRow}>
								<Image source={Images.ic_email} style={styles.iconLeft}></Image>
								<TextRegular title={"kajkjsd@jf.com"} textStyle={styles.textEmail} />
							</View>
							<View style={styles.viewEmailRow}>
								<Image source={Images.phone} style={styles.iconLeft}></Image>
								<TextRegular title={"9588558818"} textStyle={styles.textEmail} />
							</View>

							<TouchableOpacity
								onPress={() => {
									this.props.navigation.navigate("Home")
								}}
								style={styles.touchOpacity}>
								<TextRegular title={strings.ok} textStyle={styles.textButtonAdd} />
							</TouchableOpacity>
						</View>


					</View>

				</View >
			);
	}
}

function mapStateToProps(state) {
	return {
		selectedTab: state.selectedTab,
	}
}

export default connect(mapStateToProps, { selectedTabAction })(OrderConfirmation)