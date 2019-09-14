import React, { Component } from 'react';
import { View, Alert, AsyncStorage, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { TextBold } from '../../custom/text'
import MyStatusBar from '../../custom/my-status-bar'
import styles from './style'
import { connect } from 'react-redux'
import { Constants, strings, GlobalStyle, Images } from '../../../utils'
import { isLoginAction ,userDataAction} from '../../../redux/actions/userData'
import NavigationService from '../../../services/NavigationServices';


class MyProfile extends Component {
	static navigationOptions = {
		// title: 'Please sign in',
		header: null //hide the header
	};

	constructor(props) {
		super(props)
		this.state = {
		
			loading: false,
			data:[{
				id: 1,
				title: 'Change Password'
			},
			{
				id: 2,
				title: 'My Orders'
			},
			{
				id: 3,
				title: 'Log Out'
			},

		]
		}
	}

	cardPressed(item,index){
		switch(index){
			case 0:
				NavigationService.navigate('ChangePassword')
				break;
				case 1:
				break;
				case 2:
					this.showLogoutAlert();
				break;

		}
	}


	renderFlatListItem({ item, index }) {
		return (
			<TouchableOpacity
				style={styles.flatListTouch}
				onPress={() => { this.cardPressed(item, index) }}>
				<View style={{ width: '50%', justifyContent: 'center', padding: 15 }}>
					<View style={{ paddingLeft: 15, alignItems: 'flex-start', }}>
						<TextBold
							title={item.title}
							textStyle={{ color: "#555555", fontSize: 14 }} />

					</View>
				</View>

			</TouchableOpacity>
		)
	}

	onLogoutAlertClick = () => {
		AsyncStorage.clear();
		this.props.isLoginAction(false)
		this.props.userDataAction(null)
		NavigationService.navigate("LoginStack")
		alert("Succefully Logged out")
	  }
	
	  showLogoutAlert = () => {
		Alert.alert(
		  strings.logout_dialog_title,
		  strings.logout_dialog_message,
		  [
			//   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
			{
			  text: strings.cancel,
			  onPress: () => console.log('Cancel Pressed'),
			  style: 'cancel',
			},
			{
			  text: strings.ok,
			  onPress: () => this.onLogoutAlertClick()
			},
		  ],
		  { cancelable: false },
		);
	  }
	

	render() {
		if(!this.props.isLogin){
            return null
        }
		return (
			<View style={styles.container}>
				<SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
				<MyStatusBar title={"Profile"} />
				<View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingHorizontal: 25 }}>

					<View style={{ flexDirection: 'row', width: '100%' }} >
						<TextBold title={"Name:"} textStyle={{ padding: 2, width: '30%' }} />
						<TextBold title={this.props.userData.cust_name}
							textStyle={{ color: '#808080', padding: 2 }} />
					</View>
					<View style={{ flexDirection: 'row', width: '100%' }} >
						<TextBold title={"Phone:"} textStyle={{ padding: 2, width: '30%' }} />
						<TextBold title={this.props.userData.cust_phone}
							textStyle={{ color: '#808080', padding: 2 }} />
					</View>

					<View style={{ width: '100%', height: 1, margin: 10,alignSelf:'center', backgroundColor: Constants.color.primary }} />

					<FlatList
					    style={{marginTop:2}}
						data={this.state.data}
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

function mapStateToProps(state) {
    return {
        userData: state.userData,
        isLogin: state.isLogin,
    }
}

export default connect(mapStateToProps, {isLoginAction,userDataAction})(MyProfile)