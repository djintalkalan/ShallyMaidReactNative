import React, { Component } from 'react'
import { Platform, StyleSheet, Text, Image, View, TouchableHighlight, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { Constants,Images,GlobalStyle} from '../../../utils';
import { TextBold, TextLite, TextThin, TextRegular } from '../text'


class MyStatusBar extends Component {

    constructor() {
        super()
        this.state = {
        }
    }

    componentDidMount() {
        
    }


    onBackClick = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }
    renderBackButton() {
        if (Platform.OS === Constants.PLATFORM.ios) {
            return (
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => this.onBackClick()}>
                    <Image source={Images.ic_back_ios}
                        style={{ marginLeft: 5, height: 22, width: 22, }}
                    ></Image>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => this.onBackClick()}>
                    <Image source={Images.ic_back_android}
                        style={{ marginLeft: 15, height: 35, width: 25, }}
                    ></Image>
                </TouchableOpacity>
            )
        }
    }


    renderToolbar() {
        return (
            <View style={GlobalStyle.toolbar}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center',
                    width: '90%'
                }
                }>
                  {/* this.renderBackButton() */}
                    <TextBold title={this.props.title} textStyle={GlobalStyle.titleTextStyle} />

                </View>
            </View>

        )
    }

    
    render() {

        return (
            this.renderToolbar());
    };
}



export default MyStatusBar
