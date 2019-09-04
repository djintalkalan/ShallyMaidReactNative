import React, { Component } from 'react'
import { Platform, StyleSheet, Text, Image, View, TouchableHighlight, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { Constants, Images, GlobalStyle } from '../../../utils';
import { TextBold, TextLite, TextThin, TextRegular } from '../text'


class MyStatusBar extends Component {

    constructor() {
        super()
        this.state = {
        }
    }

    componentDidMount() {

    }

    renderBackButton() {
        if (Platform.OS === Constants.PLATFORM.ios) {
            return (
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => this.props.goback()}>
                    <Image source={Images.ic_back_ios}
                        style={{ marginLeft: 5, height: 22, width: 22, }}
                    ></Image>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => this.props.goback()}>
                    <Image source={Images.ic_back_android}
                        style={{ marginLeft: 15, height: 25, width: 25, }}
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
                    width: '100%'
                }
                }>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '10%'
                    }
                    }>
                        {this.props.goback ? this.renderBackButton() : null}
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80%'
                    }
                    }><TextBold title={this.props.title} textStyle={GlobalStyle.titleTextStyle} /></View>



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
