import React, { Component } from 'react'
import { Constants, strings, GlobalStyle, Images } from '../../../utils'
import { connect } from 'react-redux'
import { isLoginAction } from '../../../redux/actions/userData'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import MyStatusBar from '../../custom/my-status-bar'
import { TextBold, TextLite, TextThin, TextRegular } from '../../custom/text'
import NavigationService from '../../../services/NavigationServices'
import { Platform,AsyncStorage, StyleSheet, Alert, View, Image, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';



class Login extends Component {

    static navigationOptions = {
        header: null
    };
    constructor() {
        super()
        this.state = {
            isLoading: false,
            phone: '',
            password: ''
        }
    }
    onBackClick = () => {
        this.props.navigation.goBack();
    }

    componentDidMount() {
        
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

        AsyncStorage.setItem(Constants.STORAGE_KEY.userData, JSON.stringify({phone:phone,password:password}));
        AsyncStorage.setItem(Constants.STORAGE_KEY.isLogin, JSON.stringify(({ isLogin: true })));
        this.props.isLoginAction(true)
        NavigationService.navigate("MainStack")
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

                                {/*Email Field*/}
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
                           
                                
                                {/*End Password Field*/}

                            </View>

                        </View>
                    </View>
                </ScrollView>
            </View>

        );
    };
}



function mapStateToProps(state) {
    return {
        selectedTab: state.selectedTab,
        isLogin: state.isLogin,
    }
}

export default connect(mapStateToProps, { isLoginAction })(Login)

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