import React, { Component } from 'react'
import { Constants, strings, GlobalStyle, Images } from '../../../utils'
import { connect } from 'react-redux'
import { isLoginAction ,userDataAction} from '../../../redux/actions/userData'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import MyStatusBar from '../../custom/my-status-bar'
import { TextBold, TextLite, TextThin, TextRegular } from '../../custom/text'
import NavigationService from '../../../services/NavigationServices'
import { loginApi } from '../../../services/APIService'
import { Platform,AsyncStorage, StyleSheet, Alert, View, Image, SafeAreaView,ActivityIndicator, TextInput, ScrollView, TouchableOpacity } from 'react-native';



class Login extends Component {

    static navigationOptions = {
        header: null
    };
    constructor() {
        super()
        this.state = {
            isLoading: false,
            phone: '',
            password: '',
            isLoading: false,
        }
    }
    onBackClick = () => {
        this.props.navigation.goBack();
    }

    componentDidMount() {
        this.setState({
            userData:this.props.userData
        })
        
    }

    fieldChanged(text, type) {
        if (type == 1) {
            text = text.replace(/\D/g, '');
            this.setState({
                phone: text.trim()
            })
        }
        if (type == 2) {
            this.setState({
                password: text
            })
        }
    }

    verifyAndLogin(){
        let phone = this.state.phone;
        let password = this.state.password;

        if(phone.length<10){
            this.showErrorAlert("Enter Valid Number")
            return
        }
        if(password==""){
            this.showErrorAlert("Enter Password")
            return
        }

        this.callLoginApi();

        // AsyncStorage.setItem(Constants.STORAGE_KEY.userData, JSON.stringify({phone:phone,password:password}));
        // AsyncStorage.setItem(Constants.STORAGE_KEY.isLogin, JSON.stringify(({ isLogin: true })));
        // this.props.isLoginAction(true)
        // NavigationService.navigate("MainStack")
    }

    callLoginApi() {

        const param = {
            cust_phone: this.state.phone,
            cust_password: this.state.password,
        }

        this.setState({
            isLoading: true,
        })

        let url = Constants.URL.baseURL + '/'  + Constants.URL.vesrion + '/' + Constants.URL.login

        loginApi(url, param).then(res => {
            
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
        console.log("selectedKey" + JSON.stringify(this.state))
       
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
                <ScrollView contentInsetAdjustmentBehavior="automatic"
                            keyboardShouldPersistTaps='always'>
                    <View>
                        <View style={styles.container}>
                            <View style={styles.logoView}>
                                <View style={{ borderRadius: 10, width: 50, height: 50, backgroundColor: Constants.color.white }}>

                                </View>
                                <TextBold textStyle={{ padding: 5, color: Constants.color.white, fontSize: 22 }} title={strings.app_name} />
                            </View>
                            <View style={styles.container}>

                                {/*Phone Field*/}
                                <View style={{
                                    flexDirection: 'row',
                                    borderRadius: 5,
                                    margin: 35,
                                    marginBottom: 25,
                                    borderColor: Constants.color.primary, borderWidth: 1
                                }}>
                                    <View style={{
                                        width: '20%',
                                        padding: 8,
                                        borderRightWidth: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRightColor: Constants.color.primary
                                    }}>
                                        <Image source={Images.ic_home_primary} style={{ width: 25, height: 25, resizeMode: "contain" }}></Image>
                                    </View>


                                    <View style={{
                                        width: '80%',
                                    }}>
                                        <TextInput style={{ width: '100%', }}
                                            placeholder={"Enter Phone Number"}
                                            value={this.state.phone}
                                            maxLength={10}
                                            selectionColor={Constants.color.primary}
                                            keyboardType={"phone-pad"}
                                            onChangeText={(text) => this.fieldChanged(text, 1)}
                                        />
                                    </View>
                                </View>
                                {/*End Phone Field*/}
                                {/*Password Field*/}
                                <View style={{
                                    flexDirection: 'row',
                                    borderRadius: 5,
                                    margin: 35,
                                    marginTop: 0,
                                    borderColor: Constants.color.primary, borderWidth: 1
                                }}>
                                    <View style={{
                                        width: '20%',
                                        padding: 8,
                                        borderRightWidth: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRightColor: Constants.color.primary
                                    }}>
                                        <Image source={Images.ic_home_primary} style={{ width: 25, height: 25, resizeMode: "contain" }}></Image>
                                    </View>
                                    <View style={{
                                        width: '80%',
                                    }}>
                                        <TextInput style={{ width: '100%', }}
                                            placeholder={"Enter Password"}
                                            selectionColor={Constants.color.primary}
                                            secureTextEntry={true}
                                            onChangeText={(text) => this.fieldChanged(text, 2)}
                                        />
                                    </View>
                                </View>
                                {/*End Password Field*/}

                                {/*button Field*/}

                               
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.verifyAndLogin();
                                            }}
                                            style={styles.touchLogin}>
                                            <TextBold title={strings.login} textStyle={styles.textButtonLogin} />
                                        </TouchableOpacity>
                           
                                
                                {/*End Button Field*/}

                            </View>

                        </View>
                    </View>
                </ScrollView>
                {this.renderProgressBar()}
            </View>

        );
    };
}



function mapStateToProps(state) {
    return {
        userData: state.userData,
        isLogin: state.isLogin,
    }
}

export default connect(mapStateToProps, { isLoginAction,userDataAction})(Login)

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        padding:15,
        margin:35,
        marginTop:0,
        borderRadius: 5
    },
    textButtonLogin: {
        color: Constants.color.white,
        fontSize: 16,
    },
});