import React, { Component } from 'react';
import { View, ActivityIndicator, Image, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { TextBold, TextRegular, TextHeading } from '../../custom/text';
import { Constants, GlobalStyle, strings, Fonts } from '../../../utils';
import { placeOrderApi } from '../../../services/APIService'
import { connect } from 'react-redux'
import NavigationService from '../../../services/NavigationServices'
import { NavigationActions, StackActions } from 'react-navigation';
import MyStatusBar from '../../custom/my-status-bar'
import RadioGroup from '../../custom/RadioButtonsGroup';
import RadioButton from '../../custom/RadioButton'
import styles from './style'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { ViewPager, PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';






let currentPage = 0;
let data = [
	{
		label: 'Single Person',
		size: 20,
		color: Constants.color.primary
	},
	{
		label: '2 Persons',
		size: 20,
		color: Constants.color.primary
	},
	{
		label: '3 Persons',
		size: 20,
		color: Constants.color.primary
	},
	{
		label: 'Family Type (3-5 persons)',
		size: 20,
		color: Constants.color.primary
	},
	{
		label: 'Joint Family (5-10 persons)',
		size: 20,
		color: Constants.color.primary
	},
	{
		label: 'Professional (More than 10 persons)',
		size: 20,
		color: Constants.color.primary
	},
]
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
			isWeekDaysSelected: false,
			isWeekEndsSelected: false
		}
	}
	componentDidMount() {
		const { navigation } = this.props;
		const navigateFrom = navigation.getParam('navigateFrom', '');
		const selectedItems = navigation.getParam('selectedItems', '');
		if (navigateFrom == "Category") {
			this.setState({
				selectedItems: selectedItems
			}, () => { currentPage = 0; })
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
						let routeName = "OrderConfirmation"
						let params = { "KEY": res }
						this.props.navigation.dispatch(
							StackActions.reset({
								index: 1,
								key: null,
								actions: [NavigationActions.navigate({ routeName: "Home" }), NavigationActions.navigate({ routeName, params })]
							})
						);
						//this.props.navigation.replace("OrderConfirmation")

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

	radio3Pressed(c) {
		data = c
		let selectedButton = data.find(e => e.selected == true);
		selectedButton = selectedButton ? selectedButton.value : data[0].label;
		this.setState({ familyMembers: selectedButton })
	}

	renderDbuttons(isVisible) {
		return <View style={{
			position: 'absolute',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			bottom: 15
		}}>
			<View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }} >
				<View style={{ width: '50%', alignItems: 'center' }} >
					<TouchableOpacity
						onPress={() => {
							currentPage = currentPage - 1;
							this.viewPager.setPage(currentPage)
						}}
						style={styles.touchLogin}>
						<TextBold title={"Back"} textStyle={[styles.textButtonLogin]} />
					</TouchableOpacity>
				</View>
				{isVisible ? <View style={{ width: '50%', alignItems: 'center' }} >
					<TouchableOpacity
						onPress={() => {
							currentPage = currentPage + 1;
							this.viewPager.setPage(currentPage)
						}}
						style={styles.touchLogin}>
						<TextBold title={"Next"} textStyle={[styles.textButtonLogin]} />
					</TouchableOpacity>
				</View> : null}

			</View>
		</View>
	}

	renderPage1() {
		return (<View>
			<View style={{ borderRadius: 10, backgroundColor: 'white', padding: 15 }}>
				<View style={{ flexDirection: 'row', width: '100%' }} >
					<TextHeading title={"Selected Service:"} textStyle={{ padding: 2, width: '40%', fontSize: 12, color: 'black' }} />
					<TextBold title={this.state.selectedItems.selectedService.name}
						textStyle={{ color: '#808080', fontSize: 12, fontWeight: '800', padding: 2 }} />
				</View>

				<View style={{ flexDirection: 'row' }} >
					<TextHeading title={"Service Class:"} textStyle={{ padding: 2, width: '40%', fontSize: 12, color: 'black' }} />
					<TextBold
						title={!this.state.selectedItems.selectedSubCategory ?
							this.state.selectedItems.selectedCategory.name :
							this.state.selectedItems.selectedCategory.name + "-" +
							this.state.selectedItems.selectedSubCategory.name}
						textStyle={{ color: '#808080', fontSize: 12, fontWeight: '800', padding: 2 }} />
				</View>



			</View>

			<TextHeading title={"Press Next to continue"} textStyle={{ padding: 2, width: '80%', fontSize: 16, color: 'black' }} />
			<View style={{
				position: 'absolute',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				bottom: 15
			}}>
				<TouchableOpacity
					onPress={() => {
						currentPage = currentPage + 1;
						this.viewPager.setPage(currentPage)
					}}
					style={styles.touchLogin}>
					<TextBold title={"Next"} textStyle={styles.textButtonLogin} />
				</TouchableOpacity>
			</View>
		</View>)
	}

	renderPage2() {
		return (<View >


			<View style={{ justifyContent: 'center', backgroundColor: 'white', borderRadius: 10, width: '100%' }} >

				<View style={{ justifyContent: 'center', padding: 10, backgroundColor: '#d1ffd4', borderRadius: 10, width: '100%' }} >
					<TextHeading title={"Which day You want to book this service?"} textStyle={{ fontSize: 13 }} />
				</View>
				<TouchableOpacity
					onPress={() => this.setState({
						availibility: "daily",
						bookingDate: "",
						isDailySelected: true,
						isWeekDaysSelected: false,
						isWeekEndsSelected: false,
						isOccassionallySelected: false,
					})}
					style={styles.rowCheckbox}>
					<RadioButton
						outerColor={Constants.color.primary}
						size={12}
						innerColor={Constants.color.primary}
						isSelected={this.state.isDailySelected}
					/>
					<TextBold title={"Daily"} textStyle={{ padding: 5 }} />
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => this.setState({
						isWeekDaysSelected: true,
						availibility: "WeekDays",
						bookingDate: "",
						isDailySelected: false,
						isWeekEndsSelected: false,
						isOccassionallySelected: false,
					})}
					style={styles.rowCheckbox}>
					<RadioButton
						outerColor={Constants.color.primary}
						size={12}
						innerColor={Constants.color.primary}
						isSelected={this.state.isWeekDaysSelected}
					/>
					<TextBold title={"WeekDays"} textStyle={{ padding: 5 }} />
				</TouchableOpacity>


				<TouchableOpacity
					onPress={() => this.setState({
						availibility: "Week Ends",
						bookingDate: "",
						isOccassionallySelected: false,
						isDailySelected: false,
						isWeekDaysSelected: false,
						isWeekEndsSelected: true,
					})}
					style={styles.rowCheckbox}>
					<RadioButton
						outerColor={Constants.color.primary}
						size={12}
						innerColor={Constants.color.primary}
						isSelected={this.state.isWeekEndsSelected}
					/>
					<TextBold title={"Week Ends"} textStyle={{ padding: 5 }} />
				</TouchableOpacity>


				<TouchableOpacity
					onPress={() => this.setState({
						isOccassionallySelected: true,
						availibility: "One Day",
						isDailySelected: false,
						isWeekDaysSelected: false,
						isWeekEndsSelected: false,
					})}
					style={[styles.rowCheckbox, { width: '60%' }]}>
					<RadioButton
						outerColor={Constants.color.primary}
						size={12}
						innerColor={Constants.color.primary}
						isSelected={this.state.isOccassionallySelected}
					/>
					<TextBold title={"One Day"} textStyle={{ padding: 5 }} />
				</TouchableOpacity>
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
			</View>


			{this.state.availibility ? !this.state.isOccassionallySelected || this.state.bookingDate ? <View style={{
				position: 'absolute',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				bottom: 15
			}}>
				<TouchableOpacity
					onPress={() => {
						currentPage = currentPage + 1;
						this.viewPager.setPage(currentPage)
					}}
					style={styles.touchLogin}>
					<TextBold title={"Next"} textStyle={styles.textButtonLogin} />
				</TouchableOpacity>
			</View> : null : null}

		</View>
		)
	}

	renderPage3() {

		let selectedButton = data.find(e => e.selected == true);
		selectedButton = selectedButton ? selectedButton.value : "none";
		return (
			this.state.selectedItems.selectedService.name.toLowerCase().includes("cook") &&
				this.state.selectedItems.selectedCategory.name.toLowerCase().includes("home") ?
				<View>
					<View style={{ backgroundColor: 'white', borderRadius: 10, width: '100%' }} >

						<View style={{ justifyContent: 'center', padding: 10, backgroundColor: '#d1ffd4', borderRadius: 10, width: '100%' }} >
							<TextHeading title={"Select the number of persons"} textStyle={{ fontSize: 13 }} />
						</View>

						<RadioGroup radioButtons={data} onPress={(data) => this.radio3Pressed(data)} /></View>

					{this.renderDbuttons(true)}
				</View>
				: null
		)
	}
	renderPage4() {
		return <View >
			<View style={{ backgroundColor: 'white', borderRadius: 10, width: '100%' }} >

				<View style={{ justifyContent: 'center', padding: 10, backgroundColor: '#d1ffd4', borderRadius: 10, width: '100%' }} >
					<TextHeading title={"Enter Address"} textStyle={{ fontSize: 13 }} />
				</View>
				<View style={styles.textAreaContainer} >
					<TextInput
						style={styles.textArea}
						selectionColor={Constants.color.primary}
						underlineColorAndroid="transparent"
						placeholder="Type Your Address"
						placeholderTextColor="grey"
						numberOfLines={5}
						value={this.state.address}
						onChangeText={(text) => this.addressChanged(text)}
						multiline={true}
					/>
				</View>

			</View>

			{this.renderDbuttons(this.state.address)}</View>
	}
	renderPage5() {
		return <View >
			<View style={{ backgroundColor: 'white', borderRadius: 10, width: '100%' }} >

				<View style={{ justifyContent: 'center', padding: 10, backgroundColor: '#d1ffd4', borderRadius: 10, width: '100%' }} >
					<TextHeading title={"Contact Number"} textStyle={{ fontSize: 13 }} />
				</View>
				<View style={{ flexDirection: 'row', padding: 5, alignItems: 'center', justifyContent: 'center' }}>
					<TextBold title={"Alternative Contact"} textStyle={{ fontSize: 12, padding: 5 }} />
					<View style={[styles.textAreaContainer, { margin: '2%', padding: 0, width: '56%' }]} >
						<TextInput
							selectionColor={Constants.color.primary}
							underlineColorAndroid="transparent"
							placeholderTextColor="grey"
							numberOfLines={1}
							maxLength={10}
							keyboardType={"phone-pad"}
							value={this.state.alterPhone}
							onChangeText={(text) => this.fieldChanged(text)}
						/>
					</View>

				</View>
			</View>

			<View style={{
				position: 'absolute',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				bottom: 15
			}}>
				<View style={{ flexDirection: 'column', width: '100%', justifyContent: 'center' }} >

					{this.state.alterPhone.length == 10 ? <View style={{ width: '100%', alignItems: 'center' }} >
						<TouchableOpacity
							onPress={() => {
								this.verifyAndPlace();
							}}
							style={styles.touchLogin}>
							<TextBold title={strings.place_request} textStyle={[styles.textButtonLogin]} />
						</TouchableOpacity>
					</View> : null}

					<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }} >
						<TouchableOpacity
							onPress={() => {
								currentPage = currentPage - 1;
								this.viewPager.setPage(currentPage)
							}}
							style={[styles.touchLogin, { width: '25%' }]}>
							<TextBold title={"Back"} textStyle={[styles.textButtonLogin]} />
						</TouchableOpacity>
					</View>


				</View>
			</View>
		</View>
	}
	renderPage6() { }
	renderPage7() { }


	render() {
		if (this.state.selectedItems == null)
			return null
		else
			return (
				<View style={styles.container}>
					<SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
					<MyStatusBar title={strings.place_request} goback={() => this.onBackClick()} />


					<View style={{ flex: 1, padding: 25 }}>

						<ViewPager style={{ height: Constants.Screen.height - 150 }} ref={element => this.viewPager = element} horizontalScroll={false}	>
							{/*this.renderPage1()*/}

							{this.renderPage2()}

							{this.renderPage3()}

							{this.renderPage4()}

							{this.renderPage5()}




						</ViewPager>


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

export default connect(mapStateToProps, {})(SelectionScreen)