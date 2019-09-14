import React, { Component } from 'react';
import { View, ActivityIndicator, Image, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { TextBold, TextRegular } from '../../custom/text';
import { Constants, GlobalStyle, strings, Fonts } from '../../../utils';
import { placeOrderApi } from '../../../services/APIService'
import { connect } from 'react-redux'
import NavigationService from '../../../services/NavigationServices'
import MyStatusBar from '../../custom/my-status-bar'
import RadioButton from 'react-native-radio-button'
import styles from './style'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { StackActions, NavigationActions } from 'react-navigation';







class SelectionScreen extends Component {
	static navigationOptions = {
		// title: 'Please sign in',
		header: null //hide the header
	};



	constructor(props) {
		super(props)
		this.state = {
			selectedItems: null,
			isDailySelected: false,
			isOccassionallySelected: false,
			bookingDate: "",
			isDatePickerVisible: false,
			alterPhone: "",
			availibility: "",
			address: "",
			familyMembers: "",
			isLoading: false,
		}
	}
	componentDidMount() {
		const { navigation } = this.props;
		const navigateFrom = navigation.getParam('navigateFrom', '');
		const selectedItems = navigation.getParam('selectedItems', '');
		if (navigateFrom == "SecondHome") {
			this.setState({
				selectedItems: selectedItems
			})
		}
	}

	showDatePicker = () => {
		this.setState({ isDatePickerVisible: true });
	};



	hideDatePicker = () => {
		this.setState({ isDatePickerVisible: false });
	};

	handleDatePicked = date => {
		this.setState({  //bookingDate:date.getFullYear().toString()+"/"+(date.getMonth() + 1).toString()+"/"+date.getDate().toString(),
			bookingDate: moment(date).format('DD-MMM-YYYY')
		})

		this.hideDatePicker();
	};
	onBackClick = () => {

		const { navigation } = this.props;
		navigation.goBack();
	}
	fieldChanged(text) {
		text = text.replace(/\D/g, '');
		this.setState({
			alterPhone: text.trim()
		})
	}

	familyMemberEntered = (text) => {
		text2 = text.replace(/\D/g, '').trim()
		if (text = "") {
			text2 = "0"
		}

		this.setState({
			familyMembers: text2
		})
	}

	addressChanged(text) {

		this.setState({
			address: text
		})
	}

	verifyAndPlace() {



		if (this.state.availibility == "") {
			alert("Please Select Availibility")
			return
		}
		if (this.state.isOccassionallySelected && this.state.bookingDate == "") {
			alert("Please Select Booking Date")
			return
		}
		if (this.state.selectedItems.selectedService.name.toLowerCase().includes("cook") &&
			this.state.selectedItems.selectedCategory.name.toLowerCase().includes("home") && (
				this.state.familyMembers == "" || this.state.familyMembers == "0")) {
			alert("Enter Family member's Count")
		}
		if (this.state.address == "") {
			alert("Please Enter Address")
			return
		}
		if (this.state.alterPhone == "") {
			alert("Please Enter Mobile Number")
			return
		}
		if (this.state.alterPhone.length < 10) {
			alert("Enter Valid Number")
			return
		}

		this.callPlaceOrderApi()


	}

	callPlaceOrderApi() {
		let subcat = this.state.selectedItems.selectedSubCategory ?
			this.state.selectedItems.selectedSubCategory.id : ""

		const param = {
			"customer_id": this.props.userData.id,
			"req_type": this.state.availibility,
			"service_id": this.state.selectedItems.selectedService.id,
			"category_id": this.state.selectedItems.selectedCategory.id,
			"subcategory_id": subcat,
			"booking_date": this.state.bookingDate,
			"family_member": this.state.familyMembers,
			"address": this.state.address,
			"alternate_number": this.state.alterPhone
		}

		this.setState({
			isLoading: true,
		})

		let url = Constants.URL.baseURL + '/' + Constants.URL.vesrion + '/' + Constants.URL.placeOrder

		placeOrderApi(url, param).then(res => {

			if (res && res.success) {
				this.setState({
					isLoading: false,
					isDailySelected: false,
					isOccassionallySelected: false,
					bookingDate: "",
					isDatePickerVisible: false,
					alterPhone: "",
					availibility: "",
					address: "",
					familyMembers: ""

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
		if (this.state.selectedItems == null)
			return null
		else
			return (
				<View style={styles.container}>
					<SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
					<MyStatusBar title={strings.place_request} goback={() => this.onBackClick()} />

					<ScrollView contentInsetAdjustmentBehavior="automatic"
						keyboardShouldPersistTaps='always'>
						<View style={{ flex: 1, padding: 25 }}>

							<View style={{ flexDirection: 'row', width: '100%' }} >
								<TextBold title={"Selected Service:"} textStyle={{ padding: 2, width: '40%' }} />
								<TextBold title={this.state.selectedItems.selectedService.name}
									textStyle={{ color: '#808080', padding: 2 }} />
							</View>

							<View style={{ flexDirection: 'row' }} >
								<TextBold title={"Service Class:"} textStyle={{ padding: 2, width: '40%' }} />
								<TextBold
									title={!this.state.selectedItems.selectedSubCategory ?
										this.state.selectedItems.selectedCategory.name :
										this.state.selectedItems.selectedCategory.name + "-" +
										this.state.selectedItems.selectedSubCategory.name}
									textStyle={{ color: '#808080', padding: 2 }} />
							</View>

							<TextBold title={"Select Availibility:"} textStyle={{ padding: 2, marginTop: 10, }} />

							<View style={{
								flexDirection: 'row',
								alignItems: 'center', width: '100%'
							}} >
								<View style={styles.rowCheckbox}>
									<RadioButton
										outerColor={Constants.color.primary}
										size={10}
										innerColor={Constants.color.primary}
										onPress={() => this.setState({
											isDailySelected: true,
											availibility: "daily",
											isOccassionallySelected: false,
										})}
										isSelected={this.state.isDailySelected}
									/>
									<TextBold title={"Daily"} textStyle={{ padding: 5 }} />
								</View>


								<View style={[styles.rowCheckbox, { width: '60%' }]}>
									<RadioButton
										outerColor={Constants.color.primary}
										size={10}
										innerColor={Constants.color.primary}
										onPress={() => this.setState({
											isOccassionallySelected: true,
											availibility: "occassionally",
											isDailySelected: false,
										})}
										isSelected={this.state.isOccassionallySelected}
									/>
									<TextBold title={"Occassionally"} textStyle={{ padding: 5 }} />
								</View>
							</View>

							{
								this.state.isOccassionallySelected ?
									<View>
										{/*Booking date*/}
										<View
											style={styles.viewInput}>
											<TextBold title={"Select Booking Date:"} textStyle={{}} />
											<TouchableOpacity style={styles.inputLayout}
												onPress={() => { this.showDatePicker() }}>
												<TextInput
													pointerEvents="none"
													editable={false}
													value={this.state.bookingDate}
													style={styles.textInput}
													placeholder={strings.hint_booking_date} />

											</TouchableOpacity>
											<DateTimePicker
												isVisible={this.state.isDatePickerVisible}
												mode="date"
												minimumDate={new Date()}
												maximumDate={new Date(moment(new Date()).add(7, 'day').format('YYYY-MM-DD'))}
												onConfirm={this.handleDatePicked}
												onCancel={this.hideDatePicker}
											/>

										</View>
									</View> : null}
							{this.state.selectedItems.selectedService.name.toLowerCase().includes("cook") &&
								this.state.selectedItems.selectedCategory.name.toLowerCase().includes("home") ?
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<TextBold title={"Family Member's Count:"} textStyle={{}} />
									<TextInput
										value={this.state.familyMembers}
										selectionColor={Constants.color.primary}
										onChangeText={(text) => this.familyMemberEntered(text)}
										style={{
											fontSize: 16,
											padding: 4,
											fontFamily: Fonts.Regular,
											color: Constants.color.black
										}}
										keyboardType={"number-pad"}
										maxLength={2}
										placeholder={"Enter Here"} />
								</View>
								: null}

							<TextBold title={"Enter Address Below:"} textStyle={{ padding: 4 }} />
							<View style={styles.textAreaContainer} >
								<TextInput
									style={styles.textArea}
									selectionColor={Constants.color.primary}
									underlineColorAndroid="transparent"
									placeholder="Complete Address"
									placeholderTextColor="grey"
									numberOfLines={5}
									value={this.state.address}
									onChangeText={(text) => this.addressChanged(text)}
									multiline={true}
								/>
							</View>

							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<TextBold title={"Alternate Contact Number:"} textStyle={{ padding: 5 }} />
								<TextInput style={{ width: '100%', marginTop: 2, color: '#808080', fontWeight: '500' }}
									placeholder={"Enter Here"}
									value={this.state.alterPhone}
									maxLength={10}
									selectionColor={Constants.color.primary}
									keyboardType={"phone-pad"}
									onChangeText={(text) => this.fieldChanged(text)}
								/>
							</View>

							{/*button Field*/}


							<TouchableOpacity
								onPress={() => {
									this.verifyAndPlace();
								}}
								style={styles.touchLogin}>
								<TextBold title={strings.place_request} textStyle={styles.textButtonLogin} />
							</TouchableOpacity>


							{/*End Button Field*/}


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

export default connect(mapStateToProps, {})(SelectionScreen)