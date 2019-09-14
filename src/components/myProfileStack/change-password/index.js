import React, { Component } from 'react';
import { View, ActivityIndicator, Image, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { TextBold } from '../../custom/text'
import MyStatusBar from '../../custom/my-status-bar'
import { connect } from 'react-redux'
import styles from './style'
import { Constants, Images, GlobalStyle, strings } from '../../../utils';
import NavigationService from '../../../services/NavigationServices';
import { updatePasswordApi } from '../../../services/APIService'

class ChangePassword extends Component {
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
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
			isLoading: false
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

	callUpdatePasswordApi() {

		const param = {
			cust_phone: this.props.userData.cust_phone,
			cust_password: this.state.oldPassword,
			cust_newpassword: this.state.newPassword
		}

		this.setState({
			isLoading: true,
		})

		let url = Constants.URL.baseURL + '/' + Constants.URL.vesrion + '/' + Constants.URL.updatePassword

		updatePasswordApi(url, param).then(res => {

			if (res && res.success) {
				this.setState({
					isLoading: false,
					oldPassword: "",
					newPassword: "",
					confirmPassword: ""
				}, () => {
					if (res.data) {
						alert(res.data)
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
	_verifyAndChange = () => {
		if (this.state.oldPassword == "") {
			alert(strings.old_password_error)
			return
		}
		if (this.state.oldPassword.length < 6) {
			alert(strings.valid_password_error)
			return
		}
		if (this.state.newPassword == "") {
			alert(strings.new_password_error)
			return
		}
		if (this.state.newPassword.length < 6) {
			alert(strings.valid_password_error)
			return
		}
		if (this.state.confirmPassword == "") {
			alert(strings.confirm_pass_error)
			return
		}
		if (this.state.newPassword != this.state.confirmPassword) {
			alert(strings.conform_password_error)
			return
		}

		this.callUpdatePasswordApi()
	}
	render() {
		if (!this.props.isLogin) {
			return null
		}
		return (
			<View style={styles.container}>
				<SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
				<MyStatusBar title={strings.change_password} goback={() => this.onBackClick()} />
				<View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingHorizontal: 5 }}>

					{/*old Password Field*/}
					<View style={{
						flexDirection: 'row',
						borderRadius: 5,
						margin: 35,
						marginBottom: 0,
						borderColor: Constants.color.primary, borderWidth: 1
					}}>
						<View style={{
							width: '40%',
							padding: 8,
							borderRightWidth: 1,
							alignItems: 'center',
							justifyContent: 'center',
							borderRightColor: Constants.color.primary
						}}>
							<TextBold title={"Old Password"} textStyle={{}} />
						</View>
						<View style={{
							width: '60%',
						}}>
							<TextInput style={{ width: '100%', }}
								placeholder={"Enter here"}
								selectionColor={Constants.color.primary}
								secureTextEntry={true}
								value={this.state.oldPassword}
								onChangeText={(text) => this.setState({ oldPassword: text })}
							/>
						</View>
					</View>
					{/*End old Password Field*/}

					{/*new Password Field*/}
					<View style={{
						flexDirection: 'row',
						borderRadius: 5,
						margin: 35,
						marginBottom: 0,
						marginTop: 10,
						borderColor: Constants.color.primary, borderWidth: 1
					}}>
						<View style={{
							width: '40%',
							padding: 8,
							borderRightWidth: 1,
							alignItems: 'center',
							justifyContent: 'center',
							borderRightColor: Constants.color.primary
						}}>
							<TextBold title={"New Password"} textStyle={{}} />
						</View>
						<View style={{
							width: '60%',
						}}>
							<TextInput style={{ width: '100%', }}
								placeholder={"Enter here"}
								selectionColor={Constants.color.primary}
								secureTextEntry={true}
								value={this.state.newPassword}
								onChangeText={(text) => this.setState({ newPassword: text })}
							/>
						</View>
					</View>
					{/*End new Password Field*/}

					{/*Confirn Password Field*/}
					<View style={{
						flexDirection: 'row',
						borderRadius: 5,
						margin: 35,
						marginBottom: 0,
						marginTop: 10,
						borderColor: Constants.color.primary, borderWidth: 1
					}}>
						<View style={{
							width: '40%',
							padding: 8,
							borderRightWidth: 1,
							alignItems: 'center',
							justifyContent: 'center',
							borderRightColor: Constants.color.primary
						}}>
							<TextBold title={"Confirm Password"} textStyle={{}} />
						</View>
						<View style={{
							width: '60%',
						}}>
							<TextInput style={{ width: '100%', }}
								placeholder={"Enter here"}
								selectionColor={Constants.color.primary}
								secureTextEntry={true}
								value={this.state.confirmPassword}
								onChangeText={(text) => this.setState({ confirmPassword: text })}
							/>
						</View>
					</View>
					{/*End confirm Password Field*/}

					{/*button Field*/}


					<TouchableOpacity
						onPress={() => {
							this._verifyAndChange();
						}}
						style={styles.touchLogin}>
						<TextBold title={strings.change_password} textStyle={styles.textButtonLogin} />
					</TouchableOpacity>


					{/*End Button Field*/}
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

export default connect(mapStateToProps, {})(ChangePassword)