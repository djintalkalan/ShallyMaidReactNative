import React, { Component } from 'react'
import { Platform, StyleSheet, Text, Image, View, TouchableHighlight, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { Constants } from '../../utils';
import { TextBold, TextLite, TextThin, TextRegular } from '../custom/text'
import { connect } from 'react-redux'
import { selectedTabAction } from '../../redux/actions'
let selectedKey = 1;
class BottomTab extends Component {

    static navigationOptions = {
        header: null
    };
    constructor() {
        super()
        this.state = {
            isLoading: false,
            toogle: true,
        }
    }

    componentDidMount() {
        if (!this.props.selectedTab) {
            this.props.selectedTabAction(1)
        }
    }



    renderIcon(item) {
        return (
            <Image source={selectedKey == item.key ? item.iconSelected : item.iconUnselected}
                style={{
                    height: selectedKey == item.key ? 25 : 20,
                    width: selectedKey == item.key ? 25 : 20,
                }} />)
    }
    renderTitle(item) {
        if (item.key == selectedKey)
            return (
                <TextBold textStyle={{
                    color: Constants.color.primary,
                    fontSize: 12

                }} title={item.label} />
            )
        else
            return (
                <TextRegular textStyle={{
                    color: '#808080',
                    fontSize: 11
                }} title={item.label} />
            )
    }
    buttonTabSelected(key) {
        if (selectedKey != key) {

            selectedKey = key
            this.setState({
                toogle: !this.state.toogle
            })
            this.props.selectedTabAction(key)
        }
    }

    renderTab() {
        return this.props.tab.map((item, index) =>
            (
                <TouchableOpacity
                    key={item.key}
                    onPress={() => { this.buttonTabSelected(item.key) }}
                    style={{
                        flex: 1,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} >
                    {this.renderIcon(item)}
                    {this.renderTitle(item)}

                </TouchableOpacity>
            ))
    }




    render() {

        return (
            <View style={{
                height: 60,
                borderWidth: 0.4,
                borderColor: Constants.color.primary,
                flexDirection: 'row'
            }} >
                {
                    this.renderTab()
                }

            </View>



        );
    };
}


function mapStateToProps(state) {
    return {
        selectedTab: state.selectedTab,
    }
}

export default connect(mapStateToProps, { selectedTabAction })(BottomTab)
