import React, {Component} from 'react';
import {Text, View, TouchableOpacity,Dimensions,AsyncStorage, Image} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Constant from '../../utility/constant';
import Modal from 'react-native-modal';
import Styles from  './styles';
import { Images } from '../../../utils';
const width = Dimensions.get('window').width;
const sad = Images.ic_sad;
const happy =Images.ic_happy;
const question = Images.ic_question;

export default class AlertModal extends Component {
    constructor(props) {
        super(props);
    }

    sessionExpired = () => {
        AsyncStorage.removeItem(Constant.AUTH_TOKEN);
        AsyncStorage.removeItem('AUTH_TOKENS');
        AsyncStorage.removeItem('QR_CODE');
        const reset = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({routeName: 'LoginScreen'})
            ]
        });
        this.props.dispatch(reset)
    };



    render() {
        const {visible, hide, message, success, multiButton, approveAlert,sessionExpire,dismissButton} = this.props;
        return (
            <Modal
                animationIn='slideInLeft'
                animationOut='slideOutRight'
                backdropOpacity={0.60}
                animationInTiming={500}
                animationOutTiming={500}
                isVisible={visible}>
                <View style={Styles.modalContainerStyle}>
                    <View style={Styles.modalTitleContainerStyle}>
                        {
                            multiButton && <View><Image  style={Styles.image} source={question}/><Text style={Styles.modalTitleTextStyle}>Approval</Text></View>
                        }
                        {!multiButton ?  success ? <View><Image source={happy}/><Text style= {Styles.modalTitleTextStyle}>{'Great!!'}</Text></View>
                            : <View><Image  source = {sad}/><Text style={Styles.modalTitleTextStyle}>{'Oops!!'}</Text></View>: <View/>
                        }

                    </View>
                    <View style={Styles.modalMessageContainerStyle}>
                        <Text style={Styles.modalMessageTextStyle}>{message}</Text>
                    </View>
                    { multiButton &&
                        <View style={Styles.rowContent}>
                            <View style={Styles.modalButtonStyle}>
                                <TouchableOpacity
                                    onPress={approveAlert}
                                >
                                    <Text style={Styles.modalButtonTextStyle}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[Styles.modalButtonStyle,{backgroundColor:'#ccc'}]}>
                                <TouchableOpacity
                                    onPress={hide}
                                ><Text style={[Styles.modalButtonTextStyle,{color:'#000'}]}>No</Text>
                                </TouchableOpacity>
                        </View>
                        </View>
                    }
                    {
                        sessionExpire && <TouchableOpacity
                            activeOpacity={0.8}
                            style={Styles.modalButtonStyle}
                            onPress={this.sessionExpired}
                        >
                            <Text style={Styles.modalButtonTextStyle}>Ok</Text>
                        </TouchableOpacity>
                    }
                    {
                        dismissButton && <TouchableOpacity
                            activeOpacity={0.8}
                            style={Styles.modalButtonStyle}
                            onPress={hide}
                        >
                            <Text style={Styles.modalButtonTextStyle}>Dismiss</Text>
                        </TouchableOpacity>
                    }
                </View>
            </Modal>
        )
    }
}