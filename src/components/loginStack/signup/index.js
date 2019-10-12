import React, { Component } from 'react'
import { Constants, strings, GlobalStyle, Images, Fonts } from '../../../utils'
import { connect } from 'react-redux'
import { isLoginAction, userDataAction } from '../../../redux/actions/userData'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import MyStatusBar from '../../custom/my-status-bar'
import { TextBold, TextBoldItalic, TextItalic, TextLite, TextLightItalic, TextRegular } from '../../custom/text'
import NavigationService from '../../../services/NavigationServices'
import { signUpApi } from '../../../services/APIService'
import { Platform, AsyncStorage, ImageBackground, StyleSheet, Alert, View, Image, SafeAreaView, ActivityIndicator, TextInput, ScrollView, TouchableOpacity } from 'react-native';



class SignUp extends Component {

    static navigationOptions = {
        header: null
    };
    constructor() {
        super()
        this.state = {
            phone: '',
            password: '',
            confirmPassword: '',
            name: '',
            isLoading: false,
        }
    }
    onBackClick = () => {
        this.props.navigation.goBack();
    }

    componentDidMount() {
        this.setState({
            userData: this.props.userData
        })

    }

    fieldChanged(text, type) {
        switch (type) {
            case 1:
                this.setState({
                    name: text
                })
                break;
            case 2:
                text = text.replace(/\D/g, '');
                this.setState({
                    phone: text.trim()
                })
                break;
            case 3:
                this.setState({
                    password: text
                })
                break;
            case 4:
                this.setState({
                    confirmPassword: text
                })
                break;
        }

    }

    verifyAndSignUp() {
        let name = this.state.name;
        let phone = this.state.phone;
        let password = this.state.password;
        let confPass = this.state.confirmPassword;

        if (name.length < 3) {
            this.showErrorAlert("Enter Valid Name")
            return
        }
        if (phone.length < 10) {
            this.showErrorAlert("Enter Valid Number")
            return
        }
        if (password == "") {
            this.showErrorAlert("Enter Password")
            return
        }
        if (confPass == "") {
            alert(strings.confirm_pass_error)
            return
        }
        if (password != confPass) {
            alert(strings.conform_password_error)
            return
        }

        this.callSignUpApi();

        // AsyncStorage.setItem(Constants.STORAGE_KEY.userData, JSON.stringify({phone:phone,password:password}));
        // AsyncStorage.setItem(Constants.STORAGE_KEY.isLogin, JSON.stringify(({ isLogin: true })));
        // this.props.isLoginAction(true)
        // NavigationService.navigate("MainStack")
    }

    callSignUpApi() {
        const param = {
            cust_name: this.state.name,
            cust_phone: this.state.phone,
            cust_password: this.state.password,
        }

        this.setState({
            isLoading: true,
        })

        let url = Constants.URL.baseURL + '/' + Constants.URL.vesrion + '/' + Constants.URL.signUp

        signUpApi(url, param).then(res => {

            if (res && res.success) {
                this.setState({
                    isLoading: false,
                }, () => {
                    if (res.data) {
                        AsyncStorage.setItem(Constants.STORAGE_KEY.userData, JSON.stringify(res.data));
                        AsyncStorage.setItem(Constants.STORAGE_KEY.isLogin, JSON.stringify(true));
                        this.props.userDataAction(res.data)
                        this.props.isLoginAction(true)
                        NavigationService.navigate("MainStack")
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

    showErrorAlert = (msg) => {
        Alert.alert(
            "Error",
            msg,
            [
                //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {
                    text: "OK",
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ],
            { cancelable: false },
        );
    }


    render() {

        return (
            <View style={styles.container}>
                <SafeAreaView style={{ backgroundColor: Constants.color.primary }} />



                <ScrollView contentInsetAdjustmentBehavior="automatic"
                    keyboardShouldPersistTaps='always'
                    style={[styles.scrollview]}>
                    <View
                        style={{}}>

                        <View style={{ width: '100%', paddingTop: 50 }}>
                            <Image
                                style={{ width: '100%', height: Constants.Screen.width / 3, resizeMode: 'contain' }} source={Images.shallymaid_logo} />

                        </View>

                        <View style={{ width: '100%', paddingTop: 50, paddingHorizontal: 35, paddingBottom: 5 }}>

                            {/*Name Field*/}
                            <View style={styles.inputView}>
                                <Image style={styles.inputIcon} source={Images.ic_my_profile_white} />
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor="white"
                                    underlineColorAndroid={Constants.color.white}
                                    placeholder={"Name"}
                                    value={this.state.name}
                                    onChangeText={(text) => this.fieldChanged(text, 1)}
                                />
                            </View>
                            {/*End Name Field*/}

                            {/*Phone Field*/}
                            <View style={styles.inputView}>
                                <Image style={styles.inputIcon} source={Images.ic_phone_white} />
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor="white"
                                    underlineColorAndroid={Constants.color.white}
                                    placeholder={"Mobile Number"}
                                    value={this.state.phone}
                                    maxLength={10}
                                    keyboardType={"phone-pad"}
                                    onChangeText={(text) => this.fieldChanged(text, 2)}
                                />
                            </View>
                            {/*End Phone Field*/}
                            {/*Password Field*/}
                            <View style={styles.inputView}>
                                <Image style={styles.inputIcon} source={Images.ic_lock_white} />
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor="white"
                                    underlineColorAndroid={Constants.color.white}
                                    value={this.state.password}
                                    placeholder={"Password"}
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.fieldChanged(text, 3)}
                                />
                            </View>
                            {/*End Password Field*/}

                            {/*Confirm Password Field*/}
                            <View style={styles.inputView}>
                                <Image style={styles.inputIcon} source={Images.ic_lock_white} />
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor="white"
                                    underlineColorAndroid={Constants.color.white}
                                    value={this.state.confirmPassword}
                                    placeholder={"Confirm Password"}
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.fieldChanged(text, 4)}
                                />
                            </View>
                            {/*Confirm Password Field*/}
                        </View>
                        {/*button Field*/}
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                            <TouchableOpacity
                                onPress={() => {
                                    this.verifyAndSignUp();
                                }}
                                style={styles.touchLogin}>
                                <TextBold title={strings.signUp} textStyle={styles.textButtonLogin} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { NavigationService.navigate("Login") }}
                            >
                                <TextItalic title={
                                    "Already have an account? Login"
                                }
                                    textStyle={{
                                        color: Constants.color.white,
                                        marginTop: 10,
                                        fontSize: 12,
                                    }} />
                            </TouchableOpacity>
                        </View>



                        {/*End Button Field*/}
                    </View>

                    {this.renderProgressBar()}</ScrollView>
                <ImageBackground
                    resizeMode={"cover"}
                    style={[styles.imgBackground, styles.fixed, { zIndex: -1 }]}
                    source={Images.img_background}
                />

            </View >

        );
    };
}



function mapStateToProps(state) {
    return {
        userData: state.userData,
        isLogin: state.isLogin,
    }
}

export default connect(mapStateToProps, { isLoginAction, userDataAction })(SignUp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgBackground: {
        width: '100%',
        height: Constants.Screen.height
    },

    logoView: {
        height: Constants.Screen.height / 3,
        backgroundColor: Constants.color.primary,
        alignItems: 'center',
        justifyContent: "center"
    },
    touchLogin: {
        backgroundColor: Constants.color.primary,
        justifyContent: "center",
        alignItems: "center",
        width: 120,
        height: 40,
        marginTop: 0,
        borderRadius: 50
    },
    textButtonLogin: {
        color: Constants.color.white,
        fontSize: 16,
    },
    inputView: {
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputIcon: {
        height: 18,
        width: 18,
        marginTop:5,
        marginRight:5,
        alignItems: 'center',
        paddingRight: 5
    },
    input: {
        flex: 1,
        paddingLeft: 6,
        height: 50,
        paddingBottom: 10,
        fontFamily: Fonts.Regular,
        color: Constants.color.white,
    },
    fixed: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    scrollview: {
        backgroundColor: 'rgba(0,0,0, 0.80)'
    }
});