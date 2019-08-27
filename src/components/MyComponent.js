import React, { Component } from 'react'
import { Constants, strings, Images } from './../utils'
import BottomTab from './custom/bottom-tab.js'
import { connect } from 'react-redux'
import MyStatusBar from './custom/my-status-bar'
import { Platform, StyleSheet, Text, View, StatusBar, SafeAreaView, Button } from 'react-native';


class MyComponent extends Component {

    static navigationOptions = {
        header: null
    };
    constructor() {
        super()
        this.state = {
            isLoading: false,
            tabs: [
                {
                    key: 1,
                    iconSelected: Images.ic_home_primary,
                    iconUnselected: Images.ic_home_grey,
                    label: 'Home',
                    labelColorSelected: Constants.color.primary,
                    labelColorUnselected: '#808080',
                    barColor: Constants.color.white,
                    pressColor: 'rgba(255, 153, 0, 0.16)'
                },
                {
                    key: 2,
                    iconSelected: Images.ic_home_primary,
                    iconUnselected: Images.ic_home_grey,
                    label: 'Home',
                    labelColorSelected: Constants.color.primary,
                    labelColorUnselected: '#808080',
                    barColor: Constants.color.white,
                    pressColor: 'rgba(255, 153, 0, 0.16)'
                },
                {
                    key: 3,
                    iconSelected: Images.ic_home_primary,
                    iconUnselected: Images.ic_home_grey,
                    label: 'Home',
                    labelColorSelected: Constants.color.primary,
                    labelColorUnselected: '#808080',
                    barColor: Constants.color.white,
                    pressColor: 'rgba(255, 153, 0, 0.16)'
                }
            ]
        }
    }


    static getDerivedStateFromProps(props, state) {
        return {
            selectedTab: props.selectedTab,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.selectedTab !== prevProps.selectedTab) {
           // alert(this.state.selectedTab)
        }
    }


    render() {
        console.log("selectedKey" + JSON.stringify(this.state))
        return (

            <View style={styles.container}>
                <SafeAreaView style={{ backgroundColor: Constants.color.primary }} />
                <MyStatusBar title={strings.app_name} />
                <View style={{ flex: 1 }}>
                </View>
                <BottomTab tab={this.state.tabs} />

            </View>

        );
    };
}



function mapStateToProps(state) {
    return {
        selectedTab: state.selectedTab,
    }
}

export default connect(mapStateToProps, {})(MyComponent)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});